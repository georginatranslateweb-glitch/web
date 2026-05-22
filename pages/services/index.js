import React, { useLayoutEffect } from 'react';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import MsHeroParallax from '../../src/components/common/MsHeroParallax';
import ServicesBanner from '../../src/components/ServicesPage/ServicesBanner';

const SERVICE = {
    title: 'Our Services',
    description:
        'Globally morph real-time e-business with optimal users. Dramatically extend high-payoff infomediaries through integrated experiences.',
};

const NEXT_HIGHLIGHT = {
    title: 'Stream Shop',
    href: '/contact',
    image: '/images/portfolio/02.jpg',
};

const Services = () => {
    useLayoutEffect(() => {
        document.body.classList.add('page-services');
        return () => document.body.classList.remove('page-services');
    }, []);

    return (
        <>
            <HeaderTwo secondaryLogoAbsolute />
            <SecondaryFixedLogo placement="fixed" />

            <main className="ms-main">
                <div className="ms-page-content">
                    <div className="services-hero-block">
                        <MsHeroParallax className="project single services-hero" speed={0.7} type="scroll" />
                        <ServicesBanner title={SERVICE.title} description={SERVICE.description} />
                    </div>
                    <div className="team-rules-area">
                        <div className="container">
                            <div className="team-rules-area-inner">
                                <div className="border-line"></div>
                                <div className="top">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4">
                                            <h4 className="heading-title"> Our Services</h4>
                                        </div>
                                        <div className="col-lg-8 col-md-8">
                                            <h1 className="title">Authoritatively seize web readiness. Completely benchmark partnerships. </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="middle">
                                    <div className="row">
                                        <div className="col-lg-4"></div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="inner">
                                                <div className="border-line"></div>
                                                <div className="content">
                                                    <p className="desc">Translation Service <br /> (No.01)</p>
                                                    <h2 className="sub-title">Love what de do</h2>
                                                    <p>Completely plagiarize intermandated services whereas multifunctional mindshare. Monotonectally mesh low-risk high-yield methods of empowerment after cross functional testing procedures.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="inner">
                                                <div className="border-line"></div>
                                                <div className="content">
                                                    <p className="desc">Translation Service <br /> (No.02)</p>
                                                    <h2 className="sub-title">Trust</h2>
                                                    <p>Dynamically maintain reliable e-services without prospective supply chains. Continually deploy cross-unit niches via seamless networks. Synergistically foster ubiquitous methods…</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="inner">
                                                <div className="border-line"></div>
                                                <div className="content">
                                                    <p className="desc">Translation Service <br /> (No.03)</p>
                                                    <h2 className="sub-title">Communication</h2>
                                                    <p>Appropriately parallel task cutting-edge mindshare rather than B2B catalysts for change. Efficiently myocardinate collaborative niche markets without excellent web-readiness.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="inner">
                                                <div className="border-line"></div>
                                                <div className="content">
                                                    <p className="desc">Translation Service <br /> (No.04)</p>
                                                    <h2 className="sub-title">Honesty</h2>
                                                    <p>Monotonectally parallel task cross-unit e-tailers without performance based platforms. Phosfluorescently unleash market-driven niche markets via flexible functionalities.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
};

export default Services;
