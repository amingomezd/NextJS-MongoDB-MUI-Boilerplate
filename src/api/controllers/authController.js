import { verifyEmailByToken } from '@/src/api/services/auth/verifyEmailByToken';
import { sendVerificationEmailWithToken } from '@/src/api/services/auth/sendVerificationEmailWithToken';
import { sendPasswordResetEmail } from '@/src/api/services/auth/sendPasswordResetEmail';
import { updateUserPasswordByOldPassword } from '@/src/api/services/auth/updateUserPasswordByOldPassword';
import { updateUserPasswordByToken } from '@/src/api/services/auth/updateUserPasswordByToken';
import { getPasswordResetToken } from '@/src/api/services/auth/getPasswordResetToken';

export const getAuthenticatedUser = (req, res) => {
  return res.json({ user: req.user });
};

export const logout = async (req, res) => {
  await req.session.destroy();
  return res.status(204).end();
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const result = await verifyEmailByToken({ token });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });
  return res.json(true);
};

export const sendVerificationEmail = async (req, res) => {
  const { _id, email, name } = req.user;

  await sendVerificationEmailWithToken({ userId: _id, email, name });

  return res.status(204).end();
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const result = await sendPasswordResetEmail({ userEmail: email });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });
  return res.status(204).end();
};

export const resetPasswordWithToken = async (req, res) => {
  const { token, password } = req.body;

  const result = updateUserPasswordByToken({ token, newPassword: password });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });
  return res.status(204).end();
};

export const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.query;

  const result = await getPasswordResetToken({ token });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });
  return res.json({ token: result.tokenDoc._id, valid: !!result.tokenDoc });
};

export const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const result = await updateUserPasswordByOldPassword({ id: req.user._id, oldPassword, newPassword });

  if (result?.error) return res.status(result.error.code).send({ error: result.error.message });
  return res.status(204).end();
};
