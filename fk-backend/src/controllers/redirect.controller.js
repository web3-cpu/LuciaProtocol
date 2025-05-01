import { Generated_link } from "../models/GeneratedLink.js";
import {
  createFingerprint,
  getFingerprintByProfileHash,
} from "../db/helper.js";
import { Link_clicks } from "../models/LinkClicks.js";
import { getLuciaUserId } from "../util/luciaUser.js";
import crypto from "crypto";
import "dotenv/config";
import { Client } from "../models/Client.js";
const env = process.env.NODE_ENV;
var prefix;
import { sequelize } from "../db/database.js";
if (env === "dev") {
  prefix = "http://localhost:3002";
} else if (env === "production") {
  prefix = "https://libqc.org";
} else if (env === "staging") {
  prefix = "https://staging.api.clickinsights.xyz";
}

export const redirect = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (!req.body) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const link = prefix + req.body.path;
      const exists = await Generated_link.findOne({
        where: {
          link: link,
        },
      });

      console.log("link exists =====> ", exists);

      if (exists === null) {
        res
          .status(404)
          .json({
            message: "wrong link",
          })
          .send();
      } else {
        var lucia_user;
        try {
          lucia_user = await extractData(req, res, t, exists);
        } catch (e) {
          console.log("error in data extraction", e);
          // t.rollback();
        }
        const target = exists.target;
        var ret_val = {
          target: target,
        };
        if (lucia_user && lucia_user.local_storage_hash_id) {
          ret_val.lucia_user_hash = lucia_user.local_storage_hash_id;
        }
        res.status(200).json(ret_val).send();
      }
      await t.commit();
    }
  } catch (error) {
    t.rollback();
    res
      .status(400)
      .json({
        message: "server error",
      })
      .send();
    console.error(error.message);
  }
};

async function storeData(req, link) {
  var hashVal = await hash(req.body.data);
  var fingerprint = await getFingerprintByProfileHash(hashVal);
  if (!fingerprint) {
    fingerprint = await createFingerprint(req.body.data, hashVal, req.body.ip);
  }
  if (link.client_id !== null) {
    Link_clicks.create({
      link_id: link.id,
      client_id: link.client_id,
      fingerprint_id: fingerprint.id,
    });
  } else {
    Link_clicks.create({
      link_id: link.id,
      fingerprint_id: fingerprint.id,
    });
  }
  await Generated_link.increment({ num_clicks: 1 }, { where: { id: link.id } });
}

async function extractData(req, res, t, link) {
  const ip = req.body.ip;
  var data = req.body.data.data;
  var hashVal = await hash(data);
  console.log("ip", ip);
  //console.log("data", data);
  //console.log("body", req.body);
  if (!data.uniqueHash.hash) {
    const hash = crypto
      .createHash("sha256")
      .update(data.uniqueHash.src)
      .digest("hex");
    data.uniqueHash = hash;
  } else {
    data.uniqueHash = data.uniqueHash.src;
  }
  console.log("unique hash after processing:", data.uniqueHash);
  // todo - send client instead of just client_id
  const client = await Client.findOne({
    where: {
      id: link.client_id,
    },
  });
  var lucia_user;
  var fingerprint;
  if (!data.uniqueHash) {
    data.uniqueHash = "";
  }
  try {
    lucia_user = await getLuciaUserId(
      data,
      ip,
      true,
      null,
      client,
      req.body.lid,
      undefined,
      t
    );
  } catch (e) {
    console.log("error in creating lucia_user redirect", e);
  }
  //console.log("hashval", hashVal);
  try {
    fingerprint = await getFingerprintByProfileHash(
      hashVal,
      null,
      lucia_user,
      data,
      ip,
      t,
      null
    );
  } catch (e) {
    console.log("error in creating fingerprint redirect", e);
  }

  var link_click_data = {
    link_id: link.id,
    client_id: link.client_id,
    redirect_hash: req.body.data.redirectHash,
  };
  if (fingerprint) {
    link_click_data.fingerprint_id = fingerprint.id;
  }

  if (lucia_user) {
    link_click_data.lucia_user_id = lucia_user.id;
  }

  await Link_clicks.create(link_click_data);

  await Generated_link.increment({ num_clicks: 1 }, { where: { id: link.id } });
  return lucia_user;
}

async function hash(obj) {
  return new Promise((resolve, reject) => {
    try {
      var string = JSON.stringify(obj);
      const utf8 = new TextEncoder().encode(string);

      crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((bytes) => bytes.toString(16).padStart(2, "0"))
          .join("");
        resolve(hashHex);
      });
    } catch (e) {
      console.error(e.message);
      reject(e);
    }
  });
}
