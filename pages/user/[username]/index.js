import { findUserByUsername } from '@/src/services/user';
import UserPageView from './UserPageView';

export default function UserPage({ user }) {
  return <UserPageView user={user} />;
}

export async function getServerSideProps(context) {
  const user = await findUserByUsername(context.params.username);
  if (!user) {
    return {
      notFound: true
    };
  }

  const serializedUser = user.toObject();
  serializedUser._id = String(serializedUser._id);
  return { props: { user: serializedUser } };
}
