import EmailVerifyPageView from './EmailVerifyPageView';
import { findAndDeleteTokenByIdAndType } from '@/src/services/token';
import { updateUserById } from '@/src/services/user';

export default function EmailVerifyPage({ valid }) {
  return <EmailVerifyPageView valid={valid} />;
}

export async function getServerSideProps(context) {
  const { token } = context.params;

  const deletedToken = await findAndDeleteTokenByIdAndType(token, 'emailVerify');

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(deletedToken.creatorId, {
    emailVerified: true
  });

  return { props: { valid: true } };
}
