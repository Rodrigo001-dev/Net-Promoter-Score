import { Router } from 'express';

import createUser from './controllers/UserController/create';

import createSurvey from './controllers/SurveysController/create';
import listSurvey from './controllers/SurveysController/index';

import sendMail from './controllers/SendMailController/execute';

const router = Router();

router.post("/users", createUser);

router.post("/surveys", createSurvey);
router.get("/surveys", listSurvey);

router.post("/sendMail", sendMail);

export { router };