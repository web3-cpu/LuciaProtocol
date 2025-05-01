const prefix = "https://libqc.org";
import { Generated_link } from "../models/GeneratedLink.js";
import {
  createFingerprint,
  getFingerprintByProfileHash,
} from "../db/helper.js";
import { Link_clicks } from "../models/LinkClicks.js";

export const redirect = async (req, res) => {
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

      if (exists === null) {
        res
          .status(404)
          .json({
            message: "wrong link",
          })
          .send();
      } else {
        storeData(req, exists);
        const target = exists.target;
        res
          .status(200)
          .json({
            target: target,
          })
          .send();
      }
    }
  } catch (error) {
    console.error(e.message);
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
