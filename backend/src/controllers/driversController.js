import { store } from '../models/index.js';
import { ok } from '../utils/response.js';
import { AppError } from '../utils/AppError.js';
import { enumParam, intParam, numParam, pageMeta, pagination, searchParam, slugParam } from '../utils/validators.js';

export async function listDrivers(req, res) {
  const q = req.query;
  const pg = pagination(q, { defLimit: 12, maxLimit: 50 });
  const { items, total } = await store.listDrivers({
    search: searchParam(q.search),
    minExperience: intParam(q.min_experience, 'min_experience', { min: 0, max: 60 }),
    minRating: numParam(q.min_rating, 'min_rating', { min: 0, max: 5 }),
    sort: enumParam(q.sort, 'sort', ['rating', 'experience', 'name'], 'rating'),
    from: pg.from, to: pg.to,
  });
  ok(res, items, pageMeta(pg, total));
}

export async function getDriver(req, res) {
  const slug = slugParam(req.params.slug);
  const driver = await store.getDriverBySlug(slug);
  if (!driver) throw new AppError(404, 'DRIVER_NOT_FOUND', `Pengemudi "${slug}" tidak ditemukan.`);
  ok(res, driver);
}

export async function listDriverReviews(req, res) {
  const slug = slugParam(req.params.slug);
  const driver = await store.getDriverBySlug(slug);
  if (!driver) throw new AppError(404, 'DRIVER_NOT_FOUND', `Pengemudi "${slug}" tidak ditemukan.`);
  const pg = pagination(req.query, { defLimit: 10, maxLimit: 50 });
  const [{ items, total }, summary] = await Promise.all([
    store.listReviews({ driverId: driver.id, from: pg.from, to: pg.to }),
    store.getReviewSummary({ driverId: driver.id }),
  ]);
  ok(res, items, pageMeta(pg, total, { summary }));
}
