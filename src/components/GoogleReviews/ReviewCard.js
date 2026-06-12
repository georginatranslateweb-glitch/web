import React, { useState } from 'react';
import Image from 'next/image';

import testiImg1 from '../../../public/images/testimonial/avatar-1.png';
import testiImg2 from '../../../public/images/testimonial/avatar-2.png';
import testiImg3 from '../../../public/images/testimonial/avatar-3.png';
import { formatReviewDate, getAuthorInitials } from '../../../lib/google-reviews/normalize';
import StarRating from './StarRating';

const FALLBACK_AVATARS = [testiImg1, testiImg2, testiImg3];
const TEXT_TRUNCATE_LENGTH = 180;

const ReviewCard = ({ review, index = 0, privacyMode = false, readMoreLabel = 'Read more', showLessLabel = 'Show less' }) => {
  const [expanded, setExpanded] = useState(false);

  const displayName = privacyMode ? getAuthorInitials(review.authorName) : review.authorName;
  const shouldTruncate = review.text.length > TEXT_TRUNCATE_LENGTH;
  const displayText = expanded || !shouldTruncate
    ? review.text
    : `${review.text.slice(0, TEXT_TRUNCATE_LENGTH).trim()}…`;

  const formattedDate = review.relativeTime || formatReviewDate(review.time);
  const fallbackAvatar = FALLBACK_AVATARS[index % FALLBACK_AVATARS.length];

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
      <div className="author google-reviews__card-author">
        <div className="author-image">
          {review.authorPhotoUrl && !privacyMode ? (
            <Image
              src={review.authorPhotoUrl}
              alt={displayName}
              width={48}
              height={48}
              unoptimized
            />
          ) : (
            <Image src={fallbackAvatar} alt={displayName} />
          )}
        </div>
        <div className="author-details">
          <h2 className="name">{displayName}</h2>
          {formattedDate && <p className="desc">{formattedDate}</p>}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
