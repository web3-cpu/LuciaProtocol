"use strict";
import nodeMailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
const __dirname = path.resolve("src", "lib", "mailer");
import "dotenv/config";

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST, // 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

// send email to

export const sendMail = async (to, subject, data) => {
  // const  templatepath  = path.join(__dirname, 'template', templatename);
  // const template = await ejs.renderFile(templatepath, {data});
  let mail = {
    from: process.env.EMAIL, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: data, // template
  };

  try {
    let info = await transporter.sendMail(mail);
    console.log("info", info);
  } catch (error) {
    console.log("ERROR", error.message || error);
    throw new Error(error.message || error);
  }
};

export const sendOTPToUser = (dataToCompile, template) => {
  try {
    let filePath = path.join(__dirname, "template", `${template}.ejs`),
      compiled = ejs.compile(fs.readFileSync(filePath, "utf8")),
      Subject = dataToCompile.subject;
    return sendMail(dataToCompile.email, Subject, compiled(dataToCompile));
  } catch (e) {
    console.log(e);
    throw new Error(e.message || e);
  }
};

export const commonMailFunctionToAll = (dataToCompile, template) => {
  try {
    // let filePath = path.resolve(__dirname + `/template/${template}.ejs`),
    let filePath = path.join(__dirname, "template", `${template}.ejs`),
      compiled = ejs.compile(fs.readFileSync(filePath, "utf8")),
      Subject = dataToCompile.subject;
    return sendMail(dataToCompile.email, Subject, compiled(dataToCompile));
  } catch (e) {
    console.log(e);
    throw new Error(e.message || e);
  }
};
