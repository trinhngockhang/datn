import { Router } from 'express';
import * as controller from './OrderController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/order';
const router = Router();

// route
// get item

router.get('/shop/:id', throwAsNext(controller.getShopInfo));
router.get('/', authMiddleware, requireLogin, throwAsNext(controller.getOrders));
router.post('/', authMiddleware, requireLogin, throwAsNext(controller.createOrder));

// export
export default { path, router };
