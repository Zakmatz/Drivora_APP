import { store } from '../models/index.js';
import { ok } from '../utils/response.js';
import { AppError } from '../utils/AppError.js';
import { slugParam } from '../utils/validators.js';

export async function listServices(req, res) {
  const data = await store.listServices();
  ok(res, data, { total: data.length });
}

export async function getService(req, res) {
  const slug = slugParam(req.params.slug);
  const service = await store.getServiceBySlug(slug);
  if (!service) throw new AppError(404, 'SERVICE_NOT_FOUND', `Layanan "${slug}" tidak ditemukan.`);
  ok(res, service);
}
