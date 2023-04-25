import { passport } from '@/src/services/auth';
import { ncOpts } from '@/src/config/nc';
import { auths } from '@/middlewares';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

handler.delete(async (req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

export default handler;
