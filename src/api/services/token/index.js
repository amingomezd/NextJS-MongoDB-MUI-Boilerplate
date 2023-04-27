import { nanoid } from 'nanoid';
import Token from './data/Token';

export function findTokenByIdAndType(id, type) {
  return Token.findOne({
    _id: id,
    type
  });
}

export function findTokenByCreatorIdAndType(id, type) {
  return Token.findOne({
    creatorId: id,
    type
  });
}

export function findAndDeleteTokenByIdAndType(id, type) {
  return Token.findOneAndRemove({ _id: id, type });
}

export function createToken({ creatorId, type, expireAt }) {
  const securedTokenId = nanoid(32);
  const token = {
    _id: securedTokenId,
    creatorId,
    type,
    expireAt
  };
  return Token.create(token);
}
