import express from "express";
const router = express.Router();

const app = express();
app.use(express.json());

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
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

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
app.use("/api/oauth", oauthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
