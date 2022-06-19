import express from "express";

import { signIn, signUp, sessionValidation, logout } from "../controllers/authController.js";
import { signInDataVerification, validateSignUp } from "../middlewares/authMiddleware.js";
import tokenValidation from "../middlewares/tokenMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/sign-in", signInDataVerification, signIn);
authRouter.get("/session", tokenValidation, sessionValidation);
authRouter.get("/logout", tokenValidation, logout);

export default authRouter;