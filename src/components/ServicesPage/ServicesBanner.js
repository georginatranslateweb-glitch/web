import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, VIEWPORT_ONCE } from '../motion/variants';
import ArrowIcon from '../icons/ArrowIcon';

const ServicesBanner = ({
    title = 'Our Services',
    description = 'Globally morph real-time e-business with optimal users. Dramatically extend high-payoff infomediaries through integrated experiences.',
    ctaLabel = 'Need a Translation',
    ctaHref = '/contact',
}) => {
    return (
        <div className="banner-area services-banner">
            <div className="container">
                <motion.div
                    className="banner-inner"
                    variants={staggerContainer(0.12)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                >
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <motion.div className="left-side-content" variants={staggerItem}>
                                <h2 className="heading-title" style={{ textTransform: 'none' }}>
                                    {title}
                                </h2>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div className="right-side-content" variants={staggerItem}>
                                <p className="desc">{description}</p>
                                <div className="bottom">
                                    <Link href={ctaHref} className="btn-footer">
                                        {ctaLabel} <ArrowIcon />
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
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesBanner;
