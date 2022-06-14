import express from "express";

const authRoute = express.Router();

authRoute.post("/sign-up");
authRoute.post("/sign-in");

export default authRoute;