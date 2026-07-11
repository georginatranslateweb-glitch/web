import React from 'react';

const ArrowIcon = ({ direction = 'right', className = '' }) => {
  const paths = {
    right: 'M5 12h14M13 6l6 6-6 6',
    left: 'M19 12H5M11 18l-6-6 6-6',
  };

  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[direction] || paths.right} />
    </svg>
  );
};

export default ArrowIcon;
