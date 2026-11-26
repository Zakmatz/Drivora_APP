import axios from 'axios';

// Dev: kosong → '/api' diproxy Vite ke backend. Produksi: VITE_API_URL = URL backend.
const http = axios.create({
  baseURL: `${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}/api`,
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

const clean = (params = {}) => Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null));
const get = (url, params, signal) => http.get(url, { params: clean(params), signal }).then((r) => r.data);

export const api = {
  services: (signal) => get('/services', {}, signal),
  service: (slug, signal) => get(`/services/${slug}`, {}, signal),
  drivers: (params, signal) => get('/drivers', params, signal),
  driver: (slug, signal) => get(`/drivers/${slug}`, {}, signal),
  driverReviews: (slug, params, signal) => get(`/drivers/${slug}/reviews`, params, signal),
  reviews: (params, signal) => get('/reviews', params, signal),
  createReview: (payload) => http.post('/reviews', payload).then((r) => r.data),
};

/** Pesan error yang ramah untuk pengguna. */
export function getErrorMessage(err) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return 'Anda sedang offline. Sambungkan internet lalu coba lagi.';
  if (err?.response?.data?.error?.message) return err.response.data.error.message;
  if (err?.code === 'ECONNABORTED') return 'Server terlalu lama merespons. Coba lagi sebentar lagi.';
  return 'Tidak dapat terhubung ke server. Periksa koneksi Anda lalu coba lagi.';
}
export const isNotFound = (err) => err?.response?.status === 404;
