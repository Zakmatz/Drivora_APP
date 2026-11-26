import { AppError } from '../utils/AppError.js';

const hits = new Map();

// Penghalang ringan per IP. Perlindungan utama = moderasi ulasan.
export const rateLimit = ({ windowMs, max }) => (req, res, next) => {
    const now = Date.now();
    const key = req.ip || 'unknown';
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
        res.set('Retry-After', String(Math.ceil(windowMs / 1000)));
        return next(new AppError(429, 'TOO_MANY_REQUESTS', 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.'));
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    next();
};