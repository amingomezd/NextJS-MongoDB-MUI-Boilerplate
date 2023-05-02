import { verifyEmailByToken } from '@/src/api/services/auth/verifyEmailByToken';
import { sendVerificationEmailWithToken } from '@/src/api/services/auth/sendVerificationEmailWithToken';
import { sendPasswordResetEmail } from '@/src/api/services/auth/sendPasswordResetEmail';
import { updateUserPasswordByOldPassword } from '@/src/api/services/auth/updateUserPasswordByOldPassword';
import { updateUserPasswordByToken } from '@/src/api/services/auth/updateUserPasswordByToken';
import { getPasswordResetToken } from '@/src/api/services/auth/getPasswordResetToken';
import { responseHelper } from '@/middlewares/responseHelper';

export const getAuthenticatedUser = responseHelper((req) => {
  return { user: req.user };
});

export const logout = responseHelper(async (req) => {
  await req.session.destroy();
  return { status: 204 };
});

export const verifyEmail = responseHelper(async (req) => {
  const { token } = req.query;
  await verifyEmailByToken({ token });
  return true;
});

export const sendVerificationEmail = responseHelper(async (req) => {
  const { _id, email, name } = req.user;
  await sendVerificationEmailWithToken({ userId: _id, email, name });
  return { status: 204 };
});

export const requestPasswordReset = responseHelper(async (req) => {
  const { email } = req.body;
  await sendPasswordResetEmail({ userEmail: email });
  return { status: 204 };
});

export const resetPasswordWithToken = responseHelper(async (req) => {
  const { token, password } = req.body;
  await updateUserPasswordByToken({ token, newPassword: password });
  return { status: 204 };
});

export const verifyPasswordResetToken = responseHelper(async (req) => {
  const { token } = req.query;
  const result = await getPasswordResetToken({ token });
  return { token: result._id, valid: !!result };
});

export const updateUserPassword = responseHelper(async (req) => {
  const { oldPassword, newPassword } = req.body;
  await updateUserPasswordByOldPassword({ id: req.user._id, oldPassword, newPassword });
  return { status: 204 };
});
