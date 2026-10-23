import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import * as authController from '../controllers/auth.controller.js';
import registerValidation from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, asyncHandler(authController.register));
authRouter.post("/login", asyncHandler(authController.login));
authRouter.get("/logout", asyncHandler(authController.logout));
authRouter.get("/me", identifyUser, asyncHandler(authController.getMe));
authRouter.get("/verify-email", asyncHandler(authController.verifyEmail));
authRouter.get("/resend-email", asyncHandler(authController.resendEmail));

export default authRouter;