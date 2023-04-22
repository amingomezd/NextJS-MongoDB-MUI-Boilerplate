import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily
  }
});

export default theme;
