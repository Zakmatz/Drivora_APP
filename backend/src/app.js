import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.disable('x-powered-by');

app.use(cors({
  origin(origin, cb) {
    // tanpa Origin (curl, server-to-server) atau origin yang diizinkan
    if (!origin || env.corsOrigins.includes('*') || env.corsOrigins.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  methods: ['GET', 'HEAD', 'OPTIONS'],
}));

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'no-referrer');
  next();
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    data: { name: 'DRIVORA API', version: '1.0.0', docs: 'Lihat README.md', endpoints: ['/api/health', '/api/services', '/api/drivers', '/api/reviews'] },
  });
});

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
