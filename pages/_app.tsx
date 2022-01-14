import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GitHubCorner } from '../components';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => (
  <>
    <Head>
      <title>Fantasticons ✨ A totally free icon collection</title>
    </Head>
    <GitHubCorner />
    <div className="min-h-screen bg-fantasticons">
      <Component {...pageProps} />
    </div>
  </>
);

export default MyApp;
