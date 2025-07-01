// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/ingredients', ingredientsRouter);

export default router;
