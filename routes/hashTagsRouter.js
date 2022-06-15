import {Router} from 'express';

import{getTrending} from './../controllers/hashTagsController.js';

const hashTagsRouter = Router();

hashTagsRouter.get('/trending', getTrending);

export default hashTagsRouter;