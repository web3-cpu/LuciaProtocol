import crypto from "crypto";
import { ApiKey } from "../models/ApiKey.js";

export const generateKey = async (req, res) => {
  try {
    const client = req.me;
    var result = generateHash(client.name);
    await ApiKey.update(
      { active: false },
      {
        where: {
          client_id: client.id,
        },
      }
    );
    const hash = crypto.createHash("sha256").update(result).digest("hex");
    const newKey = ApiKey.create({
      key: hash,
      client_id: client.id,
      active: true,
    });
    res.status(200).send({
      key: result,
    });
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
    res.status(200).send({
      auth: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getApiKeys = async(req, res) => {
  try {
    const client = req.me;

    const keys = await ApiKey.findAll({
      attributes: ["client_id", "expiration", "created_at"],
      where: [
        {
          client_id: client.id,
          active: true
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(keys);
  } catch (error) {
    console.log(error.message);
    console.log("error in getting API keys");
  }
}