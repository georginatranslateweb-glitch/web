import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import MenuItems from './MenuItems';
import LanguageSwitcher from '../LanguageSwitcher';

import Logo from "../../../public/images/logo/logo-dark.svg";
import LogoLight from "../../../public/images/logo/logo-light.svg";
import LogoBeige from "../../../public/images/logo/logo-beige.png";

const MOBILE_HEADER_MQ = '(max-width: 1023px)';

const HeaderThree = ({ headerClass, headerLogo, headerLogoLight }) => {
  const { t } = useTranslation('header');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia(MOBILE_HEADER_MQ);
    const sync = () => setIsNarrowViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 100);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const contentPart = document.querySelector('.ms-main');
      const footer = document.querySelector('.ms-footer');
      if (contentPart && footer) {
        contentPart.style.marginBottom = `${footer.offsetHeight}px`;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const useBeigeMobileMenuLogo = menuOpen && isNarrowViewport;
  const logoDarkSrc = useBeigeMobileMenuLogo ? LogoBeige : (headerLogo || LogoLight);
  const logoLightSrc = useBeigeMobileMenuLogo ? LogoBeige : (headerLogoLight || Logo);

  return (
    <header>
      <div className={`${headerClass || 'main-header js-main-header auto-hide-header full-width menu-center header--sticky'} ${isVisible ? 'show-bg' : ''} ${menuOpen ? 'ms-mobile-nav-open' : ''}`}>
        <div className={`main-header__layout ${isVisible ? 'action' : 'top'}`}>
          <div className="main-header__inner">

            {/* Logo */}
            <div className="main-header__logo">
              <div className="logo-dark">
                <Link href="/"><Image src={logoDarkSrc} alt={t('logoAlt')} width={150} height={50} /></Link>
              </div>
              <div className="logo-light">
                <Link href="/"><Image src={logoLightSrc} alt={t('logoAlt')} width={150} height={50} /></Link>
              </div>
            </div>

            {/* Navigation */}
            <nav className={`main-header__nav js-main-header__nav main-header__default ${menuOpen ? 'is_mobile main-header__nav--is-visible' : ''}`} id="main-header-nav" aria-labelledby="primary-menu">
              <ul id="primary-menu" className="navbar-nav">
                <MenuItems />
              </ul>
            </nav>

            <div
              className="menuTrigger"
              role="button"
              tabIndex={0}
              aria-label={t('toggleMenu')}
              aria-expanded={menuOpen ? 'true' : 'false'}
              aria-controls="main-header-nav"
              onClick={() => setMenuOpen(!menuOpen)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
            />

            {/* Widgets */}
            <div className="main-header--widgets">

              {/* Cart */}
              <Link href="/shop/cart" className="main-header__cart">
                <div className="header__cart-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.53,5,5,3H1.25a1,1,0,0,0,0,2H3.47L6.7,18H20V16H8.26l-.33-1.34L21,12.17V5ZM19,10.52,7.45,12.71,6,7H19ZM7,19a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,7,19Zm12,0a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,19,19Z"></path>
                  </svg>
                </div>
                <div id="mini-cart-count" className="header__cart-count">
                  <span>4</span>
                </div>
              </Link>

              <LanguageSwitcher />

            </div>

            {/* Mobile menu toggle */}
            <button className="main-header__nav-trigger js-main-header__nav-trigger menu-default" aria-label={t('toggleMenu')} aria-expanded={menuOpen ? 'true' : 'false'} aria-controls="main-header-nav" onClick={() => setMenuOpen(!menuOpen)}>
              <span>{t('mobileNavLabel')}</span>
              <i className="main-header__nav-trigger-icon" aria-hidden="true"></i>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderThree;
