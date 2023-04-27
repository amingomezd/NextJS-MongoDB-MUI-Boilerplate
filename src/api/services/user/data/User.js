import mongoose from 'mongoose';
import userSchema from './UserSchema';

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
