import express from "express";
import morgan from "morgan";
import cors from "cors";

import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { auth } from "./controllers/oauth.controller.js";
import routes from "./routes.js";
import "./models/index.js";
import "dotenv/config";

const backend_type = process.env.NODE_TYPE;

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// middleware
//app.use(morgan("dev"));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
var org;

if (backend_type === "sdk") {
  org = "*";
} else {
  org = [
    "https://app.clickinsights.xyz",
    "https://libqc.org",
    "https://www.libqc.org",
    "https://ads.clickinsights.xyz",
    "http://ads.clickinsights.xyz",
    "https://staging.ads.clickinsights.xyz",
    "https://staging.api.clickinsights.xyz/redirect",
  ];
}
console.log(org);
app.use(
  cors({
    origin: org,
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "origin",
      "x-requested-with",
      "accept",
      "x-api-key",
    ],
  })
);

const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
};
app.use(errorHandler);

app.use("/", auth, routes);

export default app;
