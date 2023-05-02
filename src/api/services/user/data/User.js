import mongoose from 'mongoose';
import userSchema from './UserSchema';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';

async function findUserWithEmailAndPassword(email, password) {
  email = normalizeEmail(email);

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.originalPassword))) {
    user.originalPassword = undefined;
    return user;
  }

  return null;
}

async function findUserForAuth(userId) {
  return User.findById(userId, '-originalPassword -__v');
}

async function findUserByUsername(username) {
  return User.findOne({ username }, '-originalPassword -email -emailVerified');
}

async function findUserByEmail(email) {
  email = normalizeEmail(email);
  return User.findOne({ email }, '-originalPassword -email -emailVerified');
}

async function updateUserById(id, data) {
  const user = await User.findById(id, '-id -originalPassword');

  if (data.username) user.username = data.username;
  if (data.name) user.name = data.name;
  if (data.bio) user.bio = data.bio;
  if (data.profilePicture) user.profilePicture = data.profilePicture;
  if (data.emailVerified) user.emailVerified = data.emailVerified;

  await user.save();
  return user;
}

userSchema.statics.findUserWithEmailAndPassword = findUserWithEmailAndPassword;
userSchema.statics.findUserForAuth = findUserForAuth;
userSchema.statics.findUserByUsername = findUserByUsername;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateUserById = updateUserById;

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
