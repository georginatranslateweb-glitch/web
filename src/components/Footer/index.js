
import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollToTop from '../ScrollTop';
import { EASE_OUT, fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from '../motion/variants';
import '../../i18n';
import { useHydrationSafeTranslation, SSR_I18N_LANG } from '../../i18n/useHydrationSafeTranslation';
import { footerDefaults, resolveFooterDefault } from '../../i18n/footerDefaults';
import ArrowIcon from '../icons/ArrowIcon';

const Footer = (props) => {
    const { footerClass } = props;
    const { t, i18n, hydrated } = useHydrationSafeTranslation('footer');
    const year = new Date().getFullYear();

    const defaults = useMemo(
        () => footerDefaults(
            hydrated
                ? (i18n.resolvedLanguage || i18n.language)
                : SSR_I18N_LANG,
        ),
        [hydrated, i18n.resolvedLanguage, i18n.language],
    );

    const tx = useCallback(
        (key, options) => {
            const fallback = resolveFooterDefault(defaults, key, options);
            if (!hydrated) {
                return fallback ?? resolveFooterDefault(footerDefaults(SSR_I18N_LANG), key, options) ?? key;
            }
            return t(key, {
                ...options,
                defaultValue: fallback,
            });
        },
        [t, defaults, hydrated],
    );

    return (
        <>
            <footer className={footerClass ? footerClass : 'ms-footer ms-footer--template'}>
                <motion.div
                    className="footer-logo-watermark"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, ease: EASE_OUT }}
                >
                    <div className="footer-logo-watermark__pivot">
                        <img
                            src="/images/logo/logo-red-footer.png"
                            alt=""
                        />
                    </div>
                </motion.div>
                <section className="container footer-container" data-parallax="on">
                    <motion.div
                        className="footer-title text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                    >
                        <h1>
                            <span className="font-highlight" suppressHydrationWarning>{tx('ctaHighlight')}</span>{' '}
                            <Link href="/contact" className="btn-footer">
                                <span suppressHydrationWarning>{tx('ctaButton')}</span>{' '}
                                <ArrowIcon />
                            </Link>
                        </h1>
                    </motion.div>
                    <div className="social-area">
                        <motion.div
                            className="row area-inner"
                            variants={staggerContainer(0.1)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={VIEWPORT_ONCE}
                        >
                            <motion.div className="col-lg-3 col-md-6 col-sm-2 col-2" variants={staggerItem}>
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Email</h3>
                                        <a href="mailto:hello@georginatranslates.com" className="link">hello@georginatranslates.com</a>
                                    </div>
                                    <div className="social">
                                        <a href="mailto:hello@georginatranslates.com" className="icon" aria-label="Email"><i className="socicon-mail"></i></a>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div className="col-lg-3 col-md-6 col-sm-2 col-2" variants={staggerItem}>
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">WhatsApp</h3>
                                        <a href="https://wa.me/61423915231" className="link">+61423915231</a>
                                    </div>
                                    <div className="social">
                                        <a href="https://wa.me/61423915231" className="icon" aria-label="WhatsApp"><i className="socicon-whatsapp"></i></a>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div className="col-lg-3 col-md-6 col-sm-2 col-2" variants={staggerItem}>
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Instagram</h3>
                                        <a href="https://www.instagram.com/georginatranslates" className="link">@georginatranslates</a>
                                    </div>
                                    <div className="social">
                                        <a href="https://www.instagram.com/georginatranslates" className="icon" aria-label="Instagram"><i className="socicon-instagram"></i></a>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div className="col-lg-3 col-md-6 col-sm-2 col-2" variants={staggerItem}>
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">LinkedIn</h3>
                                        <a href="https://www.linkedin.com/in/georgina-robledo/" className="link">Georgina Robledo</a>
                                    </div>
                                    <div className="social">
                                        <a href="https://www.linkedin.com/in/georgina-robledo/" className="icon" aria-label="LinkedIn"><i className="socicon-linkedin"></i></a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="copyright-area"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                    >
                        <div className="left-side">

                        </div>
                        <div className="right-side">
                            <p suppressHydrationWarning>
                                {tx('copyright', { year })}{' '}
                                <a href="https://www.authenticwebstudio.com/" className="author">
                                    {tx('copyrightAuthor')}
                                </a>{' '}
                                {tx('copyrightStudio')}
                            </p>
                        </div>
                    </motion.div>
                </section>
            </footer >
            <ScrollToTop />
        </>
    );
}

export default Footer;
