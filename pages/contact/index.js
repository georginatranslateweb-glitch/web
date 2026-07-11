import React from 'react';
import { motion } from 'framer-motion';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import { useContactTranslation } from '../../src/i18n/contactDefaults';
import ContactForm from '../../src/components/Contact/ContactForm';
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from '../../src/components/motion/variants';

const Contact = () => {
    const { tx } = useContactTranslation();

    return (
        <>
            <HeaderTwo secondaryLogoAbsolute />
            <SecondaryFixedLogo placement="fixed" />
            <main className="ms-main">
                <div className="ms-page-content">
                    <div className="contact-area contact">
                        <div className="container">
                            <div className="contact-area-inner">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <motion.div
                                            className="content"
                                            variants={staggerContainer(0.12)}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={VIEWPORT_ONCE}
                                        >
                                            <motion.h2 className="title" variants={staggerItem}>
                                                {tx('page.titleLine1')}{' '}
                                                <br className="d-none d-lg-block" />
                                                {tx('page.titleLine2')}
                                            </motion.h2>
                                            <motion.p className="desc" variants={staggerItem}>{tx('page.description')}</motion.p>
                                        </motion.div>
                                        <motion.div
                                            className="row contact"
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={VIEWPORT_ONCE}
                                        >
                                            <ul className="col-lg-6 phone">
                                                <li className="tag">{tx('page.phoneLabel')}</li>
                                                <li>+61423915231</li>
                                            </ul>
                                            <ul className="col-lg-6 email">
                                                <li className="tag">{tx('page.emailLabel')}</li>
                                                <li>hello@georginatranslates.com</li>
                                            </ul>
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className="col-lg-6"
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={VIEWPORT_ONCE}
                                    >
                                        <ContactForm />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Contact;
