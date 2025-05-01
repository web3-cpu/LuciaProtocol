import { Router } from "express";
import { link, campaign } from "../controllers/link.controller.js";
import { redirect } from "../controllers/redirect.controller.js";

const router = Router();
router.post("/genlink", link);
router.post("/campaign", campaign);
router.post("/redirect", redirect);

export default router;
