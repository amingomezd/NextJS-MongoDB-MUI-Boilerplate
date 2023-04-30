import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import dbConnect from '@/src/common/utils/dbConnect';

export const withCleanDb = async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('invalid db connection / node environment!');
  }

  const mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  process.env.MONGODB_URI = mongo.getUri();
  await dbConnect();
  await mongoose.connection.db.dropDatabase();
};
