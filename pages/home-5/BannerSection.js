import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import enHome from '../../src/locales/en/home.json';
import esHome from '../../src/locales/es/home.json';

const HOME_FIVE_VERTICAL_LOGO_LG = 992;
/** Espacio entre el borde derecho de la foto y el logo (px), fuera del contenedor / sin achicar la imagen */
const HOME_FIVE_VERTICAL_LOGO_GAP_PX = 25;
/** Misma distancia al borde superior del viewport que con `position: fixed` + top: 25px (safe-area vía CSS transform) */
const HOME_FIVE_VERTICAL_LOGO_TOP_PX = 25;

/** Fallback copy bundled so SSR / primera pintura coinciden aunque i18n tarde en marcar el ns como listo */
function homeFiveBannerDefaults(lang) {
    const code = String(lang || 'en').toLowerCase().split('-')[0];
    const bundle = code === 'es' ? esHome : enHome;
    return bundle.homeFive.banner;
}

const HomeFiveBanner = ({ onChromePeekEnter, onChromePeekLeave }) => {
    const { t, i18n } = useTranslation('home');
    const { t: tHeader } = useTranslation('header');
    const d = homeFiveBannerDefaults(i18n.resolvedLanguage || i18n.language);
    const titleLine1 = t('homeFive.banner.titleLine1', { defaultValue: d.titleLine1 });
    const titleLine2Raw = t('homeFive.banner.titleLine2', { defaultValue: d.titleLine2 || '' });
    const titleLine2 = typeof titleLine2Raw === 'string' ? titleLine2Raw.trim() : '';

    const heroImageSlotRef = useRef(null);
    const [verticalLogoPos, setVerticalLogoPos] = useState(null);

    const updateVerticalLogoPosition = useCallback(() => {
        const el = heroImageSlotRef.current;
        if (typeof window === 'undefined' || !el) {
            setVerticalLogoPos(null);
            return;
        }
        if (window.innerWidth < HOME_FIVE_VERTICAL_LOGO_LG) {
            setVerticalLogoPos(null);
            return;
        }
        const banner = el.closest('.banner-area');
        if (!banner) {
            setVerticalLogoPos(null);
            return;
        }
        const sr = el.getBoundingClientRect();
        const br = banner.getBoundingClientRect();
        if (sr.width < 2 || sr.height < 2) {
            setVerticalLogoPos(null);
            return;
        }
        /*
         * Misma posición inicial que con fixed + left en viewport:
         * viewportLeft = sr.right + GAP  =>  left_abs = viewportLeft - br.left
         * viewportTop  = TOP_PX + safe   =>  top_abs  = viewportTop - br.top  (safe-area con transform en CSS)
         */
        setVerticalLogoPos({
            left: Math.round(sr.right - br.left + HOME_FIVE_VERTICAL_LOGO_GAP_PX),
            top: Math.round(HOME_FIVE_VERTICAL_LOGO_TOP_PX - br.top),
        });
    }, []);

    useLayoutEffect(() => {
        updateVerticalLogoPosition();
        const el = heroImageSlotRef.current;
        const ro = new ResizeObserver(() => {
            window.requestAnimationFrame(updateVerticalLogoPosition);
        });
        if (el) {
            ro.observe(el);
            const banner = el.closest('.banner-area');
            if (banner) {
                ro.observe(banner);
            }
        }
        window.addEventListener('resize', updateVerticalLogoPosition);
        window.addEventListener('scroll', updateVerticalLogoPosition, { passive: true });
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', updateVerticalLogoPosition);
            window.removeEventListener('scroll', updateVerticalLogoPosition);
        };
    }, [updateVerticalLogoPosition, i18n.language, titleLine1, titleLine2]);

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
                                    <div
                                        ref={heroImageSlotRef}
                                        className="right-side-content home-five-bg-slot"
                                    />
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
                <button
                    type="button"
                    className={
                        verticalLogoPos != null
                            ? 'home-five-hero-vertical-logo home-five-hero-vertical-logo--placed'
                            : 'home-five-hero-vertical-logo'
                    }
                    style={
                        verticalLogoPos != null
                            ? {
                                  left: `${verticalLogoPos.left}px`,
                                  top: `${verticalLogoPos.top}px`,
                              }
                            : undefined
                    }
                    aria-label={`${t('homeFive.banner.verticalLogoAlt', { defaultValue: d.verticalLogoAlt || 'Georgina Robledo' })} — ${tHeader('toggleMenu')}`}
                    onMouseEnter={onChromePeekEnter}
                    onMouseLeave={onChromePeekLeave}
                    onFocus={onChromePeekEnter}
                    onBlur={onChromePeekLeave}
                    onTouchStart={onChromePeekEnter}
                    onTouchEnd={onChromePeekLeave}
                >
                    <Image
                        className="home-five-hero-vertical-logo__img"
                        src="/images/logo/georgina-robledo-vertical.png"
                        width={1286}
                        height={4169}
                        alt=""
                        sizes="(min-width: 1400px) 140px, (min-width: 992px) 12vw, 0px"
                        unoptimized
                    />
                </button>
            </div>
        </>
    );
};

export default HomeFiveBanner;
