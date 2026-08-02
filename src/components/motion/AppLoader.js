import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from './variants';
import { lockScroll, unlockScroll } from '../../lib/scrollLock';

/**
 * Full-screen brand loader shown on the first load AND on every subsequent
 * page navigation. Never waits on fonts or other async resources — only React
 * mount + a short minimum animation window (500–800ms).
 */
const FALLBACK_MS = 800;
const MIN_VISIBLE_MS = 500;
/**
 * Tope absoluto: aunque se pierda un evento de navegación (routeChangeComplete
 * que no llega), el loader se cierra igual y nunca deja el scroll bloqueado.
 */
const HARD_MAX_MS = 4000;

const AppLoader = ({ label = 'Loading' }) => {
  const [ready, setReady] = useState(false);
  const prefersReduced = useReducedMotion();
  const router = useRouter();
  const startRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startRef.current));
    window.setTimeout(() => setReady(true), remaining);
  }, []);

  const beginLoading = useCallback(() => {
    finishedRef.current = false;
    startRef.current = Date.now();
    setReady(false);
  }, []);

  useEffect(() => {
    requestAnimationFrame(finish);
    const fallback = window.setTimeout(finish, FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [finish]);

  useEffect(() => {
    const events = router?.events;
    if (!events) return undefined;

    let fallback;
    const handleStart = () => {
      window.clearTimeout(fallback);
      beginLoading();
      // Red de seguridad: si el "complete" nunca llega, cerramos igual.
      fallback = window.setTimeout(finish, HARD_MAX_MS);
    };
    const handleDone = () => {
      requestAnimationFrame(finish);
      window.clearTimeout(fallback);
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
    lockScroll();
    return () => unlockScroll();
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
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <motion.div
            className="app-loader__mark"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.45, ease: EASE_OUT } }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
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
