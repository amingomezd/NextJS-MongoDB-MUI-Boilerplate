import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material';
import { grey, purple } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

export const theme = (prefersDarkMode = false) =>
  createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: prefersDarkMode ? purple[400] : purple[900]
      },
      secondary: {
        main: prefersDarkMode ? grey[400] : grey[900]
      }
    }
  });
