import Session from "../../db/models/auth/session.auth.js";
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../../constants/index.js';
const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    const session = await Session.findOne({
        _id: sessionId,
        refreshToken,
    });
    if (!session) {
        throw createHttpError(401, 'Session not found');
    }
    const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired');
    }
    const newSession = createSession();

    await Session.deleteOne({ _id: sessionId, refreshToken });

    return await Session.create({
        userId: session.userId,
        ...newSession,
    });
};