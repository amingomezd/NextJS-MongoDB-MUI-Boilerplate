import Token from '@/src/api/services/auth/data/Token';
import User from '@/src/api/services/user/data/User';
import { httpError } from '@/middlewares/HttpError';

export const verifyEmailByToken = async ({ token }) => {
  const deletedToken = await Token.findAndDeleteTokenByIdAndType(token, 'emailVerify');

  if (!deletedToken) {
    throw httpError(404, 'Invalid Token, please try again');
  }

  await User.updateUserById(deletedToken.creatorId, { emailVerified: true });
};
