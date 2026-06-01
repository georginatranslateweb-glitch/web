import React from 'react';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import ContactForm from './ContactForm';

const Contact = () => {

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
                                            <h2 className="title">Got A Project Or <br /> A Partnership In Mind?</h2>
                                            <p className="desc">Holisticly leverage other’s user friendly platforms with progressive products. Proactively matrix exceptional content through B2C schemas. Seamlessly exploit cutting-edge niche markets rather than premium results. Collaboratively restore pandemic e-business and plug-and-play data. Conveniently target exceptional platforms whereas standards compliant data.</p>
                                        </div>
                                        <div className="row contact">
                                            <ul className="col-lg-6 phone">
                                                <li className="tag">Phone:</li>
                                                <li>+99 (0)1047011888</li>
                                                <li>+99 (0)1310011444</li>
                                            </ul>
                                            <ul className="col-lg-6 email">
                                                <li className="tag">Email:</li>
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
