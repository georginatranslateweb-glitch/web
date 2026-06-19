import React, { createContext, useContext } from 'react';

import { useClickImageCarousel } from '../../hooks/useClickImageCarousel';

/** Variantes de banner para previsualizar (clic en la foto del hero) */
export const HOME_FIVE_HERO_IMAGES = [
    '/images/bg/banner-1.jpg',
    '/images/bg/banner-2.jpg',
    '/images/bg/banner-3.jpg',
    '/images/bg/banner-4.jpg',
    '/images/bg/banner-5.jpg',
    '/images/bg/banner-6.jpg',
    '/images/bg/banner-7.jpg',
];

const HeroImageCarouselContext = createContext(null);

export function useHeroImageCarousel() {
    return useContext(HeroImageCarouselContext);
}

const HomeFiveParallax = ({ children }) => {
    const carousel = useClickImageCarousel(HOME_FIVE_HERO_IMAGES);

    return (
        <HeroImageCarouselContext.Provider value={carousel}>
            <section
                className="ms-hero home-five-hero"
                style={{ '--home-five-hero-bg': `url(${carousel.src})` }}
            >
                <div className="ms-parallax" data-speed="0.7" data-type="scroll">
                    <div className="jarallax-img"></div>
                </div>
                {children}
            </section>
        </HeroImageCarouselContext.Provider>
    );
};

export default HomeFiveParallax;
