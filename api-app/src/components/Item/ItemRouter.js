import { Router } from 'express';
import * as controller from './ItemController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/item';
const router = Router();

// route
// get item

router.get('/', paginationMiddleware({ filterKeys: ['category', 'shop_id']}), throwAsNext(controller.getItem));

router.get('/:id', throwAsNext(controller.getItemDetail));

// export
export default { path, router };
