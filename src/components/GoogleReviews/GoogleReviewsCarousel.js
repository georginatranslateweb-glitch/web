import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

import ReviewCard from './ReviewCard';

const CAROUSEL_SPEED_MS = 600;

const GoogleReviewsCarousel = ({
  reviews,
  privacyMode = false,
  readMoreLabel = 'Read more',
  showLessLabel = 'Show less',
}) => {
  const swiperOptions = useMemo(() => ({
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    speed: CAROUSEL_SPEED_MS,
    autoHeight: true,
    watchOverflow: true,
    loop: false,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.google-reviews__btn-next',
      prevEl: '.google-reviews__btn-prev',
    },
    pagination: {
      el: '.google-reviews__pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  }), []);

  return (
    <div className="testimonial-item google-reviews__carousel ms-rb">
      <Swiper {...swiperOptions} className="google-reviews__swiper">
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard
              review={review}
              privacyMode={privacyMode}
              readMoreLabel={readMoreLabel}
              showLessLabel={showLessLabel}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="ms-rb-fr google-reviews__nav" aria-hidden="false">
        <button
          type="button"
          className="ms-rb-btn-prev google-reviews__btn-prev"
          aria-label="Previous reviews"
        >
          <i className="fal fa-arrow-left" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="ms-rb-btn-next google-reviews__btn-next"
          aria-label="Next reviews"
        >
          <i className="fal fa-arrow-right" aria-hidden="true" />
        </button>
      </div>

      <div className="google-reviews__pagination ms-rb-db swiper-pagination" />
    </div>
  );
};

export default GoogleReviewsCarousel;
