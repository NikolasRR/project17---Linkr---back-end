import {Router} from 'express';

import { postComment, getComments, countComments, isFollowing } from '../controllers/commentsController.js'
import tokenValidation from './../middlewares/tokenMiddleware.js';

const commeentsRouter = Router();

commeentsRouter.post("/comment", tokenValidation, postComment);
commeentsRouter.get("/comment/:id", tokenValidation, getComments);
commeentsRouter.get("/comment/count/:id", tokenValidation, countComments);
commeentsRouter.get("/comment/follow/:id", tokenValidation, isFollowing);

export default commeentsRouter;