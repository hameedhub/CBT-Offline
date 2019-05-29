import { Router } from 'express';
import Controller from '../controller/sessionController';
import Helper from '../helper/tokenValidator';
const router = Router();


router.post('/:date', Controller.login);
router.post('/:date/question/:num', Helper.checkToken, Controller.answerQuestion);
router.get('/:date/question/:num', Helper.checkToken, Controller.getQuestionByNum);

export default router;