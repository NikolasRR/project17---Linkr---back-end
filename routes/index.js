import { Router } from "express";

import authRouter from "./authRoutes.js";
import likesRouter from "./likesRoutes.js";

const router = Router();

router.use(authRouter);
router.use(likesRouter);

export default router;
