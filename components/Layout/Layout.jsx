import Head from 'next/head';
import Footer from './Footer';
import Nav from './Nav';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next.js MongoDB App</title>
        <meta key='viewport' name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta
          name='description'
          content='nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps.'
        />
        <meta property='og:title' content='Next.js + MongoDB App' />
        <meta
          property='og:description'
          content='nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps.'
        />
        {/*TODO: Fix image, is not working*/}
        <meta property='og:image' content='/images/appImage.jpeg' />
      </Head>
      <Nav />
      <Container sx={{ mt: '80px', mb: '80px', p: '0' }}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
