import { refreshUsersSession } from '../../services/auth/sessions.auth.js';
import { ONE_DAY } from '../../constants/index.js';

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie("sessionId", session._is, {
        httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    });
};
export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });
    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};