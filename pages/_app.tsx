import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />;
};

export default MyApp;
