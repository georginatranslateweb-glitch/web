import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, VIEWPORT_ONCE } from './variants';

/** Reveals grouped children one after another as they scroll into view. */
export const StaggerContainer = React.forwardRef(function StaggerContainer(
  { as = 'div', children, className, stagger = 0.1, delayChildren = 0.04, viewport = VIEWPORT_ONCE, ...rest },
  ref,
) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

export const StaggerItem = React.forwardRef(function StaggerItem(
  { as = 'div', children, className, variants = staggerItem, ...rest },
  ref,
) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag ref={ref} className={className} variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
});

export default StaggerContainer;
