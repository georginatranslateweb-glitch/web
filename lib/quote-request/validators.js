import {
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  DOCUMENT_TYPES,
  FIELD_LIMITS,
  MAX_FILES,
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
  SERVICE_TYPES,
  URGENCY_LEVELS,
} from './constants';

export function getFileExtension(filename) {
  const parts = String(filename ?? '').toLowerCase().split('.');
  if (parts.length < 2) return '';
  return parts.pop();
}

export function validateFormFields(fields) {
  const errors = [];

  if (!fields.name || fields.name.length < 2) {
    errors.push('Please enter your full name.');
  }
  if (!fields.email) {
    errors.push('Please enter a valid email address.');
  }
  if (fields.phone === null) {
    errors.push('Please enter a valid phone number.');
  }
  if (!SERVICE_TYPES.has(fields.serviceType)) {
    errors.push('Please select a valid service type.');
  }
  if (!DOCUMENT_TYPES.has(fields.documentType)) {
    errors.push('Please select a valid document type.');
  }
  if (!fields.languageFrom || fields.languageFrom.length < 2) {
    errors.push('Please enter the source language.');
  }
  if (!fields.languageTo || fields.languageTo.length < 2) {
    errors.push('Please enter the target language.');
  }
  if (!URGENCY_LEVELS.has(fields.urgency)) {
    errors.push('Please select an urgency level.');
  }
  if (fields.comments.length > FIELD_LIMITS.comments) {
    errors.push('Comments exceed the maximum allowed length.');
  }

  return errors;
}

export function validateUploadedFile(file) {
  const errors = [];
  const ext = getFileExtension(file.originalFilename || file.newFilename);
  const mime = (file.mimetype || '').toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    errors.push(`File type not allowed: ${file.originalFilename}`);
    return errors;
  }

  const mimeOk =
    ALLOWED_MIME_TYPES.has(mime) ||
    mime === 'application/octet-stream' ||
    mime === '';
  if (!mimeOk) {
    errors.push(`MIME type not allowed: ${file.originalFilename}`);
    return errors;
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File exceeds 4.5 MB: ${file.originalFilename}`);
  }

  return errors;
}

export function validateUploadedFiles(files) {
  const list = Array.isArray(files) ? files : files ? [files] : [];
  const errors = [];

  if (list.length > MAX_FILES) {
    errors.push(`Maximum ${MAX_FILES} files allowed.`);
    return errors;
  }

  let totalSize = 0;
  for (const file of list) {
    errors.push(...validateUploadedFile(file));
    totalSize += file.size || 0;
  }

  if (totalSize > MAX_TOTAL_SIZE) {
    errors.push('Total upload size exceeds 4.5 MB.');
  }

  return errors;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
