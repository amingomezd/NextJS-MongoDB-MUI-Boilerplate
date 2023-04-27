import { ncOpts } from '@/src/config/nc';
import { auths } from '@/middlewares';
import nc from 'next-connect';
import { updateUserById } from '@/src/services/user';
import { findAndDeleteTokenByIdAndType } from '@/src/services/token';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const { token } = req.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(token, 'emailVerify');
  if (!deletedToken) {
    return res.status(404).json(false);
  }

  await updateUserById(deletedToken.creatorId, { emailVerified: true });

  return res.json(true);
});

export default handler;
