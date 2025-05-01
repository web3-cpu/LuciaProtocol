import { Router } from "express";
import {
  generateKey,
  authenticateKey,
  getApiKeys,
} from "../controllers/key.controller.js";

const router = Router();

router.post("/", generateKey);
router.post("/auth", authenticateKey);

router.get("/", getApiKeys);

export default router;
