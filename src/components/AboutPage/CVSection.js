import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAboutTranslation } from '../../i18n/aboutDefaults';
import { buildHowItWorksSteps } from './howItWorksSteps';
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from '../motion/variants';
import ArrowIcon from '../icons/ArrowIcon';

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
                            <motion.div
                                className="image-left-side"
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                            >
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
                            </motion.div>
                        </div>
                        <div className="col-lg-7">
                            <div className="right-side-content">
                                <motion.div
                                    variants={staggerContainer(0.1)}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.h1 className="heading-title" variants={staggerItem}>{tx('heroName')}</motion.h1>
                                    <motion.p variants={staggerItem}>

                                        <em>
                                            {defaults.heroYears ? (
                                                <>
                                                    <span className="cate-color">{tx('heroYears')}&nbsp;</span>
                                                    <span> /</span>&nbsp; &nbsp;
                                                </>
                                            ) : null}
                                            {defaults.heroLocation ? (
                                                <>
                                                    <span className="cate-color">{tx('heroLocation')}&nbsp;</span> &nbsp;
                                                    <span>/</span>&nbsp; &nbsp;
                                                </>
                                            ) : null}
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
                                    </motion.p>
                                    <motion.div className="about-intro" variants={staggerItem}>
                                        {introParagraphs.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </motion.div>
                                </motion.div>
                                <motion.div
                                    className="services-area"
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={VIEWPORT_ONCE}
                                >
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
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="about-services-cta">
                                                    <Link href="/services" className="btn-footer">
                                                        {tx('moreAboutServicesCta')} <ArrowIcon />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="pricing-area"
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={VIEWPORT_ONCE}
                                >
                                    <h2 className="services-title">{tx('pricingHowTitle')}</h2>
                                    <HowItWorksTimeline
                                        steps={howItWorksSteps}
                                        logoAlt={tx('timelineLogoAlt')}
                                    />
                                    <div className="how-it-works-timeline__cta">
                                        <Link href="/contact" className="btn-footer">
                                            {defaults.getQuoteCta} <ArrowIcon />
                                        </Link>
                                    </div>

                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeCV;
