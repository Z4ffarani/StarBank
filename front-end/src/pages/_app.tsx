import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { UserProvider } from '../context/UserContext';

import { appWithTranslation } from 'next-i18next';
import '../i18n';

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default appWithTranslation(App);