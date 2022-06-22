import express from "express"
import { postPublication, getPublications, deletePost, editPost} from "./../controllers/postController.js"
import { postDeletionValidator, publicationValidator } from "../middlewares/publicationMiddleware.js";
import  tokenValidation  from "../middlewares/tokenMiddleware.js"
import {getRepublications} from "./../controllers/repostController.js"

const postRouter = express.Router();

postRouter.post("/timeline",tokenValidation, publicationValidator, postPublication);
postRouter.get("/timeline",tokenValidation, getPublications);
postRouter.delete("/post", tokenValidation, postDeletionValidator, deletePost);
postRouter.put("/post", tokenValidation, editPost);
postRouter.get("/reposts/:id", getRepublications)

export default postRouter;
