import React from 'react';
import ChangePasswordView from './ChangePasswordView';

export default {
  title: 'Pages / Settings / Change Password',
  component: ChangePasswordView
};

export const Default = () => {
  return <ChangePasswordView onSubmit={() => {}} isLoading={false} />;
};

export const Loading = () => {
  return <ChangePasswordView onSubmit={() => {}} isLoading={true} />;
};
