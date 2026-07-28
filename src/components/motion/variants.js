/**
 * Shared motion tokens and variants.
 *
 * Only opacity and transform are animated (GPU friendly). Reveals use a
 * gentle easeOutCubic so content builds up progressively and never "pops".
 * The whole app is wrapped in <MotionConfig reducedMotion="user">, so when a
 * visitor prefers reduced motion the translate is dropped and only a soft
 * opacity fade remains.
 */

// easeOutCubic — smooth, gradual deceleration (not front-loaded).
export const EASE_OUT = [0.215, 0.61, 0.355, 1];

export const DURATION = {
  fast: 0.7,
  base: 1,
  slow: 1.3,
};

// Vertical travel for entrance animations. A bit longer so the movement is
// clearly noticeable.
export const TRAVEL = 26;

// Small pause before a reveal starts once the element is on screen, so the
// user actually sees the transition play instead of it being over already.
export const REVEAL_DELAY = 0.35;

/**
 * Viewport config for scroll reveals: only once, triggered as soon as the
 * element crosses into the viewport.
 *
 * IMPORTANT: this must be height-independent. A fractional `amount` (e.g. 0.3)
 * maps to an IntersectionObserver threshold that requires that fraction of the
 * element to be visible *at the same time*. For any section taller than the
 * viewport the maximum visible fraction is viewportHeight / elementHeight, so a
 * 0.3 threshold is only satisfiable within a narrow band of scroll positions —
 * and impossible once the element is taller than ~3.3× the viewport. When the
 * observer's first sample lands outside that band the reveal never fires and the
 * section stays stuck at opacity:0 until something re-samples it (a refresh or a
 * differently-timed scroll). That is the "only shows after refresh" bug.
 *
 * A negative bottom `margin` is not a safe alternative either: it permanently
 * excludes the bottom of the viewport, so elements pinned there (e.g. the fixed
 * footer's copyright row) would never trigger.
 *
 * `amount: 'some'` reveals as soon as ANY part of the element enters the
 * viewport. It is height-independent and has no excluded zone, so every section
 * reveals reliably on the first visit regardless of its height or position.
 */
export const VIEWPORT_ONCE = { once: true, amount: 'some' };

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_OUT, delay: REVEAL_DELAY },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: TRAVEL },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT, delay: REVEAL_DELAY },
  },
};

/**
 * Image reveal: fades in while coming gently into focus. Uses filter/opacity
 * only (no transform) so it never shifts an element whose bounding box is
 * measured for layout — e.g. the home hero slot that positions the vertical
 * logo.
 */
export const imageReveal = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

// Container that reveals its children one after another. By default the
// cascade begins REVEAL_DELAY after the group enters view, and each child is
// spaced out enough to read as a clear sequence.
export const staggerContainer = (stagger = 0.16, delayChildren = REVEAL_DELAY) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: TRAVEL },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};
