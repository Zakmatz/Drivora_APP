import { useEffect } from 'react';

const BASE = 'DRIVORA';
/** Mengatur <title> dan meta description per halaman (SEO dasar untuk SPA). */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Driver untuk Setiap Perjalanan`;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
