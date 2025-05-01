import { Router } from "express";
import { 
  getSafes,
  createSafe
} from "../controllers/safes.controller.js";

const router = Router();

router.get("/", getSafes);
router.post("/", createSafe);
export default router;