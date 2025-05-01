import { Client } from "../models/Client.js";
import { User } from "../models/User.js";
import { Fingerprint } from "../models/Fingerprint.js";
import { Page_view } from "../models/Pageview.js";
import { Conversion_data } from "../models/ConversionData.js";
import { ApiKey } from "../models/ApiKey.js";
import { Button_click } from "../models/ButtonClick.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User_association_client } from "../models/User_assoc_client.js";

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

export const getUserByUsername = async (userDetails, client, t) => {
  var user = await User.findOne(
    {
      where: {
        user_name: userDetails.name,
      },
    },
    {
      transaction: t,
    }
  );
  if (!user) {
    user = await User.create(
      {
        user_name: userDetails.name,
        user_info: userDetails.userInfo ?? null,
      },
      {
        transaction: t,
      }
    );
  }
  const user_client = await User_association_client.findOne(
    {
      where: {
        user_id: user.id,
        client_id: client.id,
      },
    },
    {
      transaction: t,
    }
  );
  if (!user_client) {
    User_association_client.create(
      {
        user_id: user.id,
        client_id: client.id,
      },
      {
        transaction: t,
      }
    );
  }
  return user;
};

export const getClientByApiKey = async (key) => {
  const hash = crypto.createHash("sha256").update(key).digest("hex");
  const apiKey = await ApiKey.findOne({
    where: {
      active: true,
      key: hash,
    },
  });
  if (!apiKey) {
    return null;
  }
  return await Client.findOne({
    where: {
      id: apiKey.client_id,
    },
  });
};

export const getFingerprintByProfileHash = async (
  hashVal,
  user,
  lucia_user,
  data,
  ip,
  t,
  session
) => {
  try {
    var fingerprint = await Fingerprint.findOne({
      where: {
        profileHash: hashVal,
      },
    });
    if (!user) {
      if (!fingerprint) {
        fingerprint = await createFingerprint(
          data,
          hashVal,
          ip,
          lucia_user,
          t,
          session
        );
      }
    } else {
      fingerprint = await createFingerprintForUser(
        data,
        user,
        hashVal,
        ip,
        lucia_user,
        t,
        session
      );
    }
    console.log("done with fingerprints");
    return fingerprint;
  } catch (e) {
    console.log(e, "exception in getFingerprintByProfileHash");
    return null;
  }
};

export const createFingerprint = async (
  data,
  hashVal,
  ip,
  lucia_user,
  t,
  session
) => {
  const f_data = {
    profileHash: hashVal,
    ip: ip,
  };

  if (data) {
    f_data.data = data;
    f_data.screen_width =
      data.screenWidth === undefined ? "" : "" + data.screenWidth;
    f_data.screen_height =
      data.screenheight === undefined ? "" : "" + data.screenheight;
    f_data.timezone = data.timezone === undefined ? "" : "" + data.timezone;
    f_data.os = data.os === undefined ? "" : data.os;
    if (data.uniqueHash) {
      f_data.unique_hash = data.uniqueHash;
    }
  }

  if (lucia_user) {
    f_data.lucia_user_id = lucia_user.id;
  }
  if (session) {
    f_data.session_id = session.id;
  }

  return await Fingerprint.create(f_data, {
    transaction: t,
  });
};

export const createFingerprintForUser = async (
  data,
  user,
  hashVal,
  ip,
  lucia_user,
  t,
  session
) => {
  let fingerprint;
  let created;
  try {
    var f_data = {
      ip: ip,
    };

    if (data) {
      f_data.data = data;
      f_data.screen_width =
        data.screenWidth === undefined ? "" : "" + data.screenWidth;
      f_data.screen_height =
        data.screenheight === undefined ? "" : "" + data.screenheight;
      f_data.timezone = data.timezone === undefined ? "" : "" + data.timezone;
      f_data.os = data.os === undefined ? "" : data.os;
      if (data.uniqueHash) {
        f_data.unique_hash = data.uniqueHash;
      }
    }

    if (lucia_user) {
      f_data.lucia_user_id = lucia_user.id;
    }
    if (session) {
      f_data.session_id = session.id;
    }
    [fingerprint, created] = await Fingerprint.findOrCreate({
      where: {
        profileHash: hashVal,
        user_id: user.id,
      },
      defaults: f_data,
      transaction: t,
    });
    return fingerprint;
  } catch (e) {
    console.log("error in createFingerprintForUser");
    console.log(e);
  }
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
