import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../public/locales/en/common.json';
import translationZH from '../public/locales/zh/common.json';
import translationHI from '../public/locales/hi/common.json';
import translationES from '../public/locales/es/common.json';
import translationPT from '../public/locales/pt-BR/common.json';
import translationRU from '../public/locales/ru/common.json';
import translationFR from '../public/locales/fr/common.json';
import translationDE from '../public/locales/de/common.json';
import translationJA from '../public/locales/ja/common.json';
import translationIT from '../public/locales/it/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      zh: { translation: translationZH },
      hi: { translation: translationHI },
      es: { translation: translationES },
      'pt-BR': { translation: translationPT },
      ru: { translation: translationRU },
      fr: { translation: translationFR },
      de: { translation: translationDE },
      ja: { translation: translationJA },
      it: { translation: translationIT },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;