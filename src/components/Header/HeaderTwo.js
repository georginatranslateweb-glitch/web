import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import MenuItems from './MenuItems';

import Logo from "../../../public/images/logo/logo-red.png";
import LogoLight from "../../../public/images/logo/logo-red.png";

const HeaderTwo = (props) => {
  const { headerClass, parentMenu, headerLogo, headerLogoLight } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuOpenRef = useRef(menuOpen);

  const [home, setHome] = useState(false);
  const [about, setAbout] = useState(false);
  const [service, setService] = useState(false);
  const [page, setPage] = useState(false);
  const [blog, setBlog] = useState(false);

  const openMobileMenu = (menu) => {
    setHome(menu === 'home');
    setAbout(menu === 'about');
    setService(menu === 'service');
    setPage(menu === 'page');
    setBlog(menu === 'blog');
  };

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

  useEffect(() => {
    // Set dark/light mode on body
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <>
      <header>
        <div className={`${headerClass ? headerClass : 'main-header js-main-header auto-hide-header full-width menu-center header--sticky'} ${isVisible ? 'show-bg' : ''} ${menuOpen ? 'ms-mobile-nav-open' : ''}`}>
          <div className={`main-header__layout ${isVisible ? 'action' : 'top'}`}>
            <div className="main-header__inner">
              <div className="main-header__logo">
                <div className="logo-dark">
                  <Link href="/">
                    <span className="ms-header-logo">
                      <Image
                        src={headerLogo ? headerLogo : Logo}
                        alt="Most"
                        fill
                        sizes="160px"
                        priority
                        style={{ objectFit: 'contain' }}
                      />
                    </span>
                  </Link>
                </div>
                <div className="logo-light">
                  <Link href="/">
                    <span className="ms-header-logo">
                      <Image
                        src={headerLogoLight ? headerLogoLight : LogoLight}
                        alt="Most"
                        fill
                        sizes="160px"
                        priority
                        style={{ objectFit: 'contain' }}
                      />
                    </span>
                  </Link>
                </div>
              </div>

              <nav className={`main-header__nav js-main-header__nav main-header__default ${menuOpen ? 'is_mobile main-header__nav--is-visible' : ''}`} id="main-header-nav" aria-labelledby="primary-menu">
                <ul id="primary-menu" className="navbar-nav">
                  <MenuItems />
                  <li className="menu-item ms-mobile-only">
                    <button
                      type="button"
                      className="ms-menu-close-item"
                      aria-label="Close menu"
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
                aria-label="Toggle menu"
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
                <div className="ms_theme_mode">
                  <div className="ms_tm--inner">
                    <div className="theme-toggle" id="theme-toggle">
                      <input
                        type="checkbox"
                        id="switcher"
                        className="check"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                        <mask className="moon" id="moon-mask">
                          <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                          <circle cx="24" cy="10" r="6" fill="black"></circle>
                        </mask>
                        <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                        <g className="sun-beams" stroke="currentColor">
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="header__search-icon" onClick={() => setModalOpen(true)}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.57,16.15A9,9,0,1,0,15,17.46h0l6.25,6.25,1.42-1.42Zm-3-.14a7.07,7.07,0,1,1,1.56-1.28A6.88,6.88,0,0,1,13.59,16Z"></path>
                  </svg>
                </div>

                <div className={modalOpen ? 'header__search-modal modal--is-visible' : 'header__search-modal'}>
                  <button className="header__search--close-btn" onClick={() => setModalOpen(false)}>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                      <title>Close modal window</title>
                      <g fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="3" x2="21" y2="21" />
                        <line x1="21" y1="3" x2="3" y2="21" />
                      </g>
                    </svg>
                  </button>

                  <div className="header__search--inner">
                    <form role="search" method="get" className="searchform" action="#">
                      <div className="ms-search-widget">
                        <input type="search" placeholder="Search..." name="s" className="search-field" />
                        <div className="ms-search--btn">
                          <span className="ms-sb--icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.57,16.15A9,9,0,1,0,15,17.46h0l6.25,6.25,1.42-1.42Zm-3-.14a7.07,7.07,0,1,1,1.56-1.28A6.88,6.88,0,0,1,13.59,16Z"></path>
                            </svg>
                          </span>
                          <input type="submit" className="search-submit" value="" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderTwo;
