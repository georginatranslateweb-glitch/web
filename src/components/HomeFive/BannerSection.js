import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { imageReveal, staggerContainer, staggerItem } from '../motion/variants';
import LanguageSwitcher from '../LanguageSwitcher';
import enHome from '../../locales/en/home.json';
import esHome from '../../locales/es/home.json';
import { SSR_I18N_LANG, useHydrationSafeTranslation } from '../../i18n/useHydrationSafeTranslation';

const HOME_FIVE_VERTICAL_LOGO_LG = 992;
/** Idioma junto a la hamburguesa del hero (mismo breakpoint que muestra el bloque vertical) */
const HOME_FIVE_HERO_CHROME_LANG_MQ = '(min-width: 992px)';
/** Espacio entre el borde derecho de la foto y el logo (px), mismo criterio que antes */
const HOME_FIVE_VERTICAL_LOGO_GAP_PX = 25;
/** Reserva mínima a la derecha del viewport para el bloque vertical (px) */
const HOME_FIVE_VERTICAL_BRAND_RESERVE_PX = 130;
/** Suavizado del fade del logo vertical al salir del hero (desktop) */
const HOME_FIVE_VERTICAL_LOGO_FADE_EASE = 0.72;

/** Fallback copy bundled so SSR / primera pintura coinciden aunque i18n tarde en marcar el ns como listo */
function homeFiveBannerDefaults(lang) {
    const code = String(lang || 'en').toLowerCase().split('-')[0];
    const bundle = code === 'es' ? esHome : enHome;
    return bundle.homeFive.banner;
}

/** Permite <strong> en copy del JSON (contenido propio, no input de usuario). */
function BannerGridValue({ html }) {
    return (
        <div
            className="home-five-editorial-grid__value"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

const HomeFiveBanner = ({ onChromePeekEnter, onChromePeekLeave, onLangHeroDockedChange }) => {
    const { t, i18n, hydrated } = useHydrationSafeTranslation('home');
    const { t: tHeader } = useHydrationSafeTranslation('header');

    const lang = hydrated
        ? (i18n.resolvedLanguage || i18n.language)
        : SSR_I18N_LANG;

    const defaults = useMemo(() => homeFiveBannerDefaults(lang), [lang]);
    const ssrDefaults = useMemo(() => homeFiveBannerDefaults(SSR_I18N_LANG), []);

    const tx = useCallback(
        (key, fallback) => {
            if (!hydrated) {
                return fallback ?? key;
            }
            return t(key, { defaultValue: fallback });
        },
        [t, hydrated],
    );

    const titleLine1 = tx('homeFive.banner.titleLine1', defaults.titleLine1);
    const titleLine2Raw = tx('homeFive.banner.titleLine2', defaults.titleLine2 || '');
    const titleLine2 = typeof titleLine2Raw === 'string' ? titleLine2Raw.trim() : '';
    const gridMeaning = tx('homeFive.banner.gridValues.meaning', defaults.gridValues.meaning);
    const gridCare = tx('homeFive.banner.gridValues.care', defaults.gridValues.care);
    const labelMeaning = tx('homeFive.banner.labels.meaning', defaults.labels.meaning);
    const labelCare = tx('homeFive.banner.labels.care', defaults.labels.care);
    const verticalLogoAlt = tx(
        'homeFive.banner.verticalLogoAlt',
        hydrated ? defaults.verticalLogoAlt : ssrDefaults.verticalLogoAlt,
    );

    const heroImageSlotRef = useRef(null);
    const bannerAreaRef = useRef(null);
    const [verticalLogoLeft, setVerticalLogoLeft] = useState(null);
    const [verticalLogoFade, setVerticalLogoFade] = useState(1);
    const [isWideHeroChrome, setIsWideHeroChrome] = useState(false);
    /** Tras hidratar: portal a body para clics/z-index fuera de #__next y capas sticky/transform */
    const [verticalBrandPortalReady, setVerticalBrandPortalReady] = useState(false);

    const updateVerticalLogoLeft = useCallback(() => {
        const el = heroImageSlotRef.current;
        if (typeof window === 'undefined' || !el) {
            setVerticalLogoLeft(null);
            return;
        }
        if (window.innerWidth < HOME_FIVE_VERTICAL_LOGO_LG) {
            setVerticalLogoLeft(null);
            return;
        }

        const sr = el.getBoundingClientRect();
        if (sr.width < 2 || sr.height < 2) {
            setVerticalLogoLeft(null);
            return;
        }

        const rawLeft = Math.round(sr.right + HOME_FIVE_VERTICAL_LOGO_GAP_PX);
        const maxLeft = Math.max(
            0,
            window.innerWidth - HOME_FIVE_VERTICAL_BRAND_RESERVE_PX,
        );
        setVerticalLogoLeft(Math.min(rawLeft, maxLeft));
    }, []);

    const updateVerticalLogoFade = useCallback(() => {
        if (typeof window === 'undefined' || window.innerWidth < HOME_FIVE_VERTICAL_LOGO_LG) {
            setVerticalLogoFade(0);
            return;
        }
        const heroRoot = bannerAreaRef.current?.closest('.home-five-hero');
        if (!heroRoot) {
            setVerticalLogoFade(0);
            return;
        }
        const rect = heroRoot.getBoundingClientRect();
        const viewportH = window.innerHeight || 1;
        const visibleH = Math.max(0, Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0));
        const visibilityRatio = visibleH / Math.max(rect.height, 1);
        const remapped = Math.max(0, Math.min(1, visibilityRatio / HOME_FIVE_VERTICAL_LOGO_FADE_EASE));
        const eased = remapped * remapped * (3 - 2 * remapped);
        setVerticalLogoFade(eased);
    }, []);

    useLayoutEffect(() => {
        updateVerticalLogoLeft();
        updateVerticalLogoFade();
        const slot = heroImageSlotRef.current;
        const banner = bannerAreaRef.current;
        let fadeRaf = 0;
        const scheduleVerticalLogoFade = () => {
            if (fadeRaf) return;
            fadeRaf = window.requestAnimationFrame(() => {
                fadeRaf = 0;
                updateVerticalLogoFade();
            });
        };
        const ro = new ResizeObserver(() => {
            window.requestAnimationFrame(updateVerticalLogoLeft);
            scheduleVerticalLogoFade();
        });
        if (slot) {
            ro.observe(slot);
        }
        if (banner) {
            ro.observe(banner);
        }
        window.addEventListener('resize', updateVerticalLogoLeft);
        window.addEventListener('resize', scheduleVerticalLogoFade);
        window.addEventListener('scroll', scheduleVerticalLogoFade, { passive: true });

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', updateVerticalLogoLeft);
            window.removeEventListener('resize', scheduleVerticalLogoFade);
            window.removeEventListener('scroll', scheduleVerticalLogoFade);
            if (fadeRaf) {
                window.cancelAnimationFrame(fadeRaf);
            }
        };
    }, [updateVerticalLogoLeft, updateVerticalLogoFade, i18n.language, titleLine1, titleLine2]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia(HOME_FIVE_HERO_CHROME_LANG_MQ);
        const sync = () => setIsWideHeroChrome(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    useLayoutEffect(() => {
        setVerticalBrandPortalReady(true);
    }, []);

    const verticalLogoPlaced = verticalLogoLeft != null && verticalLogoFade > 0.02;
    const langDockedInHero = verticalLogoLeft != null && isWideHeroChrome && verticalLogoFade > 0.12;

    useEffect(() => {
        if (typeof onLangHeroDockedChange !== 'function') return undefined;
        onLangHeroDockedChange(langDockedInHero);
        return undefined;
    }, [langDockedInHero, onLangHeroDockedChange]);

    const verticalBrandNode = (
        <div
            className={
                verticalLogoPlaced
                    ? 'home-five-hero-vertical-brand home-five-hero-vertical-brand--placed'
                    : 'home-five-hero-vertical-brand'
            }
            style={{
                ...(verticalLogoLeft != null ? { left: `${verticalLogoLeft}px` } : {}),
                '--home-five-vertical-logo-fade': verticalLogoFade,
                opacity: verticalLogoFade,
                transform: `translate3d(0, ${(1 - verticalLogoFade) * 14}px, 0)`,
                pointerEvents: verticalLogoFade > 0.05 ? 'auto' : 'none',
            }}
            onMouseEnter={onChromePeekEnter}
            onMouseLeave={onChromePeekLeave}
            onFocusCapture={onChromePeekEnter}
            onBlurCapture={onChromePeekLeave}
            onTouchStart={onChromePeekEnter}
            onTouchEnd={onChromePeekLeave}
        >
            <div className="home-five-hero-vertical-brand__stack">
                <div className="home-five-hero-vertical-brand__controls-row">
                    <div className="home-five-hero-vertical-brand__chrome-hamburger">
                        <button
                            type="button"
                            className="home-five-hero-desktop-hamburger"
                            aria-label={tHeader('toggleMenu')}
                        >
                            <span className="home-five-hero-desktop-hamburger__lines" aria-hidden="true">
                                <span className="home-five-hero-desktop-hamburger__line home-five-hero-desktop-hamburger__line--top" />
                                <span className="home-five-hero-desktop-hamburger__line home-five-hero-desktop-hamburger__line--mid" />
                                <span className="home-five-hero-desktop-hamburger__line home-five-hero-desktop-hamburger__line--bot" />
                            </span>
                        </button>
                    </div>
                    {langDockedInHero ? (
                        <LanguageSwitcher className="home-five-hero-vertical-brand__lang" />
                    ) : null}
                </div>
                <button
                    type="button"
                    className="home-five-hero-vertical-logo"
                    aria-label={`${verticalLogoAlt} — ${tHeader('toggleMenu')}`}
                >
                    <Image
                        className="home-five-hero-vertical-logo__img"
                        src="/images/logo/georgina-robledo-vertical.png"
                        width={1286}
                        height={4169}
                        alt=""
                        sizes="(min-width: 1400px) 92px, (min-width: 992px) 7vw, 0px"
                        unoptimized
                    />
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div ref={bannerAreaRef} className="banner-area home-five-banner-editorial">
                <div className="container">
                    <motion.div
                        className="banner-inner"
                        variants={staggerContainer(0.14)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="row justify-content-center align-items-stretch gx-0 gy-4 gy-lg-0 home-five-banner-hero-row">
                            <div className="col-12 col-lg-6">
                                <div className="left-side-content">
                                    <motion.h2 className="heading-title home-five-banner-editorial__title" variants={staggerItem}>
                                        {titleLine1}
                                        {titleLine2 ? (
                                            <>
                                                <br className="d-none d-lg-block" aria-hidden="true" />
                                                <span className="d-inline d-lg-none"> </span>
                                                {titleLine2}
                                            </>
                                        ) : null}
                                    </motion.h2>
                                </div>
                            </div>
                            <div className="col-lg-6 d-none d-lg-block">
                                <div className="home-five-hero-image-column">
                                    <motion.div
                                        ref={heroImageSlotRef}
                                        className="right-side-content home-five-bg-slot"
                                        variants={imageReveal}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row home-five-banner-second-row gx-0">
                            <div className="col-12 home-five-editorial-grid-col">
                                <div className="home-five-editorial-grid">
                                    <div className="row home-five-editorial-split g-0 gx-lg-0 gy-3 gy-lg-0 align-items-start">
                                        <motion.div className="col-12 col-lg-6 home-five-editorial-split__group" variants={staggerItem}>
                                            <div className="home-five-editorial-split__pair">
                                                <div className="home-five-editorial-split__cell home-five-editorial-split__cell--label">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__label">{labelMeaning}</div>
                                                    </div>
                                                </div>
                                                <div className="home-five-editorial-split__cell home-five-editorial-split__cell--value">
                                                    <div className="home-five-editorial-grid__item">
                                                        <BannerGridValue html={gridMeaning} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div className="col-12 col-lg-6 home-five-editorial-split__group" variants={staggerItem}>
                                            <div className="home-five-editorial-split__pair">
                                                <div className="home-five-editorial-split__cell home-five-editorial-split__cell--label">
                                                    <div className="home-five-editorial-grid__item">
                                                        <div className="home-five-editorial-grid__label">{labelCare}</div>
                                                    </div>
                                                </div>
                                                <div className="home-five-editorial-split__cell home-five-editorial-split__cell--value">
                                                    <div className="home-five-editorial-grid__item">
                                                        <BannerGridValue html={gridCare} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {verticalBrandPortalReady && typeof document !== 'undefined'
                ? createPortal(verticalBrandNode, document.body)
                : verticalBrandNode}
        </>
    );
};

export default HomeFiveBanner;
