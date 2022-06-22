import express from "express"
import  tokenValidation  from "../middlewares/tokenMiddleware.js"
import {getUserPublications} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.get("/user/:id", tokenValidation, getUserPublications )

export default userRouter;