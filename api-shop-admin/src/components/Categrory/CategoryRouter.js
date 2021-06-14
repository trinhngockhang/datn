import { Router } from 'express';
import * as controller from './CategoryController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/category';
const router = Router();

// route
// get item

router.get('/', throwAsNext(controller.getCategory));

router.get('/:id', throwAsNext(controller.getListSubCategory));

// export
export default { path, router };
