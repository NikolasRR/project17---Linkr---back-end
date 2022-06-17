import express from "express"
import { postPublication, getPublications} from "./../controllers/postController.js"
import { publicationValidator } from "../middlewares/publicationMiddleware.js";
import  tokenValidation  from "../middlewares/tokenMiddleware.js"

const postRouter = express.Router();

postRouter.post("/timeline",tokenValidation, publicationValidator, postPublication)
postRouter.get("/timeline",tokenValidation, getPublications )

export default postRouter;
