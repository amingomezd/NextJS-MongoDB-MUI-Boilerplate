import {
  findUserByEmail,
  findUserByUsername,
  UNSAFE_updateUserPassword,
  updateUserById,
  updateUserPasswordByOldPassword
} from '@/src/api/services/user';
import { slugUsername } from '@/src/common/utils';
import isEmail from 'validator/lib/isEmail';
import User from '../services/user/data/User';
import Token from '../services/token/data/Token';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { createToken, findAndDeleteTokenByIdAndType, findTokenByCreatorIdAndType } from '@/src/api/services/token';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/src/api/services/mail';

const getCurrentUser = async (req, res) => {
  const { publicUserData } = req.query;

  //   Get public data from user if the profile page is visited unauthenticated
  if (publicUserData) {
    const user = await findUserByUsername(publicUserData);
    return res.json(user);
  }

  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const username = slugUsername(req.body.username);

  if (!isEmail(email)) {
    return res.status(400).json({ error: { message: 'The email you entered is invalid.' } });
  }
  if (await findUserByEmail(email)) {
    return res.status(403).json({ error: { message: 'The email has already been used.' } });
  }
  if (await findUserByUsername(username)) {
    return res.status(403).json({ error: { message: 'The username has already been taken.' } });
  }

  const user = await User.create({
    email,
    originalPassword: await bcrypt.hash(password, 10),
    bio: '',
    name,
    username
  });

  req.logIn(user, (err) => {
    if (err) throw err;
    return res.status(201).json({
      user
    });
  });
};

const updateUserProfile = async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  if (process.env.CLOUDINARY_URL) {
    const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(process.env.CLOUDINARY_URL);

    cloudinary.config({
      cloud_name,
      api_key,
      api_secret
    });
  }

  let profilePicture;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill'
    });
    profilePicture = image.secure_url;
  }
  const { name, bio } = req.body;

  let username;

  if (req.body.username) {
    username = slugUsername(req.body.username);
    // TODO: this validation looks weird, refactor it later
    if (username !== req.user.username && (await findUserByUsername(username))) {
      return res.status(403).json({ error: { message: 'The username has already been taken.' } });
    }
  }

  const user = await updateUserById(req.user._id, {
    ...(username && { username }),
    ...(name && { name }),
    ...(typeof bio === 'string' && { bio }),
    ...(profilePicture && { profilePicture })
  });

  return res.json({ user });
};

const updateUserPassword = async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const { oldPassword, newPassword } = req.body;

  const success = await updateUserPasswordByOldPassword(req.user._id, oldPassword, newPassword);

  if (!success) {
    return res.status(401).json({
      error: { message: 'The old password you entered is incorrect.' }
    });
  }

  return res.status(204).end();
};

const sendPasswordResetEmail = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({
      error: { message: 'We couldn’t find that email. Please try again.' }
    });
  }

  let token = await Token.findOne({ creatorId: user._id });

  if (token && Date.now() > token.expireAt) {
    await token.deleteOne();
    token = null;
  }

  if (!token) {
    token = await createToken({
      creatorId: user._id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20)
    });
  }

  await sendMail({
    to: email,
    from: MAIL_CONFIG.from,
    subject: '[nextjs-mongodb-MUI-app] Reset your password.',
    html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href='${process.env.WEB_URI}/auth/forget-password/${token._id}'>this link</a> to reset your password.</p>
      </div>
      `
  });

  return res.status(204).end();
};

const sendVerificationEmail = async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  let token = await findTokenByCreatorIdAndType(req.user._id, 'emailVerify');

  if (token && Date.now() > token.expireAt) {
    await findAndDeleteTokenByIdAndType(token._id, 'emailVerify');
    token = null;
  }

  if (!token) {
    token = await createToken({
      creatorId: req.user._id,
      type: 'emailVerify',
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
    });
  }

  await sendMail({
    to: req.user.email,
    from: MAIL_CONFIG.from,
    subject: `Verification Email for ${process.env.WEB_URI}`,
    html: `
      <div>
        <p>Hello, ${req.user.name}</p>
        <p>Please follow <a href='${process.env.WEB_URI}/auth/verify-email/${token._id}'>this link</a> to confirm your email.</p>
      </div>
      `
  });

  return res.status(204).end();
};

const updatePasswordWithToken = async (req, res) => {
  const deletedToken = await findAndDeleteTokenByIdAndType(req.body.token, 'passwordReset');

  if (!deletedToken) {
    return res.status(403).end();
  }

  await UNSAFE_updateUserPassword(deletedToken.creatorId, req.body.password);
  return res.status(204).end();
};

const userController = {
  getCurrentUser,
  registerUser,
  updateUserProfile,
  updateUserPassword,
  sendPasswordResetEmail,
  updatePasswordWithToken,
  sendVerificationEmail
};

export default userController;
