import {Router} from 'express';

import{getTrending, getPostsByHashTag} from './../controllers/hashTagsController.js';
import tokenValidation from './../middlewares/tokenMiddleware.js';

const hashTagsRouter = Router();

hashTagsRouter.get('/trending', tokenValidation, getTrending);
hashTagsRouter.get('/hashtag/:hashtag', tokenValidation, getPostsByHashTag);
export default hashTagsRouter;