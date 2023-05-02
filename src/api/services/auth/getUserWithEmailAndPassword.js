import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import User from '@/src/api/services/user/data/User';

export const getUserWithEmailAndPassword = async (email, password) => {
  email = normalizeEmail(email);

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.originalPassword))) {
    user.originalPassword = undefined;
    return user;
  }

  return null;
};
