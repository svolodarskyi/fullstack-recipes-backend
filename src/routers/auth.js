import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validation/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const authRouter = Router();

export default authRouter;
