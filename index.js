import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(json());

app.use(authRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Mode: ${process.env.MODE || "DEV"}`));
  console.log(chalk.bold.blue(`Server is up on port: ${port}`));
});