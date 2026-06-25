import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/** Debe coincidir con `lng` inicial en src/i18n/index.js (SSR + primer render cliente). */
export const SSR_I18N_LANG = 'en';

/**
 * Traducciones alineadas con el HTML del servidor hasta terminar la hidratación.
 * Usa getFixedT('en') en SSR y primer paint del cliente; luego el idioma activo de i18n.
 */
export function useHydrationSafeTranslation(ns, options) {
  const { t, i18n, ready: i18nReady } = useTranslation(ns, options);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ssrT = useCallback(
    (key, opts) => i18n.getFixedT(SSR_I18N_LANG, ns)(key, opts),
    [i18n, ns],
  );

  const safeT = useCallback(
    (key, opts) => {
      if (!mounted || !i18nReady) {
        return ssrT(key, opts);
      }
      return t(key, opts);
    },
    [mounted, i18nReady, ssrT, t],
  );

  return { t: safeT, i18n, hydrated: mounted && i18nReady, mounted };
}
