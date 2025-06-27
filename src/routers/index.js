// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
//import routers

const router = Router();

router.use('/auth', authRouter);

//add here router.use();

export default router;
