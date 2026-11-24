// Membuat ikon PWA (PNG) dari public/branding/drivora-mark.svg.
// Setelah mengganti drivora-mark.svg dengan logo asli, jalankan: npm run icons
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '../public');
const src = join(pub, 'branding/drivora-mark.svg');
mkdirSync(join(pub, 'icons'), { recursive: true });

/** size = ukuran kanvas, scale = rasio mark terhadap kanvas, bg = warna latar */
async function make(file, size, scale, bg) {
  const inner = Math.round(size * scale);
  const mark = await sharp(src, { density: 600 }).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: mark, gravity: 'center' }]).png().toFile(join(pub, 'icons', file));
}

const white = { r: 255, g: 250, b: 250, alpha: 1 };
const red = { r: 150, g: 30, b: 45, alpha: 1 };
await make('icon-192.png', 192, 0.86, white);
await make('icon-512.png', 512, 0.86, white);
await make('icon-maskable-512.png', 512, 0.64, red); // area aman maskable ±80%
await make('apple-touch-icon.png', 180, 0.86, white);
await make('favicon-32.png', 32, 1, { r: 0, g: 0, b: 0, alpha: 0 });
console.log('Ikon PWA dibuat di public/icons/.');
