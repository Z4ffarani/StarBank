const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const isServer = typeof window === 'undefined';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: ['en'],
    supportedLngs: ['en', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'pt-BR', 'zh', 'ru'],
    debug: true,
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: isServer
        ? `${backendUrl}/locales/{{lng}}.json`
        : '/locales/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;