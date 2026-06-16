import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';

import HeaderTwo from '../Header/HeaderTwo';
import Footer from '../Footer';
import HomeFiveBanner from './BannerSection';
import HomeFiveParallax from './ParallaxSection';
import HomeFiveGoogleReviews from './GoogleReviewsSection';

import Logo from '../../../public/images/logo/logo-red.png';

const LOGO_MIRROR_LEAVE_MS = 260;

const HomeFive = () => {
    const [layoutHoverMirrorFromFixedLogo, setLayoutHoverMirrorFromFixedLogo] = useState(false);
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

    useLayoutEffect(() => {
        document.body.classList.add('page-home-5');
        window.scrollTo(0, 0);
        return () => {
            document.body.classList.remove('page-home-5');
            clearMirrorLeaveTimer();
        };
    }, [clearMirrorLeaveTimer]);

    return (
        <>
            <HeaderTwo
                alwaysScrolled
                layoutHoverMirrorFromFixedLogo={layoutHoverMirrorFromFixedLogo}
                hideLanguageSwitcher={langDockedInHero}
                mobileDrawerLogoClosed={Logo}
                drawerLogoPeekEnter={startLogoNavMirror}
                drawerLogoPeekLeave={scheduleEndLogoNavMirror}
            />

            <main className="ms-main">
                <div className="ms-page-content">
                    <HomeFiveParallax>
                        <HomeFiveBanner
                            onChromePeekEnter={startLogoNavMirror}
                            onChromePeekLeave={scheduleEndLogoNavMirror}
                            onLangHeroDockedChange={setLangDockedInHero}
                        />
                    </HomeFiveParallax>

                    <HomeFiveGoogleReviews />

                </div>
            </main>

            <Footer />
        </>
    );
};

export default HomeFive;
