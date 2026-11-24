import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';
import { AppError } from '../utils/AppError.js';

let client;

/** Client dibuat lazily agar mode "local" tidak membutuhkan kredensial. */
export function getSupabase() {
  if (client) return client;
  if (!env.supabaseUrl || !env.supabaseKey) {
    throw new AppError(500, 'CONFIG_ERROR', 'SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY belum diatur di environment backend.');
  }
  client = createClient(env.supabaseUrl, env.supabaseKey, { auth: { persistSession: false } });
  return client;
}
