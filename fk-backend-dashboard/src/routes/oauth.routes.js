import { Router } from "express";

import {
  googleLogin,
  googleSignup,
  companySignup,
  companyLogin,
  forgotPassword,
  verifyForgotPasswordOTP,
} from "../controllers/oauth.controller.js";

const router = Router();

router.get("/google-login", googleLogin);
router.get("/google-signup", googleSignup);
// router.get("/", googleSignup);
// router.get("/", googleLogin);

router.post("/signup", companySignup);
router.post("/login", companyLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgotpw", verifyForgotPasswordOTP);

export default router;
