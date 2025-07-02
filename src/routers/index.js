// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
import recipesRouter from './recipes.js';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/recipes', recipesRouter);

export default router;
