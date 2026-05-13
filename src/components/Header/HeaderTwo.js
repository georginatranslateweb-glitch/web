import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import MenuItems from './MenuItems';
import LanguageSwitcher from '../LanguageSwitcher';

import Logo from "../../../public/images/logo/logo-red.png";
import LogoLight from "../../../public/images/logo/logo-red.png";

const HeaderTwo = (props) => {
  const {
    headerClass,
    parentMenu,
    headerLogo,
    headerLogoLight,
    deferNavUntilScroll,
    chromePeek = false,
    onChromePeekBridgeEnter,
    onChromePeekBridgeLeave,
  } = props;
  const { t } = useTranslation('header');

  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    // Sticky header on scroll (freeze while mobile menu is open — ref avoids stale listener between renders)
    const toggleVisibility = () => {
      if (menuOpenRef.current) return;
      setIsVisible(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (menuOpen) return;
    setIsVisible(window.pageYOffset > 100);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    // Adjust main content bottom margin based on footer height
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

  const navChromeDeferred =
    deferNavUntilScroll && !isVisible && !menuOpen && !chromePeek;

  const peekBridgeActive =
    deferNavUntilScroll && !isVisible && !menuOpen && (onChromePeekBridgeEnter || onChromePeekBridgeLeave);

  const toggleNavFromLogo = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      return;
    }
    setMenuOpen((prev) => !prev);
  };

  const logoToggleA11y = `${t('logoAlt')} — ${t('toggleMenu')}`;

  return (
    <>
      <header>
        <div
          className={`${headerClass ? headerClass : 'main-header js-main-header auto-hide-header full-width menu-center header--sticky'} ${isVisible ? 'show-bg' : ''} ${menuOpen ? 'ms-mobile-nav-open' : ''} ${navChromeDeferred ? 'ms-header-chrome-deferred' : ''}`}
          onMouseEnter={peekBridgeActive ? onChromePeekBridgeEnter : undefined}
          onMouseLeave={peekBridgeActive ? onChromePeekBridgeLeave : undefined}
        >
          <div className={`main-header__layout ${isVisible ? 'action' : 'top'}`}>
            <div className="main-header__inner">
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
                        src={headerLogo ? headerLogo : Logo}
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
                        src={headerLogoLight ? headerLogoLight : LogoLight}
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

              <nav className={`main-header__nav js-main-header__nav main-header__default ${menuOpen ? 'is_mobile main-header__nav--is-visible' : ''}`} id="main-header-nav" aria-labelledby="primary-menu">
                <ul id="primary-menu" className="navbar-nav">
                  <MenuItems />
                  <li className="menu-item ms-mobile-only">
                    <button
                      type="button"
                      className="ms-menu-close-item"
                      aria-label={t('closeMenu')}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </li>
                </ul>
              </nav>
              <div
                className={`menuTrigger${menuOpen ? ' menuTrigger--hidden-when-open' : ''}`}
                role="button"
                tabIndex={menuOpen ? -1 : 0}
                aria-label={t('toggleMenu')}
                aria-expanded={menuOpen ? 'true' : 'false'}
                aria-controls="main-header-nav"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  setMenuOpen((prev) => !prev);
                }}
              />
              <div className="main-header--widgets">
                <LanguageSwitcher />
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderTwo;
