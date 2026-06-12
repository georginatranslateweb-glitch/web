import React from 'react';

const GoogleReviewsSkeleton = ({ count = 3 }) => (
  <div className="testimonial-item google-reviews__carousel ms-rb google-reviews__carousel--loading" aria-hidden="true">
    <div className="google-reviews__swiper-skeleton">
      {Array.from({ length: count }, (_, index) => (
        <div key={`skeleton-${index}`} className="google-reviews__swiper-skeleton-slide">
          <div className="testimonial-wraper google-reviews__skeleton-card">
            <div className="content">
              <div className="google-reviews__skeleton google-reviews__skeleton--text" />
              <div className="google-reviews__skeleton google-reviews__skeleton--text" />
              <div className="google-reviews__skeleton google-reviews__skeleton--text google-reviews__skeleton--text-short" />
            </div>
            <div className="author">
              <div className="author-image">
                <div className="google-reviews__skeleton google-reviews__skeleton--avatar" />
              </div>
              <div className="author-details">
                <div className="google-reviews__skeleton google-reviews__skeleton--name" />
                <div className="google-reviews__skeleton google-reviews__skeleton--date" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GoogleReviewsSkeleton;
