import { Router } from 'express';
import * as controller from './ItemController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/item';
const router = Router();

// route
// get item

router.get('/', authMiddleware, requireLogin, paginationMiddleware({}), throwAsNext(controller.getItem));
// --- Create item ---
router.post('/', authMiddleware, requireLogin, throwAsNext(controller.createItem));
// registerSubrouter

// export
export default { path, router };
