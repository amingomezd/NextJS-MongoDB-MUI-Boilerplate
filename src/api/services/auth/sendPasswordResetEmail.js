import normalizeEmail from 'validator/lib/normalizeEmail';
import User from '@/src/api/services/user/data/User';
import Token from '@/src/api/services/auth/data/Token';
import { sendMail } from '@/src/api/services/sendMail';
import { httpError } from '@/middlewares/HttpError';

export const sendPasswordResetEmail = async ({ userEmail }) => {
  const email = normalizeEmail(userEmail);
  const user = await User.findUserByEmail(email);

  if (!user) {
    throw httpError(400, 'We couldn’t find that email. Please try again.');
  }

  let token = await Token.findOne({ creatorId: user._id });

  if (token && Date.now() > token.expireAt) {
    await token.deleteOne();
    token = null;
  }

  if (!token) {
    token = await Token.createToken({
      creatorId: user._id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20)
    });
  }

  await sendMail({
    to: email,
    subject: '[nextjs-mongodb-MUI-app] Reset your password.',
    html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href='${process.env.WEB_URI}/auth/forget-password/${token._id}'>this link</a> to reset your password.</p>
      </div>
      `
  });
};
