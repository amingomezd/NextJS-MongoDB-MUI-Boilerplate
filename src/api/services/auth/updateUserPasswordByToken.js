import User from '@/src/api/services/user/data/User';
import Token from '@/src/api/services/auth/data/Token';
import bcrypt from 'bcryptjs';

export const updateUserPasswordByToken = async ({ token, newPassword }) => {
  const deletedToken = await Token.findAndDeleteTokenByIdAndType(token, 'passwordReset');

  if (!deletedToken) {
    return { error: { message: 'Invalid token.', code: 403 } };
  }

  const user = await User.findById(deletedToken.creatorId);
  if (!user) return false;

  user.originalPassword = await bcrypt.hash(newPassword, 10);
  await user.save();
};
