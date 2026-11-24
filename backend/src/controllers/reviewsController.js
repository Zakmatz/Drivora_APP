import { store } from '../models/index.js';
import { ok } from '../utils/response.js';
import { AppError } from '../utils/AppError.js';
import { intParam, pageMeta, pagination, slugParam } from '../utils/validators.js';

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
