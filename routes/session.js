import { Router } from 'express';
import Controller from '../controller/sessionController';
const router = Router();

router.post('/:date', Controller.login);

export default router;