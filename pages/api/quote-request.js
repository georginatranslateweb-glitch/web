import fs from 'fs';
import nodemailer from 'nodemailer';
import {
  buildClientConfirmationHtml,
  buildQuoteEmailHtml,
  generateReferenceNumber,
} from '../../lib/quote-request/emailTemplate';
import { cleanupTempFiles, parseMultipartForm } from '../../lib/quote-request/parseForm';
import { checkRateLimit, getClientIp } from '../../lib/quote-request/rateLimit';
import { sanitizeFormFields } from '../../lib/quote-request/sanitize';
import {
  validateFormFields,
  validateUploadedFiles,
} from '../../lib/quote-request/validators';

export const config = {
  api: {
    bodyParser: false,
  },
};

function getMailerConfig() {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSec));
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }

  const mailConfig = getMailerConfig();
  if (!mailConfig) {
    return res.status(500).json({
      success: false,
      message: 'Email service is not configured.',
    });
  }

  let files = [];

  try {
    const parsed = await parseMultipartForm(req);
    files = parsed.files;
    const fields = sanitizeFormFields(parsed.fields);

    const fieldErrors = validateFormFields(fields);
    const fileErrors = validateUploadedFiles(files);
    const errors = [...fieldErrors, ...fileErrors];

    if (errors.length > 0) {
      cleanupTempFiles(files);
      return res.status(400).json({ success: false, message: errors[0], errors });
    }

    const referenceNumber = generateReferenceNumber();
    const brand = process.env.BRAND_NAME || 'NAATI Professional Translation';
    const toAddress = process.env.EMAIL_TO || process.env.EMAIL_USER;
    const fromAddress =
      process.env.EMAIL_FROM || `"${brand}" <${process.env.EMAIL_USER}>`;

    const attachments = files.map((file) => ({
      filename: file.originalFilename || file.newFilename,
      path: file.filepath,
      contentType: file.mimetype,
    }));

    const transporter = nodemailer.createTransport(mailConfig);

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: fields.email,
      subject: `[${referenceNumber}] New quote request — ${fields.name}`,
      html: buildQuoteEmailHtml({ fields, referenceNumber, files }),
      attachments,
    });

    await transporter.sendMail({
      from: fromAddress,
      to: fields.email,
      subject: `Quote request received — ${referenceNumber}`,
      html: buildClientConfirmationHtml({ fields, referenceNumber }),
    });

    cleanupTempFiles(files);

    return res.status(200).json({
      success: true,
      referenceNumber,
      message: 'Your quote request has been submitted successfully.',
    });
  } catch (error) {
    cleanupTempFiles(files);

    if (error?.code === 'LIMIT_FILE_SIZE' || error?.httpCode === 413) {
      return res.status(413).json({
        success: false,
        message: 'One or more files exceed the maximum allowed size (4.5 MB total).',
      });
    }

    console.error('quote-request error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process your request. Please try again later.',
    });
  }
}
