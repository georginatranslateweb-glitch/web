import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';

import LogoSecondary from '../../../public/images/logo/logo-secundario.png';
import LogoHorizontalRed from '../../../public/images/logo/logo-horizontal-red.png';
import {
  HOME_LOGO_HREF,
  MOST_HEADER_TWO_MOBILE_NAV_CHANGE,
  MOST_HEADER_TWO_TOGGLE_MOBILE_NAV,
} from './headerEvents';

const NARROW_HEADER_MQ = '(max-width: 1023px)';

/**
 * @param {'fixed' | 'inHeader'} placement
 *   - fixed: desktop, fuera del header (páginas secundarias) — siempre logo-secundario
 *   - inHeader: móvil, dentro de .main-header__inner (logo horizontal solo al scroll)
 * @param {boolean} [scrolled] — estado scroll desde HeaderTwo (solo inHeader / móvil)
 */
const SecondaryFixedLogo = ({ placement = 'fixed', scrolled = false }) => {
  const { t } = useHydrationSafeTranslation('header');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia(NARROW_HEADER_MQ);
    const sync = () => setIsNarrowViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const onNavChange = (e) => {
      setMobileNavOpen(!!e.detail?.open);
    };
    window.addEventListener(MOST_HEADER_TWO_MOBILE_NAV_CHANGE, onNavChange);
    return () => window.removeEventListener(MOST_HEADER_TWO_MOBILE_NAV_CHANGE, onNavChange);
  }, []);

  const logoToggleA11y = `${t('logoAlt')} — ${t('toggleMenu')}`;
  const showHorizontal =
    placement === 'inHeader' &&
    isNarrowViewport &&
    scrolled &&
    !mobileNavOpen;

  if (placement === 'fixed' && isNarrowViewport) return null;
  if (placement === 'inHeader' && !isNarrowViewport) return null;

  const buttonClassName = [
    'ms-header-two-fixed-logo',
    placement === 'inHeader' ? 'ms-header-two-fixed-logo--in-header' : '',
    showHorizontal ? 'ms-header-two-fixed-logo--horizontal' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const toggleMobileNav = () => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia(NARROW_HEADER_MQ).matches) return;
    window.dispatchEvent(new CustomEvent(MOST_HEADER_TWO_TOGGLE_MOBILE_NAV));
  };

  if (placement === 'inHeader') {
    return (
      <button
        type="button"
        className={buttonClassName}
        aria-label={logoToggleA11y}
        aria-expanded={mobileNavOpen ? 'true' : 'false'}
        aria-controls="main-header-nav"
        onClick={toggleMobileNav}
      >
        <span className="ms-header-two-fixed-logo__stack" aria-hidden="true">
          <span className="ms-header-two-fixed-logo__layer ms-header-two-fixed-logo__layer--vertical">
            <Image
              src={LogoSecondary}
              alt=""
              priority
              width={252}
              height={166}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </span>
          <span className="ms-header-two-fixed-logo__layer ms-header-two-fixed-logo__layer--horizontal">
            <Image
              src={LogoHorizontalRed}
              alt=""
              priority
              width={417}
              height={129}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </span>
        </span>
      </button>
    );
  }

  return (
    <Link
      href={HOME_LOGO_HREF}
      className={buttonClassName}
      aria-label={logoToggleA11y}
    >
      <Image
        src={LogoSecondary}
        alt=""
        priority
        width={252}
        height={166}
        style={{
          width: 130,
          height: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
    </Link>
  );
};

export default SecondaryFixedLogo;
