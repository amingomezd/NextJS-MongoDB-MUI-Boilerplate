import { findAndDeleteTokenByIdAndType, findTokenByIdAndType } from '@/src/api/services/token';
import { updateUserById } from '@/src/api/services/user';

const getAuthenticatedUser = (req, res) => {
  return res.json({ user: req.user });
};
const verifyEmailByToken = async (req, res) => {
  const { token } = req.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(token, 'emailVerify');
  if (!deletedToken) {
    return res.status(404).json(false);
  }

  await updateUserById(deletedToken.creatorId, { emailVerified: true });

  return res.json(true);
};

const checkPasswordResetTokenValidity = async (req, res) => {
  const { token } = req.query;
  const tokenDoc = await findTokenByIdAndType(token, 'passwordReset');

  if (!tokenDoc) {
    return res.status(404).send({ error: 'Invalid Token' });
  }

  return res.json({ token: tokenDoc._id, valid: !!tokenDoc });
};

const logout = async (req, res) => {
  await req.session.destroy();
  return res.status(204).end();
};

const authController = { getAuthenticatedUser, verifyEmailByToken, checkPasswordResetTokenValidity, logout };

export default authController;
