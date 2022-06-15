import {Router} from 'express';

import{getTrending} from './../controllers/hashTagsController.js';
import {tokenValidation} from './../middlewares/tokenMiddleware.js';

const hashTagsRouter = Router();

hashTagsRouter.get('/trending', tokenValidation, getTrending);

export default hashTagsRouter;