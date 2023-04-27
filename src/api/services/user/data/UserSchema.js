import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  bio: String,
  profilePicture: { type: String, default: null },
  originalPassword: String
});

export default userSchema;
