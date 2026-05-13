import React, { useEffect } from 'react';
import Link from 'next/link';
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

const HomeFive = () => {
    const { t } = useTranslation('header');

    useEffect(() => {
        document.body.classList.add('page-home-5');
        // Ensure initial view starts at the hero (Firefox may preserve scroll on refresh)
        window.scrollTo(0, 0);
        return () => document.body.classList.remove('page-home-5');
    }, []);

    return (
        <>
            <HeaderTwo deferNavUntilScroll />

            <Link href="/" className="home-five-fixed-logo" aria-label={t('logoAlt')}>
                <Image src={Logo} alt={t('logoAlt')} priority />
            </Link>

            <main className="ms-main">
                <div className="ms-page-content">
                    <HomeFiveParallax>
                        <HomeFiveBanner />
                    </HomeFiveParallax>


                </div>
            </main>

            <Footer />
        </>
    );
}

export default HomeFive;
