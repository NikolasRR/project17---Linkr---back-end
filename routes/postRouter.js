import express from "express"
import { postPublication, getPublications, deletePost, editPost, newPostsVerifier} from "./../controllers/postController.js"
import { postDeletionValidator, publicationValidator } from "../middlewares/publicationMiddleware.js";
import  tokenValidation  from "../middlewares/tokenMiddleware.js"
import {getRepublications, postResposts} from "./../controllers/repostController.js"

const postRouter = express.Router();


postRouter.get("/timeline",tokenValidation, getPublications);
postRouter.get("/newposts", tokenValidation, newPostsVerifier);
postRouter.post("/timeline",tokenValidation, publicationValidator, postPublication);
postRouter.delete("/post", tokenValidation, postDeletionValidator, deletePost);
postRouter.put("/post", tokenValidation, editPost);
postRouter.get("/reposts/:id",tokenValidation, getRepublications)
postRouter.post("/reposts", tokenValidation, postResposts)
export default postRouter;
