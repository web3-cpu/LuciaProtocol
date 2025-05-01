import { User } from "../models/User.js";
import { Client } from "../models/Client.js";
import fetch from "node-fetch";
import "dotenv/config";
import axios from "axios";
import jwt from "jsonwebtoken";
import { sequelize } from "../db/database.js";

export const getUserInfo = async (req, res) => {
  //This method must verify auth
  let getUserData = await Client.findOne({
    where: { email: req.me.email },
    attributes: { exclude: ["password", "emailVerifyUrl"] },
  });
  console.log("User Info:", getUserData);

  if (getUserData) {
    return res.status(201).send({ data: getUserData });
  }
  return res.status(400).json({ error: "Something Went Wrong" });
};

export const userUpdate = async (req, res) => {
  // TODO
  try {
    let body = req.body;
    let response = await Client.update(body, { where: { id: req.me.id } });
    if (response) {
      return await getUserInfo(req, res);
    }
    return res.status(400).json({ error: "Something Went Wrong" });
  } catch (error) {
    return res.status(400).send({
      error: error.message || error,
    });
  }
};

const resendVerifyEmail = async (req, res) => {
  try {
    let token = randtoken.generate(32);
    let user = await User.findOneAndUpdate(
      { id: req.me.id },
      { emailVerifyUrl: token },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({
        error: "User Not Found",
      });
    }

    //todo Email template

    return res
      .status(200)
      .json({ result: "Email verification link has been sent" });
  } catch (error) {
    return res.status(400).send({
      error: error.message || error,
    });
  }
};
const verifyAccount = async (req, res, next) => {
  try {
    const { token, userId } = req.params;
    let user = await UserModel.findOne({ _id: userId }, {});

    if (!user) {
      return errorHandler({ error: "Invalid Verification Link" }, 401, res);
    }

    if (user && user.verified) {
      return res.status(200).json({ result: true });
    }

    if (token === user.emailVerifyUrl) {
      const updateUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { verified: true }
      );
      console.log(updateUser);
      if (!updateUser) {
        return errorHandler({ error: "Invalid Verification Link" }, 401, res);
      }

      return res.status(200).json({ result: true });
    }
    return errorHandler({ error: "Invalid Verification Link" }, 401, res);
  } catch (err) {
    return res.status(400).send({
      error: error.message || error,
    });
  }
};
