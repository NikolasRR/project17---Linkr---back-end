import express from "express"
import  tokenValidation  from "../middlewares/tokenMiddleware.js"
import {getUserPublications , getFollowing, postFollower, deleteFollower} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.get("/user/:id",tokenValidation, getUserPublications )
userRouter.get("/user/get-follow/:id",tokenValidation, getFollowing )
userRouter.post("/user/follow/:id",tokenValidation, postFollower )
userRouter.delete("/user/unfollow/:id",tokenValidation, deleteFollower )

export default userRouter;