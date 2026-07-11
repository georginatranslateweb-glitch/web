import React from 'react';
import StarIcon from '../icons/StarIcon';

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
            <StarIcon filled={isFilled} />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
