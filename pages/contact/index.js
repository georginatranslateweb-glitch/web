import React from 'react';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import { useContactTranslation } from '../../src/i18n/contactDefaults';
import ContactForm from '../../src/components/Contact/ContactForm';

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
                                        <div className="content">
                                            <h2 className="title">
                                                {tx('page.titleLine1')}{' '}
                                                <br className="d-none d-lg-block" />
                                                {tx('page.titleLine2')}
                                            </h2>
                                            <p className="desc">{tx('page.description')}</p>
                                        </div>
                                        <div className="row contact">
                                            <ul className="col-lg-6 phone">
                                                <li className="tag">{tx('page.phoneLabel')}</li>
                                                <li>+61423915231</li>
                                            </ul>
                                            <ul className="col-lg-6 email">
                                                <li className="tag">{tx('page.emailLabel')}</li>
                                                <li>hello@georginatranslates.com</li>
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
