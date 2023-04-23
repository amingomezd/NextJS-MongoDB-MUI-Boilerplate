import React from 'react';
import PageContentBoxView from './PageContentBoxView';
import Container from '@mui/material/Container';

export default {
  title: 'Components / PageContentBox',
  component: PageContentBoxView,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
};

export const Default = () => (
  <PageContentBoxView>
    <div style={{ borderWidth: '5px', borderColor: 'black', borderStyle: 'solid', width: '100%' }}>Content</div>
  </PageContentBoxView>
);
