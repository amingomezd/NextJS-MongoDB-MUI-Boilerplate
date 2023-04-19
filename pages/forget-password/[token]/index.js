import { findTokenByIdAndType } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import ResetPasswordTokenPageView from './ResetPasswordTokenPageView';

const ResetPasswordTokenPage = ({ valid, token }) => {
  const passwordRef = useRef();
  // 'loading' | 'success'
  const [status, setStatus] = useState();
  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setStatus('loading');
      try {
        await fetcher('/api/user/password/reset', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            password: passwordRef.current.value
          })
        });
        setStatus('success');
      } catch (e) {
        toast.error(e.message);
        setStatus(undefined);
      }
    },
    [token]
  );

  return <ResetPasswordTokenPageView valid={valid} passwordRef={passwordRef} status={status} onSubmit={onSubmit} />;
};

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const tokenDoc = await findTokenByIdAndType(db, context.params.token, 'passwordReset');

  return { props: { token: context.params.token, valid: !!tokenDoc } };
}

export default ResetPasswordTokenPage;
