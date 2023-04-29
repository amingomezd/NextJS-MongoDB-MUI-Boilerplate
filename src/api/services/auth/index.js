import User from '@/src/api/services/user/data/User';
import bcrypt from 'bcryptjs';

export { default as passport } from './passport';

export const updateUserPasswordByOldPassword = async (id, oldPassword, newPassword) => {
  const user = await User.findById(id);
  if (!user) return false;
  const matched = await bcrypt.compare(oldPassword, user.originalPassword);
  if (!matched) return false;
  user.originalPassword = await bcrypt.hash(newPassword, 10);

  await user.save();
  return true;
};

export const UNSAFE_updateUserPassword = async (id, newPassword) => {
  const user = await User.findById(id);
  if (!user) return false;
  user.originalPassword = await bcrypt.hash(newPassword, 10);
  await user.save();
};
