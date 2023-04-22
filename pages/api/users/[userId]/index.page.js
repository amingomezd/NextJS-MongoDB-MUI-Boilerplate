import { getMongoDb } from '@/src/services/mongodb';
import { ncOpts } from '@/src/config/nc';
import nc from 'next-connect';
import { findUserById } from '@/src/services/user';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();
  const user = await findUserById(db, req.query.userId);
  res.json({ user });
});

export default handler;
