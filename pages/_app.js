import { useEffect } from 'react';
import { useRouter } from 'next/router';

import i18n from '../src/i18n';

import SwiperCore, { Navigation, Pagination, Parallax } from 'swiper';

import HomeFive from '../src/components/HomeFive';
import About from '../pages/about';
import Service from './services';
import Contact from '../pages/contact';
import ErrorPage from '../pages/404';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/parallax';
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../assets/css/socicon.css";
import "../assets/css/fonts-custom.css";
import "../assets/css/style.css";
import "../assets/css/home-5-hero.css";
import "../assets/css/language-switcher.css";
import "../assets/css/mobile-header-drawer.css";
import "../assets/css/tailwind.css";
import "../assets/css/how-it-works-timeline.css";
import "jarallax/dist/jarallax.min.css";
import "../assets/css/project-single-hero.css";
import "../assets/css/services-banner.css";
import "../assets/css/google-reviews.css";
import "../assets/css/secondary-pages-chrome.css";


SwiperCore.use([Navigation, Pagination, Parallax]);

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

function Layout() {
  const router = useRouter();

  if (router.pathname === '/') {
    return <HomeFive />;
  }
  if (router.pathname === '/about') {
    return <About />;
  }
  if (router.pathname === '/services') {
    return <Service />;
  }
  if (router.pathname === '/contact') {
    return <Contact />;
  }
  if (router.pathname === '/404') {
    return <ErrorPage />;
  }

  return <ErrorPage />;
}

export default function App() {
  return (
    <>
      <I18nPersistedLanguage />
      <HtmlLangSync />
      <Layout />
    </>
  );
}
