import { Fingerprint } from "../models/Fingerprint.js";
import { Lucia_user } from "../models/LuciaUser.js";
import { v4 as uuidv4 } from "uuid";
import { Session } from "../models/Session.js";
import { sha256 } from "js-sha256";
import { Lucia_user_association_client } from "../models/Lucia_user_assoc_client.js";
import { User_association_client } from "../models/User_assoc_client.js";
import { Lucia_user_association_user } from "../models/Lucia_user_assoc_user.js";
/*
   if lucia_user_hash present then return the existing Lucia_user
   if not
   if Lucia_user with same unique hash and same ip is present use that Lucia_user and send back lucia_hash value
   if not then check for users with same ip and check
   if OS is the same, timezone is same, and screen dimensions are same//
   if yes then use that users Lucia_user_id
   else
   create a new lucia_user_id
*/
export const getLuciaUserId = async (
  data,
  user_ip,
  init,
  user,
  client,
  lid,
  session,
  t
) => {
  try {
    //console.log("LID", lid);
    var hash;
    if (lid) {
      hash = lid.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").trim();
    }
    var isNew = false;
    var lucia_user;
    var db_session;
    if (session) {
      db_session = await Session.findOne(
        {
          where: {
            id: session.id,
          },
        },
        {
          transaction: t,
        }
      );
    }
    // check if lucia_user with client stored hash is present
    if (hash && hash !== "") {
      lucia_user = await Lucia_user.findOne(
        {
          where: {
            local_storage_hash_id: hash,
          },
        },
        {
          transaction: t,
        }
      );
      if (!lucia_user) {
        lucia_user = await createLuciaUserForExistingHash(
          user,
          data,
          user_ip,
          hash,
          client,
          t
        );
      }
    }
    // check if a session is present, if yes then get hash from the session
    if (!lucia_user) {
      if (db_session) {
        lucia_user = await Lucia_user.findOne(
          {
            where: {
              local_storage_hash_id: db_session.lucia_user_hash_value,
            },
          },
          {
            transaction: t,
          }
        );
      }
    }
    // if not check if a lucia_user with similar ip and unique_hash (canvas hash) is present
    if (!lucia_user) {
      lucia_user = await Lucia_user.findOne(
        {
          where: {
            unique_hash: data.uniqueHash,
            ip: user_ip,
          },
        },
        {
          transaction: t,
        }
      );
    }
    // if not check if a fingerprints with the same ip are present and based on some parameters get the lucia_user
    // of most favourable fingerprint
    if (!lucia_user) {
      const fingerprints = await Fingerprint.findAll(
        {
          where: {
            ip: user_ip,
          },
          order: [["createdAt", "DESC"]],
        },
        {
          transaction: t,
        }
      );
      if (fingerprints) {
        lucia_user = await getLuciaUserFromFingerprint(fingerprints, data, t);
      }
    }
    if (!lucia_user && init) {
      ({ lucia_user, isNew } = await createNewLuciaUser(
        user,
        data,
        user_ip,
        isNew,
        client,
        t
      ));
      // TODO create session
    }
    if (user && lucia_user) {
      const assoc = await Lucia_user_association_user.findOne(
        {
          where: {
            user_id: user.id,
            lucia_user_id: lucia_user.id,
          },
        },
        {
          transaction: t,
        }
      );
      if (!assoc) {
        await Lucia_user_association_user.create(
          {
            user_id: user.id,
            lucia_user_id: lucia_user.id,
          },
          {
            transaction: t,
          }
        );
      }
    }
    if (sessionValid(session) && lucia_user) {
      var session_data = {
        hash: session.hash,
        lucia_user_hash_value: lucia_user.local_storage_hash_id,
        expiry: session.expiryTime,
      };
      try {
        if (!db_session) {
          var [db_session, new_created] = await Session.findOrCreate({
            where: {
              id: session.id,
            },
            defaults: session_data,
            transaction: t,
          });
        }
      } catch (e) {
        console.log(e);
        console.log("Exception while creating a new session", e);
      }
    }
    console.log("done with lucia_user");
    return lucia_user;
  } catch (e) {
    console.log(e, "error in getLuciaUserId");
    return null;
  }
};

async function createLuciaUserForExistingHash(
  user,
  data,
  user_ip,
  hash,
  client,
  t
) {
  let lucia_user;
  var lucia_user_data = { local_storage_hash_id: hash };
  if (user_ip) {
    lucia_user_data.ip = user_ip;
  }
  if (user) {
    lucia_user_data.user_id = user.id;
  }
  if (data.uniqueHash) {
    lucia_user_data.unique_hash = data.uniqueHash;
  }
  lucia_user = await Lucia_user.create(lucia_user_data, {
    transaction: t,
  });

  await Lucia_user_association_client.create(
    {
      lucia_user_id: lucia_user.id,
      client_id: client.id,
    },
    {
      transaction: t,
    }
  );
}
async function createNewLuciaUser(user, data, user_ip, isNew, client, t) {
  let lucia_user;
  const local_storage_hash_id = uuidv4();
  var lucia_user_data = {
    local_storage_hash_id: local_storage_hash_id,
    unique_hash: data.uniqueHash,
    ip: user_ip,
  };
  if (user) {
    lucia_user_data.user_id = user.id;
  }
  lucia_user = await Lucia_user.create(lucia_user_data, {
    transaction: t,
  });
  isNew = true;
  await Lucia_user_association_client.create(
    {
      lucia_user_id: lucia_user.id,
      client_id: client.id,
    },
    {
      transaction: t,
    }
  );
  return { lucia_user, isNew };
}

function getLuciaUserFromFingerprint(fingerprints, data, t) {
  Object.values(fingerprints).forEach(async (fingerprint) => {
    var counter = 0;
    if (fingerprint.os === data.os) counter++;
    if (fingerprint.timezone) {
      if (fingerprint.timezone.toString() == data.timezone) counter++;
    }

    if (fingerprint.screen_width && fingerprint.screen_height) {
      if (
        fingerprint.screen_width.toString() === data.screenWidth &&
        fingerprint.screen_height.toString() === data.screenheight
      )
        counter++;
    }
    if (fingerprint.unique_hash === data.uniqueHash) {
      counter += 2;
    }
    if (counter >= 2 && fingerprint.lucia_user_id) {
      lucia_user = await Lucia_user.findOne(
        {
          where: {
            id: fingerprint.lucia_user_id,
          },
        },
        {
          transaction: t,
        }
      );
      return lucia_user;
    }
  });
  return null;
}

function sessionValid(session) {
  if (session) {
    const id = session.id;
    const hash = session.hash;
    if (hash === sha256(id)) return true;
  }
  return false;
}
