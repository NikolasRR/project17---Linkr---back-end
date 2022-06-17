import { Router } from "express";

import { likePost, deslikePost, countLikes, getLikes } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.post("/like", likePost);
likesRouter.delete("/like", deslikePost);
likesRouter.get("/like", countLikes);
likesRouter.get("/like/get", getLikes);


export default likesRouter;
