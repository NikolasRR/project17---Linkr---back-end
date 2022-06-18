import { Router } from "express";

import { likePost, deslikePost, countLikes, getLikes, getLikesById } from "../controllers/likesController.js";
import  tokenValidation  from "../middlewares/tokenMiddleware.js"

const likesRouter = Router();

likesRouter.post("/like", tokenValidation, likePost);
likesRouter.delete("/like/:id", tokenValidation, deslikePost);
likesRouter.get("/like/count/:id", tokenValidation, countLikes);
likesRouter.get("/like/get",tokenValidation, getLikes);
likesRouter.get("/like/get/:id", tokenValidation, getLikesById);

export default likesRouter;
