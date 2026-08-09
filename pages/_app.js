import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MotionConfig } from 'framer-motion';

import i18n from '../src/i18n';
import AppLoader from '../src/components/motion/AppLoader';
import { redHatDisplay } from '../src/lib/fonts';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../assets/css/socicon.css';
import '../assets/css/fonts-custom.css';
import '../assets/css/style.css';
import '../assets/css/language-switcher.css';
import '../assets/css/mobile-header-drawer.css';
import '../assets/css/tailwind.css';
import '../assets/css/premium-motion.css';
import '../assets/css/home-5-hero.css';

const loadedRouteStyles = new Set();

function loadRouteStyles(pathname) {
  if (loadedRouteStyles.has(pathname)) return;
  loadedRouteStyles.add(pathname);

  switch (pathname) {
    case '/':
      void import('../assets/css/google-reviews.css');
      void import('swiper/scss');
      void import('swiper/scss/navigation');
      void import('swiper/scss/pagination');
      break;
    case '/services':
      void import('../assets/css/project-single-hero.css');
      void import('../assets/css/services-banner.css');
      void import('../assets/css/secondary-pages-chrome.css');
      void import('../assets/css/how-it-works-timeline.css');
      void import('jarallax/dist/jarallax.min.css');
      break;
    case '/about':
      void import('../assets/css/secondary-pages-chrome.css');
      void import('../assets/css/how-it-works-timeline.css');
      break;
    case '/contact':
      void import('../assets/css/secondary-pages-chrome.css');
      break;
    default:
      break;
  }
}

function I18nPersistedLanguage() {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('i18nextLng');
      const code = raw ? raw.split('-')[0] : '';
      if (code && ['en', 'es'].includes(code) && code !== i18n.language) {
        void i18n.changeLanguage(code);
      }
    } catch {
      /* ignore */
    }
  }, []);
  return null;
}

function HtmlLangSync() {
  useEffect(() => {
    const sync = () => {
      const code = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
      document.documentElement.setAttribute('lang', code);
    };
    sync();
    i18n.on('languageChanged', sync);
    return () => i18n.off('languageChanged', sync);
  }, []);
  return null;
}

function RouteStyles() {
  const router = useRouter();

  useEffect(() => {
    loadRouteStyles(router.pathname);
  }, [router.pathname]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <div className={`${redHatDisplay.className} ${redHatDisplay.variable}`}>
      <MotionConfig reducedMotion="user">
        <I18nPersistedLanguage />
        <HtmlLangSync />
        <RouteStyles />
        <AppLoader label="Loading Georgina Robledo Translation Services" />
        <Component {...pageProps} />
      </MotionConfig>
    </div>
  );
}
