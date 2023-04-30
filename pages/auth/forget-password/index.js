import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';
import ForgetPasswordPageView from './ForgetPasswordPageView';

const ForgetPasswordPage = () => {
  const emailRef = useRef();
  // 'loading' || 'success'
  const [status, setStatus] = useState();
  const [email, setEmail] = useState('');

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      await fetcher('/api/auth/password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current.value
        })
      });
      setEmail(emailRef.current.value);
      setStatus('success');
    } catch (e) {
      toast.error(e);
      setStatus(undefined);
    }
  }, []);

  return <ForgetPasswordPageView status={status} email={email} onSubmit={onSubmit} emailRef={emailRef} />;
};
export default ForgetPasswordPage;
