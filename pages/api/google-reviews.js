import { filterAndSortReviews, normalizeGoogleReview } from '../../lib/google-reviews/normalize';
import { resolvePlaceId } from '../../lib/google-reviews/resolvePlaceId';

const PLACES_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const mapsUrl = process.env.GOOGLE_MAPS_URL;
  const configuredPlaceId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || (!configuredPlaceId && !mapsUrl)) {
    return res.status(503).json({
      success: false,
      message: 'Google Places API is not configured. Set GOOGLE_API_KEY and GOOGLE_PLACE_ID (or GOOGLE_MAPS_URL).',
      configured: false,
    });
  }

  const { showOnlyHighRated, maxReviews, language } = req.query;
  const limit = Number(maxReviews) || 6;
  const highRatedOnly = showOnlyHighRated === 'true';
  const lang = typeof language === 'string' && language.length >= 2 ? language.slice(0, 2) : 'en';

  try {
    const placeId = await resolvePlaceId({
      apiKey,
      placeId: configuredPlaceId,
      mapsUrl,
    });

    if (!placeId) {
      return res.status(422).json({
        success: false,
        message: 'Could not resolve a Google Place ID from your Maps link. Use the Place ID Finder and set GOOGLE_PLACE_ID=ChIJ... in .env.local.',
        configured: true,
      });
    }

    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'name,rating,reviews,user_ratings_total,url',
      key: apiKey,
      language: lang,
    });

    const response = await fetch(`${PLACES_DETAILS_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Google API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(502).json({
        success: false,
        message: data.error_message || `Google Places API error: ${data.status}`,
        configured: true,
      });
    }

    const rawReviews = data.result?.reviews || [];
    const reviews = filterAndSortReviews(
      rawReviews.map(normalizeGoogleReview),
      { showOnlyHighRated: highRatedOnly, maxReviews: limit }
    );

    return res.status(200).json({
      success: true,
      configured: true,
      placeId,
      placeName: data.result?.name || null,
      rating: data.result?.rating || null,
      totalReviews: data.result?.user_ratings_total || 0,
      placeUrl: data.result?.url || null,
      reviews,
    });
  } catch (error) {
    console.error('google-reviews API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch Google reviews.',
      configured: true,
    });
  }
}
