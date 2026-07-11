import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT_ONCE } from './variants';

/**
 * Fades + gently rises into view as it scrolls in. Renders as any tag via
 * `as`, so it can wrap existing markup without altering the surrounding CSS.
 */
const RevealOnScroll = React.forwardRef(function RevealOnScroll(
  { as = 'div', children, className, variants = fadeUp, viewport = VIEWPORT_ONCE, ...rest },
  ref,
) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

export default RevealOnScroll;
