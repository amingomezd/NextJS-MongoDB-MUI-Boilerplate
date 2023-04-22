import { getMongoDb } from '@/src/services/mongodb';
import EmailVerifyPageView from './EmailVerifyPageView';
import { findAndDeleteTokenByIdAndType } from '@/src/services/auth/token';
import { updateUserById } from '@/src/services/user';

export default function EmailVerifyPage({ valid }) {
  return <EmailVerifyPageView valid={valid} />;
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const { token } = context.params;

  const deletedToken = await findAndDeleteTokenByIdAndType(db, token, 'emailVerify');

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(db, deletedToken.creatorId, {
    emailVerified: true
  });

  return { props: { valid: true } };
}
