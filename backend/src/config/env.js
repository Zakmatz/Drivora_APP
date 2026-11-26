import 'dotenv/config';

const list = (v, fallback) =>
  (v || fallback).split(',').map((s) => s.trim()).filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 4000,
  corsOrigins: list(process.env.CORS_ORIGIN, 'http://localhost:5173,http://localhost:4173'),
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
  dataSource: process.env.DATA_SOURCE || (process.env.SUPABASE_URL ? 'supabase' : 'local'),
  autoPublishReviews: process.env.REVIEW_AUTO_PUBLISH === 'true',
};
