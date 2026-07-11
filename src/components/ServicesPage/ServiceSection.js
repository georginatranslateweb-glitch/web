import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT_ONCE } from '../motion/variants';

const ServiceSection = ({ headingTitle, title, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            className={`team-rules-area service-accordion${open ? ' is-open' : ''}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
        >
            <div className="container">
                <div className="team-rules-area-inner">
                    <div className="border-line"></div>
                    <button
                        type="button"
                        className="service-accordion__trigger top"
                        aria-expanded={open}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-4">
                                <h4 className="heading-title">{headingTitle}</h4>
                            </div>
                            <div className="col-lg-8 col-md-8">
                                <div className="service-accordion__title-row">
                                    <h1 className="title">{title}</h1>
                                    <span className="service-accordion__icon" aria-hidden="true">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M4 7.5L10 13.5L16 7.5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className="service-accordion__body" aria-hidden={!open}>
                        <div className="service-accordion__body-inner">{children}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceSection;
