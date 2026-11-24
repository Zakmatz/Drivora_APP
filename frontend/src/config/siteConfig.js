/**
 * Konfigurasi terpusat DRIVORA.
 *
 * ⚠️  NOMOR WHATSAPP DI BAWAH ADALAH NOMOR DUMMY (6280000000000) UNTUK DEMO.
 *     Ganti SEBELUM website dipublikasikan, salah satu cara:
 *       1) set environment variable  VITE_WHATSAPP_NUMBER=62812xxxxxxx  (disarankan; di Vercel: Settings → Environment Variables)
 *       2) atau ubah nilai default di bawah.
 *     Format: kode negara tanpa "+" dan tanpa 0 di depan (Indonesia: 62812...).
 */
export const siteConfig = {
  name: 'DRIVORA',
  tagline: 'Menemanimu Di Setiap Perjalanan.',
  serviceArea: 'Semarang dan sekitarnya',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '6280000000000',
  isDummyWhatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER || '6280000000000') === '6280000000000',
};

/** Membuat tautan WhatsApp Click-to-Chat dengan pesan otomatis. */
export function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message || waMessages.general());
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

const base = (target) =>
  `Halo DRIVORA, saya tertarik menggunakan jasa pengemudi. Saya ingin mendapatkan informasi lebih lanjut mengenai ${target}, termasuk harga dan ketersediaannya. Terima kasih.`;

export const waMessages = {
  general: () => base('layanan DRIVORA'),
  service: (name) => base(`layanan ${name}`),
  driver: (name) => base(`pengemudi ${name}`),
};
