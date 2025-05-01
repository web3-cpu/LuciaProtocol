import { Router } from "express";

import { getUserInfo, userUpdate } from "../controllers/user.controller.js";

const router = Router();

router.get("/user-info", getUserInfo);
router.put("/", userUpdate);

export default router;
