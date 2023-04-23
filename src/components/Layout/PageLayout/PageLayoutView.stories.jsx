import React from 'react';
import PageLayoutView from './PageLayoutView';

export default {
  title: 'Components / PageLayout',
  component: PageLayoutView
};

export const Default = () => (
  <PageLayoutView>
    <div style={{ borderWidth: '5px', borderColor: 'black', borderStyle: 'solid', width: '100%' }}>Content</div>
  </PageLayoutView>
);
