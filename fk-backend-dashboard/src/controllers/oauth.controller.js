import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Client } from "../models/Client.js";
import fetch from "node-fetch";
import "dotenv/config";
import axios from "axios";
import jwt from "jsonwebtoken";
import { sequelize } from "../db/database.js";
import { addMinutesToDate, dates } from "../util/index.js";
import { commonMailFunctionToAll } from "../lib/mailer/index.js";
import { autheticateUser, getClientByApiKey } from "../db/helper.js";
import url from "url";
import crypto from "crypto";

import { verifyAuth } from "../middlewares/auth.middleware.js";

// Initialize OAuth2Client with your credentials
const oAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT,
});

// const exceptAuthRoutes = [
//   "login",
//   "signup",
//   "google-login",
//   "google-signup",
//   "forgot-password",
//   "reset-password",
//   "forgotpassword",
//   "api/oauth",
// ];
const sdkAuth = async (req, res, next) => {
  try {
    //const clientName = req.body.client;
    const key = req.get("X-API-KEY");
    const client = await getClientByApiKey(key);
    if (client === null) {
      res.status(401).json({ message: "incorrect api key" });
      return;
    }
    res.locals.client = client;
    next();
  } catch (e) {
    console.log(e.message);
  }
};

const authMap = new Map([
  ["/api/sdk/user/", sdkAuth], //tested
  ["/api/sdk/page/", sdkAuth], //tested
  ["/api/sdk/conversion/", sdkAuth], //tested
  ["/api/sdk/click/", sdkAuth], //tested
  ["/api/sdk/wallet/", sdkAuth], //tested
  ["/api/sdk/init/", sdkAuth],
  ["/api/link/genlink/", verifyAuth], //tested
  ["/api/link/campaign/", verifyAuth], //tested
  ["/api/key/", verifyAuth],
  ["/api/key/auth/", sdkAuth], //tested
  ["/api/user/user-info/", verifyAuth], //tested
  ["/api/user/", verifyAuth], //todo
]);

export const auth = async (req, res, next) => {
  let reqUrl = url.parse(req.url, true);
  console.log(reqUrl);
  let middleware =
    authMap.get(reqUrl.pathname) ?? authMap.get(reqUrl.pathname + "/");
  if (middleware) {
    console.log("inside middleware");
    middleware(req, res, next);
  } else {
    console.log("else middleware");
    next();
  }
};

const getLoginDetails = async (user) => {
  //todo add more data to user object;
  const token = generateAccessToken({ name: user.name, email: user.email });
  return { token };
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_TOKEN_EXPIRY_MIN,
  });
};

export const googleSignup = async (req, res) => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
      prompt: "consent",
    });

    const code = req.query.code; // Received from the callback
    const { tokens } = await oAuth2Client.getToken(code);
    const accessToken = tokens.access_token;

    await oAuth2Client.setCredentials(accessToken);
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oAuth2Client.credentials}`
    );
    const data = await response.json();
    console.log("User Info:", data);

    let getUserData = await Client.findOne({
      where: { email: data.email },
    });

    if (getUserData) {
      return res.status(400).send({ error: "Email Already Exists" });
    }

    await Client.create({
      name: data.name,
      email: data.email,
      isGuest: false,
      picture: data.picture,
    });
    console.log("User Info:", data);
    res.redirect(200, `${process.env.FRONTEND_AD_ATTRIBUTION}/login`);
  } catch (e) {
    console.log("ERROR", e.message);
    return res.status(401).send({
      auth: false,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
      prompt: "consent",
    });
    const code = req.query.code; // Received from the callback
    const { tokens } = await oAuth2Client.getToken(code);
    const accessToken = tokens.access_token;

    await oAuth2Client.setCredentials(accessToken);
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oAuth2Client.credentials}`
    );
    const data = await response.json();

    let getUserData = await Client.findOne({
      where: { email: data.email },
    });

    if (!getUserData) {
      return res
        .status(400)
        .send({ error: "No Account Found With Given Email" });
    }

    const userAccessToken = await getLoginDetails(data);

    console.log("User Info:", data);
    console.log("userAccessToken:", userAccessToken);
    res.send(200).send({ data: data, token: userAccessToken });
  } catch (e) {
    console.log("error-:", e);
    return res.status(400).send({ error: "Incorrect Email or Password" });
  }
};

export const companySignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password)
      throw new Error("email and password are required fields");
    let find = await Client.findOne({ where: { email: email } });
    if (find && find.email) {
      return res.status(400).json({
        error: "Account Already Exist With Given Email, Please Login",
      });
    }
    await Client.create({
      name: firstName + ' ' + lastName,
      email: email,
      isGuest: false,
      verified: false,
      password,
      emailVerifyUrl: "",
    });
    return res.status(201).json({ message: "company added successfully" });
  } catch (error) {
    return res.status(400).send({
      error: error.message || error,
    });
  }
};

const resendVerifyEmail = async (req, res) => {
  try {
    let token = randtoken.generate(32);
    let user = await Client.findOneAndUpdate(
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
    let user = await Client.findOne({ _id: userId }, {});

    if (!user) {
      return errorHandler({ error: "Invalid Verification Link" }, 401, res);
    }

    if (user && user.verified) {
      return res.status(200).json({ result: true });
    }

    if (token === user.emailVerifyUrl) {
      const updateUser = await Client.findOneAndUpdate(
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

export const companyLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      throw new Error("email and password are required fields");
    let user = await Client.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Incorrect Email or Password" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ error: "Incorrect Email or Password" });
    }

    const loginDetails = await getLoginDetails(user);
    return res.status(200).json({ result: loginDetails });
  } catch (error) {
    return res.status(400).send({
      error: error.message || error,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("email is a required field");
    let user = await Client.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Incorrect Email" });
    }

    const now = new Date();
    const otpExpiry = addMinutesToDate(now, 15);
    let otp = Math.floor(Math.random() * (100000 - 100000 + 999999)) + 100000;
    otp = otp.toString().substring(0, 4);
    const emaildata = {
      content: `Welcome, Use the following Code to complete the verification. Verification Code is valid for 15 minutes.`,
      subject: "Forgot Password",
      email,
      name: user.name,
      otp,
    };
    // update user doc
    await Client.update({ otp, otpExpiry }, { where: { email } });
    // email otp
    const resp = await commonMailFunctionToAll(emaildata, "otp");
    return res
      .status(200)
      .json({ message: "Please check email for verification code" });
  } catch (error) {
    return res.status(400).send({
      error: error.message || error,
    });
  }
};

export const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, password, confirmPassword, otp } = req.body;
    if (!email || !otp || !password || !confirmPassword)
      throw new Error("email, otp, password and confirmPassword are required");
    if (password != confirmPassword)
      throw new Error("password and confirmPassword should match");
    // const { email } = await Client.findByPk(req.me.id);
    const otpVerified = await Client.findOne({
      where: { email },
      attributes: ["otpExpiry", "otp"],
    });
    if (!otpVerified) throw new Error("email not found");
    const currentdate = new Date();
    if (
      !otpVerified.otpExpiry ||
      dates.compare(otpVerified.otpExpiry, currentdate) > 15
    ) {
      throw new Error("Verification code expired!");
    }
    if (otp != otpVerified.otp) throw new Error("Incorrent Verification code");

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.HASH_COST)
    );
    await Client.update(
      { otp: "", otpExpiry: null, password: hashedPassword },
      { where: { email } }
    );
    return res.status(200).json({ message: "Password update successful" });
  } catch (error) {
    return res.status(400).send({
      error: error.message || error,
    });
  }
};
