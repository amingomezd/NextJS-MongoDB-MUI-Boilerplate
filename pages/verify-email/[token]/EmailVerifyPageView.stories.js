import React from 'react';
import EmailVerifyPageView from './EmailVerifyPageView';

export default {
  title: 'Pages / Email Verify',
  component: EmailVerifyPageView
};

export const ValidLink = () => {
  return <EmailVerifyPageView valid={true} />;
};

export const InvalidLink = () => {
  return <EmailVerifyPageView valid={false} />;
};
