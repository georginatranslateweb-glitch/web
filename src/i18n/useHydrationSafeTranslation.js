import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/** Debe coincidir con `lng` inicial en src/i18n/index.js (SSR + primer render cliente). */
export const SSR_I18N_LANG = 'en';

/**
 * Traducciones alineadas con el HTML del servidor hasta terminar la hidratación.
 * Tras `useEffect`, usa el idioma activo de i18n (p. ej. el de localStorage).
 */
export function useHydrationSafeTranslation(ns, options) {
  const { t, i18n, ready: i18nReady } = useTranslation(ns, options);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const lng = hydrated
    ? (i18n.resolvedLanguage || i18n.language || SSR_I18N_LANG).split('-')[0]
    : SSR_I18N_LANG;

  const safeT = useCallback(
    (key, opts) => t(key, { ...opts, lng }),
    [t, lng],
  );

  return { t: safeT, i18n, hydrated: hydrated && i18nReady };
}
