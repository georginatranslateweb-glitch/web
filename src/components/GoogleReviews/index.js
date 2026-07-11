import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import fallbackData from '../../../data/google-reviews-fallback.json';
import { filterAndSortReviews } from '../../../lib/google-reviews/normalize';
import GoogleReviewsCarousel from './GoogleReviewsCarousel';
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from '../motion/variants';

const DEFAULT_AUTO_REFRESH = 5 * 60 * 1000;
const DEFAULT_MAX_REVIEWS = 9;
const RETRY_DELAY_MS = 30 * 1000;

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
  language = 'en',
}) => {
  const getFallbackReviews = useCallback(
    () => filterAndSortReviews(fallbackData.reviews, { showOnlyHighRated, maxReviews }),
    [maxReviews, showOnlyHighRated],
  );

  const [reviews, setReviews] = useState(() => getFallbackReviews());
  const retryTimerRef = useRef(null);

  const fetchReviews = useCallback(async () => {
    if (Array.isArray(manualReviews) && manualReviews.length > 0) {
      setReviews(filterAndSortReviews(manualReviews, { showOnlyHighRated, maxReviews }));
      return true;
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
        setReviews(getFallbackReviews());
        return false;
      }

      const nextReviews = data.reviews || [];
      if (nextReviews.length > 0) {
        setReviews(nextReviews);
      } else {
        setReviews(getFallbackReviews());
      }
      return true;
    } catch {
      setReviews(getFallbackReviews());
      return false;
    }
  }, [getFallbackReviews, language, manualReviews, maxReviews, showOnlyHighRated]);

  const scheduleSilentRetry = useCallback(() => {
    if (retryTimerRef.current) return;
    retryTimerRef.current = window.setTimeout(async () => {
      retryTimerRef.current = null;
      const ok = await fetchReviews();
      if (!ok) {
        scheduleSilentRetry();
      }
    }, RETRY_DELAY_MS);
  }, [fetchReviews]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const ok = await fetchReviews();
      if (!cancelled && !ok) {
        scheduleSilentRetry();
      }
    })();

    return () => {
      cancelled = true;
      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, [fetchReviews, scheduleSilentRetry]);

  useEffect(() => {
    if (!autoRefresh || autoRefresh <= 0 || (manualReviews && manualReviews.length > 0)) {
      return undefined;
    }

    const intervalId = setInterval(async () => {
      const ok = await fetchReviews();
      if (!ok) {
        scheduleSilentRetry();
      }
    }, autoRefresh);

    return () => clearInterval(intervalId);
  }, [autoRefresh, fetchReviews, manualReviews, scheduleSilentRetry]);

  const visibleReviews = useMemo(
    () => (reviews.length > 0 ? reviews : getFallbackReviews()),
    [getFallbackReviews, reviews],
  );

  return (
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <GoogleReviewsCarousel
            reviews={visibleReviews}
            privacyMode={privacyMode}
            readMoreLabel={readMoreLabel}
            showLessLabel={showLessLabel}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GoogleReviews;
