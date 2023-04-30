import Token from '@/src/api/services/auth/data/Token';
import { sendMail } from '@/src/api/services/sendMail';

export const sendVerificationEmailWithToken = async ({ userId, email, name }) => {
  let token = await Token.findTokenByCreatorIdAndType(userId, 'emailVerify');

  if (token && Date.now() > token.expireAt) {
    await Token.findAndDeleteTokenByIdAndType(token._id, 'emailVerify');
    token = null;
  }

  if (!token) {
    token = await Token.createToken({
      creatorId: userId,
      type: 'emailVerify',
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
    });
  }

  await sendMail({
    to: email,
    subject: `Verification Email for ${process.env.WEB_URI}`,
    html: `
      <div>
        <p>Hello, ${name}</p>
        <p>Please follow <a href='${process.env.WEB_URI}/auth/verify-email/${token._id}'>this link</a> to confirm your email.</p>
      </div>
      `
  });
};
