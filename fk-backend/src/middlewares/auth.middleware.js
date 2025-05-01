import jwt from "jsonwebtoken";

import { Client } from "../models/Client.js";

const verifyToken = (token, next, res) => {
  const secret = process.env.TOKEN_SECRET;
  const options = { algorithm: "HS256" };

  return new Promise((resolve, reject) => {
    return jwt.verify(token, secret, options, (err, data) => {
      //todo add refresh token mechanism
      if (err && err.name === "TokenExpiredError") {
        return res
          .status(401)
          .send({ error: "Access token expired. Please login again" });
      }
      if (err && err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .send({ error: "UnAuthorized Access. Please login again" });
      }
      return resolve(data);
    });
  });
};

export const verifyAuth = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    //token Format 'JWT TokenString'
    if (!token) {
      return res.status(401).send({ message: "Access token is required" });
    }
    token = token.split(" ")[1];

    return verifyToken(token, next, res)
      .then((user) => {
        let query = {};
        if (user && user.email) {
          query.email = user.email;

          //If user not found throw 401
          return Client.findOne({
            where: {
              email: user.email,
            },
          }).then((client) => {
            if (!client) {
              return res.status(401).send({ error: "User not found" });
            }
            req.me = client;
            next();
          });
        }
      })
      .catch((err) => {
        return res.status(401).send({ error: err.message || err });
      });
  } catch (err) {
    return res.status(401).send({ error: err.message || err });
  }
};
