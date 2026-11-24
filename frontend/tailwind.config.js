/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ===== 4 warna brand DRIVORA (wajib) =====
        quartz: '#CEC7BB',  // Platinum Quartz — section alternatif, kartu, dekorasi
        grey: '#777E88',    // Machine Grey   — ikon, garis, elemen pendukung
        snow: '#FFFAFA',    // Pure White     — background utama
        red: '#961E2D',     // Soul Red       — aksen: CTA, WhatsApp, interaktif
        // ===== Netral pendukung (hanya untuk keterbacaan/aksesibilitas) =====
        ink: '#23272D',     // teks isi (kontras tinggi)
        deep: '#4B515A',    // turunan lebih gelap Machine Grey untuk heading & nav (kontras AA)
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(35,39,45,.04), 0 8px 30px -12px rgba(35,39,45,.12)',
        lift: '0 2px 4px rgba(35,39,45,.05), 0 24px 50px -20px rgba(35,39,45,.28)',
        red: '0 10px 30px -10px rgba(150,30,45,.55)',
      },
      keyframes: {
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        ping2: { '0%': { transform: 'scale(1)', opacity: '.5' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
      },
      animation: { ping2: 'ping2 2.4s cubic-bezier(0,0,.2,1) infinite' },
    },
  },
  plugins: [],
};
