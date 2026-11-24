// Sumber data lokal untuk DEVELOPMENT tanpa Supabase.
// Membaca supabase/seed-data.json (sumber yang sama dengan seed.sql).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { AppError } from '../utils/AppError.js';
import { summarizeRatings } from '../utils/ratings.js';

let cache;
function load() {
  if (cache) return cache;
  const file = join(dirname(fileURLToPath(import.meta.url)), '../../../supabase/seed-data.json');
  let raw;
  try { raw = JSON.parse(readFileSync(file, 'utf8')); }
  catch { throw new AppError(500, 'CONFIG_ERROR', 'Mode local membutuhkan file supabase/seed-data.json.'); }

  const services = raw.services.map((s) => ({ id: `svc-${s.slug}`, is_demo: true, ...s }));
  const reviews = raw.reviews.map((r, i) => ({ id: `rev-${i + 1}`, is_published: true, is_demo: true, ...r }));
  const drivers = raw.drivers.map((d) => {
    const mine = reviews.filter((r) => r.driver_slug === d.slug && r.is_published);
    const { average, total } = summarizeRatings(mine.map((r) => r.rating));
    const { service_slugs, ...rest } = d;
    return {
      id: `drv-${d.slug}`, is_demo: true, ...rest,
      rating_avg: average, review_count: total,
      services: services.filter((s) => service_slugs.includes(s.slug)).map((s) => ({ slug: s.slug, name: s.name })),
      _service_slugs: service_slugs,
    };
  });
  cache = { services, drivers, reviews };
  return cache;
}

const clean = ({ _service_slugs, ...d }) => d;
const byName = (a, b) => a.name.localeCompare(b.name);

export async function listServices() {
  return load().services.slice().sort((a, b) => a.sort_order - b.sort_order).map(({ sort_order, ...s }) => s);
}

export async function getServiceBySlug(slug) {
  const { services, drivers } = load();
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  const { sort_order, ...service } = s;
  return {
    ...service,
    drivers: drivers.filter((d) => d._service_slugs.includes(slug)).sort((a, b) => b.rating_avg - a.rating_avg).map(clean),
  };
}

export async function listDrivers({ search, minExperience, minRating, sort, from, to }) {
  let rows = load().drivers.slice();
  if (search) rows = rows.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
  if (minExperience) rows = rows.filter((d) => d.experience_years >= minExperience);
  if (minRating) rows = rows.filter((d) => d.rating_avg >= minRating);
  if (sort === 'experience') rows.sort((a, b) => b.experience_years - a.experience_years || b.rating_avg - a.rating_avg);
  else if (sort === 'name') rows.sort(byName);
  else rows.sort((a, b) => b.rating_avg - a.rating_avg || b.review_count - a.review_count);
  return { items: rows.slice(from, to + 1).map(clean), total: rows.length };
}

export async function getDriverBySlug(slug) {
  const d = load().drivers.find((x) => x.slug === slug);
  return d ? clean(d) : null;
}

export async function listReviews({ driverId, rating, from, to }) {
  const { reviews, drivers } = load();
  let rows = reviews.filter((r) => r.is_published);
  if (driverId) rows = rows.filter((r) => `drv-${r.driver_slug}` === driverId);
  if (rating) rows = rows.filter((r) => r.rating === rating);
  rows.sort((a, b) => b.review_date.localeCompare(a.review_date));
  const items = rows.slice(from, to + 1).map(({ driver_slug, is_published, ...r }) => {
    const d = drivers.find((x) => x.slug === driver_slug);
    return { ...r, driver: { id: d.id, name: d.name, slug: d.slug, photo_url: d.photo_url } };
  });
  return { items, total: rows.length };
}

export async function getReviewSummary({ driverId } = {}) {
  let rows = load().reviews.filter((r) => r.is_published);
  if (driverId) rows = rows.filter((r) => `drv-${r.driver_slug}` === driverId);
  return summarizeRatings(rows.map((r) => r.rating));
}
