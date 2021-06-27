import { Router } from 'express';
import * as controller from './ShopController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/shop';
const router = Router();

// route
// get item
router.post('/follow', authMiddleware, requireLogin, throwAsNext(controller.followShop))
router.post('/unfollow', authMiddleware, requireLogin, throwAsNext(controller.unfollowShop))
router.get('/:id', authMiddleware, throwAsNext(controller.getShopInfo));
router.post('/review', authMiddleware, requireLogin, throwAsNext(controller.reviewShop));

// export
export default { path, router };
