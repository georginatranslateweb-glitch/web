import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import portfolioImg from "../../public/images/portfolio/creative-img.jpg";

import icon1 from "../../public/images/services/icon/code-1.svg";
import icon2 from "../../public/images/services/icon/code-2.svg";
import icon3 from "../../public/images/services/icon/code-3.svg";
import icon4 from "../../public/images/services/icon/code-4.svg";
import icon5 from "../../public/images/services/icon/code-5.svg";
import icon6 from "../../public/images/services/icon/code-6.svg";

const HomeFiveService = () => {
    return (
        <>
            <div className="services-area-2">
                <div className="container">
                    <div className="services-area-inner">

                        <div className="services-bottom">
                            <h2 className="heading-title text-center">The Service We Provide <br /> For You </h2>
                            <div className="services-item">
                                <div className="row">
                                    <div className="col-lg-4 text-center">
                                        <div className="ms-sb img-top">
                                            <div className="ms-sb--img boxed margin-x-auto one">
                                                <Image src={icon1} alt="image" />
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
                                    <div className="col-lg-4 text-center">
                                        <div className="ms-sb img-top">
                                            <div className="ms-sb--img boxed margin-x-auto two">
                                                <Image src={icon2} alt="image" />
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
                                    <div className="col-lg-4 text-center">
                                        <div className="ms-sb img-top">
                                            <div className="ms-sb--img boxed margin-x-auto three">
                                                <Image src={icon5} alt="image" />
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
        </>
    );
}

export default HomeFiveService;
