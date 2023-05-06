import React from 'react';
import Container from '@mui/material/Container';
import { Box, Stack, Typography, useTheme } from '@mui/material';

const PageTitleView = ({ title, subtitle }) => {
  const { palette } = useTheme();
  const backgroundColor = palette.mode === 'dark' ? palette.primary.dark : palette.primary.main;
  const textColor = palette.mode === 'dark' ? palette.text.primary : 'white';

  return (
    <Box
      sx={{
        backgroundColor,
        color: textColor,
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
