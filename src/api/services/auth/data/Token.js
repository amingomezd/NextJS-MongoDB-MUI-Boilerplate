import mongoose from 'mongoose';
import tokenSchema from './TokenSchema';
import { nanoid } from 'nanoid';

function findTokenByIdAndType(id, type) {
  return Token.findOne({
    _id: id,
    type
  });
}

function findTokenByCreatorIdAndType(id, type) {
  return Token.findOne({
    creatorId: id,
    type
  });
}

function findAndDeleteTokenByIdAndType(id, type) {
  return Token.findOneAndRemove({ _id: id, type });
}

function createToken({ creatorId, type, expireAt }) {
  const securedTokenId = nanoid(32);
  const token = {
    _id: securedTokenId,
    creatorId,
    type,
    expireAt
  };
  return Token.create(token);
}

tokenSchema.statics.findTokenByIdAndType = findTokenByIdAndType;
tokenSchema.statics.findTokenByCreatorIdAndType = findTokenByCreatorIdAndType;
tokenSchema.statics.findAndDeleteTokenByIdAndType = findAndDeleteTokenByIdAndType;
tokenSchema.statics.createToken = createToken;

const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);

export default Token;
