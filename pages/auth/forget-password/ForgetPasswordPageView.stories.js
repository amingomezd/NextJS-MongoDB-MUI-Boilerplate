import React from 'react';
import ForgetPasswordPageView from './ForgetPasswordPageView';

export default {
  title: 'Pages / Forget Password',
  component: ForgetPasswordPageView
};

export const Default = () => {
  return <ForgetPasswordPageView onSubmit={() => {}} />;
};

export const Loading = () => {
  return <ForgetPasswordPageView status={'loading'} onSubmit={() => {}} />;
};

export const Success = () => {
  return <ForgetPasswordPageView status={'success'} email='example@website.com' onSubmit={() => {}} />;
};
