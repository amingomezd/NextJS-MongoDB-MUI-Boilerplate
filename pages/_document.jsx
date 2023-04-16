import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html style={{ height: '100%' }}>
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
      </Head>
      <body style={{ height: '100%' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
