import express from "express"
import { postPublication } from "./../controllers/postController.js"
import { publicationValidator } from "../middlewares/publicationMiddleware.js";
//import { tokenValidation } from "../middlewares/tokenMiddleware.js"

const postRouter = express.Router();

postRouter.post("/", publicationValidator, postPublication)

export default postRouter;