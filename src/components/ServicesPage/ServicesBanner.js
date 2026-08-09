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
    children,
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
                    <div className="row">
                        <div className="col-12">
                            <motion.div className="left-side-content" variants={staggerItem}>
                                <h2 className="heading-title" style={{ textTransform: 'none' }}>
                                    {title}
                                </h2>
                            </motion.div>
                            {children}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesBanner;
