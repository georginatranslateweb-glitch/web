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
 * Viewport config for scroll reveals: only once, and only after a good chunk
 * of the element is on screen. Combined with REVEAL_DELAY the animation
 * clearly plays while the visitor is looking at the element.
 */
export const VIEWPORT_ONCE = { once: true, amount: 0.3 };

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
