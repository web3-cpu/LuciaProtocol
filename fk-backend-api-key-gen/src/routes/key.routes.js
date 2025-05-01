import { Router } from "express";
import { generateKey, authenticateKey } from "../controllers/key.controller.js";

const router = Router();

router.post('/',generateKey);
router.post('/auth',authenticateKey);

export default router;