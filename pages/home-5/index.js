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

const PEEK_LEAVE_MS = 260;

const HomeFive = () => {
    const { t } = useTranslation('header');
    const [chromePeek, setChromePeek] = useState(false);
    const peekLeaveTimerRef = useRef(null);

    const clearPeekLeaveTimer = useCallback(() => {
        if (peekLeaveTimerRef.current != null) {
            clearTimeout(peekLeaveTimerRef.current);
            peekLeaveTimerRef.current = null;
        }
    }, []);

    const startChromePeek = useCallback(() => {
        clearPeekLeaveTimer();
        setChromePeek(true);
    }, [clearPeekLeaveTimer]);

    const scheduleEndChromePeek = useCallback(() => {
        clearPeekLeaveTimer();
        peekLeaveTimerRef.current = setTimeout(() => {
            setChromePeek(false);
            peekLeaveTimerRef.current = null;
        }, PEEK_LEAVE_MS);
    }, [clearPeekLeaveTimer]);

    useEffect(() => {
        document.body.classList.add('page-home-5');
        window.scrollTo(0, 0);
        return () => {
            document.body.classList.remove('page-home-5', 'page-home-5--header-active');
            clearPeekLeaveTimer();
        };
    }, [clearPeekLeaveTimer]);

    useEffect(() => {
        const setFromScroll = () => {
            const active = window.pageYOffset > 100;
            document.body.classList.toggle('page-home-5--header-active', active);
        };
        setFromScroll();
        window.addEventListener('scroll', setFromScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', setFromScroll);
            document.body.classList.remove('page-home-5--header-active');
        };
    }, []);

    const fixedLogoLabel = `${t('logoAlt')} — ${t('toggleMenu')}`;

    return (
        <>
            <HeaderTwo
                deferNavUntilScroll
                chromePeek={chromePeek}
                onChromePeekBridgeEnter={startChromePeek}
                onChromePeekBridgeLeave={scheduleEndChromePeek}
            />

            <button
                type="button"
                className="home-five-fixed-logo"
                aria-label={fixedLogoLabel}
                onMouseEnter={startChromePeek}
                onMouseLeave={scheduleEndChromePeek}
                onFocus={startChromePeek}
                onBlur={scheduleEndChromePeek}
                onTouchStart={startChromePeek}
                onTouchEnd={scheduleEndChromePeek}
            >
                <Image src={Logo} alt="" priority />
            </button>

            <main className="ms-main">
                <div className="ms-page-content">
                    <HomeFiveParallax>
                        <HomeFiveBanner
                            onChromePeekEnter={startChromePeek}
                            onChromePeekLeave={scheduleEndChromePeek}
                        />
                    </HomeFiveParallax>


                </div>
            </main>

            <Footer />
        </>
    );
}

export default HomeFive;
