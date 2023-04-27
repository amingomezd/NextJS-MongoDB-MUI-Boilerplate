import MongoStore from 'connect-mongo';
import nextSession from 'next-session';
import { promisifyStore } from 'next-session/lib/compat';
import dbConnect from '@/src/common/utils/dbConnect';

const client = dbConnect()
  .then((mongoClient) => mongoClient.connection.getClient())
  .catch((err) => console.log(err));

const mongoStore = MongoStore.create({
  clientPromise: client,
  stringify: false,
  autoRemove: 'interval',
  autoRemoveInterval: 10
});

const getSession = nextSession({
  store: promisifyStore(mongoStore),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
    path: '/',
    sameSite: 'strict'
  },
  touchAfter: 1 * 7 * 24 * 60 * 60 // 1 week
});

export default async function session(req, res, next) {
  await getSession(req, res);
  next();
}
