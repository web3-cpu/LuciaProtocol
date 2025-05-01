import { Router } from "express";
import {
  userData,
  pageView,
  conversion,
  buttonClick,
  wallet,
  init,
} from "../controllers/sdk.controller.js";

const router = Router();
router.post("/user", userData);
router.post("/page", pageView);
router.post("/conversion", conversion);
router.post("/click", buttonClick);
router.post("/wallet", wallet);
router.post("/init", init);

export default router;
