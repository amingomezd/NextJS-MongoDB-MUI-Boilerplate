import React from 'react';
import AboutYouView from './AboutYouView';

export default {
  title: 'Pages / Settings / About You',
  component: AboutYouView
};

const data = { username: 'jhonDoe' };

export const Default = () => {
  return <AboutYouView user={data} isLoading={false} onAvatarChange={() => {}} onSubmit={() => {}} />;
};

export const Loading = () => {
  return <AboutYouView user={data} isLoading={true} onAvatarChange={() => {}} onSubmit={() => {}} />;
};
