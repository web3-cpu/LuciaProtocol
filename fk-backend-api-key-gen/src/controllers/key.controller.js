import crypto from "crypto";
import { ApiKey } from "../models/ApiKey.js";
import { Client } from "../models/Client.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const generateKey = async (req, res) => {
  try {
    if (!req.body || !req.body.client || req.body.client == null) {
      res.status(400).json({ message: "Mandatory field is missing" });
    } else {
      const user = req.body.client;
      var result = generateHash(user);
      var client = await Client.findOne({
        where: {
          username: user,
        },
      });

      if (client === null) {
        client = await Client.create({
          username: user,
          call_count: 0,
          privilages: 1,
        });
      }
      await ApiKey.update(
        { active: false },
        {
          where: {
            client_id: client.id,
          },
        }
      );

      bcrypt.hash(result, saltRounds, function (err, hash) {
        const newKey = ApiKey.create({
          key: hash,
          client_id: client.id,
          active: true,
        });
      });
      res.status(200).send({
        key: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }

  function generateHash(user) {
    const date = Date.now().toString();
    const randomBytes = crypto.randomBytes(16).toString("hex");
    const inputString = date + randomBytes + user;
    const hash = crypto.createHash("sha512");
    hash.update(inputString);
    var digest = hash.digest("hex");
    var result = "";
    for (let i = 0; i < 8; i++) {
      const start = i * 8;
      const end = start + 8;
      const part = digest.substring(start, end);
      if (i > 0) {
        result += "-";
      }
      result += part;
    }
    return result;
  }
};

export const authenticateKey = async (req, res) => {
  try {
    if (
      !req.body ||
      !req.body.client ||
      req.body.client == null ||
      req.body.client == null ||
      !req.body.key
    ) {
      res.status(400).json({ message: "Mandatory field is missing" });
      console.log("missing fields");
    } else {
      const user = req.body.client;
      const key = req.body.key;
      const client = await Client.findOne({
        where: {
          username: user,
        },
      });
      const apiKey = await ApiKey.findOne({
        where: {
          client_id: client.id,
          active: true,
        },
      });
      if (apiKey !== null) {
        bcrypt
          .compare(key, apiKey.key)
          .then((resp) => {
            console.log(resp);
            if (resp == true) {
              res.status(200).send({
                auth: true,
              });
            } else {
              res.status(401).send({
                auth: false,
              });
            }
          })
          .catch((err) => console.error(err.message));
      } else {
        res.status(401).send({
          auth: false,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
