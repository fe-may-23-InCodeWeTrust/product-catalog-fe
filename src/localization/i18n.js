import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationUA from './locales/ua.json';
import translationPL from './locales/pl.json';
import translationPT from './locales/pt.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ua: {
        translation: translationUA,
      },
      pl: {
        translation: translationPL,
      },
      pt: {
        translation: translationPT,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
