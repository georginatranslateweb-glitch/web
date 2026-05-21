import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';

import LogoSecondary from '../../../public/images/logo/logo-secundario.png';
import LogoHorizontalRed from '../../../public/images/logo/logo-horizontal-red.png';
import {
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
  const useHorizontalLogo =
    placement === 'inHeader' &&
    isNarrowViewport &&
    scrolled &&
    !mobileNavOpen;
  const logoSrc = useHorizontalLogo ? LogoHorizontalRed : LogoSecondary;

  if (placement === 'fixed' && isNarrowViewport) return null;
  if (placement === 'inHeader' && !isNarrowViewport) return null;

  return (
    <button
      type="button"
      className={`ms-header-two-fixed-logo${placement === 'inHeader' ? ' ms-header-two-fixed-logo--in-header' : ''}${useHorizontalLogo ? ' ms-header-two-fixed-logo--horizontal' : ''}`}
      aria-label={logoToggleA11y}
      aria-expanded={mobileNavOpen ? 'true' : 'false'}
      aria-controls="main-header-nav"
      onClick={() => {
        if (typeof window === 'undefined') return;
        if (!window.matchMedia(NARROW_HEADER_MQ).matches) return;
        window.dispatchEvent(new CustomEvent(MOST_HEADER_TWO_TOGGLE_MOBILE_NAV));
      }}
    >
      <Image
        src={logoSrc}
        alt=""
        priority
        width={useHorizontalLogo ? 417 : 252}
        height={useHorizontalLogo ? 129 : 166}
        style={{
          width: placement === 'fixed' ? 130 : '100%',
          height: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
    </button>
  );
};

export default SecondaryFixedLogo;
