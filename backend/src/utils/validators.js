import { AppError } from './AppError.js';

const bad = (field, message) => new AppError(400, 'VALIDATION_ERROR', message, { field });

/** Bilangan bulat opsional dengan batas min/max. */
export function intParam(value, field, { min = 0, max = 1000, def } = {}) {
  if (value === undefined || value === '') return def;
  if (!/^-?\d+$/.test(String(value))) throw bad(field, `Parameter "${field}" harus berupa bilangan bulat.`);
  const n = Number(value);
  if (n < min || n > max) throw bad(field, `Parameter "${field}" harus di antara ${min} dan ${max}.`);
  return n;
}

/** Angka desimal opsional (mis. rating minimum). */
export function numParam(value, field, { min = 0, max = 5, def } = {}) {
  if (value === undefined || value === '') return def;
  const n = Number(value);
  if (Number.isNaN(n) || n < min || n > max) throw bad(field, `Parameter "${field}" harus berupa angka ${min}–${max}.`);
  return n;
}

export function enumParam(value, field, allowed, def) {
  if (value === undefined || value === '') return def;
  if (!allowed.includes(value)) throw bad(field, `Parameter "${field}" harus salah satu dari: ${allowed.join(', ')}.`);
  return value;
}

/** Teks pencarian: dipangkas, dibatasi 60 karakter, karakter khusus filter dibuang. */
export function searchParam(value, field = 'search') {
  if (value === undefined) return undefined;
  const v = String(value).replace(/[%_,()*\\]/g, ' ').trim();
  if (v.length > 60) throw bad(field, 'Kata kunci pencarian terlalu panjang (maks. 60 karakter).');
  return v || undefined;
}

export function slugParam(value, field = 'slug') {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value)) || String(value).length > 80) {
    throw bad(field, `Format "${field}" tidak valid.`);
  }
  return String(value);
}

export function pagination(query, { defLimit = 12, maxLimit = 50 } = {}) {
  const page = intParam(query.page, 'page', { min: 1, max: 100000, def: 1 });
  const limit = intParam(query.limit, 'limit', { min: 1, max: maxLimit, def: defLimit });
  return { page, limit, from: (page - 1) * limit, to: page * limit - 1 };
}

export const pageMeta = ({ page, limit }, total, extra = {}) => ({
  page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)), ...extra,
});
