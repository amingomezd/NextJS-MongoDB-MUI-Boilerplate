import React from 'react';
import Typography from '@mui/material/Typography';
import { styles } from './CopyrightView.styles';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

const CopyrightView = () => {
  return (
    <Box sx={styles.mainBox}>
      <Typography variant='body2' sx={styles.mainText}>
        {'Copyright © '}
        <Link color='inherit' href='/#'>
          Cire, Citas y Resultados
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default CopyrightView;
