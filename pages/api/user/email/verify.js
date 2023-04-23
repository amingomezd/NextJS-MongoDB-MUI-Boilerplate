import { createToken } from '@/src/services/auth/token';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/src/services/mail';
import { auths } from 'middlewares';
import { getMongoDb } from '@/src/services/mongodb';
import { ncOpts } from '@/src/config/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(async (req, res) => {
  if (!req.user) {
    res.json(401).end();
    return;
  }

  const db = await getMongoDb();

  const token = await createToken(db, {
    creatorId: req.user._id,
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
  });

  await sendMail({
    to: req.user.email,
    from: MAIL_CONFIG.from,
    subject: `Verification Email for ${process.env.WEB_URI}`,
    html: `
      <div>
        <p>Hello, ${req.user.name}</p>
        <p>Please follow <a href='${process.env.WEB_URI}/verify-email/${token._id}'>this link</a> to confirm your email.</p>
      </div>
      `
  });

  res.status(204).end();
});

export default handler;
