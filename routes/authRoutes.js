import express from "express";

import { signIn } from "../controllers/authController.js";
import { signInDataVerification } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up");
authRouter.post("/sign-in", signInDataVerification, signIn);

export default authRouter;