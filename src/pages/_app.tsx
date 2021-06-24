import Head from 'next/head';
import { AuthContextProvider } from '../contexts/AuthContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>letmeask</title>
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}

export default MyApp
