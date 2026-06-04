import { FIELD_LIMITS } from './constants';

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export function stripControlChars(value) {
  return String(value ?? '').replace(CONTROL_CHARS, '');
}

export function sanitizeText(value, maxLength) {
  const cleaned = stripControlChars(value)
    .replace(/<[^>]*>/g, '')
    .trim();
  return cleaned.slice(0, maxLength);
}

export function sanitizeEmail(value) {
  const email = sanitizeText(value, FIELD_LIMITS.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }
  return email;
}

export function sanitizePhone(value) {
  const phone = sanitizeText(value, FIELD_LIMITS.phone);
  if (!phone) return '';
  if (!/^[\d\s+().-]{6,40}$/.test(phone)) {
    return null;
  }
  return phone;
}

export function sanitizeFormFields(raw = {}) {
  return {
    name: sanitizeText(raw.name, FIELD_LIMITS.name),
    email: sanitizeEmail(raw.email),
    phone: sanitizePhone(raw.phone),
    serviceType: sanitizeText(raw.serviceType, 40).toLowerCase(),
    documentType: sanitizeText(raw.documentType, 40).toLowerCase(),
    languageFrom: sanitizeText(raw.languageFrom, FIELD_LIMITS.languageFrom),
    languageTo: sanitizeText(raw.languageTo, FIELD_LIMITS.languageTo),
    urgency: sanitizeText(raw.urgency, 20).toLowerCase(),
    comments: sanitizeText(raw.comments, FIELD_LIMITS.comments),
  };
}
