/**
 * Builds timeline step objects from i18n keys (about namespace).
 */
export function buildHowItWorksSteps(t) {
  return [1, 2, 3, 4, 5].map((n) => ({
    number: n,
    title: t(`timelineStep${n}Title`),
    description: t(`timelineStep${n}Description`),
  }));
}
