import { useCallback, useMemo } from 'react';

import enContact from '../locales/en/contact.json';
import esContact from '../locales/es/contact.json';
import { SSR_I18N_LANG, useHydrationSafeTranslation } from './useHydrationSafeTranslation';

export function contactDefaults(lang) {
  const code = String(lang || 'en').toLowerCase().split('-')[0];
  return code === 'es' ? esContact : enContact;
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

/** Resolves bundled fallback copy (incl. plural keys) for SSR-safe t() calls. */
export function resolveContactDefault(defaults, key, options = {}) {
  if (key === 'files.total' && options.count !== undefined) {
    const pluralKey = options.count === 1 ? 'files.total_one' : 'files.total_other';
    const template = getNested(defaults, pluralKey);
    return interpolate(template, options);
  }

  const value = getNested(defaults, key);
  if (typeof value === 'string') {
    return interpolate(value, options);
  }
  return undefined;
}

/** SSR-safe contact translations (aligned with Footer pattern). */
export function useContactTranslation() {
  const { t, i18n, hydrated } = useHydrationSafeTranslation('contact');
  const defaults = useMemo(
    () => contactDefaults(
      hydrated
        ? (i18n.resolvedLanguage || i18n.language)
        : SSR_I18N_LANG,
    ),
    [hydrated, i18n.resolvedLanguage, i18n.language],
  );
  const tx = useCallback(
    (key, options) => {
      const fallback = resolveContactDefault(defaults, key, options);
      if (!hydrated) {
        return fallback ?? resolveContactDefault(contactDefaults(SSR_I18N_LANG), key, options) ?? key;
      }
      return t(key, {
        ...options,
        defaultValue: fallback,
      });
    },
    [t, defaults, hydrated],
  );
  return { t, tx, i18n, hydrated };
}
