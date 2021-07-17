import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => (
  <Component {...pageProps} />
);

export default MyApp;
