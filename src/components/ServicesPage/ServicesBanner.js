import React from 'react';
import Link from 'next/link';

const ServicesBanner = ({
    title = 'Our Services',
    description = 'Globally morph real-time e-business with optimal users. Dramatically extend high-payoff infomediaries through integrated experiences.',
    ctaLabel = 'START PROJECT',
    ctaHref = '/contact',
}) => {
    return (
        <div className="banner-area">
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
                                    <Link
                                        href={ctaHref}
                                        className="btn btn-default btn--md btn--primary btn--full-width"
                                    >
                                        {ctaLabel}
                                    </Link>
                                    <div className="ms-s-w">
                                        <a className="ms-s-i s-icon" href="#" aria-label="WordPress">
                                            <i className="socicon-wordpress"></i>
                                        </a>
                                        <a className="ms-s-i s-icon" href="#" aria-label="Amazon">
                                            <i className="socicon-amazon"></i>
                                        </a>
                                        <a className="ms-s-i s-icon" href="#" aria-label="Pinterest">
                                            <i className="socicon-pinterest"></i>
                                        </a>
                                        <a className="ms-s-i s-icon" href="#" aria-label="Apple">
                                            <i className="socicon-apple"></i>
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
