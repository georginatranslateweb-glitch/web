import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import timelineLogo from '../../../public/images/logo/logo-red.png';

const EASE = [0.22, 1, 0.36, 1];

const fadeUpVariants = {
  hidden: { y: 28 },
  visible: {
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

function TimelineMarker({ stepNumber, logoAlt }) {
  return (
    <div className="how-it-works-timeline__marker">
      <div className="how-it-works-timeline__marker-stack">
        <span className="how-it-works-timeline__number" aria-hidden>
          {stepNumber}
        </span>
        <div className="how-it-works-timeline__logo">
          <Image
            src={timelineLogo}
            alt={logoAlt}
          width={180}
          height={180}
            className="how-it-works-timeline__logo-img"
          />
        </div>
      </div>
    </div>
  );
}

function TimelineStepContent({ title, description, align }) {
  const contentAlign =
    align === 'right'
      ? 'how-it-works-timeline__content--end'
      : 'how-it-works-timeline__content--start';

  return (
    <div className={`how-it-works-timeline__content ${contentAlign}`}>
      <h3 className="how-it-works-timeline__title">{title}</h3>
      <p className="how-it-works-timeline__description">{description}</p>
    </div>
  );
}

function TimelineStepRow({ step, index, logoAlt, motionEnabled }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-12% 0px -12% 0px',
    enabled: motionEnabled,
  });
  const contentOnRight = index % 2 === 0;

  const contentCellClass = contentOnRight
    ? 'md:col-start-3 md:justify-self-start'
    : 'md:col-start-1 md:justify-self-end';

  return (
    <motion.li
      ref={ref}
      initial={false}
      animate={motionEnabled ? (isInView ? 'visible' : 'hidden') : false}
      variants={fadeUpVariants}
      className="group relative grid grid-cols-1 items-center gap-y-[clamp(1rem,3vw,1.5rem)] py-[clamp(2.5rem,6vw,4.5rem)] md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-[clamp(1.5rem,4vw,3.5rem)]"
    >
      <div className="order-1 flex justify-center md:col-start-2 md:row-start-1 md:self-start md:order-none">
        <TimelineMarker stepNumber={step.number} logoAlt={logoAlt} />
      </div>

      <div
        className={`order-2 md:row-start-1 md:self-start md:order-none ${contentCellClass}`}
      >
        <TimelineStepContent
          title={step.title}
          description={step.description}
          align={contentOnRight ? 'left' : 'right'}
        />
      </div>

      <div
        className={`hidden md:row-start-1 md:block ${
          contentOnRight ? 'md:col-start-1' : 'md:col-start-3'
        }`}
        aria-hidden
      />
    </motion.li>
  );
}

/**
 * Editorial vertical timeline for the About page “How it works” section.
 */
const HowItWorksTimeline = ({ steps, logoAlt = 'Brand mark' }) => {
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    setMotionEnabled(true);
  }, []);

  if (!steps?.length) return null;

  return (
    <section
      className="how-it-works-timeline relative mb-[clamp(2.5rem,6vw,4.5rem)] w-full bg-transparent"
      aria-label="Process timeline"
    >
      <div className="relative mx-auto w-full max-w-[min(100%,52rem)] px-[clamp(0.5rem,2vw,1rem)]">
        <div
          className="how-it-works-timeline__line pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          aria-hidden
        />

        <ol className="relative m-0 list-none p-0">
          {steps.map((step, index) => (
            <TimelineStepRow
              key={step.number}
              step={step}
              index={index}
              logoAlt={logoAlt}
              motionEnabled={motionEnabled}
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorksTimeline;
