import { Router } from 'express';

import createUser from './controllers/UserController/create';

import createSurvey from './controllers/SurveysController/create';
import ListSurvey from './controllers/SurveysController/index';

const router = Router();

router.post("/users", createUser);

router.post("/surveys", createSurvey);
router.get("/surveys", ListSurvey);

export { router };