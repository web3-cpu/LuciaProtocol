import { User } from "../models/User.js";
import { Page_view } from "../models/Pageview.js";
import { Conversion_data } from "../models/ConversionData.js";
import { Button_click } from "../models/ButtonClick.js";
import {
  autheticateUser,
  getUserByUsername,
  getFingerprintByProfileHash,
  createFingerprint,
  getClientByUsername,
  createFingerprintForUser,
  updateFingerprintAddUser,
} from "../db/helper.js";

export const userData = async (req, res) => {
  try {
    if (
      !req.body ||
      !req.body.user ||
      req.body.user == null ||
      !req.body.client ||
      req.body.client == null
    ) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const userDetails = req.body.user;
      const clientName = req.body.client;
      const key = req.get("X-API-KEY");
      const client = await getClientByUsername(clientName);

      if (client === null) {
        res.status(400).json({ message: "client username not found" });
        return;
      }
      const flag = await autheticateUser(key, client.id);
      if (!flag) {
        console.log("authentication failed");
        res.status(401).send({
          auth: false,
        });
        return;
      }
      const ip = getIPAddress(req);
      var user;
      if (userDetails.name) {
        user = await getUserByUsername(userDetails.name);
        if (user === null) {
          user = await User.create({
            user_name: userDetails.name,
          });
        }
      }
      const data = userDetails.data;
      var hashVal = await hash(data);
      const fingerprint = await getFingerprintByProfileHash(hashVal);

      if (user === undefined || user === null) {
        if (fingerprint === null) {
          const newFingerprint = await createFingerprint(data, hashVal, ip);
        }
      } else {
        if (fingerprint === null) {
          const newFingerprint = await createFingerprintForUser(
            data,
            user,
            hashVal,
            ip
          );
        } else if (fingerprint.user_id === null) {
          updateFingerprintAddUser(user, fingerprint);
        }
      }
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
  try {
    if (!req.body || !req.body.page || req.body.page == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const page = req.body.page;
      const clientName = req.body.client;
      const userDetails = req.body.user;
      const key = req.get("X-API-KEY");
      const ip = getIPAddress(req);
      const client = await getClientByUsername(clientName);

      if (client === null) {
        res.status(400).json({ message: "client username not found" });
        return;
      }
      const flag = await autheticateUser(key, client.id);
      if (!flag) {
        console.log("authentication failed");
        res.status(401).send({
          auth: false,
        });
        return;
      }
      var user;
      if (userDetails.name) {
        user = await getUserByUsername(userDetails.name);
      }
      var data = userDetails.data;
      var hashVal = await hash(data);
      var fingerprint = await getFingerprintByProfileHash(hashVal);

      if (user === undefined || user === null) {
        if (fingerprint === null) {
          fingerprint = await createFingerprint(data, hashVal, ip);
        }
        await Page_view.create({
          page: page,
          client_id: client.id,
          fingerprint_id: fingerprint.id,
        });
      } else {
        if (fingerprint === null) {
          fingerprint = await createFingerprintForUser(data, user, hashVal, ip);
        } else if (fingerprint.user_id === null) {
          updateFingerprintAddUser(user, fingerprint);
        }
        await Page_view.create({
          page: page,
          client_id: client.id,
          user_id: user.id,
          fingerprint_id: fingerprint.id,
        });
      }
      res.status(200).send({
        auth: true,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const conversion = async (req, res) => {
  try {
    if (!req.body || !req.body.event || req.body.event == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const event = req.body.event;
      const clientName = req.body.client;
      const userDetails = req.body.user;

      const key = req.get("X-API-KEY");
      const ip = getIPAddress(req);
      const client = await getClientByUsername(clientName);

      if (client === null) {
        res.status(400).json({ message: "client username not found" });
        return;
      }
      const flag = await autheticateUser(key, client.id);
      if (!flag) {
        console.log("authentication failed");
        res.status(401).send({
          auth: false,
        });
        return;
      }
      var user;
      if (userDetails.name) {
        user = await getUserByUsername(userDetails.name);
      }
      var data = userDetails.data;
      var hashVal = await hash(data);
      var fingerprint = await getFingerprintByProfileHash(hashVal);
      if (user === undefined || user === null) {
        if (fingerprint === null) {
          fingerprint = await createFingerprint(data, hashVal, ip);
        }
        await Conversion_data.create({
          event: event,
          client_id: client.id,
          fingerprint_id: fingerprint.id,
        });
      } else {
        if (fingerprint === null) {
          fingerprint = await createFingerprintForUser(data, user, hashVal, ip);
        } else if (fingerprint.user_id === null) {
          updateFingerprintAddUser(user, fingerprint);
        }
        await Conversion_data.create({
          event: event,
          client_id: client.id,
          user_id: user.id,
          fingerprint_id: fingerprint.id,
        });
      }
      res.status(200).send({
        auth: true,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const buttonClick = async (req, res) => {
  try {
    if (!req.body || !req.body.button || req.body.button == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const button = req.body.button;
      const clientName = req.body.client;
      const userDetails = req.body.user;

      const key = req.get("X-API-KEY");
      const client = await getClientByUsername(clientName);
      const ip = getIPAddress(req);
      if (client === null) {
        res.status(400).json({ message: "client username not found" });
        return;
      }
      const flag = await autheticateUser(key, client.id);
      if (!flag) {
        console.log("authentication failed");
        res.status(401).send({
          auth: false,
        });
        return;
      }
      var user;
      if (userDetails.name) {
        user = await getUserByUsername(userDetails.name);
      }
      var data = userDetails.data;
      var hashVal = await hash(data);
      var fingerprint = await getFingerprintByProfileHash(hashVal);
      if (user === undefined || user === null) {
        if (fingerprint === null) {
          fingerprint = await createFingerprint(data, hashVal, ip);
        }
        await Button_click.create({
          button: button,
          client_id: client.id,
          fingerprint_id: fingerprint.id,
        });
      } else {
        if (fingerprint === null) {
          fingerprint = await createFingerprintForUser(data, user, hashVal, ip);
        } else if (fingerprint.user_id === null) {
          updateFingerprintAddUser(user, fingerprint);
        }

        await Button_click.create({
          button: button,
          client_id: client.id,
          fingerprint_id: fingerprint.id,
        });
      }
      res.status(200).send({
        auth: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    console.log("error in button click");
  }
};

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
  // const clientIP =
  //   req.headers["x-forwarded-for"]?.split(",").shift() ||
  //   req.socket?.remoteAddress;
  // const repIP = req.ip;
  // if (repIP === clientIP || repIP) {
  //   return repIP;
  // } else if (clientIP) {
  //   return clientIP;
  // } else {
  //   return "";
  // }
  const ip = req.headers["x-real-ip"];
  return ip;
}
