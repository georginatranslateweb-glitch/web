export const MAX_FILES = 5;
export const MAX_FILE_SIZE = 4.5 * 1024 * 1024;
export const MAX_TOTAL_SIZE = 4.5 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = new Set([
  'pdf',
  'doc',
  'docx',
  'jpg',
  'jpeg',
  'png',
  'tif',
  'tiff',
]);

export const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/tiff',
]);

export const SERVICE_TYPES = new Set([
  'translation',
  'interpretation',
  'certification',
]);

export const DOCUMENT_TYPES = new Set([
  'legal',
  'medical',
  'academic',
  'immigration',
  'business',
  'personal',
  'other',
]);

export const URGENCY_LEVELS = new Set([
  'standard',
  'urgent',
  'express',
]);

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  languageFrom: 80,
  languageTo: 80,
  comments: 3000,
};

export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 5;
