import { Router } from 'express';
import Controller from '../controller/questionController';
const router = Router();

router.post('/', Controller.addQuestion);
router.post('/view', Controller.viewQuestion);

export default router;