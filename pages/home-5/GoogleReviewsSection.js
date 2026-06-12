import React, { useCallback, useMemo } from 'react';

import GoogleReviews from '../../src/components/GoogleReviews';
import enHome from '../../src/locales/en/home.json';
import esHome from '../../src/locales/es/home.json';
import { SSR_I18N_LANG, useHydrationSafeTranslation } from '../../src/i18n/useHydrationSafeTranslation';

const homeFiveReviewsDefaults = (lang) => {
  const code = String(lang || 'en').toLowerCase().split('-')[0];
  const bundle = code === 'es' ? esHome : enHome;
  return bundle.homeFive.reviews;
};

const HomeFiveGoogleReviews = () => {
  const { t, i18n, hydrated } = useHydrationSafeTranslation('home');

  const lang = hydrated
    ? (i18n.resolvedLanguage || i18n.language)
    : SSR_I18N_LANG;

  const defaults = useMemo(() => homeFiveReviewsDefaults(lang), [lang]);

  const tx = useCallback(
    (key) => {
      const fallback = defaults[key];
      if (!hydrated) {
        return homeFiveReviewsDefaults(SSR_I18N_LANG)[key] ?? fallback ?? key;
      }
      return t(`homeFive.reviews.${key}`, { defaultValue: fallback });
    },
    [t, defaults, hydrated],
  );

  return (
    <GoogleReviews
      maxReviews={9}
      showOnlyHighRated
      autoRefresh={5 * 60 * 1000}
      language={lang}
      subTitle={tx('subTitle')}
      titleLine1={tx('titleLine1')}
      titleLine2={tx('titleLine2')}
      readMoreLabel={tx('readMore')}
      showLessLabel={tx('showLess')}
      retryLabel={tx('retry')}
    />
  );
};

export default HomeFiveGoogleReviews;
