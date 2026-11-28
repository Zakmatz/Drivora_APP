import { createHash, randomBytes } from 'node:crypto';
import { env } from '../config/env.js';

/** Token rahasia acak yang diberikan ke pengirim ulasan (hanya sekali) untuk bisa menghapus ulasannya. */
export const newToken = () => randomBytes(24).toString('hex');

/** Yang disimpan di database hanya HASH-nya, bukan token aslinya. */
export const hashToken = (token) => createHash('sha256').update(String(token)).digest('hex');

/** IP pengunjung disimpan dalam bentuk hash (untuk batas harian), bukan IP aslinya. */
export const hashIp = (ip) => createHash('sha256').update(`${ip}|${env.ipSalt}`).digest('hex');