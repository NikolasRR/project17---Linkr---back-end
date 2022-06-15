import express from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { signInDataVerification, validateSignUp } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/sign-in", signInDataVerification, signIn);

export default authRouter;