import { Router } from 'express';
import * as controller from './ShopController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/shop';
const router = Router();

// route
// get item

router.get('/', throwAsNext(controller.getShop));

router.put('/ads/:id', throwAsNext(controller.updateAds));

// export
export default { path, router };
