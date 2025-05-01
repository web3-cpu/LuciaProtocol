import { Router } from "express";
import { 
  getSecurities,
  createSecurity
} from "../controllers/securities.controller.js";

const router = Router();

router.get("/", getSecurities);
router.post("/", createSecurity);
export default router;