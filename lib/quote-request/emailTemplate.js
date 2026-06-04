import { formatBytes } from './validators';

const SERVICE_LABELS = {
  translation: 'Translation',
  interpretation: 'Interpretation',
  certification: 'NAATI Certification',
};

const DOCUMENT_LABELS = {
  legal: 'Legal',
  medical: 'Medical',
  academic: 'Academic',
  immigration: 'Immigration',
  business: 'Business',
  personal: 'Personal',
  other: 'Other',
};

const URGENCY_LABELS = {
  standard: 'Standard (5–7 business days)',
  urgent: 'Urgent (2–3 business days)',
  express: 'Express (24–48 hours)',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function generateReferenceNumber() {
  const date = new Date();
  const ymd =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `NAATI-${ymd}-${random}`;
}

export function buildQuoteEmailHtml({ fields, referenceNumber, files }) {
  const brand = process.env.BRAND_NAME || 'NAATI Professional Translation';
  const fileRows = (files || [])
    .map(
      (f) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(f.originalFilename)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(formatBytes(f.size))}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(f.mimetype)}</td>
        </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Quote Request ${escapeHtml(referenceNumber)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #c64227;max-width:600px;">
        <tr>
          <td style="background:#c64227;padding:28px 32px;color:#ffffff;">
            <h1 style="margin:0;font-size:22px;font-weight:400;letter-spacing:0.02em;">${escapeHtml(brand)}</h1>
            <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">New quote request</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;color:#1a1a1a;font-size:15px;line-height:1.6;">
            <p style="margin:0 0 24px;">
              <strong style="color:#c64227;">Reference:</strong>
              <span style="font-family:monospace;font-size:16px;"> ${escapeHtml(referenceNumber)}</span>
            </p>

            <h2 style="margin:0 0 12px;font-size:16px;color:#c64227;border-bottom:1px solid #eee;padding-bottom:8px;">Client details</h2>
            <table role="presentation" width="100%" style="margin-bottom:24px;font-size:14px;">
              <tr><td style="padding:6px 0;color:#666;width:140px;">Name</td><td>${escapeHtml(fields.name)}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Email</td><td><a href="mailto:${escapeHtml(fields.email)}" style="color:#c64227;">${escapeHtml(fields.email)}</a></td></tr>
              <tr><td style="padding:6px 0;color:#666;">Phone</td><td>${escapeHtml(fields.phone || '—')}</td></tr>
            </table>

            <h2 style="margin:0 0 12px;font-size:16px;color:#c64227;border-bottom:1px solid #eee;padding-bottom:8px;">Service request</h2>
            <table role="presentation" width="100%" style="margin-bottom:24px;font-size:14px;">
              <tr><td style="padding:6px 0;color:#666;width:140px;">Service</td><td>${escapeHtml(SERVICE_LABELS[fields.serviceType] || fields.serviceType)}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Document type</td><td>${escapeHtml(DOCUMENT_LABELS[fields.documentType] || fields.documentType)}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Languages</td><td>${escapeHtml(fields.languageFrom)} → ${escapeHtml(fields.languageTo)}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Urgency</td><td>${escapeHtml(URGENCY_LABELS[fields.urgency] || fields.urgency)}</td></tr>
            </table>

            ${
              fields.comments
                ? `<h2 style="margin:0 0 12px;font-size:16px;color:#c64227;border-bottom:1px solid #eee;padding-bottom:8px;">Additional comments</h2>
            <p style="margin:0 0 24px;font-size:14px;white-space:pre-wrap;">${escapeHtml(fields.comments)}</p>`
                : ''
            }

            <h2 style="margin:0 0 12px;font-size:16px;color:#c64227;border-bottom:1px solid #eee;padding-bottom:8px;">Attached documents (${(files || []).length})</h2>
            ${
              fileRows
                ? `<table role="presentation" width="100%" style="border-collapse:collapse;font-size:13px;margin-bottom:24px;">
              <tr style="background:#fafafa;">
                <th align="left" style="padding:8px 12px;border-bottom:2px solid #c64227;">File</th>
                <th align="left" style="padding:8px 12px;border-bottom:2px solid #c64227;">Size</th>
                <th align="left" style="padding:8px 12px;border-bottom:2px solid #c64227;">Type</th>
              </tr>
              ${fileRows}
            </table>`
                : '<p style="margin:0 0 24px;font-size:14px;color:#666;">No files attached.</p>'
            }

            <div style="background:#fafafa;border-left:4px solid #c64227;padding:16px 20px;font-size:13px;color:#444;">
              <strong>Follow-up:</strong> Reply to the client within one business day. Reference <code>${escapeHtml(referenceNumber)}</code> in all correspondence.
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background:#fafafa;font-size:12px;color:#888;text-align:center;border-top:1px solid #eee;">
            Automated notification · ${escapeHtml(brand)}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildClientConfirmationHtml({ fields, referenceNumber }) {
  const brand = process.env.BRAND_NAME || 'NAATI Professional Translation';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Quote request received</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #c64227;max-width:600px;">
        <tr>
          <td style="padding:32px;color:#1a1a1a;">
            <h1 style="margin:0 0 16px;font-size:20px;color:#c64227;font-weight:400;">Thank you, ${escapeHtml(fields.name)}</h1>
            <p style="font-size:15px;line-height:1.6;">We have received your quote request and will respond within one business day.</p>
            <p style="font-size:15px;"><strong>Your reference number:</strong><br>
              <span style="font-family:monospace;font-size:18px;color:#c64227;">${escapeHtml(referenceNumber)}</span>
            </p>
            <p style="font-size:14px;color:#666;">Please keep this reference for your records.</p>
            <p style="font-size:14px;margin-top:24px;">${escapeHtml(brand)}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
