import React, { useLayoutEffect } from 'react';

import HeaderTwo from '../../src/components/Header/HeaderTwo';
import SecondaryFixedLogo from '../../src/components/Header/SecondaryFixedLogo';
import Footer from '../../src/components/Footer';
import MsHeroParallax from '../../src/components/common/MsHeroParallax';
import ImagePreviewCarouselDots from '../../src/components/common/ImagePreviewCarouselDots';
import ServicesBanner from '../../src/components/ServicesPage/ServicesBanner';
import ServiceSection from '../../src/components/ServicesPage/ServiceSection';
import { useClickImageCarousel } from '../../src/hooks/useClickImageCarousel';
import { useServicesTranslation } from '../../src/i18n/servicesDefaults';

const SERVICES_HERO_IMAGES = [
    '/images/services/services-1.jpg',
    '/images/services/services-2.jpg',
    '/images/services/services-3.jpg',
    '/images/services/services-4.jpg',
    '/images/services/services-5.jpg',
    '/images/services/services-6.jpg',
    '/images/services/services-7.jpg',
    '/images/services/services-8.jpg',
    '/images/services/services-9.jpg',
];

const Services = () => {
    const { tx } = useServicesTranslation();
    const servicesHeroCarousel = useClickImageCarousel(SERVICES_HERO_IMAGES);

    const naatiWhatItIsItems = tx('naati.whatItIsItems') || [];
    const naatiHowItWorksSteps = tx('naati.howItWorksSteps') || [];
    const localisationWhatIDoItems = tx('localisation.whatIDoItems') || [];
    const proofreadingWhatIDoItems = tx('proofreading.whatIDoItems') || [];

    useLayoutEffect(() => {
        document.body.classList.add('page-services');
        return () => document.body.classList.remove('page-services');
    }, []);

    return (
        <>
            <HeaderTwo secondaryLogoAbsolute />
            <SecondaryFixedLogo placement="fixed" />

            <main className="ms-main">
                <div className="ms-page-content">
                    <div
                        className={
                            servicesHeroCarousel.canAdvance
                                ? 'services-hero-block services-hero-block--carousel'
                                : 'services-hero-block'
                        }
                        style={{ '--services-hero-bg': `url(${servicesHeroCarousel.src})` }}
                        role={servicesHeroCarousel.canAdvance ? 'button' : undefined}
                        tabIndex={servicesHeroCarousel.canAdvance ? 0 : undefined}
                        aria-label={
                            servicesHeroCarousel.canAdvance
                                ? tx('carouselAriaLabel', {
                                    current: servicesHeroCarousel.index + 1,
                                    total: servicesHeroCarousel.total,
                                })
                                : undefined
                        }
                        onClick={
                            servicesHeroCarousel.canAdvance
                                ? (event) => {
                                    if (event.target.closest('a, button, input, textarea, select')) {
                                        return;
                                    }
                                    servicesHeroCarousel.advance();
                                }
                                : undefined
                        }
                        onKeyDown={
                            servicesHeroCarousel.canAdvance
                                ? (event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        servicesHeroCarousel.advance();
                                    }
                                }
                                : undefined
                        }
                    >
                        <MsHeroParallax
                            className="project single services-hero"
                            speed={0.7}
                            type="scroll"
                        />
                        <ServicesBanner
                            title={tx('hero.title')}
                            description={tx('hero.description')}
                            ctaLabel={tx('hero.ctaLabel')}
                        />
                        {servicesHeroCarousel.canAdvance ? (
                            <ImagePreviewCarouselDots
                                index={servicesHeroCarousel.index}
                                total={servicesHeroCarousel.total}
                                className="services-hero-block__dots"
                            />
                        ) : null}
                    </div>

                    <ServiceSection headingTitle={tx('common.headingService')} title={tx('naati.title')}>
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.whatItIsTitle')}</h2>
                                            <p>{tx('naati.whatItIsParagraph')}</p>
                                            <ul>
                                                {naatiWhatItIsItems.map((item) => (
                                                    <li key={item.label}>
                                                        <span className="services-list__label">{item.label}</span>{' '}
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.whoIsItForTitle')}</h2>
                                            <p>{tx('naati.whoIsItForParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="row">
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.whyItMattersTitle')}</h2>
                                            <p>{tx('naati.whyItMattersParagraph1')}</p>
                                            <p>{tx('naati.whyItMattersParagraph2')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('naati.howItWorksTitle')}</h2>
                                            <ul>
                                                {naatiHowItWorksSteps.map((step) => (
                                                    <li key={step}>{step}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                    </ServiceSection>

                    <ServiceSection headingTitle={tx('common.headingOurServices')} title={tx('localisation.title')}>
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whatItIsTitle')}</h2>
                                            <p>{tx('localisation.whatItIsParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whoIsItForTitle')}</h2>
                                            <p>{tx('localisation.whoIsItForParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="row">
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whyItMattersTitle')}</h2>
                                            <p>{tx('localisation.whyItMattersParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('localisation.whatIDoTitle')}</h2>
                                            <ul>
                                                {localisationWhatIDoItems.map((item) => (
                                                    <li key={item.label}>
                                                        <span className="services-list__label">{item.label}</span>{' '}
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                    </ServiceSection>

                    <ServiceSection headingTitle={tx('common.headingOurServices')} title={tx('proofreading.title')}>
                        <div className="middle">
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whatItIsTitle')}</h2>
                                            <p>{tx('proofreading.whatItIsParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whoIsItForTitle')}</h2>
                                            <p>{tx('proofreading.whoIsItForParagraph')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="row">
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whyItMattersTitle')}</h2>
                                            <p>{tx('proofreading.whyItMattersParagraph1')}</p>
                                            <p>{tx('proofreading.whyItMattersParagraph2')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="inner">
                                        <div className="border-line"></div>
                                        <div className="content">
                                            <p className="desc">{tx('common.serviceDesc')}</p>
                                            <h2 className="sub-title">{tx('proofreading.whatIDoTitle')}</h2>
                                            <ul>
                                                {proofreadingWhatIDoItems.map((item) => (
                                                    <li key={item.label}>
                                                        <span className="services-list__label">{item.label}</span>{' '}
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </div>
                    </ServiceSection>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Services;
