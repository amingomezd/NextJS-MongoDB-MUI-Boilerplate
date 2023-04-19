import React from 'react';
import ResetPasswordTokenPageView from './ResetPasswordTokenPageView';

export default {
  title: 'Pages / Forget Password / Reset Password',
  component: ResetPasswordTokenPageView
};

export const ValidDefault = () => {
  return <ResetPasswordTokenPageView valid={true} status='' onSubmit={() => {}} />;
};

export const ValidLoading = () => {
  return <ResetPasswordTokenPageView valid={true} status='loading' onSubmit={() => {}} />;
};

export const ValidSuccess = () => {
  return <ResetPasswordTokenPageView valid={true} status='success' onSubmit={() => {}} />;
};

export const Invalid = () => {
  return <ResetPasswordTokenPageView valid={false} onSubmit={() => {}} />;
};
