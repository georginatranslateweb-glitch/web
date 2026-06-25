import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useAboutTranslation } from '../../i18n/aboutDefaults';
import { buildHowItWorksSteps } from './howItWorksSteps';

const HowItWorksTimeline = dynamic(() => import('./HowItWorksTimeline'), {
    ssr: false,
});

import clientImg1 from "../../../public/images/clients/logo-partner-1.png";
import clientImg2 from "../../../public/images/clients/logo-partner-2.png";
import clientImg3 from "../../../public/images/clients/logo-partner-3.png";
import clientImg4 from "../../../public/images/clients/logo-partner-4.png";
import clientImg5 from "../../../public/images/clients/logo-partner-5.png";
import clientImg6 from "../../../public/images/clients/logo-partner-6.png";
import clientImg7 from "../../../public/images/clients/logo-partner-7.png";
import clientImg8 from "../../../public/images/clients/logo-partner-8.png";
import clientImg9 from "../../../public/images/clients/logo-partner-9.png";

const HomeCV = () => {
    const { tx, defaults } = useAboutTranslation();
    const howItWorksSteps = buildHowItWorksSteps(tx);
    const introParagraphs = tx('intro')
        .split(/<br\s*\/?>/i)
        .map((part) => part.trim())
        .filter(Boolean);

    return (
        <>
            <div className="container">
                <div className="personal-cv-area">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="image-left-side">
                                <Image
                                    className="about-hero-image"
                                    src="/images/about/about-georgina.webp"
                                    width={1200}
                                    height={1600}
                                    alt={tx('heroImageAlt')}
                                    priority
                                    unoptimized
                                    sizes="(min-width: 992px) 42vw, 100vw"
                                />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="right-side-content">
                                <h1 className="heading-title">{tx('heroName')}</h1>
                                <p>

                                    <em>
                                        <span className="cate-color">{tx('heroYears')}&nbsp;</span>
                                        <span> /</span>&nbsp; &nbsp;
                                        <span className="cate-color">{tx('heroLocation')}&nbsp;</span> &nbsp;
                                        <span>/</span>&nbsp; &nbsp;
                                        <span className="cate-color">{tx('heroRole')}</span>
                                        {defaults.heroRole2 ? (
                                            <>
                                                &nbsp;<span>/</span>&nbsp; &nbsp;
                                                <span className="cate-color">{tx('heroRole2')}</span>
                                            </>
                                        ) : null}
                                        {defaults.heroRole3 ? (
                                            <>
                                                &nbsp;<span>/</span>&nbsp; &nbsp;
                                                <span className="cate-color">{tx('heroRole3')}</span>
                                            </>
                                        ) : null}
                                    </em>
                                </p>
                                <div className="about-intro">
                                    {introParagraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                                <div className="services-area">
                                    <h2 className="services-title">{tx('servicesTitle')}</h2>
                                    <div className="services-items">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb">
                                                    <div className="ms-sb--inner">
                                                        <h3 className="how-it-works-timeline__title">{tx('service1Title')}</h3>
                                                        <p className="ms-sb--text">{tx('service1Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb">
                                                    <div className="ms-sb--inner">
                                                        <h3 className="how-it-works-timeline__title">{tx('service2Title')}</h3>
                                                        <p className="ms-sb--text">{tx('service2Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb">
                                                    <div className="ms-sb--inner">
                                                        <h3 className="how-it-works-timeline__title">{tx('service3Title')}</h3>
                                                        <p className="ms-sb--text">{tx('service3Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-area">
                                    <h2 className="services-title">{tx('pricingHowTitle')}</h2>
                                    <HowItWorksTimeline
                                        steps={howItWorksSteps}
                                        logoAlt={tx('timelineLogoAlt')}
                                    />
                                    <div className="how-it-works-timeline__cta">
                                        <Link href="/contact" className="btn-footer">
                                            {defaults.getQuoteCta} <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeCV;
