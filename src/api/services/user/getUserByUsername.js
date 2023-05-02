import User from '@/src/api/services/user/data/User';
import { httpError } from '@/middlewares/HttpError';

export const getUserByUsername = async ({ username }) => {
  const user = await User.findOne({ username }, ' -_id -originalPassword -email -emailVerified');

  if (!user) {
    throw httpError(404, 'Username does not exist');
  }

  return user;
};
