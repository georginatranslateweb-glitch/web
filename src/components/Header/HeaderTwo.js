import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';

import MenuItems from './MenuItems';
import LanguageSwitcher from '../LanguageSwitcher';

import Logo from "../../../public/images/logo/logo-red.png";
import LogoLight from "../../../public/images/logo/logo-red.png";
import LogoBeige from "../../../public/images/logo/logo-beige.png";
import LogoSecondary from "../../../public/images/logo/logo-secundario.png";

/** Igual que breakpoints del menú móvil en style.css; Home-5 logo fijo dispara el mismo evento. */
export const MOST_HEADER_TWO_TOGGLE_MOBILE_NAV = 'most:headerTwoToggleMobileNav';

/** Home-5 (logo fijo fuera del header): sincronizar asset beige / visibilidad con `menuOpen`. */
export const MOST_HEADER_TWO_MOBILE_NAV_CHANGE = 'most:headerTwoMobileNavChange';

const NARROW_HEADER_MQ = '(max-width: 1023px)';

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
    layoutHoverMirrorFromFixedLogo = false,
    /** Home-5: mismo aspecto/comportamiento que el header “tras scroll”, sin listeners ni estado por scroll. */
    alwaysScrolled = false,
    /** Home-5: el idioma vive junto a la hamburguesa del hero (evita solaparse con el logo vertical). */
    hideLanguageSwitcher = false,
    /** Páginas secundarias: logo más grande y posicionado como en Home-5. */
    secondaryLogoAbsolute = false,
  } = props;
  const { t } = useHydrationSafeTranslation('header');

  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  /** Home-5 móvil + .action: tras 2×rAF aplica la misma cascada que :hover en .layout (transiciones del theme, no keyframes). */
  const [homeFiveDrawerHoverMirror, setHomeFiveDrawerHoverMirror] = useState(false);
  /** Home-5 desktop + logo fijo: misma idea — sin 2×rAF el navegador a menudo no anima transform al añadir la clase en el mismo tick que React. */
  const [homeFiveLogoHoverMirrorApplied, setHomeFiveLogoHoverMirrorApplied] = useState(false);
  /** ≤1023px: `alwaysScrolled` no fuerza layout compacto hasta hacer scroll (p. ej. Home-5 móvil). */
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia(NARROW_HEADER_MQ);
    const sync = () => setIsNarrowViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    window.dispatchEvent(
      new CustomEvent(MOST_HEADER_TWO_MOBILE_NAV_CHANGE, { detail: { open: menuOpen } }),
    );
    return undefined;
  }, [menuOpen]);

  const scrolled = (alwaysScrolled && !isNarrowViewport) || isVisible;

  useEffect(() => {
    if (!menuOpen) {
      setHomeFiveDrawerHoverMirror(false);
      return;
    }
    if (typeof document === 'undefined' || !document.body.classList.contains('page-home-5')) {
      setHomeFiveDrawerHoverMirror(false);
      return;
    }
    const mq = window.matchMedia('(max-width: 1023px)');
    if (!mq.matches || !scrolled) {
      setHomeFiveDrawerHoverMirror(false);
      return;
    }
    let canceled = false;
    let raf2 = null;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!canceled) setHomeFiveDrawerHoverMirror(true);
      });
    });
    return () => {
      canceled = true;
      cancelAnimationFrame(raf1);
      if (raf2 != null) cancelAnimationFrame(raf2);
      setHomeFiveDrawerHoverMirror(false);
    };
  }, [menuOpen, scrolled]);

  useLayoutEffect(() => {
    if (!layoutHoverMirrorFromFixedLogo) {
      setHomeFiveLogoHoverMirrorApplied(false);
      return undefined;
    }
    if (typeof document === 'undefined' || !document.body.classList.contains('page-home-5')) {
      setHomeFiveLogoHoverMirrorApplied(false);
      return undefined;
    }
    const mq = window.matchMedia('(min-width: 1024px)');
    const actionLayoutForMirror =
      scrolled ||
      (!!deferNavUntilScroll &&
        !scrolled &&
        !menuOpen &&
        mq.matches &&
        (chromePeek || layoutHoverMirrorFromFixedLogo));
    if (!mq.matches || !actionLayoutForMirror) {
      setHomeFiveLogoHoverMirrorApplied(false);
      return undefined;
    }
    let canceled = false;
    let raf2 = null;
    let raf3 = null;
    const extraPrepFrame = !alwaysScrolled && !scrolled && !!deferNavUntilScroll && !!chromePeek;
    const raf1 = requestAnimationFrame(() => {
      if (canceled) return;
      raf2 = requestAnimationFrame(() => {
        if (canceled) return;
        if (extraPrepFrame) {
          raf3 = requestAnimationFrame(() => {
            if (!canceled) setHomeFiveLogoHoverMirrorApplied(true);
          });
        } else if (!canceled) {
          setHomeFiveLogoHoverMirrorApplied(true);
        }
      });
    });
    return () => {
      canceled = true;
      cancelAnimationFrame(raf1);
      if (raf2 != null) cancelAnimationFrame(raf2);
      if (raf3 != null) cancelAnimationFrame(raf3);
      setHomeFiveLogoHoverMirrorApplied(false);
    };
  }, [layoutHoverMirrorFromFixedLogo, scrolled, alwaysScrolled, deferNavUntilScroll, chromePeek, menuOpen]);

  useEffect(() => {
    if (alwaysScrolled && !isNarrowViewport) return undefined;
    const toggleVisibility = () => {
      if (menuOpenRef.current) return;
      setIsVisible(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [alwaysScrolled, isNarrowViewport]);

  useEffect(() => {
    if (alwaysScrolled && !isNarrowViewport) return;
    if (menuOpen) return;
    setIsVisible(window.pageYOffset > 100);
  }, [menuOpen, alwaysScrolled, isNarrowViewport]);

  useEffect(() => {
    const onToggle = () => {
      setMenuOpen((v) => !v);
    };
    window.addEventListener(MOST_HEADER_TWO_TOGGLE_MOBILE_NAV, onToggle);
    return () => window.removeEventListener(MOST_HEADER_TWO_TOGGLE_MOBILE_NAV, onToggle);
  }, []);

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
    !alwaysScrolled && deferNavUntilScroll && !isVisible && !menuOpen && !chromePeek;

  const peekBridgeActive =
    !alwaysScrolled &&
    deferNavUntilScroll &&
    !isVisible &&
    !menuOpen &&
    (onChromePeekBridgeEnter || onChromePeekBridgeLeave);

  const peekDesktopUsesActionLayout =
    !alwaysScrolled &&
    typeof window !== 'undefined' &&
    !!deferNavUntilScroll &&
    !isVisible &&
    !menuOpen &&
    window.matchMedia('(min-width: 1024px)').matches &&
    (!!chromePeek || !!layoutHoverMirrorFromFixedLogo);

  const layoutIsAction =
    (alwaysScrolled && !isNarrowViewport) || isVisible || peekDesktopUsesActionLayout;

  const toggleNavFromLogo = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      return;
    }
    setMenuOpen((prev) => !prev);
  };

  const logoToggleA11y = `${t('logoAlt')} — ${t('toggleMenu')}`;

  const useBeigeMobileMenuLogo = menuOpen && isNarrowViewport;
  const defaultLogoDark = secondaryLogoAbsolute ? LogoSecondary : Logo;
  const defaultLogoLight = secondaryLogoAbsolute ? LogoSecondary : LogoLight;
  const logoDarkSrc = useBeigeMobileMenuLogo ? LogoBeige : (headerLogo || defaultLogoDark);
  const logoLightSrc = useBeigeMobileMenuLogo ? LogoBeige : (headerLogoLight || defaultLogoLight);
  return (
    <>
      <header>
        <div
          className={`${headerClass ? headerClass : 'main-header js-main-header auto-hide-header full-width menu-center header--sticky'} ${scrolled ? 'show-bg' : ''} ${menuOpen ? 'ms-mobile-nav-open' : ''} ${navChromeDeferred ? 'ms-header-chrome-deferred' : ''} ${secondaryLogoAbsolute ? 'ms-header-two--secondary-logo-abs' : ''}`}
          onMouseEnter={peekBridgeActive ? onChromePeekBridgeEnter : undefined}
          onMouseLeave={peekBridgeActive ? onChromePeekBridgeLeave : undefined}
        >
          <div
            className={`main-header__layout ${layoutIsAction ? 'action' : 'top'}${
              homeFiveDrawerHoverMirror && menuOpen ? ' ms-home5-drawer--action-hover-mirror' : ''
            }${homeFiveLogoHoverMirrorApplied ? ' ms-home5-logo--layout-hover-mirror' : ''}`}
          >
            <div className="main-header__inner">
              {secondaryLogoAbsolute ? (
              <div
                className="main-header__logo ms-header-two-logo-spacer"
                aria-hidden="true"
              />
              ) : (
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
                        src={logoDarkSrc}
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
                        src={logoLightSrc}
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
              )}

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
                {!hideLanguageSwitcher ? <LanguageSwitcher /> : null}
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderTwo;
