import React from 'react';
import { Grid } from '@mui/material';

const PageContentBoxView = ({ children }) => {
  return (
    <Grid container justifyContent='center' sx={{ minHeight: '100%' }}>
      <Grid item xs={12} md={6} lg={6}>
        {children}
      </Grid>
    </Grid>
  );
};

export default PageContentBoxView;
