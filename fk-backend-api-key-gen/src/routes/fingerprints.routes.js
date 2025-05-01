import { Router } from "express";
import { 
  getFingerprints,
  createFingerprint
} from "../controllers/fingerprints.controller.js";

const router = Router();

router.get("/", getFingerprints);
router.post("/", createFingerprint);
export default router;