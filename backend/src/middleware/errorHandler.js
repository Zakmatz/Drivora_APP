import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ success: false, error: { code: err.code, message: err.message, ...(err.details && { details: err.details }) } });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Permintaan tidak valid.' } });
  }
  console.error('[unhandled]', err);
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Terjadi kesalahan pada server.', ...(!env.isProd && { details: err.message }) },
  });
}
