import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import MenuItems from './MenuItems';
import LanguageSwitcher from '../LanguageSwitcher';

import Logo from "../../../public/images/logo/logo-red.png";
import LogoLight from "../../../public/images/logo/logo-red.png";

const Header = ({ headerClass, headerLogo, headerLogoLight }) => {
  const { t } = useTranslation('header');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 100);
    };
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

  const toggleNavFromLogo = () => {
    setMenuOpen((prev) => !prev);
  };

  const logoToggleA11y = `${t('logoAlt')} — ${t('toggleMenu')}`;

  return (
    <header>
      <div className={`${headerClass || 'main-header js-main-header auto-hide-header full-width menu-center header--sticky'} ${isVisible ? 'show-bg' : ''}`}>
        <div className={`main-header__layout ${isVisible ? 'action' : 'top'}`}>
          <div className="main-header__inner">

            {/* Logo */}
            <div className="main-header__logo">
              <div className="logo-dark">
                <button
                  type="button"
                  className="ms-header-logo-trigger"
                  aria-label={logoToggleA11y}
                  aria-expanded={menuOpen ? 'true' : 'false'}
                  aria-controls="main-header-nav"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNavFromLogo();
                  }}
                >
                  <span className="ms-header-logo">
                    <Image
                      src={headerLogo || Logo}
                      alt=""
                      fill
                      sizes="160px"
                      priority
                      style={{ objectFit: 'contain' }}
                    />
                  </span>
                </button>
              </div>
              <div className="logo-light">
                <button
                  type="button"
                  className="ms-header-logo-trigger"
                  aria-label={logoToggleA11y}
                  aria-expanded={menuOpen ? 'true' : 'false'}
                  aria-controls="main-header-nav"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNavFromLogo();
                  }}
                >
                  <span className="ms-header-logo">
                    <Image
                      src={headerLogoLight || LogoLight}
                      alt=""
                      fill
                      sizes="160px"
                      priority
                      style={{ objectFit: 'contain' }}
                    />
                  </span>
                </button>
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

export default Header;
