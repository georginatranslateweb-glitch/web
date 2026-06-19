import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useHydrationSafeTranslation, SSR_I18N_LANG } from '../../i18n/useHydrationSafeTranslation';
import { buildHowItWorksSteps } from './howItWorksSteps';
import enAbout from '../../locales/en/about.json';
import esAbout from '../../locales/es/about.json';

const HowItWorksTimeline = dynamic(() => import('./HowItWorksTimeline'), {
    ssr: false,
});

import CVImg from "../../../public/images/portfolio/personal-cv.jpg";
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
    const { t, i18n, hydrated } = useHydrationSafeTranslation('about');
    const howItWorksSteps = buildHowItWorksSteps(t);
    const lang = hydrated
        ? (i18n.resolvedLanguage || i18n.language || SSR_I18N_LANG)
        : SSR_I18N_LANG;
    const getQuoteCta = (lang.startsWith('es') ? esAbout : enAbout).getQuoteCta;
    const introParagraphs = t('intro')
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
                                <Image src={CVImg} alt={t('heroImageAlt')} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="right-side-content">
                                <h1 className="heading-title">{t('heroName')}</h1>
                                <p>

                                    <em>
                                        <span className="cate-color">{t('heroYears')}&nbsp;</span>
                                        <span> /</span>&nbsp; &nbsp;
                                        <span className="cate-color">{t('heroLocation')}&nbsp;</span> &nbsp;
                                        <span>/</span>&nbsp; &nbsp;
                                        <span className="cate-color">{t('heroRole')}</span>
                                    </em>
                                </p>
                                <div className="about-intro">
                                    {introParagraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                                <div className="services-area">
                                    <h2 className="services-title">{t('servicesTitle')}</h2>
                                    <div className="services-items">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb">
                                                    <div className="ms-sb--inner">
                                                        <h3 className="how-it-works-timeline__title">{t('service1Title')}</h3>
                                                        <p className="ms-sb--text">{t('service1Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb">
                                                    <div className="ms-sb--inner">
                                                        <h3 className="how-it-works-timeline__title">{t('service2Title')}</h3>
                                                        <p className="ms-sb--text">{t('service2Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb">
                                                    <div className="ms-sb--inner">
                                                        <h3 className="how-it-works-timeline__title">{t('service3Title')}</h3>
                                                        <p className="ms-sb--text">{t('service3Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-area">
                                    <h2 className="services-title">{t('pricingHowTitle')}</h2>
                                    <HowItWorksTimeline
                                        steps={howItWorksSteps}
                                        logoAlt={t('timelineLogoAlt')}
                                    />
                                    <div className="how-it-works-timeline__cta">
                                        <Link href="/contact" className="btn-footer">
                                            {getQuoteCta} <i className="fas fa-arrow-right"></i>
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
