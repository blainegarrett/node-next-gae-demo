import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="A boiler plate of using Next.js on Node for Google App Engine Standard Environment"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="theme-color" content="#551A8B" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;