import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { AppProvider } from '../providers/AppProvider';

import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default appWithTranslation(App);