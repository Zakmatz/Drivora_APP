import { AppError } from '../utils/AppError.js';

export function notFound(req, res, next) {
  next(new AppError(404, 'ROUTE_NOT_FOUND', `Endpoint ${req.method} ${req.originalUrl.split('?')[0]} tidak ditemukan.`));
}
