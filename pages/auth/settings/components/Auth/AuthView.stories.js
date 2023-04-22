import React from 'react';
import AuthView from './AuthView';

export default {
  title: 'Pages / Settings / Auth',
  component: AuthView
};

export const Default = () => {
  return <AuthView onSubmit={() => {}} isLoading={false} />;
};

export const Loading = () => {
  return <AuthView onSubmit={() => {}} isLoading={true} />;
};
