import { User } from "../models/User.js";
import { Page_view } from "../models/Pageview.js";
import { Conversion_data } from "../models/ConversionData.js";
import { Button_click } from "../models/ButtonClick.js";
import {
  getUserByUsername,
  getFingerprintByProfileHash,
  createFingerprint,
  createFingerprintForUser,
} from "../db/helper.js";
import "dotenv/config";
import { getLuciaUserId } from "../util/luciaUser.js";
import { sequelize } from "../db/database.js";

const env = process.env.NODE_ENV;
import crypto from "crypto";
import { Wallet } from "../models/Wallet.js";
import { Lucia_user_association_wallet } from "../models/Lucia_user_assoc_wallet.js";
import { Redirect } from "../models/Redirect.js";
import { getNetworkName } from "../util/wallet.js";

export const userData = async (req, res) => {
  try {
    if (!req.body || !req.body.user || req.body.user == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      var {
        user,
        fingerprint,
        data,
        hashVal,
        ip,
        client,
        lucia_user,
        session,
      } = await extractData(req, res);
      res.status(200).send({
        auth: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    console.log("error in user storage");
  }
};

export const pageView = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (!req.body || !req.body.page || req.body.page == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const page = req.body.page;
      var { user, fingerprint, client, lucia_user, session } =
        await extractData(req, res, false, t);
      var page_view_body;
      page_view_body = {
        page: page,
        client_id: client.id,
      };
      if (fingerprint) {
        page_view_body.fingerprint_id = fingerprint.id;
      }
      if (session) {
        page_view_body.session_id = session.id;
      }
      if (lucia_user) {
        page_view_body.lucia_user_id = lucia_user.id;
      }
      if (user) {
        page_view_body.user_id = user.id;
      }
      await Page_view.create(page_view_body, {
        transaction: t,
      });
      console.log("Done with page view sending response");

      res.status(200).send({});
      await t.commit();
    }
  } catch (error) {
    await t.rollback();
    res.status(400).send({});
    console.log(error.message, "error in page view");
  }
};

export const conversion = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (!req.body || !req.body.tag || req.body.tag == null) {
      console.log("400 error");
      console.log(req.body);
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const event_tag = req.body.tag;
      var amount = req.body.amount;
      var event = req.body.event;
      if (!amount) amount = 0;
      if (!event) event = { nothing: true };
      var { user, fingerprint, client, lucia_user, session } =
        await extractData(req, res, false, t);

      var conversion_data = {
        event_tag: event_tag,
        client_id: client.id,
        event_details: event,
        amount: amount,
      };
      if (fingerprint) {
        conversion_data.fingerprint_id = fingerprint.id;
      }
      if (session) {
        conversion_data.session_id = session.id;
      }
      if (lucia_user) {
        conversion_data.lucia_user_id = lucia_user.id;
      }
      if (user) {
        conversion_data.user_id = user.id;
      }
      await Conversion_data.create(conversion_data, {
        transaction: t,
      });

      res.status(200).send({});
      await t.commit();
    }
  } catch (error) {
    await t.rollback();
    res.status(400).send({});
    console.log("error in track conversion", error.message);
  }
};

export const buttonClick = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (!req.body || !req.body.button || req.body.button == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const button = req.body.button;
      var { user, fingerprint, client, lucia_user, session } =
        await extractData(req, res, false, t);
      var button_data = {
        button: button,
        client_id: client.id,
      };
      if (fingerprint) {
        button_data.fingerprint_id = fingerprint.id;
      }
      if (session) {
        button_data.session_id = session.id;
      }
      if (lucia_user) {
        button_data.lucia_user_id = lucia_user.id;
      }
      if (user) {
        button_data.user_id = user.id;
      }

      await Button_click.create(button_data, {
        transaction: t,
      });

      res.status(200).send({});
      await t.commit();
    }
  } catch (error) {
    await t.rollback();
    res.status(400).send({});
    console.log(error.message);
    console.log("error in button click", error);
  }
};

export const wallet = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (
      !req.body ||
      !req.body.walletAddress ||
      req.body.walletAddress == null
    ) {
      console.log("400 error");
      console.log(req.body);
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const walletAddress = req.body.walletAddress;
      const chainId = req.body.chainId;
      var { user, fingerprint, client, lucia_user, session } =
        await extractData(req, res, false, t);

      let networkName = getNetworkName(chainId);

      const [wallet, created] = await Wallet.findOrCreate({
        where: {
          address: walletAddress,
          chain_id: chainId,
          network_name: networkName,
        },
        defaults: {
          name: "MetaMask",
        },
        transaction: t,
      });
      await Lucia_user_association_wallet.findOrCreate({
        where: {
          lucia_user_id: lucia_user.id,
          wallet_id: wallet.id,
        },
        transaction: t,
      });

      res.status(200).send({});
      await t.commit();
    }
  } catch (error) {
    await t.rollback();
    res.status(400).send({});
    console.log("Error: ", error.message);
  }
};

export const init = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    var { user, fingerprint, client, lucia_user, session } = await extractData(
      req,
      res,
      true,
      t
    );
    console.log(lucia_user);
    res.status(200).send({
      lid: lucia_user.local_storage_hash_id,
    });
    await t.commit();
  } catch (e) {
    await t.rollback();
    res.status(400).send({});
    console.log(" error in init", e);
  }
};

async function extractData(req, res, init, t) {
  const userDetails = req.body.user;
  const ip = getIPAddress(req);
  var user;
  var client = res.locals.client;

  if (userDetails.name) {
    userDetails.name = userDetails.name
      .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "")
      .trim();
    user = await getUserByUsername(userDetails, client, t);
  }
  var data = userDetails.data.data;
  var hashVal = await hash(data);
  var session = req.body.session;
  console.log("session", session);
  var lucia_user = await getLuciaUserId(
    data,
    ip,
    init,
    user,
    client,
    req.body.lid,
    session,
    t
  );

  var fingerprint = await getFingerprintByProfileHash(
    hashVal,
    user,
    lucia_user,
    data,
    ip,
    t,
    session
  );
  if (userDetails.data.redirectHash) {
    var redirect_body;
    redirect_body = {
      redirect_hash: userDetails.data.redirectHash,
      client_id: client.id,
    };
    if (fingerprint) {
      redirect_body.fingerprint_id = fingerprint.id;
    }
    if (lucia_user) {
      redirect_body.client_idlucia_user_id = lucia_user.id;
    }
    await Redirect.create(redirect_body, {
      transaction: t,
    });
  }
  return { user, fingerprint, client, lucia_user, session };
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

function getIPAddress(req) {
  if (env === "dev") {
    const clientIP =
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress;
    console.log("client ip", clientIP);
    const repIP = req.ip;
    console.log("rep ip", repIP);
    if (repIP === clientIP || repIP) {
      return repIP;
    } else if (clientIP) {
      return clientIP;
    } else {
      return "";
    }
  } else if (env === "production" || env === "staging") {
    const ip = req.headers["x-real-ip"];
    return ip;
  }
}
