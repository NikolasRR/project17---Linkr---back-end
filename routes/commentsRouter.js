import {Router} from 'express';

import { postComment, getComments, countComments } from '../controllers/commentsController.js'
import tokenValidation from './../middlewares/tokenMiddleware.js';

const commeentsRouter = Router();

commeentsRouter.post("/comment", tokenValidation, postComment);
commeentsRouter.get("/comment/:id", tokenValidation, getComments);
commeentsRouter.get("/comment/count/:id", tokenValidation, countComments);
commeentsRouter.get("/comment/follow/:id", tokenValidation, countComments);

export default commeentsRouter;