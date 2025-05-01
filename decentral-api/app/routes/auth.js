const trimRequest = require("trim-request");
const authRouter = require("express").Router();
const authController = require("../controllers/auth");
const { authenticationMiddleWare } = require("../middleware/auth");

authRouter.get("/user", authenticationMiddleWare, authController.user);

authRouter.post(
	"/register",
	trimRequest.all,
	authController.register.validate,
	authController.register
);

authRouter.post(
	"/login",
	trimRequest.all,
	authController.login.validate,
	authController.login
);

authRouter.get(
	"/verify-email",
	trimRequest.all,
	authController.verifyEmail.validate,
	authController.verifyEmail
);

authRouter.post(
	"/resend-verification-token",
	trimRequest.all,
	authenticationMiddleWare,
	authController.resendVerificationToken
);

authRouter.post(
	"/forgot-password/verification",
	trimRequest.all,
	authController.passwordResetLink.validate,
	authController.passwordResetLink
);

// authRouter.post(
// 	"/forgot-password/reset-password",
// 	trimRequest.all,
// 	authController.resetPassword.validate,
// 	authController.resetPassword
// );

authRouter.post(
	"/forgot-password/email",
	trimRequest.all,
	authController.setTemporaryPassword.validate,
	authController.setTemporaryPassword
);

authRouter.patch(
	"/reset-password",
	trimRequest.all,
	authenticationMiddleWare,
	authController.resetPassword.validate,
	authController.resetPassword
);

authRouter.post(
	"/demo-request",
	trimRequest.all,
	authController.sendDemoRequest.validate,
	authController.sendDemoRequest
);
authRouter.get(
	"/free-templates",
	trimRequest.all,
	authenticationMiddleWare,
	authController.freeTemplates
);
authRouter.get(
	"/premium-templates",
	trimRequest.all,
	authenticationMiddleWare,
	authController.premiumTemplates
);

authRouter.delete(
	"/delete",
	authenticationMiddleWare,
    authController.delete
);

module.exports = authRouter;
