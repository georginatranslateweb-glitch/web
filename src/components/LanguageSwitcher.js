import React, { useState, useRef, useEffect } from 'react';
import {
  SSR_I18N_LANG,
  useHydrationSafeTranslation,
} from '../i18n/useHydrationSafeTranslation';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

const LanguageSwitcher = ({ className = '' }) => {
  const { t, i18n, hydrated } = useHydrationSafeTranslation('common');
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const resolved = hydrated
    ? (i18n.resolvedLanguage || i18n.language || SSR_I18N_LANG).split('-')[0]
    : SSR_I18N_LANG;
  const current = LANGUAGES.find((l) => l.code === resolved) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`ms-lang-dropdown ${open ? 'is-open' : ''} ${className}`.trim()}
    >
      <button
        type="button"
        className="ms-lang-dropdown__toggle"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('switchLanguage')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ms-lang-dropdown__code" suppressHydrationWarning>
          {current.label}
        </span>
        <svg
          className="ms-lang-dropdown__chevron"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          aria-hidden="true"
        >
          <path
            d="M1 1.5l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <ul className="ms-lang-dropdown__menu" role="listbox">
          {LANGUAGES.map(({ code, label }) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={resolved === code}
                className={`ms-lang-dropdown__option${resolved === code ? ' is-active' : ''}`}
                lang={code}
                onClick={() => {
                  i18n.changeLanguage(code);
                  setOpen(false);
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default LanguageSwitcher;
