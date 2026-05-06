import React from 'react';
import { useTranslation } from 'react-i18next';

const HomeFiveBanner = () => {
    const { t } = useTranslation('home');

    return (
        <>
            <div className="banner-area home-five-banner-editorial">
                <div className="container">
                    <div className="banner-inner">
                        <div className="row justify-content-center align-items-stretch gx-0 gy-4 gy-lg-0 home-five-banner-hero-row">
                            <div className="col-12 col-lg-6">
                                <div className="left-side-content">
                                    <h2 className="heading-title home-five-banner-editorial__title">
                                        {t('homeFive.banner.title')}
                                    </h2>
                                </div>
                            </div>
                            <div className="col-lg-6 d-none d-lg-block">
                                <div className="right-side-content home-five-bg-slot" />
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
                                                        <div className="home-five-editorial-grid__label">{t('homeFive.banner.labels.meaning')}</div>
                                                        <div className="home-five-editorial-grid__value">{t('homeFive.banner.gridValue')}</div>
                                                    </div>
                                                </div>
                                                <div className="col-8 home-five-editorial-split__cell">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__label">{t('homeFive.banner.labels.clarity')}</div>
                                                        <div className="home-five-editorial-grid__value">{t('homeFive.banner.gridValue')}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 home-five-editorial-split__group">
                                            <div className="row g-0 gx-3 gy-0 align-items-start">
                                                <div className="col-4 home-five-editorial-split__cell">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__label">{t('homeFive.banner.labels.care')}</div>
                                                        <div className="home-five-editorial-grid__value">{t('homeFive.banner.gridValue')}</div>
                                                    </div>
                                                </div>
                                                <div className="col-8 home-five-editorial-split__cell">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__label">{t('homeFive.banner.labels.culture')}</div>
                                                        <div className="home-five-editorial-grid__value">{t('homeFive.banner.gridValue')}</div>
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
