import express from "express";
import { signInDataVerification } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up");
authRouter.post("/sign-in", signInDataVerification);

export default authRouter;