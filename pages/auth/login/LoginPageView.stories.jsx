import React from 'react';
import LoginPageView from './LoginPageView';

export default {
  title: 'Pages / Login',
  component: LoginPageView
};

export const Default = () => {
  return <LoginPageView isLoading={false} onSubmit={() => {}} />;
};

export const Loading = () => {
  return <LoginPageView isLoading={true} onSubmit={() => {}} />;
};
