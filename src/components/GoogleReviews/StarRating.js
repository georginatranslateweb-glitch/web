import React from 'react';

const StarRating = ({ rating = 0, maxStars = 5, className = '' }) => {
  const safeRating = Math.max(0, Math.min(maxStars, Number(rating) || 0));

  return (
    <div
      className={`google-reviews__stars rating-icon${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={`${safeRating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= Math.round(safeRating);

        return (
          <span key={starNumber} className={isFilled ? 'google-reviews__star google-reviews__star--filled' : 'google-reviews__star'}>
            <i className={isFilled ? 'fas fa-star' : 'fal fa-star'} aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
