import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import { contactDefaults, resolveContactDefault } from '../../src/i18n/contactDefaults';
import ContactForm from './ContactForm';

const Contact = () => {
    const { t, i18n } = useTranslation('contact');
    const defaults = useMemo(
        () => contactDefaults(i18n.resolvedLanguage || i18n.language),
        [i18n.resolvedLanguage, i18n.language],
    );
    const tx = useCallback(
        (key, options) =>
            t(key, {
                ...options,
                defaultValue: resolveContactDefault(defaults, key, options),
            }),
        [t, defaults],
    );

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
                                        <div className="content">
                                            <h2 className="title">
                                                {tx('page.titleLine1')}
                                                <br />
                                                {tx('page.titleLine2')}
                                            </h2>
                                            <p className="desc">{tx('page.description')}</p>
                                        </div>
                                        <div className="row contact">
                                            <ul className="col-lg-6 phone">
                                                <li className="tag">{tx('page.phoneLabel')}</li>
                                                <li>+99 (0)1047011888</li>
                                                <li>+99 (0)1310011444</li>
                                            </ul>
                                            <ul className="col-lg-6 email">
                                                <li className="tag">{tx('page.emailLabel')}</li>
                                                <li>info@madsparrow.com</li>
                                                <li>contact@most.com</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <ContactForm />
                                    </div>
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
