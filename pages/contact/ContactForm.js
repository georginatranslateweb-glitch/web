import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { contactDefaults, resolveContactDefault } from '../../src/i18n/contactDefaults';
import {
  formatBytes,
  MAX_FILES,
  MAX_TOTAL_SIZE,
  validateAllFields,
  validateField,
  validateFile,
  validateFileList,
} from '../../lib/quote-request/clientValidation';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  serviceType: '',
  documentType: '',
  languageFrom: '',
  languageTo: '',
  urgency: '',
  comments: '',
};

function translateValidationError(tx, error) {
  if (!error) return '';
  if (typeof error === 'string') {
    return tx(`validation.${error}`);
  }
  return tx(`validation.${error.key}`, error.params);
}

const ContactForm = () => {
  const { t, i18n } = useTranslation('contact');
  const defaults = useMemo(
    () => contactDefaults(i18n.resolvedLanguage || i18n.language),
    [i18n.resolvedLanguage, i18n.language],
  );
  const tx = useCallback(
    (key, options) =>
      t(key, {
        ...options,
        defaultValue: resolveContactDefault(defaults, key, options),
      }),
    [t, defaults],
  );
  const [form, setForm] = useState(INITIAL_FORM);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [globalErrorKey, setGlobalErrorKey] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const setField = useCallback((name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        if (touched[name]) {
          const msg = validateField(name, value, next);
          if (msg) nextErrors[name] = msg;
          else delete nextErrors[name];
        }
        if (touched.languageTo && (name === 'languageFrom' || name === 'languageTo')) {
          const langMsg = validateField('languageTo', next.languageTo, next);
          if (langMsg) nextErrors.languageTo = langMsg;
          else delete nextErrors.languageTo;
        }
        return nextErrors;
      });
      return next;
    });
  }, [touched]);

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, form[name], form);
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[name] = msg;
      else delete next[name];
      return next;
    });
  };

  const addFiles = useCallback((incoming) => {
    const list = Array.from(incoming || []);
    if (!list.length) return;

    setFiles((prev) => {
      const next = [...prev];
      let firstError = '';

      for (const file of list) {
        if (next.length >= MAX_FILES) {
          firstError = firstError || { key: 'maxFiles', params: { max: MAX_FILES } };
          break;
        }
        const fileError = validateFile(file, next);
        if (fileError) {
          firstError = firstError || fileError;
          continue;
        }
        next.push(file);
      }

      const listError = validateFileList(next);
      const filesError = listError || firstError;

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (filesError) newErrors.files = filesError;
        else delete newErrors.files;
        return newErrors;
      });

      return next;
    });
    setTouched((prev) => ({ ...prev, files: true }));
  }, []);

  const removeFile = (index) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        const listError = validateFileList(next);
        if (listError) nextErrors.files = listError;
        else delete nextErrors.files;
        return nextErrors;
      });
      return next;
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalErrorKey('');

    const allTouched = {
      name: true,
      email: true,
      phone: true,
      serviceType: true,
      documentType: true,
      languageFrom: true,
      languageTo: true,
      urgency: true,
      comments: true,
      files: true,
    };
    setTouched(allTouched);

    const validationErrors = validateAllFields({ ...form, files });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      body.append(key, value);
    });
    files.forEach((file) => {
      body.append('files', file);
    });

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        body,
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setGlobalErrorKey('submitFailed');
        if (data.errors?.length) {
          setErrors((prev) => ({ ...prev, files: 'submitFailed' }));
        }
        return;
      }

      setReferenceNumber(data.referenceNumber);
      setStatus('success');
      setForm(INITIAL_FORM);
      setFiles([]);
      setErrors({});
      setTouched({});
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      setStatus('error');
      setGlobalErrorKey('networkError');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form quote-form">
        <div className="quote-form__success" role="status">
          <h3 className="quote-form__success-title">{tx('success.title')}</h3>
          <p>{tx('success.message')}</p>
          <p className="quote-form__reference">
            <span className="quote-form__reference-label">{tx('success.referenceLabel')}</span>
            <strong>{referenceNumber}</strong>
          </p>
          <div className="ms-cf--bottom">
            <button
              type="button"
              className="btn-footer quote-form__reset-btn"
              onClick={() => {
                setStatus('idle');
                setReferenceNumber('');
              }}
            >
              {tx('success.submitAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const isLoading = status === 'loading';
  const maxSizeLabel = formatBytes(MAX_TOTAL_SIZE);

  return (
    <div className="contact-form quote-form">
      <form
        action="#"
        method="post"
        aria-label={tx('formAriaLabel')}
        onSubmit={handleSubmit}
        noValidate
      >
        {globalErrorKey && (
          <div className="quote-form__alert quote-form__alert--error" role="alert">
            {t(`errors.${globalErrorKey}`)}
          </div>
        )}

        <fieldset className="quote-form__fieldset" disabled={isLoading}>
          <legend className="quote-form__legend">{t('sections.personal')}</legend>
          <div className="row">
            <div className="form-group col-12 col-md-6">
              <label htmlFor="quote-name">
                {tx('fields.name')} {tx('fields.requiredMark')}
              </label>
              <input
                id="quote-name"
                type="text"
                name="name"
                placeholder={tx('placeholders.name')}
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'quote-name-error' : undefined}
                required
              />
              {errors.name && (
                <span id="quote-name-error" className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.name)}
                </span>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="quote-email">
                {tx('fields.email')} {tx('fields.requiredMark')}
              </label>
              <input
                id="quote-email"
                type="email"
                name="email"
                placeholder={tx('placeholders.email')}
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.email)}
                </span>
              )}
            </div>
            <div className="form-group col-12">
              <label htmlFor="quote-phone">{tx('fields.phone')}</label>
              <input
                id="quote-phone"
                type="tel"
                name="phone"
                placeholder={tx('placeholders.phone')}
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.phone)}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="quote-form__fieldset" disabled={isLoading}>
          <legend className="quote-form__legend">{tx('sections.service')}</legend>
          <div className="row">
            <div className="form-group col-12 col-md-6">
              <label htmlFor="quote-service">
                {tx('fields.serviceType')} {tx('fields.requiredMark')}
              </label>
              <select
                id="quote-service"
                name="serviceType"
                value={form.serviceType}
                onChange={(e) => setField('serviceType', e.target.value)}
                onBlur={() => handleBlur('serviceType')}
                aria-invalid={!!errors.serviceType}
                required
              >
                <option value="">{tx('serviceType.placeholder')}</option>
                <option value="translation">{tx('serviceType.translation')}</option>
                <option value="interpretation">{tx('serviceType.interpretation')}</option>
                <option value="certification">{tx('serviceType.certification')}</option>
              </select>
              {errors.serviceType && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.serviceType)}
                </span>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="quote-document">
                {tx('fields.documentType')} {tx('fields.requiredMark')}
              </label>
              <select
                id="quote-document"
                name="documentType"
                value={form.documentType}
                onChange={(e) => setField('documentType', e.target.value)}
                onBlur={() => handleBlur('documentType')}
                aria-invalid={!!errors.documentType}
                required
              >
                <option value="">{tx('documentType.placeholder')}</option>
                <option value="legal">{tx('documentType.legal')}</option>
                <option value="medical">{tx('documentType.medical')}</option>
                <option value="academic">{tx('documentType.academic')}</option>
                <option value="immigration">{tx('documentType.immigration')}</option>
                <option value="business">{tx('documentType.business')}</option>
                <option value="personal">{tx('documentType.personal')}</option>
                <option value="other">{tx('documentType.other')}</option>
              </select>
              {errors.documentType && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.documentType)}
                </span>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="quote-from">
                {tx('fields.languageFrom')} {tx('fields.requiredMark')}
              </label>
              <input
                id="quote-from"
                type="text"
                name="languageFrom"
                placeholder={tx('placeholders.languageFrom')}
                value={form.languageFrom}
                onChange={(e) => setField('languageFrom', e.target.value)}
                onBlur={() => handleBlur('languageFrom')}
                aria-invalid={!!errors.languageFrom}
                required
              />
              {errors.languageFrom && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.languageFrom)}
                </span>
              )}
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="quote-to">
                {tx('fields.languageTo')} {tx('fields.requiredMark')}
              </label>
              <input
                id="quote-to"
                type="text"
                name="languageTo"
                placeholder={tx('placeholders.languageTo')}
                value={form.languageTo}
                onChange={(e) => setField('languageTo', e.target.value)}
                onBlur={() => handleBlur('languageTo')}
                aria-invalid={!!errors.languageTo}
                required
              />
              {errors.languageTo && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.languageTo)}
                </span>
              )}
            </div>
            <div className="form-group col-12">
              <label htmlFor="quote-urgency">
                {tx('fields.urgency')} {tx('fields.requiredMark')}
              </label>
              <select
                id="quote-urgency"
                name="urgency"
                value={form.urgency}
                onChange={(e) => setField('urgency', e.target.value)}
                onBlur={() => handleBlur('urgency')}
                aria-invalid={!!errors.urgency}
                required
              >
                <option value="">{tx('urgency.placeholder')}</option>
                <option value="standard">{tx('urgency.standard')}</option>
                <option value="urgent">{tx('urgency.urgent')}</option>
                <option value="express">{tx('urgency.express')}</option>
              </select>
              {errors.urgency && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.urgency)}
                </span>
              )}
            </div>
            <div className="form-group col-12">
              <label htmlFor="quote-comments">{tx('fields.comments')}</label>
              <textarea
                id="quote-comments"
                name="comments"
                placeholder={tx('placeholders.comments')}
                value={form.comments}
                onChange={(e) => setField('comments', e.target.value)}
                onBlur={() => handleBlur('comments')}
                aria-invalid={!!errors.comments}
                rows={4}
              />
              {errors.comments && (
                <span className="quote-form__error" role="alert">
                  {translateValidationError(tx, errors.comments)}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="quote-form__fieldset" disabled={isLoading}>
          <legend className="quote-form__legend">{tx('sections.documents')}</legend>
          <div
            className={`quote-form__dropzone${isDragging ? ' quote-form__dropzone--active' : ''}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            aria-label={tx('files.dropzoneAria')}
          >
            <input
              ref={fileInputRef}
              type="file"
              name="files"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tif,.tiff,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/tiff"
              className="quote-form__file-input"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = '';
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="quote-form__dropzone-title">{tx('files.dropzoneTitle')}</p>
            <p className="quote-form__dropzone-hint">
              {tx('files.dropzoneHint', { max: MAX_FILES, maxSize: maxSizeLabel })}
            </p>
          </div>

          {errors.files && (
            <span className="quote-form__error quote-form__error--block" role="alert">
              {translateValidationError(tx, errors.files)}
            </span>
          )}

          {files.length > 0 && (
            <ul className="quote-form__file-list" aria-label={tx('files.listAria')}>
              {files.map((file, index) => (
                <li key={`${file.name}-${file.size}-${index}`} className="quote-form__file-item">
                  <span className="quote-form__file-name">{file.name}</span>
                  <span className="quote-form__file-size">{formatBytes(file.size)}</span>
                  <button
                    type="button"
                    className="quote-form__file-remove"
                    onClick={() => removeFile(index)}
                    aria-label={tx('files.removeFile', { name: file.name })}
                    disabled={isLoading}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {files.length > 0 && (
            <p className="quote-form__file-total">
              {tx('files.total', {
                count: files.length,
                current: formatBytes(totalSize),
                max: maxSizeLabel,
              })}
            </p>
          )}
        </fieldset>

        <div className="ms-cf--bottom">
          <button
            className={`btn-footer quote-form__submit${isLoading ? ' quote-form__submit--loading' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="quote-form__spinner" aria-hidden="true" />
                <span>{tx('submit.loading')}</span>
              </>
            ) : (
              tx('submit.label')
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
