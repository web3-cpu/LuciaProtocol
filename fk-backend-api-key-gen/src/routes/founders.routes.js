import { Router } from "express";
import { 
  getFounders,
  createFounder
} from "../controllers/founders.controller.js";

const router = Router();

router.get("/", getFounders);
router.post("/", createFounder);
export default router;