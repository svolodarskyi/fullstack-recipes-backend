import { ONE_DAY } from '../../constants/index.js';
import { loginUser } from '../../services/auth/login.js';

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  // Отримуємо user після логіну
  const user = session.user || req.user || null;
  // Якщо user не повертається із сервісу, потрібно отримати його вручну
  let userData = user;
  if (!userData) {
    // Імпортуємо модель User
    const User = (await import('../../db/models/auth/user.js')).default;
    userData = await User.findById(session.userId).select('_id name email');
  }
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      user: userData,
    },
  });
};
