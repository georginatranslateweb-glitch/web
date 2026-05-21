import React from 'react';
import Image from 'next/image';
import { useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';

import LogoBeige from '../../../public/images/logo/logo-beige.png';
import { MOST_HEADER_TWO_TOGGLE_MOBILE_NAV } from './headerEvents';

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
  const label = `${t('logoAlt')} — ${t('toggleMenu')}`;

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
      <Image
        src={menuOpen ? logoOpen : logoClosed}
        alt=""
        priority={priority}
        width={252}
        height={166}
        className="ms-mobile-drawer-logo__img"
      />
    </button>
  );
};

export default MobileDrawerLogo;
