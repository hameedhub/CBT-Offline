import { Router } from 'express';
import Controller from '../controller/questionController';
const router = Router();

router.post('/', Controller.addQuestion);


export default router;