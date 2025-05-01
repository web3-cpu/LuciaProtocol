import { Router } from "express";
import {
  userData,
  pageView,
  conversion,
  buttonClick,
} from "../controllers/sdk.controller.js";
import {
  distinctFingerprints,
  getPageViews,
  getConversions,
  getClicks,
} from "../controllers/dashboard.controller.js";

const router = Router();
router.post("/user", userData);
router.post("/page", pageView);
router.post("/conversion", conversion);
router.post("/click", buttonClick);
router.get("/fingerprints", distinctFingerprints);
router.get("/pages", getPageViews);
router.get("/conversions", getConversions);
router.get("/clicks", getClicks);

export default router;
