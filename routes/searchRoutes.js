import { Router } from 'express';

import { searchUsers } from '../controllers/searchController.js';
import tokenValidation from './../middlewares/tokenMiddleware.js';

const searchRouter = Router();

searchRouter.get('/search/:user', tokenValidation, searchUsers);

export default searchRouter;