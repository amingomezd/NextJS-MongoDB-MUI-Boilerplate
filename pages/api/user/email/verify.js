import { createToken, findAndDeleteTokenByIdAndType, findTokenByCreatorIdAndType } from '@/src/services/token';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/src/services/mail';
import { auths } from '@/middlewares';
import { ncOpts } from '@/src/config/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(async (req, res) => {
  if (!req.user) {
    res.json(401).end();
    return;
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

  res.status(204).end();
});

export default handler;
