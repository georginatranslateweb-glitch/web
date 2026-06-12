const PLACES_FIND_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
const PLACES_TEXT_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

function decodePlaceName(segment = '') {
  try {
    return decodeURIComponent(segment.replace(/\+/g, ' ')).trim();
  } catch {
    return segment.replace(/\+/g, ' ').trim();
  }
}

function parseMapsUrl(url = '') {
  const placeMatch = url.match(/\/place\/([^/@?]+)/i);
  const coordsMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  const featureMatch = url.match(/!1s(0x[a-f0-9]+:0x[a-f0-9]+)/i);
  const kgMatch = url.match(/\/g\/([a-z0-9_-]+)/i);

  return {
    placeName: placeMatch ? decodePlaceName(placeMatch[1]) : '',
    lat: coordsMatch ? Number(coordsMatch[1]) : null,
    lng: coordsMatch ? Number(coordsMatch[2]) : null,
    featureId: featureMatch ? featureMatch[1] : '',
    kgId: kgMatch ? kgMatch[1] : '',
  };
}

async function followMapsRedirect(mapsUrl) {
  const response = await fetch(mapsUrl, { redirect: 'follow' });
  return response.url || mapsUrl;
}

function namesMatch(urlName = '', candidateName = '') {
  const left = urlName.toLowerCase().trim();
  const right = candidateName.toLowerCase().trim();
  if (!left || !right) return false;

  return left === right
    || right.includes(left)
    || left.includes(right);
}

function pickBestCandidate(candidates, parsed) {
  if (!candidates?.length || !parsed.placeName) return null;

  const byName = candidates.find((item) => namesMatch(parsed.placeName, item.name));
  return byName || null;
}

async function searchPlaceCandidates(apiKey, parsed) {
  const queries = [parsed.placeName].filter(Boolean);

  for (const query of queries) {
    const params = new URLSearchParams({
      query,
      key: apiKey,
    });

    if (parsed.lat != null && parsed.lng != null) {
      params.set('location', `${parsed.lat},${parsed.lng}`);
      params.set('radius', '80000');
    }

    const response = await fetch(`${PLACES_TEXT_SEARCH_URL}?${params.toString()}`);
    const data = await response.json();

    if (data.status === 'OK' && data.results?.length) {
      return data.results;
    }
  }

  if (parsed.placeName) {
    const params = new URLSearchParams({
      input: parsed.placeName,
      inputtype: 'textquery',
      fields: 'place_id,name,geometry,formatted_address',
      key: apiKey,
    });

    if (parsed.lat != null && parsed.lng != null) {
      params.set('locationbias', `circle:80000@${parsed.lat},${parsed.lng}`);
    }

    const response = await fetch(`${PLACES_FIND_URL}?${params.toString()}`);
    const data = await response.json();

    if (data.status === 'OK' && data.candidates?.length) {
      return data.candidates;
    }
  }

  return [];
}

export async function resolvePlaceId({ apiKey, placeId, mapsUrl }) {
  if (placeId && !placeId.startsWith('http')) {
    return placeId;
  }

  const urlToResolve = mapsUrl || (placeId?.startsWith('http') ? placeId : '');
  if (!urlToResolve) {
    return null;
  }

  const finalUrl = await followMapsRedirect(urlToResolve);
  const parsed = parseMapsUrl(finalUrl);
  const candidates = await searchPlaceCandidates(apiKey, parsed);
  const bestMatch = pickBestCandidate(candidates, parsed);

  return bestMatch?.place_id || null;
}
