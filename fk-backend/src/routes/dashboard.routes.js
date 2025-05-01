import { Router } from "express";

import {
  distinctFingerprints,
  getPageViews,
  getConversions,
  getClicks,
  getCampaigns,
  getPages,
  getButtons,
  getEvents,
  timeSpanMiddleWare,
  getLinks,
  getUsers,
  getInfo,
  getMetricsData,
  getLink,
  setOnboardingInfo,
} from "../controllers/dashboard.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyAuth);

router.get("/pages", getPages);
router.get("/buttons", getButtons);
router.get("/events", getEvents);

router.route("/views").get(timeSpanMiddleWare, getPageViews);
router.route("/conversions").get(timeSpanMiddleWare, getConversions);
router.get("/clicks", timeSpanMiddleWare, getClicks);

router.get("/campaigns", getCampaigns);
router.get("/links", getLinks);
router.get("/links/:id", getLink);
router.get("/fingerprints", distinctFingerprints);
router.get("/users", getUsers);
router.get("/info", getInfo);
router.put("/info/onboarding", setOnboardingInfo);
router.get("/metrics/:type", getMetricsData);

export default router;
