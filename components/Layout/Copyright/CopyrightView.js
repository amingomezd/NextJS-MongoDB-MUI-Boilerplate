import React from 'react';
import Typography from '@mui/material/Typography';
import { styles } from './CopyrightView.styles';
import { Box } from '@mui/material';

const CopyrightView = () => {
  return (
    <Box sx={styles.mainBox}>
      <Typography variant='body2' sx={styles.mainText}>
        Copyright © Next.JS MUI and MongoDB Boilerplate
      </Typography>
    </Box>
  );
};

export default CopyrightView;
