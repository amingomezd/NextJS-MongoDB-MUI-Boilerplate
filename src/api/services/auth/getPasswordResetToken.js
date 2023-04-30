import Token from '@/src/api/services/auth/data/Token';

export const getPasswordResetToken = async ({ token }) => {
  const tokenDoc = await Token.findTokenByIdAndType(token, 'passwordReset');

  if (!tokenDoc) {
    return { error: { message: 'Invalid Token.', code: 404 } };
  }

  return { tokenDoc };
};
