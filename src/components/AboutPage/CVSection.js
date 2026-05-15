import React, { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation('about');
    /** Hasta layout: forzar en (igual que SSR) para que el primer paint cliente coincida con el HTML del servidor. */
    const [i18nLayoutReady, setI18nLayoutReady] = useState(false);
    useLayoutEffect(() => {
        setI18nLayoutReady(true);
    }, []);
    const lng = i18nLayoutReady
        ? (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
        : 'en';
    const tx = (key) => t(key, { lng });

    return (
        <>
            <div className="container">
                <div className="personal-cv-area">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="image-left-side">
                                <Image src={CVImg} alt={tx('heroImageAlt')} />
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
                                    </em>
                                </p>
                                <p className="desc">{tx('intro')}</p>
                                <div className="services-area">
                                    <h2 className="services-title">{tx('servicesTitle')}</h2>
                                    <div className="services-items">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon1} className="attachment-full size-full" alt={tx('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{tx('service1Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{tx('service1Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon2} className="attachment-full size-full" alt={tx('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{tx('service2Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{tx('service2Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon3} className="attachment-full size-full" alt={tx('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{tx('service3Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{tx('service3Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img default">
                                                        <Image src={icon4} className="attachment-full size-full" alt={tx('serviceIconAlt')} />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h4 className="ms-sb--title">
                                                            <span>{tx('service4Title')}</span>
                                                        </h4>
                                                        <p className="ms-sb--text">{tx('service4Text')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-area">
                                    <h2 className="pricing-title">{tx('pricingHowTitle')}</h2>
                                    <div className="pricing-inner">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 col-sm-4 inner">
                                                <div className="ms-pt-block">
                                                    <div className="ms-pt--price">
                                                    </div>
                                                    <div className="ms-pt--header top">
                                                        <h4 className="ms-pt--title"> {tx('planBasic')} </h4>
                                                        <span className="currency currency--before">$</span>
                                                        <span className="price">29</span>
                                                        <span className="period">{tx('perHour')}</span>
                                                    </div>
                                                    <div className="ms-pt--content">
                                                        <ul>
                                                            <li className="active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 24 24" strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 6L9 17l-5-5"></path>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureConsulting')} </span>
                                                            </li>
                                                            <li className="active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 24 24" strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 6L9 17l-5-5"></path>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureDevelopment')} </span>
                                                            </li>
                                                            <li className="no-active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path className="cls-1" d="M7 7l18 18M7 25L25 7"></path>
                                                                        </g>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureDesign')} </span>
                                                            </li>
                                                            <li className="no-active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path className="cls-1" d="M7 7l18 18M7 25L25 7"></path>
                                                                        </g>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureSupport')} </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="ms-pt--footer">
                                                        <a className="btn btn--ba btn--primary" role="button" href="#">
                                                            <div className="ms-btn__text">
                                                                <span className="text--main">{tx('choosePlan')}</span>
                                                            </div>
                                                            <span className="ms-btn--ripple"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 inner">
                                                <div className="ms-pt-block">
                                                    <div className="ms-pt--price">
                                                    </div>
                                                    <div className="ms-pt--header top">
                                                        <h4 className="ms-pt--title"> {tx('planAdvanced')} </h4>
                                                        <span className="currency currency--before">$</span>
                                                        <span className="price">39</span>
                                                        <span className="period">{tx('perHour')}</span>
                                                    </div>
                                                    <div className="ms-pt--content">
                                                        <ul>
                                                            <li className="active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 24 24" strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 6L9 17l-5-5"></path>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureConsulting')} </span>
                                                            </li>
                                                            <li className="active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 24 24" strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 6L9 17l-5-5"></path>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureDevelopment')} </span>
                                                            </li>
                                                            <li className="no-active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path className="cls-1" d="M7 7l18 18M7 25L25 7"></path>
                                                                        </g>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureDesign')} </span>
                                                            </li>
                                                            <li className="no-active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path className="cls-1" d="M7 7l18 18M7 25L25 7"></path>
                                                                        </g>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureSupport')} </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="ms-pt--footer">
                                                        <a className="btn btn--ba btn--primary" role="button" href="#">
                                                            <div className="ms-btn__text">
                                                                <span className="text--main">{tx('choosePlan')}</span>
                                                            </div>
                                                            <span className="ms-btn--ripple"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 inner">
                                                <div className="ms-pt-block">
                                                    <div className="ms-pt--price">
                                                    </div>
                                                    <div className="ms-pt--header top">
                                                        <h4 className="ms-pt--title"> {tx('planPremium')} </h4>
                                                        <span className="currency currency--before">$</span>
                                                        <span className="price">99</span>
                                                        <span className="period">{tx('perHour')}</span>
                                                    </div>
                                                    <div className="ms-pt--content">
                                                        <ul>
                                                            <li className="active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 24 24" strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 6L9 17l-5-5"></path>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureConsulting')} </span>
                                                            </li>
                                                            <li className="active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 24 24" strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M20 6L9 17l-5-5"></path>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureDevelopment')} </span>
                                                            </li>
                                                            <li className="no-active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path className="cls-1" d="M7 7l18 18M7 25L25 7"></path>
                                                                        </g>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureDesign')} </span>
                                                            </li>
                                                            <li className="no-active">
                                                                <i className="icon-check">
                                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path className="cls-1" d="M7 7l18 18M7 25L25 7"></path>
                                                                        </g>
                                                                    </svg>
                                                                </i>
                                                                <span> {tx('featureSupport')} </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="ms-pt--footer">
                                                        <a className="btn btn--ba btn--primary" role="button" href="#">
                                                            <div className="ms-btn__text">
                                                                <span className="text--main">{tx('choosePlan')}</span>
                                                            </div>
                                                            <span className="ms-btn--ripple"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clients-area">
                                    <h2 className="clients-title">{tx('clientsTitle')}</h2>
                                    <div className="clients-inner">
                                        <div id="gallery-1" className="gallery galleryid-1718 gallery-columns-5 gallery-size-medium">
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg1} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg2} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg3} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg4} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg5} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg6} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg7} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg8} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                            <figure className="gallery-item">
                                                <div className="gallery-icon landscape">
                                                    <Image width="300" height="243" src={clientImg9} className="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
                                                </div>
                                            </figure>
                                        </div>
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
