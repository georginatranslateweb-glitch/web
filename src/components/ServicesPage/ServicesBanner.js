import React from 'react';
import Link from 'next/link';

const ServicesBanner = ({
    title = 'Our Services',
    description = 'Globally morph real-time e-business with optimal users. Dramatically extend high-payoff infomediaries through integrated experiences.',
    ctaLabel = 'Need a Translation',
    ctaHref = '/contact',
}) => {
    return (
        <div className="banner-area services-banner">
            <div className="container">
                <div className="banner-inner">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="left-side-content">
                                <h2 className="heading-title" style={{ textTransform: 'none' }}>
                                    {title}
                                </h2>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="right-side-content">
                                <p className="desc">{description}</p>
                                <div className="bottom">
                                    <Link href={ctaHref} className="btn-footer">
                                        {ctaLabel} <i className="fas fa-arrow-right"></i>
                                    </Link>
                                    <div className="ms-s-w services-banner__social">
                                        <a className="ms-s-i s-icon" href="mailto:hello@georginatranslates.com" aria-label="Email">
                                            <i className="socicon-mail"></i>
                                        </a>
                                        <a className="ms-s-i s-icon" href="https://wa.me/61423915231" aria-label="WhatsApp">
                                            <i className="socicon-whatsapp"></i>
                                        </a>
                                        <a className="ms-s-i s-icon" href="https://www.instagram.com/georginatranslates" aria-label="Instagram">
                                            <i className="socicon-instagram"></i>
                                        </a>
                                        <a className="ms-s-i s-icon" href="https://www.linkedin.com/in/georgina-robledo/" aria-label="LinkedIn">
                                            <i className="socicon-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesBanner;
