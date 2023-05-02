import User from '@/src/api/services/user/data/User';
import { httpError } from '@/middlewares/HttpError';

export const getUserForAuth = async (userId) => {
  const user = await User.findById(userId, '-originalPassword -__v');

  if (!user) throw httpError(404, 'User not found');

  return user;
};
