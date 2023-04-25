import mongoose from 'mongoose';
import tokenSchema from './TokenSchema';

const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);

export default Token;
