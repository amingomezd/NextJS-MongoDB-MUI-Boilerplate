import React from 'react';
import AppbarView from './AppbarView';

export default {
  title: 'Components / Appbar',
  component: AppbarView
};

const userSettings = [
  { name: 'Profile', url: '/' },
  { name: 'Settings', url: '/user/settings' }
];

const authenticatedLinks = [
  { name: 'Authenticated Page1', url: '/' },
  { name: 'Authenticated Page2', url: '/' },
  { name: 'Authenticated Page3', url: '/' }
];

const authLinks = [
  { name: 'Login', url: '/auth/login', variant: 'outlined' },
  { name: 'Sign Up', url: '/auth/sign-up', variant: 'contained' }
];
export const Default = () => {
  return (
    <AppbarView
      authLinks={authLinks}
      authenticatedLinks={authenticatedLinks}
      userSettings={userSettings}
      user={false}
    />
  );
};

export const LoggedIn = () => {
  return (
    <AppbarView authLinks={authLinks} authenticatedLinks={authenticatedLinks} userSettings={userSettings} user={true} />
  );
};
