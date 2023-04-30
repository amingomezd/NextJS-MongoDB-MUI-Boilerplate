import EmailVerifyPageView from './EmailVerifyPageView';
import { useRouter } from 'next/router';
import { fetcher } from '@/src/common/utils/fetch';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function EmailVerifyPage() {
  const { query, isReady } = useRouter();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (isReady) {
      fetcher(`/api/auth/email/verify?token=${query.token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(setValid)
        .catch((error) => {
          toast.error(error);
        });
    }
  }, [isReady]);

  return <EmailVerifyPageView valid={valid} />;
}
