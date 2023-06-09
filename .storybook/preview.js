import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { RouterContext } from "next/dist/shared/lib/router-context";

export const parameters = {
  viewport: {
    viewports: {
      smallMobile: { name: 'Small Mobile', styles: { width: '360px', height: '640px' }, type: 'mobile' },
      mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' }, type: 'mobile' },
      desktop: { name: 'Desktop', styles: { width: '1366', height: '768' }, type: 'desktop' }
    },
    defaultViewport: 'desktop'
  },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
    replace() {},
  },
};

const theme = createTheme();

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
      <Toaster />
    </ThemeProvider>
  )
];
