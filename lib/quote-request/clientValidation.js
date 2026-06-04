const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+().-]{6,40}$/;

export const ALLOWED_CLIENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/tiff',
];

export const ALLOWED_CLIENT_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'jpg',
  'jpeg',
  'png',
  'tif',
  'tiff',
];

export const MAX_FILES = 5;
export const MAX_FILE_SIZE = 4.5 * 1024 * 1024;
export const MAX_TOTAL_SIZE = 4.5 * 1024 * 1024;

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getExtension(name) {
  const parts = String(name).toLowerCase().split('.');
  return parts.length > 1 ? parts.pop() : '';
}

/** @returns {string | { key: string, params?: Record<string, unknown> }} */
export function validateField(name, value, formState = {}) {
  switch (name) {
    case 'name':
      if (!value || value.trim().length < 2) return 'nameRequired';
      return '';
    case 'email':
      if (!value || !EMAIL_RE.test(value.trim())) return 'emailInvalid';
      return '';
    case 'phone':
      if (value && !PHONE_RE.test(value.trim())) return 'phoneInvalid';
      return '';
    case 'serviceType':
      if (!value) return 'serviceTypeRequired';
      return '';
    case 'documentType':
      if (!value) return 'documentTypeRequired';
      return '';
    case 'languageFrom':
      if (!value || value.trim().length < 2) return 'languageFromRequired';
      return '';
    case 'languageTo':
      if (!value || value.trim().length < 2) return 'languageToRequired';
      if (
        formState.languageFrom &&
        value.trim().toLowerCase() === formState.languageFrom.trim().toLowerCase()
      ) {
        return 'languagesMustDiffer';
      }
      return '';
    case 'urgency':
      if (!value) return 'urgencyRequired';
      return '';
    case 'comments':
      if (value && value.length > 3000) return 'commentsTooLong';
      return '';
    default:
      return '';
  }
}

/** @returns {string | { key: string, params?: Record<string, unknown> }} */
export function validateFile(file, existingFiles = []) {
  const ext = getExtension(file.name);
  if (!ALLOWED_CLIENT_EXTENSIONS.includes(ext)) {
    return { key: 'fileTypeNotAllowed', params: { name: file.name } };
  }
  if (!ALLOWED_CLIENT_TYPES.includes(file.type) && file.type !== '') {
    return { key: 'fileFormatUnsupported', params: { name: file.name } };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { key: 'fileTooLarge', params: { name: file.name } };
  }
  if (existingFiles.some((f) => f.name === file.name && f.size === file.size)) {
    return { key: 'fileDuplicate', params: { name: file.name } };
  }
  return '';
}

/** @returns {string | { key: string, params?: Record<string, unknown> }} */
export function validateFileList(files) {
  if (files.length > MAX_FILES) {
    return { key: 'maxFiles', params: { max: MAX_FILES } };
  }
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_SIZE) {
    return { key: 'totalSizeExceeded', params: { maxSize: formatBytes(MAX_TOTAL_SIZE) } };
  }
  return '';
}

export function validateAllFields(formState) {
  const fields = [
    'name',
    'email',
    'phone',
    'serviceType',
    'documentType',
    'languageFrom',
    'languageTo',
    'urgency',
    'comments',
  ];
  const errors = {};
  for (const field of fields) {
    const msg = validateField(field, formState[field], formState);
    if (msg) errors[field] = msg;
  }
  const fileListError = validateFileList(formState.files || []);
  if (fileListError) errors.files = fileListError;
  return errors;
}
