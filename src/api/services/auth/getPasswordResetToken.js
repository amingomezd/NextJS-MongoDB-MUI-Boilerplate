import Token from '@/src/api/services/auth/data/Token';
import { httpError } from '@/middlewares/HttpError';

export const getPasswordResetToken = async ({ token }) => {
  const tokenDoc = await Token.findTokenByIdAndType(token, 'passwordReset');

  if (!tokenDoc) {
    throw httpError(404, 'Invalid Token.');
  }

  return tokenDoc;
};
