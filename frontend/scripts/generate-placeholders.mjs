// Menghasilkan gambar PLACEHOLDER (SVG) bertema DRIVORA agar tidak ada broken image.
// Ganti dengan foto asli sesuai docs/ASSETS.md. Jalankan ulang: npm run placeholders
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '../public');
const out = (rel, svg) => { mkdirSync(dirname(join(pub, rel)), { recursive: true }); writeFileSync(join(pub, rel), svg.trim() + '\n'); };

const Q = '#CEC7BB', G = '#777E88', W = '#FFFAFA', R = '#961E2D', INK = '#23272D', DEEP = '#4B515A';

/* ---------- BRANDING (placeholder — timpa dengan logo asli) ---------- */
const markGlyph = `<rect width="64" height="64" rx="16" fill="${R}"/>
<path fill="${W}" fill-rule="evenodd" d="M17 15h16c11 0 18 7 18 17s-7 17-18 17H17zm10 9v16h6c5.600 0 8.500-3 8.500-8s-2.900-8-8.500-8z"/>
<path d="M9 52h46" stroke="${W}" stroke-opacity=".55" stroke-width="2.500" stroke-linecap="round" stroke-dasharray="7 6"/>`;
out('branding/drivora-mark.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="DRIVORA"><!-- PLACEHOLDER: ganti dengan drivora-mark.svg asli -->${markGlyph}</svg>`);
out('branding/drivora-logo.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" role="img" aria-label="DRIVORA"><!-- PLACEHOLDER: ganti dengan drivora-logo.svg asli -->${markGlyph}
<text x="80" y="43" font-family="'Plus Jakarta Sans','Inter','Segoe UI',Arial,sans-serif" font-weight="800" font-size="31" letter-spacing="3.500" fill="${DEEP}">DRIVORA</text></svg>`);

/* ---------- FALLBACK ---------- */
out('images/fallback.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="${Q}" fill-opacity=".45"/>
<g fill="none" stroke="${G}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".7"><path d="M250 330l36-62c8-14 20-20 36-20h156c16 0 28 6 36 20l36 62"/><rect x="226" y="330" width="348" height="64" rx="22"/><circle cx="296" cy="394" r="26" fill="${W}"/><circle cx="504" cy="394" r="26" fill="${W}"/></g></svg>`);

/* ---------- HERO: kota (di dalam lengkung) ---------- */
function windows(x, y, w, h, cols, rows, op = 0.35) {
  let s = '';
  const cw = w / cols, rh = h / rows;
  for (let c = 1; c < cols; c++) s += `<rect x="${(x + c * cw - 1).toFixed(1)}" y="${y}" width="2" height="${h}" fill="${W}" opacity="${op}"/>`;
  for (let r = 1; r < rows; r++) s += `<rect x="${x}" y="${(y + r * rh - 1).toFixed(1)}" width="${w}" height="1.500" fill="${W}" opacity="${op * 0.6}"/>`;
  return s;
}
out('images/hero/hero-city.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1120" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8EBEE"/><stop offset=".55" stop-color="${W}"/><stop offset="1" stop-color="#EDE9E2"/></linearGradient>
<linearGradient id="b1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8A919B"/><stop offset="1" stop-color="${DEEP}"/></linearGradient>
<linearGradient id="b2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B4B9C0"/><stop offset="1" stop-color="${G}"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9D4CA"/><stop offset="1" stop-color="${Q}"/></linearGradient></defs>
<rect width="800" height="1120" fill="url(#sky)"/>
<g fill="${W}" opacity=".9"><ellipse cx="170" cy="150" rx="130" ry="26"/><ellipse cx="250" cy="130" rx="80" ry="22"/><ellipse cx="640" cy="260" rx="120" ry="22"/></g>
<rect x="30" y="360" width="250" height="640" fill="url(#b2)"/>${windows(30, 360, 250, 640, 9, 20, 0.4)}
<rect x="560" y="470" width="240" height="530" fill="url(#b2)"/>${windows(560, 470, 240, 530, 8, 17, 0.4)}
<polygon points="300,90 560,150 560,1000 300,1000" fill="url(#b1)"/>${windows(300, 120, 260, 880, 13, 30, 0.32)}
<polygon points="300,90 560,150 560,170 300,110" fill="${W}" opacity=".18"/>
<rect x="250" y="760" width="360" height="240" fill="${INK}" opacity=".22"/>
<rect y="960" width="800" height="160" fill="url(#floor)"/>
<g stroke="${W}" stroke-opacity=".6" stroke-width="2"><path d="M0 1010h800M0 1060h800M120 960L-60 1120M300 960L240 1120M500 960L560 1120M690 960l180 160"/></g></svg>`);

/* ---------- HERO: mobil sedan (transparan, siluet) ---------- */
out('images/hero/hero-car.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 490">
<defs><linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1F0EE"/><stop offset=".42" stop-color="#C3C6CA"/><stop offset="1" stop-color="${G}"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2C3138"/><stop offset="1" stop-color="#5A616B"/></linearGradient>
<radialGradient id="rim" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#E4E6E8"/><stop offset="1" stop-color="${G}"/></radialGradient>
<filter id="blur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="9"/></filter></defs>
<ellipse cx="610" cy="396" rx="470" ry="14" fill="#000" opacity=".3" filter="url(#blur)"/>
<path fill="url(#body)" d="M70 318C62 292 70 268 98 258L190 242C220 200 270 168 340 150C430 128 560 120 680 124C790 128 880 150 940 196L1010 214C1090 224 1138 246 1148 282L1152 318C1152 330 1144 338 1130 338L1090 338A74 74 0 0 0 942 338L330 338A74 74 0 0 0 182 338L92 338C78 338 72 330 70 318Z"/>
<path fill="url(#glass)" d="M352 198L392 166C470 148 580 144 668 148C760 152 830 172 872 202Z"/>
<path d="M600 148L612 202" stroke="#C3C6CA" stroke-width="10"/>
<path d="M100 272C400 244 800 240 1132 280" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>
<path d="M600 204L606 322M790 206L800 322" stroke="#000" stroke-opacity=".16" stroke-width="2.500" fill="none"/>
<path d="M1092 254L1142 266L1100 272Z" fill="${W}"/><path d="M72 264L102 260L102 276L74 282Z" fill="${R}"/>
<rect x="1128" y="296" width="24" height="10" rx="3" fill="${INK}" opacity=".5"/>
<g><circle cx="256" cy="338" r="66" fill="${INK}"/><circle cx="256" cy="338" r="44" fill="url(#rim)"/><circle cx="256" cy="338" r="9" fill="${INK}"/>
<g stroke="${INK}" stroke-width="5" opacity=".55">${[0, 72, 144, 216, 288].map((a) => `<line x1="256" y1="338" x2="${(256 + 42 * Math.cos((a * Math.PI) / 180)).toFixed(1)}" y2="${(338 + 42 * Math.sin((a * Math.PI) / 180)).toFixed(1)}"/>`).join('')}</g></g>
<g><circle cx="1016" cy="338" r="66" fill="${INK}"/><circle cx="1016" cy="338" r="44" fill="url(#rim)"/><circle cx="1016" cy="338" r="9" fill="${INK}"/>
<g stroke="${INK}" stroke-width="5" opacity=".55">${[18, 90, 162, 234, 306].map((a) => `<line x1="1016" y1="338" x2="${(1016 + 42 * Math.cos((a * Math.PI) / 180)).toFixed(1)}" y2="${(338 + 42 * Math.sin((a * Math.PI) / 180)).toFixed(1)}"/>`).join('')}</g></g>
</svg>`);

/* ---------- SERVICES (1200x800) ---------- */
const road = (c = DEEP) => `<path d="M0 800V640C300 600 900 600 1200 640V800Z" fill="${c}"/><path d="M0 700C400 668 800 668 1200 700" stroke="${W}" stroke-width="6" stroke-dasharray="40 36" fill="none" opacity=".7"/>`;
const skyDef = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

out('images/services/daily-driver.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs>${skyDef('s', '#E6E9EC', W)}</defs>
<rect width="1200" height="800" fill="url(#s)"/><circle cx="880" cy="250" r="110" fill="${R}" opacity=".9"/>
<g fill="${G}" opacity=".75"><rect x="80" y="300" width="130" height="340"/><rect x="230" y="220" width="170" height="420"/><rect x="420" y="340" width="120" height="300"/><rect x="940" y="360" width="140" height="280"/><rect x="1090" y="290" width="110" height="350"/></g>
<g fill="${W}" opacity=".55"><rect x="250" y="250" width="14" height="340"/><rect x="290" y="250" width="14" height="340"/><rect x="330" y="250" width="14" height="340"/><rect x="370" y="250" width="14" height="340"/></g>
<g fill="${DEEP}"><rect x="560" y="260" width="320" height="380"/></g><g fill="${W}" opacity=".35"><rect x="590" y="290" width="260" height="8"/><rect x="590" y="340" width="260" height="8"/><rect x="590" y="390" width="260" height="8"/><rect x="590" y="440" width="260" height="8"/><rect x="590" y="490" width="260" height="8"/></g>
${road()}</svg>`);

out('images/services/trip-driver.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs>${skyDef('s', '#E9E6E0', W)}</defs>
<rect width="1200" height="800" fill="url(#s)"/><circle cx="260" cy="230" r="90" fill="${R}" opacity=".9"/>
<polygon points="-40,640 300,300 560,640" fill="${Q}"/><polygon points="300,640 700,230 1100,640" fill="${G}" opacity=".85"/><polygon points="760,640 1000,380 1260,640" fill="${DEEP}" opacity=".9"/>
<polygon points="700,230 640,320 700,300 760,330" fill="${W}" opacity=".85"/>
<path d="M0 800V660C250 620 450 700 640 650C820 604 1000 640 1200 610V800Z" fill="${INK}" opacity=".88"/>
<path d="M-20 770C300 700 520 760 700 700C900 636 1050 690 1220 650" stroke="${W}" stroke-width="6" stroke-dasharray="36 32" fill="none" opacity=".7"/></svg>`);

out('images/services/monthly-driver.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs>${skyDef('s', W, '#E6E1D9')}</defs>
<rect width="1200" height="800" fill="url(#s)"/>
<rect x="250" y="130" width="700" height="540" rx="36" fill="${W}" stroke="${Q}" stroke-width="6"/><rect x="250" y="130" width="700" height="110" rx="36" fill="${DEEP}"/><rect x="250" y="200" width="700" height="40" fill="${DEEP}"/>
<g fill="${W}"><circle cx="400" cy="130" r="16"/><circle cx="800" cy="130" r="16"/></g>
${Array.from({ length: 5 }, (_, r) => Array.from({ length: 7 }, (_, c) => { const hot = r * 7 + c === 16; return `<rect x="${290 + c * 88}" y="${270 + r * 72}" width="68" height="52" rx="12" fill="${hot ? R : Q}" opacity="${hot ? 1 : 0.5}"/>`; }).join('')).join('')}
<g transform="translate(850 560)"><circle r="92" fill="${INK}" opacity=".92"/><circle r="70" fill="none" stroke="${W}" stroke-width="10"/><path d="M-70 0H70M0 0V70" stroke="${W}" stroke-width="10"/><circle r="16" fill="${R}"/></g></svg>`);

/* ---------- ABOUT (portrait, untuk bingkai lengkung) ---------- */
out('images/about/about-team.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" preserveAspectRatio="xMidYMid slice"><defs>${skyDef('s', '#DAD5CB', W)}${skyDef('d', DEEP, INK)}</defs>
<rect width="1000" height="1250" fill="url(#s)"/>
<path d="M120 130H880L960 560H40Z" fill="#B5BCC4" opacity=".7"/><path d="M0 560C250 500 750 500 1000 560V1250H0Z" fill="url(#d)"/>
<path d="M0 640C250 590 750 590 1000 640" stroke="${R}" stroke-width="8" fill="none" opacity=".8"/>
<g transform="translate(500 900)"><circle r="270" fill="none" stroke="${W}" stroke-width="40"/><circle r="270" fill="none" stroke="${INK}" stroke-width="12" opacity=".5"/><path d="M-270 0H-80Q0 40 80 0H270M0 40V270" stroke="${W}" stroke-width="38" fill="none" stroke-linecap="round"/><circle cy="20" r="62" fill="${R}"/></g>
<path d="M60 1000H940" stroke="${G}" stroke-opacity=".0"/></svg>`);

/* ---------- DRIVERS (potret ilustratif 4:5) ---------- */
const drivers = [
  ['andi-pratama', '#D9A77C', '#1E2026', 0, '#E7E2DA'],
  ['budi-santoso', '#C68B5E', '#2B2B2E', 1, '#DCD6CB'],
  ['rizky-maulana', '#E0B48C', '#17181C', 0, '#E2DED7'],
  ['dimas-saputra', '#B9794F', '#1B1C20', 1, '#D9D4CA'],
  ['fajar-nugraha', '#D2A074', '#26282C', 0, '#E5E1DA'],
  ['reza-firmansyah', '#C48A60', '#202226', 1, '#DDD8CE'],
];
for (const [slug, skin, hair, style, bg] of drivers) {
  const hairPath = style === 0
    ? `M278 372C262 236 338 192 400 192C470 192 540 232 522 372C504 312 470 276 400 276C332 276 296 312 278 372Z`
    : `M276 376C262 224 346 186 410 190C486 194 546 240 524 376C512 322 486 290 430 280C380 272 312 290 276 376Z`;
  out(`images/drivers/${slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice"><defs>${skyDef('bg', bg, Q)}${skyDef('suit', '#3A3F47', INK)}</defs>
<rect width="800" height="1000" fill="url(#bg)"/><circle cx="400" cy="420" r="330" fill="${W}" opacity=".45"/>
<path d="M90 1000C90 800 230 700 400 700C570 700 710 800 710 1000Z" fill="url(#suit)"/>
<path d="M320 700L400 830L480 700Z" fill="${W}"/><path d="M382 760H418L430 900L400 934L370 900Z" fill="${R}"/>
<path d="M326 700L400 640L474 700L400 830Z" fill="${skin}" opacity=".0"/>
<rect x="350" y="560" width="100" height="150" rx="40" fill="${skin}"/><path d="M350 640C380 672 420 672 450 640V700H350Z" fill="#000" opacity=".12"/>
<ellipse cx="400" cy="400" rx="124" ry="146" fill="${skin}"/><ellipse cx="274" cy="414" rx="20" ry="32" fill="${skin}"/><ellipse cx="526" cy="414" rx="20" ry="32" fill="${skin}"/>
<path d="${hairPath}" fill="${hair}"/>
<path d="M352 470C378 490 422 490 448 470" stroke="#7A2D2D" stroke-width="7" stroke-linecap="round" fill="none" opacity=".55"/>
<circle cx="354" cy="404" r="9" fill="${INK}" opacity=".8"/><circle cx="446" cy="404" r="9" fill="${INK}" opacity=".8"/></svg>`);
}
console.log('Placeholder SVG dibuat di public/.');
