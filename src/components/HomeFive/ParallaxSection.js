import React from 'react';

/** Solo columna derecha del hero (`home-five-bg-slot`); jarallax sin foto */
const HOME_FIVE_HERO_BG = '/images/bg/home-bg.jpg';

const HomeFiveParallax = ({ children }) => {
    return (
        <section
            className="ms-hero home-five-hero"
            style={{ '--home-five-hero-bg': `url(${HOME_FIVE_HERO_BG})` }}
        >
            <div className="ms-parallax" data-speed="0.7" data-type="scroll">
                <div className="jarallax-img"></div>
            </div>
            {children}
        </section>
    );
};

export default HomeFiveParallax;
