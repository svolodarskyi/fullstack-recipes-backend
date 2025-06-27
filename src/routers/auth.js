import { Router } from 'express';
import {validateBody} from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController } from "../controllers/auth/login.auth.js";
import { registerUserController } from '../controllers/auth/register.auth.js';
import { refreshUserSessionController } from '../controllers/auth/refresh.auth.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);








authRouter.post("/login", validateBody(loginSchema), ctrlWrapper(loginUserController),
);
authRouter.post("/refresh", ctrlWrapper(refreshUserSessionController));
export default authRouter;
