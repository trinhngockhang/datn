import { Router } from 'express';
import * as controller from './AuthController';
import { loginValidator } from './validator';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/auth';
const router = Router();

// route
// --- Get Me ---
router.get('/getme', authMiddleware, requireLogin, throwAsNext(controller.getMe));
// --- Login ---
router.post('/login', loginValidator, throwAsNext(controller.login));


// export
export default { path, router };
