import { Router } from 'express';
import Controller from '../controller/configController';
const router = Router();

/* route */
router.post('/start', Controller.login);

export default router;
