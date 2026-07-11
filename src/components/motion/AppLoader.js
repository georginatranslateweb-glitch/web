import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from './variants';

/**
 * Full-screen brand loader shown on the first load AND on every subsequent
 * page navigation.
 *
 * The mark scales UP as it fades in (0.92 → 1) and, symmetrically, scales
 * DOWN as it fades out (1 → 0.92) so entrance and exit mirror each other.
 * A subtle float + opacity pulse keep it feeling calm. It stays for at least
 * MIN_VISIBLE_MS and honours prefers-reduced-motion.
 */
const FALLBACK_MS = 2500;
const MIN_VISIBLE_MS = 1100;

const AppLoader = ({ label = 'Loading' }) => {
  const [ready, setReady] = useState(false);
  const prefersReduced = useReducedMotion();
  const router = useRouter();
  const startRef = useRef(Date.now());
  const finishedRef = useRef(false);

  // Reveal the page once it has settled, keeping the loader on screen for a
  // minimum duration so the transition never flickers.
  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startRef.current));
    window.setTimeout(() => setReady(true), remaining);
  }, []);

  // Show the loader again for a fresh load cycle.
  const beginLoading = useCallback(() => {
    finishedRef.current = false;
    startRef.current = Date.now();
    setReady(false);
  }, []);

  // First load: wait for fonts, then reveal.
  useEffect(() => {
    const fontsReady =
      typeof document !== 'undefined' && document.fonts
        ? document.fonts.ready
        : Promise.resolve();

    Promise.resolve(fontsReady).then(() => requestAnimationFrame(finish));
    const fallback = window.setTimeout(finish, FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [finish]);

  // Every navigation: show the loader on start, hide once the route is ready.
  useEffect(() => {
    const events = router?.events;
    if (!events) return undefined;

    let fallback;
    const handleStart = () => {
      window.clearTimeout(fallback);
      beginLoading();
    };
    const handleDone = () => {
      requestAnimationFrame(finish);
      fallback = window.setTimeout(finish, FALLBACK_MS);
    };

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleDone);
    events.on('routeChangeError', handleDone);

    return () => {
      window.clearTimeout(fallback);
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleDone);
      events.off('routeChangeError', handleDone);
    };
  }, [router, beginLoading, finish]);

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
          transition={{ duration: 1, ease: EASE_OUT }}
        >
          <motion.div
            className="app-loader__mark"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06, transition: { duration: 1, ease: EASE_OUT } }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
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
