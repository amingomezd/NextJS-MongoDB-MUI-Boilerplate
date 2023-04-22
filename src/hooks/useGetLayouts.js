import { useMediaQuery } from '@mui/material';

export const useIsDesktop = () => {
  return useMediaQuery('(min-width:768px)');
};
