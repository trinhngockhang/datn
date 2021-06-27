import { Router } from 'express';
import * as controller from './ItemController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/item';
const router = Router();

// route
// get item

router.get('/', authMiddleware, paginationMiddleware({ filterKeys: ['category', 'shop_id', 'id_exist']}), throwAsNext(controller.getItem));

router.post('/model', throwAsNext(controller.getItemModelByVarian));

router.post('/review', authMiddleware, requireLogin, throwAsNext(controller.reviewItem));
router.get('/review', throwAsNext(controller.getItemReview));


router.get('/:id', throwAsNext(controller.getItemDetail));

// export
export default { path, router };
