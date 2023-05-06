import React from 'react';
import Typography from '@mui/material/Typography';
import { styles } from './CopyrightView.styles';
import { Box, useTheme } from '@mui/material';

const CopyrightView = () => {
  const muiTheme = useTheme();

  return (
    <Box sx={{ ...styles.mainBox, backgroundColor: muiTheme.palette.background.paper }}>
      <Typography variant='body2' sx={styles.mainText}>
        Copyright © Next.JS MUI and MongoDB Boilerplate
      </Typography>
    </Box>
  );
};

export default CopyrightView;
