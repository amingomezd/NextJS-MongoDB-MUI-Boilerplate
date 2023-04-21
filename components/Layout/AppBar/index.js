import React, { useCallback } from 'react';
import AppbarView from './AppbarView';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Appbar = () => {
  const router = useRouter();
  const { data: { user } = {}, mutate } = useCurrentUser();
  const pages = { login: { name: 'Login', url: '/login' }, signUp: { name: 'Sign Up', url: '/sign-up' } };

  const userSettings = [
    { name: 'Profile', url: `/user/${user?.username}` },
    { name: 'Settings', url: '/settings' }
  ];

  const onSignOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE'
      });
      toast.success('You have been signed out');
      mutate({ user: null });
      router.replace('/login');
    } catch (e) {
      toast.error(e.message);
    }
  }, [mutate]);

  return <AppbarView pages={pages} userSettings={userSettings} user={user} mutate={mutate} onSignOut={onSignOut} />;
};

export default Appbar;
