import { ncOpts } from '@/src/config/nc';
import { auths } from '@/middlewares';
import nc from 'next-connect';
import { findTokenByIdAndType } from '@/src/services/token';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const { token } = req.query;
  const tokenDoc = await findTokenByIdAndType(token, 'passwordReset');

  if (!tokenDoc) res.statusCode(404);

  return res.json({ token: tokenDoc._id, valid: !!tokenDoc });
});

export default handler;
