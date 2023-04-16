import React from 'react';
import PageTitleView from './PageTitleView';

export default {
  title: 'Components / PageTitle',
  component: PageTitleView
};

export const Default = () => (
  <PageTitleView
    title='Lorem Ipsum'
    subtitle='There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'
  />
);
