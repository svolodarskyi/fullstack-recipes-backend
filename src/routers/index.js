// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
//import routers

const router = Router();

//add here router.use();
router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);

export default router;
