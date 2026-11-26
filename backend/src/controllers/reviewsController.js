import { store } from '../models/index.js';
import { ok } from '../utils/response.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { intParam, pageMeta, pagination, reviewBody, slugParam } from '../utils/validators.js';

export async function listReviews(req, res) {
  const q = req.query;
  const pg = pagination(q, { defLimit: 9, maxLimit: 50 });
  const rating = intParam(q.rating, 'rating', { min: 1, max: 5 });

  let driverId;
  if (q.driver !== undefined && q.driver !== '') {
    const driver = await store.getDriverBySlug(slugParam(q.driver, 'driver'));
    if (!driver) throw new AppError(404, 'DRIVER_NOT_FOUND', `Pengemudi "${q.driver}" tidak ditemukan.`);
    driverId = driver.id;
  }

  const [{ items, total }, summary] = await Promise.all([
    store.listReviews({ driverId, rating, from: pg.from, to: pg.to }),
    store.getReviewSummary({ driverId }), // ringkasan tidak ikut terfilter rating
  ]);
  ok(res, items, pageMeta(pg, total, { summary }));
}

/** POST /api/reviews — tanpa login. Default: masuk antrean moderasi (is_published=false). */
export async function createReview(req, res) {
  const body = req.body || {};
  // Honeypot: kolom tersembunyi yang hanya diisi bot → pura-pura sukses, tidak disimpan.
  if (body.website) return ok(res, { published: false }, undefined, 201);

  const input = reviewBody(body);
  const driver = await store.getDriverBySlug(input.driver_slug);
  if (!driver) throw new AppError(404, 'DRIVER_NOT_FOUND', 'Pengemudi yang dipilih tidak ditemukan.');

  const row = await store.createReview({
    driverId: driver.id, customerName: input.customer_name, rating: input.rating, comment: input.comment,
    isPublished: env.autoPublishReviews,
  });
  ok(res, { id: row.id, published: env.autoPublishReviews }, undefined, 201);
}