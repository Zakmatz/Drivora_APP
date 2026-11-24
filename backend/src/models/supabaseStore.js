import { getSupabase } from '../config/supabase.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { summarizeRatings } from '../utils/ratings.js';

const SERVICE_COLS = 'id,name,slug,short_description,description,features,benefits,coverage,usage_info,image_url,price_description,is_demo';
const DRIVER_COLS = 'id,name,slug,photo_url,experience_years,description,vehicle_types,transmission_types,specialties,availability_label,is_demo,rating_avg,review_count,services';

function check({ data, error, count }) {
  if (error) {
    throw new AppError(502, 'DATABASE_ERROR', 'Gagal mengambil data dari database.', env.isProd ? undefined : error.message);
  }
  return { data, count };
}

export async function listServices() {
  const { data } = check(await getSupabase().from('services').select(SERVICE_COLS).order('sort_order'));
  return data;
}

export async function getServiceBySlug(slug) {
  const db = getSupabase();
  const { data: service } = check(await db.from('services').select(SERVICE_COLS).eq('slug', slug).maybeSingle());
  if (!service) return null;

  const { data: links } = check(await db.from('driver_services').select('driver_id').eq('service_id', service.id));
  let drivers = [];
  if (links.length) {
    ({ data: drivers } = check(await db.from('drivers_with_stats').select(DRIVER_COLS)
      .in('id', links.map((l) => l.driver_id))
      .order('rating_avg', { ascending: false })));
  }
  return { ...service, drivers };
}

export async function listDrivers({ search, minExperience, minRating, sort, from, to }) {
  let q = getSupabase().from('drivers_with_stats').select(DRIVER_COLS, { count: 'exact' });
  if (search) q = q.ilike('name', `%${search}%`);
  if (minExperience) q = q.gte('experience_years', minExperience);
  if (minRating) q = q.gte('rating_avg', minRating);

  if (sort === 'experience') q = q.order('experience_years', { ascending: false }).order('rating_avg', { ascending: false });
  else if (sort === 'name') q = q.order('name', { ascending: true });
  else q = q.order('rating_avg', { ascending: false }).order('review_count', { ascending: false });

  const { data, count } = check(await q.range(from, to));
  return { items: data, total: count ?? 0 };
}

export async function getDriverBySlug(slug) {
  const { data } = check(await getSupabase().from('drivers_with_stats').select(DRIVER_COLS).eq('slug', slug).maybeSingle());
  return data;
}

const mapReview = ({ drivers, ...r }) => ({ ...r, driver: drivers });

export async function listReviews({ driverId, rating, from, to }) {
  let q = getSupabase().from('reviews')
    .select('id,customer_name,rating,comment,review_date,is_demo,drivers(id,name,slug,photo_url)', { count: 'exact' })
    .eq('is_published', true);
  if (driverId) q = q.eq('driver_id', driverId);
  if (rating) q = q.eq('rating', rating);
  const { data, count } = check(await q.order('review_date', { ascending: false }).range(from, to));
  return { items: data.map(mapReview), total: count ?? 0 };
}

export async function getReviewSummary({ driverId } = {}) {
  let q = getSupabase().from('reviews').select('rating').eq('is_published', true);
  if (driverId) q = q.eq('driver_id', driverId);
  const { data } = check(await q.limit(10000));
  return summarizeRatings(data.map((r) => r.rating));
}
