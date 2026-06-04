import formidable from 'formidable';
import fs from 'fs';
import { MAX_FILES, MAX_TOTAL_SIZE } from './constants';

function normalizeFieldValue(value) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function collectUploadedFiles(files) {
  const raw = files?.files ?? files?.file ?? [];
  const items = Array.isArray(raw) ? raw : raw ? [raw] : [];

  return items.filter((item) => item?.filepath && fs.existsSync(item.filepath));
}

export async function parseMultipartForm(req) {
  const form = formidable({
    multiples: true,
    maxFileSize: MAX_TOTAL_SIZE,
    maxFiles: MAX_FILES,
    keepExtensions: true,
  });

  const [fields, files] = await form.parse(req);

  const normalizedFields = {};
  for (const [key, value] of Object.entries(fields)) {
    normalizedFields[key] = normalizeFieldValue(value);
  }

  return {
    fields: normalizedFields,
    files: collectUploadedFiles(files),
  };
}

export function cleanupTempFiles(files) {
  for (const file of files || []) {
    if (file?.filepath) {
      fs.unlink(file.filepath, () => {});
    }
  }
}
