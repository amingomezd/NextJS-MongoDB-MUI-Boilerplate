import React from 'react';
import AppbarView from './AppbarView';
import { useCurrentUser } from '@/lib/user';

const Appbar = () => {
  const { data: { user } = {}, mutate } = useCurrentUser();
  const pages = { login: { name: 'Login', url: '/login' }, signUp: { name: 'Sign Up', url: '/sign-up' } };

  const userSettings = [
    { name: 'Profile', url: `/user/${user?.username}` },
    { name: 'Settings', url: '/settings' }
  ];

  return <AppbarView pages={pages} userSettings={userSettings} user={user} mutate={mutate} />;
};

export default Appbar;
