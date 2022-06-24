import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRouter.js"
import hashTagsRouter from "./routes/hashTagsRouter.js"
import likesRouter from "./routes/likesRoutes.js"
import userRouter from "./routes/userRouter.js"
import searchRouter from "./routes/searchRoutes.js"
import commeentsRouter from "./routes/commentsRouter.js"

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://project17-linkedir-front-jkbk9md0o-nikolasrr.vercel.app"] }));
app.use(json());

app.use(hashTagsRouter);
app.use(authRouter);
app.use(postRouter);
app.use(likesRouter);
app.use(userRouter);
app.use(searchRouter);
app.use(commeentsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Mode: ${process.env.MODE || "DEV"}`));
  console.log(chalk.bold.blue(`Server is up on port: ${port}`));
});