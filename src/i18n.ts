// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationCZ from './locales/cz/translation.json'; 

i18n
  .use(LanguageDetector) // Optional: auto-detect language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      cz: { translation: translationCZ },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;