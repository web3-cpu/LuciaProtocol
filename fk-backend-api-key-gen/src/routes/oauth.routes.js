import { Router } from "express";

import { getUserInfo } from "../controllers/oauth.controller.js";

const router = Router();

router.get("/", getUserInfo);

export default router;
