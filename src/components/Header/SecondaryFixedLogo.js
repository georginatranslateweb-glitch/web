import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';

import LogoSecondary from '../../../public/images/logo/logo-secundario.png';
import LogoBeige from '../../../public/images/logo/logo-beige.png';

import {
  MOST_HEADER_TWO_MOBILE_NAV_CHANGE,
  MOST_HEADER_TWO_TOGGLE_MOBILE_NAV,
} from './HeaderTwo';

const NARROW_HEADER_MQ = '(max-width: 1023px)';

const SecondaryFixedLogo = () => {
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
  const logoSrc = mobileNavOpen && isNarrowViewport ? LogoBeige : LogoSecondary;

  return (
    <button
      type="button"
      className="ms-header-two-fixed-logo"
      aria-label={logoToggleA11y}
      aria-expanded={mobileNavOpen ? 'true' : 'false'}
      aria-controls="main-header-nav"
      onClick={() => {
        if (typeof window === 'undefined') return;
        if (!window.matchMedia(NARROW_HEADER_MQ).matches) return;
        window.dispatchEvent(new CustomEvent(MOST_HEADER_TWO_TOGGLE_MOBILE_NAV));
      }}
    >
      <Image src={logoSrc} alt="" priority />
    </button>
  );
};

export default SecondaryFixedLogo;
