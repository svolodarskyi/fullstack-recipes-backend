// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
//import routers

const router = Router();

//add here router.use();
router.use('api/auth', authRouter);

export default router;
