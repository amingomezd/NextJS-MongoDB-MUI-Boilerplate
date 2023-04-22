import React from 'react';
import SettingPageView from './SettingPageView';

export default {
  title: 'Pages / Settings',
  component: SettingPageView
};

const data = {
  user: {
    _id: '643caef3aea4f6ebc255c84b',
    emailVerified: false,
    profilePicture: null,
    email: 'example@mail.com',
    name: 'Jhon Doe',
    username: 'jhonDoe',
    bio: 'This is my Jhon Doe Bio'
  }
};

export const Default = () => {
  return <SettingPageView data={data} mutate={() => {}} />;
};

export const NoData = () => {
  return <SettingPageView data={null} mutate={() => {}} />;
};
