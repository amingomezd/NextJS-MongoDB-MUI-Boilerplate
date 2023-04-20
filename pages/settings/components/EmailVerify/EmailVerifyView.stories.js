import React from 'react';
import EmailVerifyView from './EmailVerifyView';

export default {
  title: 'Pages / Settings / Email Verify',
  component: EmailVerifyView
};

const data = { email: 'example@mail.com' };

export const Default = () => {
  return <EmailVerifyView user={data} verify={() => {}} status='' />;
};

export const Loading = () => {
  return <EmailVerifyView user={data} verify={() => {}} status='loading' />;
};

export const Success = () => {
  return <EmailVerifyView user={data} verify={() => {}} status='success' />;
};
