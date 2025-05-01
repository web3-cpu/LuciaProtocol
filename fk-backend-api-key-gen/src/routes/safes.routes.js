import { Router } from "express";
import { 
  getSafes,
  createSafe,
  stackDilution
} from "../controllers/safes.controller.js";

const router = Router();

router.get("/", getSafes);
router.post("/", createSafe);

// must be post because need to encrypt/encode query parameters
router.post("/calculator/stack",stackDilution);
export default router;