import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import Users from '../../db/models/auth/user.auth.js';

export const registerUser = async (payload) => {
  const existingUser = await Users.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};
