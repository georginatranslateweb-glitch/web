import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';
import { buildHowItWorksSteps } from './howItWorksSteps';

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

import icon1 from "../../../public/images/services/icon/code-1.svg";
import icon2 from "../../../public/images/services/icon/code-2.svg";
import icon3 from "../../../public/images/services/icon/code-3.svg";
import icon4 from "../../../public/images/services/icon/code-4.svg";

const HomeCV = () => {
    const { t } = useHydrationSafeTranslation('about');
    const howItWorksSteps = buildHowItWorksSteps(t);

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
                                <p className="desc">{t('intro')}</p>
                                <div className="services-area">
                                    <h2 className="services-title">{t('servicesTitle')}</h2>
                                    <div className="services-items">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon1} className="attachment-full size-full" alt={t('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{t('service1Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{t('service1Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon2} className="attachment-full size-full" alt={t('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{t('service2Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{t('service2Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon3} className="attachment-full size-full" alt={t('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{t('service3Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{t('service3Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon4} className="attachment-full size-full" alt={t('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{t('service4Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{t('service4Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-area">
                                    <h2 className="pricing-title">{t('pricingHowTitle')}</h2>
                                    <HowItWorksTimeline
                                        steps={howItWorksSteps}
                                        logoAlt={t('timelineLogoAlt')}
                                    />

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
