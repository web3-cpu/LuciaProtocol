import { Router } from "express";

import { getUserInfo, userUpdate, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/user-info", getUserInfo);
router.put("/", userUpdate);
router.delete("/", deleteUser);

export default router;
