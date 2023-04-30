import Token from '@/src/api/services/auth/data/Token';
import User from '@/src/api/services/user/data/User';

export const verifyEmailByToken = async ({ token }) => {
  const deletedToken = await Token.findAndDeleteTokenByIdAndType(token, 'emailVerify');

  if (!deletedToken) {
    return { error: { message: 'Invalid Token, please try again', code: 404 } };
  }

  await User.updateUserById(deletedToken.creatorId, { emailVerified: true });
};
