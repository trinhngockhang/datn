import { Router } from 'express';
import * as controller from './OrderController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/order';
const router = Router();

// route
// get item

router.get('/', authMiddleware, requireLogin, paginationMiddleware({}), throwAsNext(controller.getOrder));

router.get('/statistic', authMiddleware, requireLogin, paginationMiddleware({}), throwAsNext(controller.getStatistic));

router.put('/', authMiddleware, requireLogin, throwAsNext(controller.updateOrder))
// export
export default { path, router };
