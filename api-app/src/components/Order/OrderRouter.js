import { Router } from 'express';
import * as controller from './OrderController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/order';
const router = Router();

// route
// get item

router.post('/', throwAsNext(controller.createOrder));

// export
export default { path, router };
