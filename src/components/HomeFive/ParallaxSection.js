import React from 'react';

/** Imagen fija del hero */
export const HOME_FIVE_HERO_IMAGE = '/images/bg/banner-1.jpg';

const HomeFiveParallax = ({ children }) => {
    return (
        <section
            className="ms-hero home-five-hero"
            style={{ '--home-five-hero-bg': `url(${HOME_FIVE_HERO_IMAGE})` }}
        >
            <div className="ms-parallax" data-speed="0.7" data-type="scroll">
                <div className="jarallax-img"></div>
            </div>
            {children}
        </section>
    );
};

export default HomeFiveParallax;
