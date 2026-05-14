
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollToTop from '../ScrollTop';

const Footer = (props) => {
    const { footerLogo, footerClass } = props;
    return (
        <>
            <footer className={footerClass ? footerClass : 'ms-footer ms-footer--template'}>
                <section className="container footer-container" data-parallax="on">
                    <div className="footer-title text-center">
                        <h1>Need <span className="font-highlight">TRANSLATION <br /> SERVICES?</span> <a href="#" className="btn-footer">Let's Talk <i className="fas fa-arrow-right"></i></a></h1>
                    </div>
                    <div className="social-area">
                        <div className="row area-inner">
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Dribble</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-dribbble"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Twitter</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-twitter"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Instagram</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-2 col-2">
                                <div className="social-wrapper">
                                    <div className="content">
                                        <h3 className="platform">Behance</h3>
                                        <a href="#0" className="link">@madsparrow_dev</a>
                                    </div>
                                    <div className="social">
                                        <a href="#0" className="icon"><i className="socicon-behance"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-area">
                        <div className="left-side">

                        </div>
                        <div className="right-side">
                            <p>©2026 <a href="https://www.authenticwebstudio.com/" className="author">Authentic</a> Web Studio</p>
                        </div>
                    </div>
                </section>
            </footer >
            <ScrollToTop />
        </>
    );
}

export default Footer;