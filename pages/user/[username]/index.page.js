import { findUserByUsername } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import UserPageView from './UserPageView';

export default function UserPage({ user }) {
  return <UserPageView user={user} />;
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const user = await findUserByUsername(db, context.params.username);
  if (!user) {
    return {
      notFound: true
    };
  }
  user._id = String(user._id);
  return { props: { user } };
}
