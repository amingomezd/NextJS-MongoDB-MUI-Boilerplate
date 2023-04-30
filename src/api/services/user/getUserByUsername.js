import User from '@/src/api/services/user/data/User';

export const getUserByUsername = async ({ username }) => {
  const user = await User.findUserByUsername(username);

  if (!user) {
    return { error: { message: 'Username does not exist.', code: 404 } };
  }

  return { user };
};
