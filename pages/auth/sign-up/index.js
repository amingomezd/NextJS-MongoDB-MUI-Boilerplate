import SignUpPageView from './SignUpPageView';
import { useCallback, useRef, useState } from 'react';
import { useCurrentUser } from '@/src/hooks/userHooks';
import { useRouter } from 'next/router';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();

  const { mutate } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        const response = await fetcher('/api/auth/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value
          })
        });
        mutate({ user: response.user }, false);
        toast.success('Your account has been created');
        await router.replace('/user/settings');
      } catch (e) {
        toast.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, router]
  );

  return (
    <SignUpPageView
      isLoading={isLoading}
      onSubmit={onSubmit}
      nameRef={nameRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
      usernameRef={usernameRef}
    />
  );
};

export default SignupPage;
