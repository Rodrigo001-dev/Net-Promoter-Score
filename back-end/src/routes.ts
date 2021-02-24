import { Router } from 'express';

import createUser from './controllers/UserController/create';

import createSurvey from './controllers/SurveysController/create';

const router = Router();

router.post("/users", createUser);

router.post("/surveys", createSurvey);

export { router };