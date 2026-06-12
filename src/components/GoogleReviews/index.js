import React, { useCallback, useEffect, useState } from 'react';

import fallbackData from '../../../data/google-reviews-fallback.json';
import { filterAndSortReviews } from '../../../lib/google-reviews/normalize';
import GoogleReviewsSkeleton from './GoogleReviewsSkeleton';
import ReviewCard from './ReviewCard';

const DEFAULT_AUTO_REFRESH = 5 * 60 * 1000;

const GoogleReviews = ({
  maxReviews = 6,
  autoRefresh = DEFAULT_AUTO_REFRESH,
  showOnlyHighRated = true,
  className = '',
  reviews: manualReviews = null,
  privacyMode = false,
  subTitle = 'Testimonials',
  titleLine1 = 'Some Reviews From',
  titleLine2 = 'Clients About Us',
  readMoreLabel = 'Read more',
  showLessLabel = 'Show less',
  retryLabel = 'Try again',
  language = 'en',
  useFallbackOnError = false,
}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applyFallback = useCallback(() => {
    const filtered = filterAndSortReviews(fallbackData.reviews, {
      showOnlyHighRated,
      maxReviews,
    });
    setReviews(filtered);
  }, [maxReviews, showOnlyHighRated]);

  const fetchReviews = useCallback(async () => {
    if (Array.isArray(manualReviews) && manualReviews.length > 0) {
      const filtered = filterAndSortReviews(manualReviews, {
        showOnlyHighRated,
        maxReviews,
      });
      setReviews(filtered);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        maxReviews: String(maxReviews),
        showOnlyHighRated: String(showOnlyHighRated),
        language: language.split('-')[0],
      });

      const response = await fetch(`/api/google-reviews?${params.toString()}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        if (useFallbackOnError) {
          applyFallback();
          setError(data.message || null);
        } else {
          setReviews([]);
          setError(data.message || 'Unable to load reviews.');
        }
        return;
      }

      setReviews(data.reviews || []);
      setError(null);
    } catch (err) {
      if (useFallbackOnError) {
        applyFallback();
        setError(err.message || null);
      } else {
        setReviews([]);
        setError(err.message || 'Unable to load reviews.');
      }
    } finally {
      setLoading(false);
    }
  }, [
    applyFallback,
    language,
    manualReviews,
    maxReviews,
    showOnlyHighRated,
    useFallbackOnError,
  ]);

  useEffect(() => {
    setLoading(true);
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    if (!autoRefresh || autoRefresh <= 0 || (manualReviews && manualReviews.length > 0)) {
      return undefined;
    }

    const intervalId = setInterval(fetchReviews, autoRefresh);
    return () => clearInterval(intervalId);
  }, [autoRefresh, fetchReviews, manualReviews]);

  const skeletonCount = Math.min(maxReviews, 3);

  return (
    <>
      <div className={`testimonial-area google-reviews${className ? ` ${className}` : ''}`}>
        <div className="container">
          <p className="google-reviews__label" suppressHydrationWarning>{subTitle}</p>
          <h2 className="google-reviews__title heading-title home-five-banner-editorial__title" suppressHydrationWarning>
            {titleLine1}
            {titleLine2 ? (
              <>
                <br />
                {titleLine2}
              </>
            ) : null}
          </h2>

          {loading && <GoogleReviewsSkeleton count={skeletonCount} />}

          {!loading && error && reviews.length === 0 && (
            <div className="testimonial-item">
              <div className="row">
                <div className="col-12">
                  <div className="testimonial-wraper google-reviews__error" role="alert">
                    <p className="content">{error}</p>
                    <button type="button" className="google-reviews__expand-btn" onClick={fetchReviews}>
                      {retryLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && reviews.length > 0 && (
            <div className="testimonial-item google-reviews__grid">
              <div className="row g-4 align-items-start">
                {reviews.map((review, index) => (
                  <div key={review.id} className="col-lg-4 col-md-6 col-12 d-flex">
                    <ReviewCard
                      review={review}
                      index={index}
                      privacyMode={privacyMode}
                      readMoreLabel={readMoreLabel}
                      showLessLabel={showLessLabel}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GoogleReviews;
