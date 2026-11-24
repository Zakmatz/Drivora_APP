import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.DATA_SOURCE = 'local';
const { default: app } = await import('../src/app.js');

let server; let base;
before(async () => {
  await new Promise((r) => { server = app.listen(0, r); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const get = async (path) => {
  const res = await fetch(base + path);
  return { status: res.status, body: await res.json() };
};

test('GET /api/health', async () => {
  const { status, body } = await get('/api/health');
  assert.equal(status, 200); assert.equal(body.success, true); assert.equal(body.data.status, 'ok');
});

test('GET /api/services → 3 layanan', async () => {
  const { body } = await get('/api/services');
  assert.deepEqual(body.data.map((s) => s.slug), ['daily-driver', 'trip-driver', 'monthly-driver']);
});

test('GET /api/services/:slug menyertakan pengemudi terkait', async () => {
  const { status, body } = await get('/api/services/trip-driver');
  assert.equal(status, 200); assert.ok(body.data.drivers.length >= 2); assert.ok(Array.isArray(body.data.benefits));
});

test('GET /api/services/:slug tidak ada → 404', async () => {
  const { status, body } = await get('/api/services/tidak-ada');
  assert.equal(status, 404); assert.equal(body.error.code, 'SERVICE_NOT_FOUND');
});

test('GET /api/drivers → 6 pengemudi + meta paginasi', async () => {
  const { body } = await get('/api/drivers');
  assert.equal(body.data.length, 6); assert.equal(body.meta.total, 6); assert.equal(body.meta.totalPages, 1);
});

test('rating dihitung dari reviews (Andi: 5,5,4 → 4.7)', async () => {
  const { body } = await get('/api/drivers/andi-pratama');
  assert.equal(body.data.rating_avg, 4.7); assert.equal(body.data.review_count, 3);
});

test('pencarian, filter pengalaman, dan sort', async () => {
  assert.equal((await get('/api/drivers?search=budi')).body.data.length, 1);
  const exp = (await get('/api/drivers?min_experience=6')).body.data;
  assert.ok(exp.length === 2 && exp.every((d) => d.experience_years >= 6));
  const sorted = (await get('/api/drivers?sort=experience')).body.data;
  assert.equal(sorted[0].slug, 'budi-santoso');
});

test('pagination', async () => {
  const { body } = await get('/api/drivers?limit=2&page=2');
  assert.equal(body.data.length, 2); assert.equal(body.meta.totalPages, 3);
});

test('validasi parameter → 400', async () => {
  assert.equal((await get('/api/drivers?limit=999')).status, 400);
  assert.equal((await get('/api/drivers?min_rating=abc')).status, 400);
  assert.equal((await get('/api/drivers?sort=acak')).status, 400);
  assert.equal((await get('/api/drivers/Slug_Salah!')).status, 400);
});

test('GET /api/drivers/:slug/reviews', async () => {
  const { status, body } = await get('/api/drivers/budi-santoso/reviews');
  assert.equal(status, 200); assert.equal(body.data.length, 3); assert.equal(body.meta.summary.total, 3);
  assert.equal((await get('/api/drivers/nope/reviews')).status, 404);
});

test('GET /api/reviews + filter driver & rating', async () => {
  const all = (await get('/api/reviews?limit=50')).body;
  assert.equal(all.meta.total, 15); assert.equal(all.meta.summary.total, 15); assert.ok(all.data[0].driver.name);
  const f = (await get('/api/reviews?rating=4')).body;
  assert.ok(f.data.every((r) => r.rating === 4)); assert.equal(f.meta.summary.total, 15);
  assert.equal((await get('/api/reviews?driver=dimas-saputra')).body.meta.total, 3);
});

test('route tidak dikenal → 404 JSON', async () => {
  const { status, body } = await get('/api/xyz');
  assert.equal(status, 404); assert.equal(body.success, false); assert.equal(body.error.code, 'ROUTE_NOT_FOUND');
});
