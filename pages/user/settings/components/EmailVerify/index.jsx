import { useCallback, useState } from 'react';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';
import EmailVerifyView from './EmailVerifyView';

const EmailVerify = ({ user }) => {
  const [status, setStatus] = useState();

  const verify = useCallback(async () => {
    try {
      setStatus('loading');
      await fetcher('/api/auth/email/verify', { method: 'POST' });
      toast.success('An email has been sent to your mailbox. Follow the instruction to verify your email.');
      setStatus('success');
    } catch (e) {
      toast.error(e);
      setStatus('');
    }
  }, []);

  if (user.emailVerified) return null;

  return <EmailVerifyView user={user} status={status} verify={verify} />;
};

export default EmailVerify;
