import React from 'react';
import { Grid } from '@mui/material';

const PageContentBoxView = ({ children }) => {
  return (
    <Grid container justifyContent='center' sx={{ minHeight: '100%' }}>
      <Grid item xs={12} md={8} lg={8}>
        {children}
      </Grid>
    </Grid>
  );
};

export default PageContentBoxView;
