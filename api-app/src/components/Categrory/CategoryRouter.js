import { Router } from 'express';
import * as controller from './CategoryController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/category';
const router = Router();

// route
// get item

router.get('/', throwAsNext(controller.getCategory));

router.get('/popular', throwAsNext(controller.getPopularCategory));

router.get('/shop/:id', throwAsNext(controller.getShopCategory));
// export
export default { path, router };
