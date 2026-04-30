import React, { useEffect } from 'react';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import Footer from '../../src/components/Footer';
import HomeFiveBanner from './BannerSection';
import HomeFiveParallax from './ParallaxSection';
import HomeFivePortfolio from './PortfolioSection';
import HomeFiveService from './ServiceSection';
import HomeFiveClient from './ClientSection';

const HomeFive = () => {
    useEffect(() => {
        document.body.classList.add('page-home-5');
        // Ensure initial view starts at the hero (Firefox may preserve scroll on refresh)
        window.scrollTo(0, 0);
        return () => document.body.classList.remove('page-home-5');
    }, []);

    return (
        <>
            <HeaderTwo />

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
