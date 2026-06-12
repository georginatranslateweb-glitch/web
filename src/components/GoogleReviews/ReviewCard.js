import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { formatReviewDate, getAuthorInitials } from '../../../lib/google-reviews/normalize';
import StarRating from './StarRating';

const TEXT_TRUNCATE_LENGTH = 180;

const ReviewCard = ({ review, privacyMode = false, readMoreLabel = 'Read more', showLessLabel = 'Show less' }) => {
  const [expanded, setExpanded] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const displayName = privacyMode ? getAuthorInitials(review.authorName) : review.authorName;
  const shouldTruncate = review.text.length > TEXT_TRUNCATE_LENGTH;
  const displayText = expanded || !shouldTruncate
    ? review.text
    : `${review.text.slice(0, TEXT_TRUNCATE_LENGTH).trim()}…`;

  const formattedDate = review.relativeTime || formatReviewDate(review.time);
  const showAvatar = Boolean(review.authorPhotoUrl && !privacyMode && !avatarFailed);

  useEffect(() => {
    setAvatarFailed(false);
  }, [review.authorPhotoUrl, review.id]);

  return (
    <div className={`testimonial-wraper google-reviews__card${expanded ? ' google-reviews__card--expanded' : ''}`}>
      <div className="content google-reviews__card-content">
        <StarRating rating={review.rating} className="google-reviews__card-stars" />
        <p className="google-reviews__card-text">{displayText}</p>
        {shouldTruncate && (
          <button
            type="button"
            className="google-reviews__expand-btn"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? showLessLabel : readMoreLabel}
          </button>
        )}
      </div>
      <div className={`author google-reviews__card-author${showAvatar ? '' : ' google-reviews__card-author--no-avatar'}`}>
        {showAvatar && (
          <div className="author-image">
            <Image
              src={review.authorPhotoUrl}
              alt=""
              width={48}
              height={48}
              unoptimized
              onError={() => setAvatarFailed(true)}
            />
          </div>
        )}
        <div className="author-details">
          <h2 className="name">{displayName}</h2>
          {formattedDate && <p className="desc">{formattedDate}</p>}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
