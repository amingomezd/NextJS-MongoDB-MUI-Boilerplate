import React from 'react';
import UserPageView from './UserPageView';

export default {
  title: 'Pages / User',
  component: UserPageView
};

const user = {
  _id: '643caef3aea4f6ebc255c84b',
  emailVerified: false,
  profilePicture: null,
  email: 'example@mail.com',
  name: 'Jhon Doe',
  username: 'jhonDoe',
  bio: 'This is my Jhon Doe Bio'
};

export const Default = () => {
  return <UserPageView user={user} />;
};
