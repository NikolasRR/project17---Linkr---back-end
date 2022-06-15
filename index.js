import express, {json} from "express";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

// import router from "./routes/index.js";
import hashTagsRouter from "./routes/hashTagsRouter.js";
const app = express();

app.use(json());
app.use(cors());
// app.use(router);
app.use(hashTagsRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(`Server is up on port: ${port}`);
});