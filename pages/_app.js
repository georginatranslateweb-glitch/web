import { useEffect } from 'react';
import { useRouter } from 'next/router';

import i18n from '../src/i18n';

import SwiperCore, { Navigation, Pagination, Parallax } from 'swiper';

import Home from '../pages/home';
import HomeTwo from '../pages/home-2';
import HomeThree from '../pages/home-3';
import HomeFive from '../pages/home-5';
import HomeSix from '../pages/home-6';
import About from '../pages/about';
import Service from './services';
import ImageGallery from './image-gallery';
import Team from '../pages/team';
import Project from '../pages/project';
import ProjectStandard from '../pages/project/project-standard';
import ProjectMasonary from '../pages/project/project-masonary';
import ProjectGrid from '../pages/project/project-grid';
import ProjectGridTwo from '../pages/project/project-grid-2';
import ProjectDetails from '../pages/project/[slug]';
import Blog from '../pages/blog';
import SinglePost from './blog/[slug]';
import BlogRightSidebar from '../pages/blog/blog-right-sidebar';
import BlogLeftThumb from '../pages/blog/blog-left-thumb';
import BlogRightThumb from '../pages/blog/blog-right-thumb';
import BlogRandomThumb from '../pages/blog/blog-random-thumb';
import Contact from '../pages/contact';
import Shop from '../pages/shop';
import ProductDetails from '../pages/shop/[slug]';
import CartPage from '../pages/shop/cart';
import CheckoutPage from '../pages/shop/checkout';
import MyAccount from './shop/account';
import ErrorPage from '../pages/404';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';


// Import Swiper styles
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


SwiperCore.use([Navigation, Pagination, Parallax]);

function I18nPersistedLanguage() {
  // useEffect (no useLayoutEffect): restaurar idioma tras hidratar para no desincronizar texto SSR/cliente.
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

function Layout({ children }) {
  const router = useRouter();

  if (router.pathname === '/') {
    return <Home />;
  } else if (router.pathname === '/home-2') {
    return <HomeTwo />;
  } else if (router.pathname === '/home-3') {
    return <HomeThree />;
  } else if (router.pathname === '/home-5') {
    return <HomeFive />;
  } else if (router.pathname === '/home-6') {
    return <HomeSix />;
  } else if (router.pathname === '/about') {
    return <About />;
  } else if (router.pathname === '/services') {
    return <Service />;
  } else if (router.pathname === '/image-gallery') {
    return <ImageGallery />;
  } else if (router.pathname === '/team') {
    return <Team />;
  } else if (router.pathname === '/project') {
    return <Project />;
  } else if (router.pathname === '/project/project-standard') {
    return <ProjectStandard />;
  } else if (router.pathname === '/project/project-masonary') {
    return <ProjectMasonary />;
  } else if (router.pathname === '/project/project-grid') {
    return <ProjectGrid />;
  } else if (router.pathname === '/project/project-grid-2') {
    return <ProjectGridTwo />;
  } else if (router.pathname.startsWith('/project/')) {
    return <ProjectDetails />;
  } else if (router.pathname === '/blog') {
    return <Blog />;
  } else if (router.pathname === '/blog/blog-left-sidebar') {
    return <BlogLeftSidebar />;
  } else if (router.pathname === '/blog/blog-right-sidebar') {
    return <BlogRightSidebar />;
  } else if (router.pathname === '/blog/blog-left-thumb') {
    return <BlogLeftThumb />;
  } else if (router.pathname === '/blog/blog-right-thumb') {
    return <BlogRightThumb />;
  } else if (router.pathname === '/blog/blog-random-thumb') {
    return <BlogRandomThumb />;
  } else if (router.pathname.startsWith('/blog/')) {
    return <SinglePost />;
  } else if (router.pathname === '/shop') {
    return <Shop />;
  } else if (router.pathname === '/shop/cart') {
    return <CartPage />;
  } else if (router.pathname === '/shop/checkout') {
    return <CheckoutPage />;
  } else if (router.pathname === '/shop/account') {
    return <MyAccount />;
  } else if (router.pathname.startsWith('/shop/')) {
    return <ProductDetails />;
  } else if (router.pathname === '/contact') {
    return <Contact />;
  } else if (router.pathname === '/404') {
    return <ErrorPage />;
  }

  return <div>{children}</div>;
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
