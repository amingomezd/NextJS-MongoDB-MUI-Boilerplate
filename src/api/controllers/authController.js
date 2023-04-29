import {
  createToken,
  findAndDeleteTokenByIdAndType,
  findTokenByCreatorIdAndType,
  findTokenByIdAndType
} from '@/src/api/services/token';
import { UNSAFE_updateUserPassword, updateUserPasswordByOldPassword } from '@/src/api/services/auth';
import { findUserByEmail, updateUserById } from '@/src/api/services/user';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/src/api/services/mail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import Token from '@/src/api/services/token/data/Token';

export const getAuthenticatedUser = (req, res) => {
  return res.json({ user: req.user });
};

export const verifyEmailByToken = async (req, res) => {
  const { token } = req.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(token, 'emailVerify');
  if (!deletedToken) {
    return res.status(404).json(false);
  }

  await updateUserById(deletedToken.creatorId, { emailVerified: true });

  return res.json(true);
};

export const sendVerificationEmail = async (req, res) => {
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

export const sendPasswordResetEmail = async (req, res) => {
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

export const updateUserPassword = async (req, res) => {
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

export const updatePasswordWithToken = async (req, res) => {
  const deletedToken = await findAndDeleteTokenByIdAndType(req.body.token, 'passwordReset');

  if (!deletedToken) {
    return res.status(403).end();
  }

  await UNSAFE_updateUserPassword(deletedToken.creatorId, req.body.password);
  return res.status(204).end();
};

export const checkPasswordResetTokenValidity = async (req, res) => {
  const { token } = req.query;
  const tokenDoc = await findTokenByIdAndType(token, 'passwordReset');

  if (!tokenDoc) {
    return res.status(404).send({ error: 'Invalid Token' });
  }

  return res.json({ token: tokenDoc._id, valid: !!tokenDoc });
};

export const logout = async (req, res) => {
  await req.session.destroy();
  return res.status(204).end();
};
