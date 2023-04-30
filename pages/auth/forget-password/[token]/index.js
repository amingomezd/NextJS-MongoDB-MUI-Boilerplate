import { useCallback, useEffect, useRef, useState } from 'react';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';
import ResetPasswordTokenPageView from './ResetPasswordTokenPageView';
import { useRouter } from 'next/router';

const ResetPasswordTokenPage = () => {
  const passwordRef = useRef();
  const [status, setStatus] = useState();
  const [token, setToken] = useState({});
  const { query, isReady } = useRouter();

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setStatus('loading');
      try {
        await fetcher('/api/auth/password/reset', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token.value,
            password: passwordRef.current.value
          })
        });
        setStatus('success');
      } catch (e) {
        toast.error(e);
        setStatus(undefined);
      }
    },
    [token]
  );

  useEffect(() => {
    if (isReady) {
      fetcher(`/api/auth/password?token=${query.token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          setToken({ value: res.token, valid: res.valid });
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <ResetPasswordTokenPageView valid={token?.valid} passwordRef={passwordRef} status={status} onSubmit={onSubmit} />
  );
};

export default ResetPasswordTokenPage;
