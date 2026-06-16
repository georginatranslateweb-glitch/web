import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';

import LogoBeige from '../../../public/images/logo/logo-beige.png';
import { HOME_LOGO_HREF, MOST_HEADER_TWO_TOGGLE_MOBILE_NAV } from './headerEvents';

const NARROW_HEADER_MQ = '(max-width: 1023px)';

/**
 * Logo fijo del menú móvil (mismo elemento que home-05).
 * HeaderTwo lo monta en todas las páginas ≤1023px; abre/cierra el drawer y muestra logo beige al expandir.
 */
const MobileDrawerLogo = ({
  menuOpen = false,
  logoClosed,
  logoOpen = LogoBeige,
  onToggle,
  onPeekEnter,
  onPeekLeave,
  priority = false,
}) => {
  const { t } = useHydrationSafeTranslation('header');
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const label = `${t('logoAlt')} — ${t('toggleMenu')}`;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia(NARROW_HEADER_MQ);
    const sync = () => setIsNarrowViewport(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const handleToggle = () => {
    if (typeof onToggle === 'function') {
      onToggle();
      return;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(MOST_HEADER_TWO_TOGGLE_MOBILE_NAV));
    }
  };

  const handleClick = () => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia(NARROW_HEADER_MQ).matches) return;
    handleToggle();
  };

  const logoImage = (
    <Image
      src={menuOpen ? logoOpen : logoClosed}
      alt=""
      priority={priority}
      width={252}
      height={166}
      className="ms-mobile-drawer-logo__img"
    />
  );

  if (!isNarrowViewport) {
    return (
      <Link
        href={HOME_LOGO_HREF}
        className="ms-mobile-drawer-logo"
        aria-label={label}
        onMouseEnter={onPeekEnter}
        onMouseLeave={onPeekLeave}
        onFocus={onPeekEnter}
        onBlur={onPeekLeave}
      >
        {logoImage}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="ms-mobile-drawer-logo"
      aria-label={label}
      aria-expanded={menuOpen ? 'true' : 'false'}
      aria-controls="main-header-nav"
      onMouseEnter={onPeekEnter}
      onMouseLeave={onPeekLeave}
      onFocus={onPeekEnter}
      onBlur={onPeekLeave}
      onTouchStart={onPeekEnter}
      onTouchEnd={onPeekLeave}
      onClick={handleClick}
    >
      {logoImage}
    </button>
  );
};

export default MobileDrawerLogo;
