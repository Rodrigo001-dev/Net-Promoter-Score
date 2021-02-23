import { Router } from 'express';

import createUser from './controllers/UserController/create';

const router = Router();

router.post("/users", createUser);

export { router };