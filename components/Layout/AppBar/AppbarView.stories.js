import React from 'react';
import AppbarView from './AppbarView';

export default {
  title: 'Components / Appbar',
  component: AppbarView
};

const pages = { login: { name: 'Login', url: '/login' }, signUp: { name: 'Sign Up', url: '/sign-up' } };

const userSettings = [
  { name: 'Profile', url: '/#' },
  { name: 'Settings', url: '/#' }
];
export const Default = () => {
  return <AppbarView pages={pages} />;
};

export const LoggedIn = () => {
  return <AppbarView pages={pages} userSettings={userSettings} user={true} />;
};
