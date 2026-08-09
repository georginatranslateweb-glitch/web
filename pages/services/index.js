import React, { useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import MsHeroParallax from '../../src/components/common/MsHeroParallax';
import ServicesBanner from '../../src/components/ServicesPage/ServicesBanner';
import ServiceSection from '../../src/components/ServicesPage/ServiceSection';
import { useServicesTranslation } from '../../src/i18n/servicesDefaults';
import { useAboutTranslation } from '../../src/i18n/aboutDefaults';
import { buildHowItWorksSteps } from '../../src/components/AboutPage/howItWorksSteps';
import { fadeUp, VIEWPORT_ONCE } from '../../src/components/motion/variants';
import ArrowIcon from '../../src/components/icons/ArrowIcon';

const HowItWorksTimeline = dynamic(
    () => import('../../src/components/AboutPage/HowItWorksTimeline'),
    { ssr: false },
);

const SERVICES_HERO_IMAGE = '/images/services/services-7-768.webp';
const SERVICES_HERO_IMAGE_MD = '/images/services/services-7-1200.webp';
const SERVICES_HERO_IMAGE_LG = '/images/services/services-7.webp';

const Services = () => {
    const { tx } = useServicesTranslation();
    const { tx: txAbout, defaults: aboutDefaults } = useAboutTranslation();

    const howItWorksSteps = buildHowItWorksSteps(txAbout);
    const naatiWhatItIsItems = tx('naati.whatItIsItems') || [];
    const naatiHowItWorksSteps = tx('naati.howItWorksSteps') || [];
    const localisationWhatIDoItems = tx('localisation.whatIDoItems') || [];
    const proofreadingWhatIDoItems = tx('proofreading.whatIDoItems') || [];

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
                    <div
                        className="services-hero-block"
                        style={{
                            '--services-hero-bg': `url(${SERVICES_HERO_IMAGE})`,
                            '--services-hero-bg-md': `url(${SERVICES_HERO_IMAGE_MD})`,
                            '--services-hero-bg-lg': `url(${SERVICES_HERO_IMAGE_LG})`,
                        }}
                    >
                        <MsHeroParallax
                            className="project single services-hero"
                            speed={0.7}
                            type="scroll"
                        />
                        <ServicesBanner
                            title={tx('hero.title')}
                            description={tx('hero.description')}
                            ctaLabel={tx('hero.ctaLabel')}
                        >
                            <ServiceSection
                                flush
                                headingTitle={tx('common.headingService1')}
                                title={tx('naati.title')}
                            >
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.whatItIsTitle')}</h2>
                                            <p>{tx('naati.whatItIsParagraph')}</p>
                                            <ul>
                                                {naatiWhatItIsItems.map((item) => (
                                                    <li key={item.label}>
                                                        <span className="services-list__label">{item.label}</span>{' '}
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.whoIsItForTitle')}</h2>
                                            <p>{tx('naati.whoIsItForParagraph')}</p>
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
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.whyItMattersTitle')}</h2>
                                            <p>{tx('naati.whyItMattersParagraph1')}</p>
                                            <p>{tx('naati.whyItMattersParagraph2')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.howItWorksTitle')}</h2>
                                            <ul>
                                                {naatiHowItWorksSteps.map((step) => (
                                                    <li key={step}>{step}</li>
                                                ))}
                                            </ul>
                                            <div className="services-talk-cta">
                                                <a
                                                    href="https://wa.me/61423915231"
                                                    className="btn-footer"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {tx('common.talkCta')} <ArrowIcon />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                    </ServiceSection>

                    <ServiceSection
                                flush
                                headingTitle={tx('common.headingService2')}
                                title={tx('localisation.title')}
                            >
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whatItIsTitle')}</h2>
                                            <p>{tx('localisation.whatItIsParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whoIsItForTitle')}</h2>
                                            <p>{tx('localisation.whoIsItForParagraph')}</p>
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
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whyItMattersTitle')}</h2>
                                            <p>{tx('localisation.whyItMattersParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whatIDoTitle')}</h2>
                                            <ul>
                                                {localisationWhatIDoItems.map((item) => (
                                                    <li key={item.label}>
                                                        <span className="services-list__label">{item.label}</span>{' '}
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="services-talk-cta">
                                                <a
                                                    href="https://wa.me/61423915231"
                                                    className="btn-footer"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {tx('common.talkCta')} <ArrowIcon />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                    </ServiceSection>

                    <ServiceSection
                                flush
                                headingTitle={tx('common.headingService3')}
                                title={tx('proofreading.title')}
                            >
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whatItIsTitle')}</h2>
                                            <p>{tx('proofreading.whatItIsParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whoIsItForTitle')}</h2>
                                            <p>{tx('proofreading.whoIsItForParagraph')}</p>
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
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whyItMattersTitle')}</h2>
                                            <p>{tx('proofreading.whyItMattersParagraph1')}</p>
                                            <p>{tx('proofreading.whyItMattersParagraph2')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whatIDoTitle')}</h2>
                                            <ul>
                                                {proofreadingWhatIDoItems.map((item) => (
                                                    <li key={item.label}>
                                                        <span className="services-list__label">{item.label}</span>{' '}
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="services-talk-cta">
                                                <a
                                                    href="https://wa.me/61423915231"
                                                    className="btn-footer"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {tx('common.talkCta')} <ArrowIcon />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                            </ServiceSection>
                        </ServicesBanner>
                    </div>

                    <div className="container">
                        <motion.div
                            className="pricing-area how-it-works-section"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={VIEWPORT_ONCE}
                        >
                            <h2 className="heading-title" style={{ textTransform: 'none' }}>
                                {txAbout('pricingHowTitle')}
                            </h2>
                            <HowItWorksTimeline
                                steps={howItWorksSteps}
                                logoAlt={txAbout('timelineLogoAlt')}
                            />
                            <div className="how-it-works-timeline__cta">
                                <Link href="/contact" className="btn-footer">
                                    {aboutDefaults.getQuoteCta} <ArrowIcon />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Services;
