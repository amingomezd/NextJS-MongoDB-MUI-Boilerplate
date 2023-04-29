import bcrypt from 'bcryptjs';
import normalizeEmail from 'validator/lib/normalizeEmail';
import User from './data/User';

export async function findUserWithEmailAndPassword(email, password) {
  email = normalizeEmail(email);

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.originalPassword))) {
    user.originalPassword = undefined;
    return user;
  }

  return null;
}

export async function findUserForAuth(userId) {
  return User.findById(userId, '-originalPassword -__v');
}

export async function findUserByUsername(username) {
  return User.findOne({ username }, '-originalPassword -email -emailVerified');
}

export async function findUserByEmail(email) {
  email = normalizeEmail(email);
  return User.findOne({ email }, '-originalPassword -email -emailVerified');
}

export async function updateUserById(id, data) {
  const user = await User.findById(id, '-id -originalPassword');

  if (data.username) user.username = data.username;
  if (data.name) user.name = data.name;
  if (data.bio) user.bio = data.bio;
  if (data.profilePicture) user.profilePicture = data.profilePicture;
  if (data.emailVerified) user.emailVerified = data.emailVerified;

  await user.save();
  return user;
}
