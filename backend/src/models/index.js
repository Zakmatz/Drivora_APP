import { env } from '../config/env.js';
import * as supabaseStore from './supabaseStore.js';
import * as localStore from './localStore.js';

/** Memilih sumber data sesuai env.dataSource. Kedua store memiliki antarmuka yang sama. */
export const store = env.dataSource === 'local' ? localStore : supabaseStore;
