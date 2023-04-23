import LoginPageView from './LoginPageView';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCurrentUser } from '@/src/hooks/userHooks';
import { useRouter } from 'next/router';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  const onSubmit = useCallback(
    async (event) => {
      setIsLoading(true);
      event.preventDefault();
      try {
        const response = await fetcher('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
          })
        });
        mutate({ user: response.user }, false);
        toast.success('You have been logged in.');
      } catch (e) {
        toast.error('Incorrect email or password.');
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  useEffect(() => {
    if (isValidating) return;
    if (user) router.replace('/user/settings');
  }, [user, router, isValidating]);

  return <LoginPageView isLoading={isLoading} onSubmit={onSubmit} emailRef={emailRef} passwordRef={passwordRef} />;
};

export default LoginPage;
