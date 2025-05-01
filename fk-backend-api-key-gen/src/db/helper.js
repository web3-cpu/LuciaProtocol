import { Client } from "../models/Client.js";
import { User } from "../models/User.js";
import { Fingerprint } from "../models/Fingerprint.js";
import { Page_view } from "../models/Pageview.js";
import { Conversion_data } from "../models/ConversionData.js";
import { ApiKey } from "../models/ApiKey.js";
import { Button_click } from "../models/ButtonClick.js";
import bcrypt from "bcrypt";

export const autheticateUser = async (key, clientId) => {
  const apiKey = await ApiKey.findOne({
    where: {
      client_id: clientId,
      active: true,
    },
  });
  var retVal = false;
  try {
    if (apiKey !== null) {
      await bcrypt
        .compare(key, apiKey.key)
        .then((resp) => {
          if (resp == true) {
            retVal = true;
          }
        })
        .catch((err) => console.error(err.message));
    }
  } catch (e) {
    console.log(e.message);
  }
  return retVal;
};

export const getUserByUsername = async (name) => {
  return await User.findOne({
    where: {
      user_name: name,
    },
  });
};

export const getClientByUsername = async (clientName) => {
  return await Client.findOne({
    where: {
      username: clientName,
    },
  });
};

export const getFingerprintByProfileHash = async (hashVal) => {
  return await Fingerprint.findOne({
    where: {
      profileHash: hashVal,
    },
  });
};

export const createFingerprint = async (data, hashVal, ip) => {
  return await Fingerprint.create({
    //check
    jsonData: data,
    profileHash: hashVal,
    ip: ip,
  });
};

export const createFingerprintForUser = async (data, user, hashVal, ip) => {
  return await Fingerprint.create({
    jsonData: data,
    user_id: user.id,
    profileHash: hashVal,
    ip: ip,
  });
};

export const updateFingerprintAddUser = async (user, fingerprint) => {
  return await Fingerprint.update(
    { user_id: user.id },
    {
      where: {
        id: fingerprint.id,
      },
    }
  );
};
