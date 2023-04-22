import React from 'react';
import Container from '@mui/material/Container';
import { Box, Stack, Typography } from '@mui/material';

const PageTitleView = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
        py: '20px',
        width: '100%'
      }}
    >
      <Container>
        <Stack alignItems='center' spacing={3} textAlign='center'>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='subtitle2' sx={{ marginTop: '0!important' }}>
            {subtitle}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default PageTitleView;
