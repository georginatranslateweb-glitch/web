import React from 'react';

const HomeFiveParallax = ({ children }) => {
    return (
        <section
            className="ms-hero home-five-hero"
        >
            <div className="ms-parallax" data-speed="0.7" data-type="scroll">
                <div className="jarallax-img"></div>
            </div>
            {children}
        </section>
    );
};

export default HomeFiveParallax;
