import { STATUSES, STATUS_CODES } from '../../utility/constants';

const authMiddleware = async (req, _res, next) => {
  try {
    const xAuthToken = 'x-auth-token';
    if (!req.headers[xAuthToken]) {
      return errorHandler(next);
    }
    if (req.headers[xAuthToken] !== process.env.SECRET) {
      return errorHandler(next);
    }
    return next();
  } catch (error) {
    return errorHandler(next);
  }
};

const errorHandler = (next) =>
  next({
    message: STATUSES.unauthorized,
    status: STATUS_CODES[STATUSES.unauthorized],
  });

export { authMiddleware };
