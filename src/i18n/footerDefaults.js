import enFooter from '../locales/en/footer.json';
import esFooter from '../locales/es/footer.json';

export function footerDefaults(lang) {
  const code = String(lang || 'en').toLowerCase().split('-')[0];
  return code === 'es' ? esFooter : enFooter;
}

function interpolate(template, params = {}) {
  if (typeof template !== 'string') return template;
  return Object.entries(params).reduce(
    (str, [key, value]) => str.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
    template,
  );
}

export function resolveFooterDefault(defaults, key, options = {}) {
  const value = defaults[key];
  if (typeof value === 'string') {
    return interpolate(value, options);
  }
  return undefined;
}
