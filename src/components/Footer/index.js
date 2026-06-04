
import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import ScrollToTop from '../ScrollTop';
import '../../i18n';
import { useHydrationSafeTranslation, SSR_I18N_LANG } from '../../i18n/useHydrationSafeTranslation';
import { footerDefaults, resolveFooterDefault } from '../../i18n/footerDefaults';

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
                <section className="container footer-container" data-parallax="on">
                    <div className="footer-title text-center">
                        <h1>
                            <span className="font-highlight" suppressHydrationWarning>{tx('ctaHighlight')}</span>{' '}
                            <Link href="/contact" className="btn-footer">
                                <span suppressHydrationWarning>{tx('ctaButton')}</span>{' '}
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </h1>
                    </div>
                    <div className="social-area">
                        <div className="row area-inner">
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Dribble</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-dribbble"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Twitter</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-twitter"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Instagram</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Behance</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-behance"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-area">
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
                    </div>
                </section>
            </footer >
            <ScrollToTop />
        </>
    );
}

export default Footer;
