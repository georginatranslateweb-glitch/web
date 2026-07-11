import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from './variants';

/**
 * Full-screen brand loader shown on first load.
 *
 * The mark scales UP as it fades in (0.92 → 1) and, symmetrically, scales
 * DOWN as it fades out (1 → 0.92) so entrance and exit mirror each other.
 * A subtle float + opacity pulse keep it feeling calm. Fades out once React
 * has mounted and fonts are ready. Honours prefers-reduced-motion.
 */
const FALLBACK_MS = 2000;
const MIN_VISIBLE_MS = 400;

const AppLoader = ({ label = 'Loading' }) => {
  const [ready, setReady] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let finished = false;
    const start = Date.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start));
      window.setTimeout(() => setReady(true), remaining);
    };

    const fontsReady =
      typeof document !== 'undefined' && document.fonts
        ? document.fonts.ready
        : Promise.resolve();

    Promise.resolve(fontsReady).then(() => requestAnimationFrame(finish));
    const fallback = window.setTimeout(finish, FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (ready) return undefined;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = 'hidden';
    return () => {
      style.overflow = previous;
    };
  }, [ready]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="app-loader"
          className="app-loader"
          role="status"
          aria-label={label}
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <motion.div
            className="app-loader__mark"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <motion.div
              className="app-loader__float"
              animate={prefersReduced ? undefined : { y: [0, -3, 0], opacity: [1, 0.86, 1] }}
              transition={
                prefersReduced
                  ? undefined
                  : { duration: 3.2, ease: 'easeInOut', repeat: Infinity }
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-beige.png"
                alt=""
                className="app-loader__logo"
                width={220}
                height={130}
                fetchPriority="high"
                draggable="false"
              />
            </motion.div>
          </motion.div>
          <span className="app-loader__sr-only">{label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppLoader;
