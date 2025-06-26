import { registerUser } from '../../services/auth/user.auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const { password, ...safeUser } = user._doc;

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: safeUser,
  });
};
