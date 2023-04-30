import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    creatorId: mongoose.ObjectId,
    type: String,
    expireAt: Date
  },
  {
    _id: false
  }
);

export default tokenSchema;
