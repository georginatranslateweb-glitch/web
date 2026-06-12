import React from 'react';

const GoogleReviewsSkeleton = ({ count = 3 }) => (
  <div className="testimonial-item google-reviews__grid">
    <div className="row g-4 align-items-start">
      {Array.from({ length: count }, (_, index) => (
        <div key={`skeleton-${index}`} className="col-lg-4 col-md-6 col-12 d-flex">
          <div className="testimonial-wraper google-reviews__skeleton-card" aria-hidden="true">
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
