/**
 * Normalizes Google Places API review objects into a consistent shape.
 */
export function normalizeGoogleReview(review, index = 0) {
  return {
    id: review.time ? String(review.time) : `review-${index}`,
    authorName: review.author_name || 'Anonymous',
    authorPhotoUrl: review.profile_photo_url || null,
    rating: Number(review.rating) || 0,
    text: review.text || '',
    relativeTime: review.relative_time_description || '',
    time: review.time || null,
  };
}

export function getAuthorInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

export function filterAndSortReviews(reviews, { showOnlyHighRated = false, maxReviews = 6 } = {}) {
  let result = [...reviews];

  if (showOnlyHighRated) {
    result = result.filter((review) => review.rating >= 4);
  }

  result.sort((a, b) => (b.time || 0) - (a.time || 0));

  return result.slice(0, maxReviews);
}

export function formatReviewDate(time) {
  if (!time) return '';
  return new Date(time * 1000).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
