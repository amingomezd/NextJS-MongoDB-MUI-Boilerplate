import React from 'react';
import Appbar from '../AppBar';
import Box from '@mui/material/Box';
import { styles } from './PageLayoutView.styles';
import Copyright from '../Copyright';
import Container from '@mui/material/Container';
import PageTitle from '../PageTitle';

const PageLayoutView = ({ children, noPadding, title, subtitle }) => {
  const style = styles({ noPadding });
  return (
    <Box sx={style.mainBox}>
      <Appbar />
      {title && <PageTitle title={title} subtitle={subtitle} />}
      <Container sx={style.children}>{children}</Container>
      <Copyright />
    </Box>
  );
};

export default PageLayoutView;
