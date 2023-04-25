import EmailVerifyPageView from './EmailVerifyPageView';
import { findAndDeleteTokenByIdAndType } from '@/src/services/token';
import { updateUserById } from '@/src/services/user';
import dbConnect from '@/src/common/utils/dbConnect';

export default function EmailVerifyPage({ valid }) {
  return <EmailVerifyPageView valid={valid} />;
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { token } = context.params;

  const deletedToken = await findAndDeleteTokenByIdAndType(token, 'emailVerify');

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(deletedToken.creatorId, {
    emailVerified: true
  });

  return { props: { valid: true } };
}
