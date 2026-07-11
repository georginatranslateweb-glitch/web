import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import fallbackData from '../../../data/google-reviews-fallback.json';
import { filterAndSortReviews } from '../../../lib/google-reviews/normalize';
import GoogleReviewsCarousel from './GoogleReviewsCarousel';
import GoogleReviewsSkeleton from './GoogleReviewsSkeleton';
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from '../motion/variants';

const DEFAULT_AUTO_REFRESH = 5 * 60 * 1000;
const DEFAULT_MAX_REVIEWS = 9;

const GoogleReviews = ({
  maxReviews = DEFAULT_MAX_REVIEWS,
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

  const skeletonCount = 3;

  return (
    <>
      <div className={`testimonial-area google-reviews${className ? ` ${className}` : ''}`}>
        <div className="container">
          <motion.div
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.p className="google-reviews__label" variants={staggerItem} suppressHydrationWarning>{subTitle}</motion.p>
            <motion.h2 className="google-reviews__title heading-title home-five-banner-editorial__title" variants={staggerItem} suppressHydrationWarning>
              {titleLine1}
              {titleLine2 ? (
                <>
                  <br />
                  {titleLine2}
                </>
              ) : null}
            </motion.h2>
          </motion.div>

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
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <GoogleReviewsCarousel
                reviews={reviews}
                privacyMode={privacyMode}
                readMoreLabel={readMoreLabel}
                showLessLabel={showLessLabel}
              />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default GoogleReviews;
