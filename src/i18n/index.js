import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';
import enNavigation from '../locales/en/navigation.json';
import esNavigation from '../locales/es/navigation.json';
import enHeader from '../locales/en/header.json';
import esHeader from '../locales/es/header.json';
import enHome from '../locales/en/home.json';
import esHome from '../locales/es/home.json';

const namespaces = ['common', 'navigation', 'header', 'home'];

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    header: enHeader,
    home: enHome,
  },
  es: {
    common: esCommon,
    navigation: esNavigation,
    header: esHeader,
    home: esHome,
  },
};

if (!i18n.isInitialized) {
  // Same initial language on server and first client render (avoids hydration mismatch).
  // Persisted preference is applied in _app after mount (useLayoutEffect).
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    defaultNS: 'common',
    ns: namespaces,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  if (typeof window !== 'undefined') {
    i18n.on('languageChanged', (lng) => {
      try {
        window.localStorage.setItem('i18nextLng', lng);
      } catch {
        /* ignore quota / private mode */
      }
    });
  }
}

export default i18n;
