import express from "express";
import morgan from "morgan";

// Import routes
import projectsRoutes from "./routes/projects.routes.js";
import workpackagesRoutes from "./routes/workpackages.routes.js";
import contractsRoutes from "./routes/contracts.routes.js";
import securitiesRoutes from "./routes/securities.routes.js";
import safesRoutes from "./routes/safes.routes.js";


const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/projects", projectsRoutes);
app.use("/api/workpackages", workpackagesRoutes);
app.use("/api/contracts",contractsRoutes);
app.use("/api/securities",securitiesRoutes);
app.use("/api/safes",safesRoutes);

export default app;
