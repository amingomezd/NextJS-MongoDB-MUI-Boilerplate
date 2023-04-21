import { findAndDeleteTokenByIdAndType, updateUserById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import EmailVerifyPageView from './EmailVerifyPageView';

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
