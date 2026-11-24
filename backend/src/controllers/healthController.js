import { ok } from '../utils/response.js';
import { env } from '../config/env.js';

export function health(req, res) {
  ok(res, { status: 'ok', service: 'drivora-api', dataSource: env.dataSource, uptime: Math.round(process.uptime()), timestamp: new Date().toISOString() });
}
