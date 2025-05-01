import express from "express";
import morgan from "morgan";
import cors from "cors";
// Import routes
import projectsRoutes from "./routes/projects.routes.js";
import workpackagesRoutes from "./routes/workpackages.routes.js";
import contractsRoutes from "./routes/contracts.routes.js";
import securitiesRoutes from "./routes/securities.routes.js";
import safesRoutes from "./routes/safes.routes.js";
import founderRoutes from "./routes/founders.routes.js";
import fingerprintRoutes from "./routes/fingerprints.routes.js";
import keyRoutes from "./routes/key.routes.js";
import sdkRoutes from "./routes/sdk.routes.js";
import linkRoutes from "./routes/link.routes.js";
import oauthRoutes from "./routes/oauth.routes.js";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

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
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
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

// routes
app.use("/api/projects", projectsRoutes);
app.use("/api/workpackages", workpackagesRoutes);
app.use("/api/contracts", contractsRoutes);
app.use("/api/securities", securitiesRoutes);
app.use("/api/safes", safesRoutes);
app.use("/api/safes", safesRoutes);
app.use("/api/founders", founderRoutes);
app.use("/api/fingerprints", fingerprintRoutes);
app.use("/api/key", keyRoutes);
app.use("/api/sdk", sdkRoutes);
app.use("/api/link", linkRoutes);
app.use("/api/oauth",oauthRoutes);

export default app;




