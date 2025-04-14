import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const isServer = typeof window === 'undefined';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: ['en'],
    supportedLngs: ['en', 'pt-BR', 'es'],
    debug: true,
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: isServer
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/locales/{{lng}}/translation.json`
        : '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;