import React from 'react';
import SignUpPageView from './SignUpPageView';

export default {
  title: 'Pages / Sign Up',
  component: SignUpPageView
};

export const Default = () => {
  return <SignUpPageView isLoading={false} onSubmit={() => {}} />;
};

export const Loading = () => {
  return <SignUpPageView isLoading={true} onSubmit={() => {}} />;
};
