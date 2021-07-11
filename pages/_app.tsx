import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />;
};

export default MyApp;
