import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import HeaderTwo, {
    MOST_HEADER_TWO_MOBILE_NAV_CHANGE,
    MOST_HEADER_TWO_TOGGLE_MOBILE_NAV,
} from '../../src/components/Header/HeaderTwo';
import Footer from '../../src/components/Footer';
import HomeFiveBanner from './BannerSection';
import HomeFiveParallax from './ParallaxSection';
import HomeFivePortfolio from './PortfolioSection';
import HomeFiveService from './ServiceSection';
import HomeFiveClient from './ClientSection';

import Logo from '../../public/images/logo/logo-red.png';
import LogoBeige from '../../public/images/logo/logo-beige.png';

const LOGO_MIRROR_LEAVE_MS = 260;
const MOBILE_HEADER_MQ = '(max-width: 1023px)';

const HomeFive = () => {
    const { t } = useTranslation('header');
    const [layoutHoverMirrorFromFixedLogo, setLayoutHoverMirrorFromFixedLogo] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [isNarrowViewport, setIsNarrowViewport] = useState(false);
    /** ≥992px y logo vertical del hero visible: idioma renderizado junto a la hamburguesa, no en el header. */
    const [langDockedInHero, setLangDockedInHero] = useState(false);
    const mirrorLeaveTimerRef = useRef(null);

    const clearMirrorLeaveTimer = useCallback(() => {
        if (mirrorLeaveTimerRef.current != null) {
            clearTimeout(mirrorLeaveTimerRef.current);
            mirrorLeaveTimerRef.current = null;
        }
    }, []);

    const startLogoNavMirror = useCallback(() => {
        clearMirrorLeaveTimer();
        setLayoutHoverMirrorFromFixedLogo(true);
    }, [clearMirrorLeaveTimer]);

    const scheduleEndLogoNavMirror = useCallback(() => {
        clearMirrorLeaveTimer();
        mirrorLeaveTimerRef.current = setTimeout(() => {
            setLayoutHoverMirrorFromFixedLogo(false);
            mirrorLeaveTimerRef.current = null;
        }, LOGO_MIRROR_LEAVE_MS);
    }, [clearMirrorLeaveTimer]);

    useEffect(() => {
        document.body.classList.add('page-home-5');
        window.scrollTo(0, 0);
        return () => {
            document.body.classList.remove('page-home-5');
            clearMirrorLeaveTimer();
        };
    }, [clearMirrorLeaveTimer]);

    useEffect(() => {
        const onNavChange = (e) => {
            setMobileNavOpen(!!e.detail?.open);
        };
        window.addEventListener(MOST_HEADER_TWO_MOBILE_NAV_CHANGE, onNavChange);
        return () => window.removeEventListener(MOST_HEADER_TWO_MOBILE_NAV_CHANGE, onNavChange);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia(MOBILE_HEADER_MQ);
        const sync = () => setIsNarrowViewport(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    const fixedLogoLabel = `${t('logoAlt')} — ${t('toggleMenu')}`;
    const fixedLogoSrc = mobileNavOpen && isNarrowViewport ? LogoBeige : Logo;

    return (
        <>
            <HeaderTwo
                alwaysScrolled
                layoutHoverMirrorFromFixedLogo={layoutHoverMirrorFromFixedLogo}
                hideLanguageSwitcher={langDockedInHero}
            />

            <button
                type="button"
                className="home-five-fixed-logo"
                aria-label={fixedLogoLabel}
                onMouseEnter={startLogoNavMirror}
                onMouseLeave={scheduleEndLogoNavMirror}
                onFocus={startLogoNavMirror}
                onBlur={scheduleEndLogoNavMirror}
                onTouchStart={startLogoNavMirror}
                onTouchEnd={scheduleEndLogoNavMirror}
                onClick={() => {
                    if (typeof window === 'undefined') return;
                    if (!window.matchMedia(MOBILE_HEADER_MQ).matches) return;
                    window.dispatchEvent(new CustomEvent(MOST_HEADER_TWO_TOGGLE_MOBILE_NAV));
                }}
            >
                <Image src={fixedLogoSrc} alt="" priority />
            </button>

            <main className="ms-main">
                <div className="ms-page-content">
                    <HomeFiveParallax>
                        <HomeFiveBanner
                            onChromePeekEnter={startLogoNavMirror}
                            onChromePeekLeave={scheduleEndLogoNavMirror}
                            onLangHeroDockedChange={setLangDockedInHero}
                        />
                    </HomeFiveParallax>


                </div>
            </main>

            <Footer />
        </>
    );
}

export default HomeFive;
