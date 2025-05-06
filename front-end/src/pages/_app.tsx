import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { UserProvider } from '../context/UserContext';
import { AppProvider } from '../providers/AppProvider';

import { appWithTranslation } from 'next-i18next';
import '../i18n';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </AppProvider>
  );
}

export default appWithTranslation(App);