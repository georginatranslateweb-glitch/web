import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import Footer from '../../src/components/Footer';
import HomeFiveBanner from './BannerSection';
import HomeFiveParallax from './ParallaxSection';
import HomeFivePortfolio from './PortfolioSection';
import HomeFiveService from './ServiceSection';
import HomeFiveClient from './ClientSection';

import Logo from '../../public/images/logo/logo-red.png';

const LOGO_MIRROR_LEAVE_MS = 260;

const HomeFive = () => {
    const { t } = useTranslation('header');
    const [layoutHoverMirrorFromFixedLogo, setLayoutHoverMirrorFromFixedLogo] = useState(false);
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

    const fixedLogoLabel = `${t('logoAlt')} — ${t('toggleMenu')}`;

    return (
        <>
            <HeaderTwo
                alwaysScrolled
                layoutHoverMirrorFromFixedLogo={layoutHoverMirrorFromFixedLogo}
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
            >
                <Image src={Logo} alt="" priority />
            </button>

            <main className="ms-main">
                <div className="ms-page-content">
                    <HomeFiveParallax>
                        <HomeFiveBanner
                            onChromePeekEnter={startLogoNavMirror}
                            onChromePeekLeave={scheduleEndLogoNavMirror}
                        />
                    </HomeFiveParallax>


                </div>
            </main>

            <Footer />
        </>
    );
}

export default HomeFive;
