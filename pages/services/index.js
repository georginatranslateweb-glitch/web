import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';

import icon1 from "../../public/images/services/icon/code-1.svg";
import icon2 from "../../public/images/services/icon/code-2.svg";
import icon3 from "../../public/images/services/icon/code-3.svg";
import icon4 from "../../public/images/services/icon/code-4.svg";
import icon5 from "../../public/images/services/icon/code-5.svg";
import icon6 from "../../public/images/services/icon/code-6.svg";

const Services = () => {
    return (
        <>
            <HeaderTwo secondaryLogoAbsolute />
            <SecondaryFixedLogo placement="fixed" />

            <main className="ms-main">
                <div className="ms-page-content">
                    <section className="ms-hero services">
                        <div className="ms-parallax" data-speed="0.7" data-type="scroll">
                            <div className="jarallax-img">
                                <div className="ms-hc">
                                    <div className="ms-hc--inner">
                                        <h1 className="ms-hero-title">Services</h1>
                                        <p className="ms-hero-subtitle">Distinctively revolutionize<br/> unique deliverables.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="services-area-2 services">
                        <div className="container">
                            <div className="services-area-inner">
                                <div className="services-bottom">
                                    <div className="services-item">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto one">
                                                        <Image src={icon1} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>Development</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto two">
                                                        <Image src={icon2} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>UI/UX Designer</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto three">
                                                        <Image src={icon4} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>Graphics Designer</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto four">
                                                        <Image src={icon3} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>Motion Graphic</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto five">
                                                        <Image src={icon5} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>Photography</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto six">
                                                        <Image src={icon6} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>Videography</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto one">
                                                        <Image src={icon1} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>Development</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto two">
                                                        <Image src={icon3} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>UI/UX Designer</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 text-center">
                                                <div className="ms-sb img-top">
                                                    <div className="ms-sb--img boxed margin-x-auto three">
                                                        <Image src={icon5} className="attachment-full size-full" alt="image" />
                                                    </div>
                                                    <div className="ms-sb--inner">
                                                        <h3 className="ms-sb--title">
                                                            <span>Graphics Designer</span>
                                                        </h3>
                                                        <p className="ms-sb--text">Create a platform with the best and coolest
                                                            quality from us.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Services;
