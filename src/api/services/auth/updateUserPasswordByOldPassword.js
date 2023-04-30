import User from '@/src/api/services/user/data/User';
import bcrypt from 'bcryptjs';

export const updateUserPasswordByOldPassword = async ({ id, oldPassword, newPassword }) => {
  const user = await User.findById(id);
  if (!user) {
    return { error: { message: 'The id of the user is invalid.', code: 401 } };
  }

  const matched = await bcrypt.compare(oldPassword, user.originalPassword);
  if (!matched) {
    return { error: { message: 'The old password you entered is incorrect.', code: 401 } };
  }

  user.originalPassword = await bcrypt.hash(newPassword, 10);
  await user.save();
};
