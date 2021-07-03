import { Router } from 'express';
import * as controller from './ItemController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/item';
const router = Router();

// route
// get item

router.get('/', authMiddleware, requireLogin, paginationMiddleware({}), throwAsNext(controller.getItem));

router.get('/shop-name', authMiddleware, requireLogin, paginationMiddleware({}), throwAsNext(controller.getMyName));
// --- Create item ---
router.post('/', authMiddleware, requireLogin, throwAsNext(controller.createItem));


router.put('/profile', authMiddleware, requireLogin, throwAsNext(controller.updateProfile));

router.put('/avatar', authMiddleware, requireLogin, throwAsNext(controller.updateAvatar));

router.put('/advertise', authMiddleware, requireLogin, throwAsNext(controller.updateAdvertise));


router.put('/:id', authMiddleware, requireLogin, throwAsNext(controller.updateItem));
// registerSubrouter

// export
export default { path, router };
