import React from 'react';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import HomeCV from '../../src/components/AboutPage/CVSection';

const About = () => {
  return (
    <>
      <HeaderTwo secondaryLogoAbsolute />
      <SecondaryFixedLogo />

      <main className="ms-main">
        <div className="ms-page-content about-page">
          <HomeCV />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;
