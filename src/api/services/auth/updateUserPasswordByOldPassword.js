import User from '@/src/api/services/user/data/User';
import bcrypt from 'bcryptjs';
import { httpError } from '@/middlewares/HttpError';

export const updateUserPasswordByOldPassword = async ({ id, oldPassword, newPassword }) => {
  const user = await User.findById(id);
  if (!user) {
    throw httpError(401, 'The id of the user is invalid.');
  }

  const matched = await bcrypt.compare(oldPassword, user.originalPassword);
  if (!matched) {
    throw httpError(401, 'The old password you entered is incorrect.');
  }

  user.originalPassword = await bcrypt.hash(newPassword, 10);
  await user.save();
};
