import { useCallback, useMemo } from 'react';

import enAbout from '../locales/en/about.json';
import esAbout from '../locales/es/about.json';
import { SSR_I18N_LANG, useHydrationSafeTranslation } from './useHydrationSafeTranslation';

export function aboutDefaults(lang) {
  const code = String(lang || 'en').toLowerCase().split('-')[0];
  return code === 'es' ? esAbout : enAbout;
}

function getNested(obj, path) {
  return path.split('.').reduce((acc, part) => {
    if (acc == null || typeof acc !== 'object') return undefined;
    return acc[part];
  }, obj);
}

function interpolate(template, params = {}) {
  if (typeof template !== 'string') return template;
  return Object.entries(params).reduce(
    (str, [key, value]) => str.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
    template,
  );
}

export function resolveAboutDefault(defaults, key, options = {}) {
  const value = getNested(defaults, key);
  if (typeof value === 'string') {
    return interpolate(value, options);
  }
  return value;
}

/** SSR-safe about translations — bundled JSON only (avoids stale i18n store + hydration drift). */
export function useAboutTranslation() {
  const { i18n, mounted } = useHydrationSafeTranslation('about');
  const activeLang = mounted
    ? (i18n.resolvedLanguage || i18n.language)
    : SSR_I18N_LANG;
  const defaults = useMemo(
    () => aboutDefaults(activeLang),
    [activeLang],
  );
  const tx = useCallback(
    (key, options) => {
      const fallback = resolveAboutDefault(defaults, key, options);
      if (typeof fallback === 'string') {
        return fallback;
      }
      return fallback ?? key;
    },
    [defaults],
  );
  return { tx, i18n, hydrated: mounted, defaults };
}
