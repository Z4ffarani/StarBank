import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { AppProvider } from '../providers/AppProvider';

import '../i18nLocales';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default App;
