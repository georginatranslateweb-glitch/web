import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import enHome from '../../src/locales/en/home.json';
import esHome from '../../src/locales/es/home.json';

/** Fallback copy bundled so SSR / primera pintura coinciden aunque i18n tarde en marcar el ns como listo */
function homeFiveBannerDefaults(lang) {
    const code = String(lang || 'en').toLowerCase().split('-')[0];
    const bundle = code === 'es' ? esHome : enHome;
    return bundle.homeFive.banner;
}

const HomeFiveBanner = () => {
    const { t, i18n } = useTranslation('home');
    const d = homeFiveBannerDefaults(i18n.resolvedLanguage || i18n.language);
    const titleLine1 = t('homeFive.banner.titleLine1', { defaultValue: d.titleLine1 });
    const titleLine2Raw = t('homeFive.banner.titleLine2', { defaultValue: d.titleLine2 || '' });
    const titleLine2 = typeof titleLine2Raw === 'string' ? titleLine2Raw.trim() : '';

    return (
        <>
            <div className="banner-area home-five-banner-editorial">
                <div className="container">
                    <div className="banner-inner">
                        <div className="row justify-content-center align-items-stretch gx-0 gy-4 gy-lg-0 home-five-banner-hero-row">
                            <div className="col-12 col-lg-6">
                                <div className="left-side-content">
                                    <h2 className="heading-title home-five-banner-editorial__title">
                                        {titleLine1}
                                        {titleLine2 ? (
                                            <>
                                                <br />
                                                {titleLine2}
                                            </>
                                        ) : null}
                                    </h2>
                                </div>
                            </div>
                            <div className="col-lg-6 d-none d-lg-block">
                                <div className="home-five-hero-image-column">
                                    <div className="right-side-content home-five-bg-slot" />
                                    <Link
                                        href="/"
                                        className="home-five-hero-vertical-logo"
                                        aria-label={t('homeFive.banner.verticalLogoAlt', { defaultValue: d.verticalLogoAlt || 'Georgina Robledo' })}
                                    >
                                        <Image
                                            className="home-five-hero-vertical-logo__img"
                                            src="/images/logo/georgina-robledo-vertical.png"
                                            width={1286}
                                            height={4169}
                                            alt={t('homeFive.banner.verticalLogoAlt', { defaultValue: d.verticalLogoAlt || 'Georgina Robledo' })}
                                            sizes="(min-width: 1400px) 72px, (min-width: 992px) 6vw, 0px"
                                            unoptimized
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="row home-five-banner-second-row gx-0">
                            <div className="col-12 home-five-editorial-grid-col">
                                <div className="home-five-editorial-grid">
                                    <div className="row home-five-editorial-split g-0 gx-md-3 gy-3 gy-md-0 align-items-start">
                                        <div className="col-12 col-md-6 home-five-editorial-split__group">
                                            <div className="row g-0 gx-3 gy-0 align-items-start">
                                                <div className="col-4 home-five-editorial-split__cell">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__label">{t('homeFive.banner.labels.meaning', { defaultValue: d.labels.meaning })}</div>
                                                    </div>
                                                </div>
                                                <div className="col-8 home-five-editorial-split__cell">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__value">{t('homeFive.banner.gridValue', { defaultValue: d.gridValue })}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 home-five-editorial-split__group">
                                            <div className="row g-0 gx-3 gy-0 align-items-start">
                                                <div className="col-4 home-five-editorial-split__cell">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__label">{t('homeFive.banner.labels.care', { defaultValue: d.labels.care })}</div>
                                                    </div>
                                                </div>
                                                <div className="col-8 home-five-editorial-split__cell">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__value">{t('homeFive.banner.gridValue', { defaultValue: d.gridValue })}</div>
                                                    </div>
                                                </div>
                                            </div>
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
};

export default HomeFiveBanner;
