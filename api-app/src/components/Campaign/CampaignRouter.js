import { Router } from 'express';
import * as controller from './CampaignController';
import { throwAsNext, authMiddleware, requireLogin, paginationMiddleware } from '../../middleware';

const path = '/campaign';
const router = Router();

// route
// get item

router.get('/:id', throwAsNext(controller.getCampaign));

// export
export default { path, router };
