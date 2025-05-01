import fetch from "node-fetch";
import "dotenv/config";
import axios from "axios";
import jwt from "jsonwebtoken";
import { sequelize } from "../db/database.js";
import { User } from "../models/User.js";
import { Client } from "../models/Client.js";
import { ApiKey } from "../models/ApiKey.js";
import { Button_click } from "../models/ButtonClick.js";
import { Campaign } from "../models/Campaign.js";
import { Conversion_data } from "../models/ConversionData.js";
import { Fingerprint } from "../models/Fingerprint.js";
import { Generated_link } from "../models/GeneratedLink.js";
import { Link_clicks } from "../models/LinkClicks.js";
import { Lucia_user_association_client } from "../models/Lucia_user_assoc_client.js";
import { Lucia_user_association_user } from "../models/Lucia_user_assoc_user.js";
import { Lucia_user_association_wallet } from "../models/Lucia_user_assoc_wallet.js";
import { Page_view } from "../models/Pageview.js";
import { Redirect } from "../models/Redirect.js";
import { User_association_client } from "../models/User_assoc_client.js";

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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.me.id;
    const deletedExpiry = new Date();
    deletedExpiry.setDate(deletedExpiry.getDate() + 30);

    const user = await Client.update(
      { deleted: true, deletedExpiry },
      { where: { id: userId } }
    );

    if (user[0] > 0) {
      return res.status(200).json({
        message: "Your account has been deleted, and your user data will be permanently deleted from our database in 30 days"
      });
    }
    return res.status(400).json({ error: "User not found" });
  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};

/**
 * Delete user (client) from the DB
 * Delete user data in related tables
 */
export const deleteUserFromDB = async (req, res) => {
  try {
    const userId = req.params.id;
    await ApiKey.destroy({ where: { client_id: userId } });
    await Button_click.destroy({ where: { client_id: userId } });
    await Campaign.destroy({ where: { client_id: userId } });
    await Conversion_data.destroy({ where: { client_id: userId } });
    await Fingerprint.destroy({ where: { user_id: userId } });
    await Generated_link.destroy({ where: { client_id: userId } });
    await Link_clicks.destroy({ where: { client_id: userId } });
    await Lucia_user_association_client.destroy({ where: { client_id: userId } });
    await Lucia_user_association_user.destroy({ where: { client_id: userId } });
    await Lucia_user_association_wallet.destroy({ where: { lucia_user_id: userId } });
    await Page_view.destroy({ where: { client_id: userId } });
    await Redirect.destroy({ where: { client_id: userId } });
    await User_association_client.destroy({ where: { client_id: userId } });

    const user = await Client.destroy({ where: { id: userId } });

    if (user) {
      return res.status(200).json({ message: "User deleted successfully" });
    }
    return res.status(400).json({ error: "User not found" });
  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};
