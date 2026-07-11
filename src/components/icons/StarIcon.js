import React from 'react';

const StarIcon = ({ filled = false, className = '' }) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.5}
    aria-hidden="true"
  >
    <path d="M12 2.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.47L12 17.77l-5.8 3.05 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z" />
  </svg>
);

export default StarIcon;
