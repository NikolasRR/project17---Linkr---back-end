import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

import authRouter from "./routes/authRoutes.js";
import hashTagsRouter from "./routes/hashTagsRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
// app.use(router);
app.use(hashTagsRouter);

app.use(authRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Mode: ${process.env.MODE || "DEV"}`));
  console.log(chalk.bold.blue(`Server is up on port: ${port}`));
});