import React, { useLayoutEffect } from 'react';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import MsHeroParallax from '../../src/components/common/MsHeroParallax';
import ServicesBanner from '../../src/components/ServicesPage/ServicesBanner';
import ServiceSection from '../../src/components/ServicesPage/ServiceSection';

const SERVICE = {
    title: 'Our Services',
    description:
        'Globally morph real-time e-business with optimal users. Dramatically extend high-payoff infomediaries through integrated experiences.',
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

                    <ServiceSection headingTitle="Our Services" title="NAATI-Certified Translations.">
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Spanish to English</h2>
                                            <p>Professional certified Spanish to English translations for migration, legal, academic, and official purposes across Australia.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Why it Matters</h2>
                                            <p>NAATI (National Accreditation Authority for Translators and Interpreters) is Australia's national certification body for language professionals. NAATI-certified translations are widely recognised and accepted by the Department of Home Affairs, universities, professional bodies, government agencies, employers, and other organisations across Australia.</p>
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
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Communication</h2>
                                            <p>Appropriately parallel task cutting-edge mindshare rather than B2B catalysts for change. Efficiently myocardinate collaborative niche markets without excellent web-readiness.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Who is it for</h2>
                                            <p>Whether you are applying for a visa, enrolling in studies, registering a qualification, or completing an official process, a certified translation helps ensure your documents meet Australian requirements and that your information is communicated accurately, clearly, and professionally.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                    </ServiceSection>

                    <ServiceSection headingTitle="Our Services" title="Localisation Services">
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Why it Matters</h2>
                                            <p>Localisation goes beyond words. Because successful communication depends on true cultural connection, I adapt your content so it respects context, carries the right tone, and resonates naturally with your target audience.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">What I do</h2>
                                            <ul>
                                                <li><span className="services-list__label">Digital Content:</span> Websites, apps, and UX copy.</li>
                                                <li><span className="services-list__label">Marketing & brands:</span> Campaigns and brand communication</li>
                                                <li><span className="services-list__label">Social media:</span> Engaging, culturally relevant posts</li>
                                                <li><span className="services-list__label">Cultural review:</span> Nuance and linguistic checks</li>
                                            </ul>
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
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Who is it for</h2>
                                            <p>Brands, agencies, businesses and entities looking to communicate successfully across English and Spanish-speaking markets.</p>
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
                    </ServiceSection>

                    <ServiceSection headingTitle="Our Services" title="Proofreading">
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Why it Matters</h2>
                                            <p>A careful review does more than fix typos. It protects your credibility. I refine your translated or written content to ensure perfect tone, flow, and consistency, catching the critical nuances that automated grammar checkers miss.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">What I do</h2>
                                            <ul>
                                                <li><span className="services-list__label">Translation review:</span> Double-checking accuracy and flow.</li>
                                                <li><span className="services-list__label">Editing & Proofreading:</span> Polishing grammar, spelling, and style.</li>
                                                <li><span className="services-list__label">Quality assurance checks:</span> Final checks before publishing or submitting.</li>
                                                <li><span className="services-list__label">Formatting and consistency review:</span> Ensuring a clean, uniform look.</li>
                                            </ul>
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
                                            <p className="desc">Translation Service</p>
                                            <h2 className="sub-title">Who is it for</h2>
                                            <p>Individuals, students, businesses, and fellow translators who need a flawless final document.</p>
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
                    </ServiceSection>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Services;
