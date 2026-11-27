# DRIVORA — Driver untuk Setiap Perjalanan

**DRIVORA** adalah website katalog jasa pengemudi profesional untuk area **Semarang dan sekitarnya**.
Pengunjung bisa melihat layanan, mengenal profil pengemudi, membaca dan menulis ulasan, lalu menghubungi DRIVORA lewat **WhatsApp**.


---

## Daftar Isi

1. [Apa itu DRIVORA?](#1-apa-itu-drivora)
2. [Gambaran besar: cara kerjanya](#2-gambaran-besar-cara-kerjanya)
3. [Teknologi yang dipakai dan artinya](#3-teknologi-yang-dipakai-dan-artinya)
4. [Konsep penting](#4-konsep-penting)
5. [Fitur website](#5-fitur-website)
6. [Struktur folder](#6-struktur-folder)
7. [Database](#7-database)
8. [REST API](#8-rest-api)
9. [Menjalankan di komputer](#9-menjalankan-di-komputer)
10. [Pengaturan (environment variable)](#10-pengaturan-environment-variable)
11. [Mengganti konten](#11-mengganti-konten)
12. [Mengelola ulasan](#12-mengelola-ulasan)
13. [Deploy ke Vercel](#13-deploy-ke-vercel)
14. [Meng-install di HP](#14-meng-install-di-hp)
15. [Keamanan](#15-keamanan)
16. [Pengujian](#16-pengujian)
17. [Kesesuaian dengan ketentuan tugas](#17-kesesuaian-dengan-ketentuan-tugas)
18. [Masalah yang sering terjadi](#18-masalah-yang-sering-terjadi)
19. [Kamus kecil](#19-kamus-kecil)

---

## 1. Apa itu DRIVORA?

DRIVORA membantu orang yang butuh **jasa pengemudi**. Pelanggan **memakai mobil sendiri**, DRIVORA yang menyediakan **pengemudinya**.

Ada tiga jenis layanan:

| Layanan | Untuk apa |
|---|---|
| **Daily Driver** | Kebutuhan harian, urusan kerja, atau berdasarkan durasi |
| **Trip Driver** | Perjalanan dalam kota, luar kota, dan antarkota |
| **Monthly Driver** | Kontrak bulanan untuk kebutuhan rutin atau jangka panjang |

**Yang DRIVORA bukan:**

- Bukan aplikasi ojek online atau ride-hailing.
- Bukan rental atau penyewaan mobil.
- Tidak ada login, akun pelanggan, booking, atau pembayaran di website.

Harga, jadwal, dan ketersediaan pengemudi disepakati langsung lewat **WhatsApp**. Karena itu setiap tombol WhatsApp di website otomatis membawa **pesan yang sudah terisi** (misalnya nama layanan atau nama pengemudi yang sedang dilihat).

---

## 2. Gambaran besar: cara kerjanya

Bayangkan sebuah **restoran**:

| Di restoran | Di DRIVORA | Tugasnya |
|---|---|---|
| Pelayan dan buku menu | **Frontend** (React) | Yang dilihat dan disentuh pengunjung |
| Dapur | **Backend** (Express) | Menerima pesanan dari pelayan, memeriksa, lalu mengambil bahan |
| Gudang bahan | **Database** (Supabase) | Menyimpan semua data: layanan, pengemudi, ulasan |

Alurnya:

```
   HP / Laptop pengunjung
            │
            ▼
   ┌─────────────────┐   minta data    ┌──────────────────┐   ambil data    ┌──────────────┐
   │    FRONTEND     │ ──────────────▶ │     BACKEND      │ ──────────────▶ │   DATABASE   │
   │  React (PWA)    │ ◀────────────── │  Express (API)   │ ◀────────────── │   Supabase   │
   │  di Vercel      │   kirim data    │    di Vercel     │   kirim data    │  PostgreSQL  │
   └─────────────────┘                 └──────────────────┘                 └──────────────┘
```

**Kenapa frontend tidak langsung ke database?**
Supaya **kunci rahasia database** hanya ada di backend dan tidak pernah terlihat oleh pengunjung. Pengunjung hanya bisa meminta hal-hal yang sudah kita izinkan lewat API.

---

## 3. Teknologi yang dipakai dan artinya

### Frontend (bagian yang dilihat pengunjung)

- **JavaScript (JSX)** — Bahasa pemrograman yang dipakai di seluruh proyek ini. **JSX** adalah cara menulis JavaScript yang mirip HTML, sehingga tampilan lebih mudah ditulis. File-nya berakhiran `.jsx`.

- **React** — *Library* (kumpulan alat) untuk membuat tampilan website dari potongan-potongan kecil yang disebut **komponen**. Contohnya `DriverCard` (kartu pengemudi) ditulis sekali, lalu dipakai berkali-kali dengan data berbeda. Ini membuat kode rapi dan tidak diulang-ulang. React juga otomatis memperbarui tampilan ketika data berubah.

- **Vite** — *Build tool* yang menjalankan website saat kita mengembangkan (`npm run dev`) dan mengemasnya jadi file kecil siap pakai saat selesai (`npm run build`). Kelebihannya cepat: perubahan kode langsung terlihat di browser.

- **Tailwind CSS** — Cara mendesain tampilan dengan **kelas-kelas pendek** yang ditulis langsung di elemen. Contoh `rounded-full bg-red text-snow` artinya "sudut bulat penuh, latar merah, teks putih". Kita tidak perlu menulis file CSS panjang.

- **React Router DOM** — Pengatur **perpindahan halaman**. Dengan ini, klik "Drivers" berpindah halaman **tanpa memuat ulang** seluruh website, sehingga terasa mulus seperti aplikasi.

- **Axios** — Alat untuk **meminta data ke backend** (misalnya "berikan daftar pengemudi"). Axios juga membantu menangani error dan batas waktu tunggu.

- **Framer Motion** — Library **animasi**. Dipakai untuk efek muncul perlahan saat di-scroll, kartu yang muncul berurutan, transisi antarhalaman, dan animasi hero. Animasi otomatis dikurangi bagi pengguna yang mengaktifkan "reduce motion" di perangkatnya.

- **Lucide React** — Kumpulan **ikon** (panah, bintang, lokasi, dan sebagainya) yang konsisten dan ringan.

- **vite-plugin-pwa (Workbox)** — Alat yang **mengubah website biasa menjadi PWA**: membuat file manifest, membuat *service worker*, dan mengatur apa yang disimpan untuk mode offline.

- **Fontsource** — Menyimpan font (**Plus Jakarta Sans** dan **Playfair Display**) **di dalam proyek**, bukan mengambil dari internet. Jadi font tetap tampil walaupun offline.

- **PostCSS dan Autoprefixer** — Alat bantu di balik layar agar CSS bisa berjalan baik di berbagai browser.

- **sharp** — Dipakai sekali-sekali untuk **membuat ikon aplikasi (PNG)** dari logo lewat perintah `npm run icons`.

### Backend (bagian "dapur")

- **Node.js** — Membuat JavaScript bisa dijalankan **di luar browser**, yaitu di komputer atau server. Backend kita berjalan di atas Node.js.

- **Express.js** — *Framework* untuk membuat **API** dengan mudah. Ia menerima permintaan dari frontend (misalnya `GET /api/drivers`), memprosesnya, lalu mengirim jawaban.

- **@supabase/supabase-js** — Alat resmi untuk **berbicara dengan database Supabase** dari kode JavaScript.

- **dotenv** — Membaca file `.env` yang berisi **pengaturan rahasia** (seperti kunci database) agar tidak tertulis langsung di kode.

- **CORS** — Aturan keamanan browser: website mana saja yang **boleh** meminta data ke backend. Kita hanya mengizinkan alamat website DRIVORA sendiri.

- **node:test** — Fitur bawaan Node.js untuk **tes otomatis**. Dipakai untuk memastikan semua endpoint berjalan benar.

### Database

- **Supabase** — Layanan yang menyediakan database dan alat pengelolanya (tabel, SQL editor) di internet, dengan paket gratis. Ia dibangun di atas PostgreSQL.

- **PostgreSQL** — Jenis **database tabel**, seperti Excel yang sangat kuat: ada baris, kolom, dan hubungan antartabel.

- **SQL** — Bahasa untuk "bicara" dengan database, misalnya membuat tabel atau mengubah data.

- **Row Level Security (RLS)** — Fitur keamanan Supabase. Di proyek ini, publik hanya boleh **membaca** data. Mengubah data hanya bisa lewat backend.

### Deployment (menaruh website di internet)

- **Git** — Sistem pencatat riwayat perubahan kode.
- **GitHub** — Tempat menyimpan kode di internet, sekaligus sumber untuk Vercel.
- **Vercel** — Layanan hosting gratis yang menayangkan frontend dan backend. Setiap kali kode di GitHub diperbarui, Vercel otomatis memperbarui website.

---

## 4. Konsep penting

### PWA (Progressive Web App)
Website yang punya "kemampuan aplikasi". Syaratnya ada tiga:

1. **Web App Manifest** — file kecil berisi nama, ikon, dan warna aplikasi. Inilah yang membuat tombol "Install app" muncul.
2. **Service Worker** — "asisten" yang berjalan di belakang layar di browser. Ia menyimpan salinan halaman dan gambar, lalu menyajikannya saat internet putus.
3. **HTTPS** — koneksi aman. Setelah dipasang di Vercel, ini otomatis tersedia.

Hasilnya: bisa di-install, tampil layar penuh tanpa kolom alamat browser, dan tetap terbuka saat offline.

### Cara DRIVORA menyimpan data untuk offline (strategi caching)

| Yang disimpan | Cara | Penjelasan |
|---|---|---|
| Kerangka website (JavaScript, CSS, font, halaman utama) | **Precache** | Disimpan sejak pertama dibuka, dan diperbarui otomatis |
| Data dari API (daftar pengemudi, ulasan, dan lainnya) | **NetworkFirst** | Selalu coba ambil data terbaru dulu (menunggu maksimal 4 detik). Kalau internet mati, baru pakai salinan lama (maksimal 24 jam) |
| Gambar | **StaleWhileRevalidate** | Tampilkan salinan tersimpan agar cepat, sambil diam-diam mengambil versi baru. Disimpan hingga 30 hari |
| Pindah halaman saat offline | **Fallback ke halaman utama** | Website tetap terbuka dan menampilkan banner offline |

Kalau perangkat offline, muncul banner **"Anda sedang offline. Data yang tampil mungkin bukan yang terbaru."** supaya pengunjung tidak mengira itu data terkini.

### SPA (Single Page Application)
Website hanya memuat **satu halaman HTML**, lalu React yang mengganti isi layar saat pengunjung berpindah menu. Hasilnya cepat dan mulus.

### REST API
Aturan komunikasi antara frontend dan backend lewat alamat dan "kata kerja":

- `GET` = mengambil data
- `POST` = mengirim data baru

Contoh: `GET /api/drivers` berarti "berikan daftar pengemudi".

### Lazy loading (dimuat saat dibutuhkan)
Supaya website ringan dan terasa modern:

- **Gambar** dimuat ketika hampir terlihat di layar, ditampilkan dengan efek *shimmer* (kilau abu-abu), lalu muncul perlahan.
- **Halaman** dimuat per bagian (`React.lazy`), jadi file yang diunduh pertama kali lebih kecil.
- **Konten** muncul dengan animasi saat di-scroll (`whileInView`).

### Responsive
Tampilan menyesuaikan ukuran layar. Di HP ada **bottom navigation** (menu bawah), di laptop ada **navbar** di atas.

### Skeleton loading
Saat data sedang diambil, ditampilkan kotak abu-abu berkilau sebagai "bayangan" konten. Pengunjung tahu ada yang sedang dimuat, bukan halaman kosong.

### Environment variable
Pengaturan yang disimpan di luar kode, di file `.env` (atau di pengaturan Vercel). Contohnya kunci database dan nomor WhatsApp. File `.env` **tidak boleh** ikut diunggah ke GitHub.

---

## 5. Fitur website

### Halaman

| Halaman | Alamat | Isi |
|---|---|---|
| **Home** | `/` | Hero besar dengan visual mobil, statistik, layanan unggulan yang bisa digeser, daftar layanan, pengemudi, alasan memilih DRIVORA, ulasan, dan ajakan menghubungi |
| **Services** | `/services` | Tiga kartu layanan beserta cara memulai |
| **Service Detail** | `/services/:slug` | Deskripsi, manfaat, cakupan, cara pakai, pengemudi terkait, dan tombol WhatsApp |
| **Drivers** | `/drivers` | Katalog pengemudi dengan pencarian nama, filter pengalaman dan rating, urutan, serta nomor halaman |
| **Driver Detail** | `/drivers/:slug` | Foto besar, pengalaman, kendaraan, transmisi, spesialisasi, rating, ulasan, dan tombol WhatsApp |
| **Reviews** | `/reviews` | Ringkasan rating, filter, daftar ulasan, dan **formulir menulis ulasan** |
| **About** | `/about` | Tentang DRIVORA, visi dan misi, nilai layanan, dan kontak |
| **404** | alamat lain | Halaman "tidak ditemukan" dengan desain khusus |

**Dua alur list → detail:** Services → Service Detail, dan Drivers → Driver Detail.

### Navigasi
- **Laptop/tablet:** navbar di atas (Home, Services, Drivers, Reviews, About) plus tombol **Hubungi Kami**. Navbar berubah tampilan saat halaman di-scroll.
- **HP:** **bottom navigation** dengan lima tombol (Home, Services, Drivers, Reviews, About).

### Fitur WhatsApp
Tombol WhatsApp ada di navbar, hero, kartu layanan, detail layanan, detail pengemudi, dan footer. Tiap tombol membuka chat dengan **pesan otomatis yang sesuai konteks**. Nomornya diatur di satu tempat (lihat [Pengaturan](#10-pengaturan-environment-variable)).

### Menulis ulasan tanpa login
Pengunjung cukup mengisi **nama, pengemudi, jumlah bintang, dan isi ulasan**. Tidak perlu daftar atau login.

Agar tidak disalahgunakan:

- Ulasan baru **menunggu persetujuan** admin sebelum tampil (bisa diubah jadi langsung tampil).
- **Honeypot**: kolom tersembunyi yang hanya terisi oleh bot. Kiriman bot diabaikan.
- **Pembatas kecepatan**: maksimal 5 kiriman per 10 menit dari satu alamat IP.
- **Validasi**: nama 2–60 karakter, ulasan 10–500 karakter, rating 1–5.
- Batas ukuran data yang dikirim.

### Rating dihitung otomatis
Rating dan jumlah ulasan pengemudi **dihitung dari tabel ulasan**, tidak diketik manual. Jadi angkanya selalu sinkron dengan ulasan yang tampil.

### Desain dan kenyamanan
- **Empat warna brand:** Platinum Quartz `#CEC7BB`, Machine Grey `#777E88`, Pure White `#FFFAFA`, Soul Red `#961E2D`.
- Dua warna netral tambahan hanya untuk keterbacaan teks (`#23272D` dan `#4B515A`).
- Font **Plus Jakarta Sans**, dengan **Playfair Display miring** untuk aksen judul.
- Animasi halus yang dikurangi otomatis untuk pengguna yang memilih *reduce motion*.
- Tautan "Lewati ke konten", label untuk pembaca layar, dan judul tab per halaman untuk SEO dasar.
- Semua gambar punya teks alternatif dan **gambar cadangan** jika file gagal dimuat (tidak ada gambar rusak).

---

## 6. Struktur folder

```
DRIVORA/
├── frontend/                  ← Website (React)
│   ├── public/
│   │   ├── branding/          ← Logo (drivora-logo, drivora-mark)
│   │   ├── icons/             ← Ikon aplikasi PWA
│   │   └── images/            ← Gambar: drivers/, services/, hero/, about/
│   ├── scripts/               ← Alat bantu (pembuat ikon PWA)
│   ├── src/
│   │   ├── components/        ← Potongan tampilan (kartu, navbar, tombol, formulir)
│   │   ├── layouts/           ← Kerangka halaman (navbar + isi + footer)
│   │   ├── pages/             ← Halaman-halaman website
│   │   ├── routes/            ← Daftar alamat halaman
│   │   ├── services/          ← Kode yang memanggil API
│   │   ├── hooks/             ← Fungsi bantu React (ambil data, online/offline, dan lain-lain)
│   │   ├── config/            ← Pengaturan (nomor WhatsApp, teks statis)
│   │   └── utils/             ← Fungsi kecil (format tanggal, animasi)
│   ├── index.html             ← Halaman dasar + pengaturan ikon dan judul
│   ├── vite.config.js         ← Pengaturan Vite dan PWA
│   ├── tailwind.config.js     ← Pengaturan warna dan font
│   └── vercel.json            ← Pengaturan hosting frontend
│
├── backend/                   ← API (Express)
│   ├── api/index.js           ← Pintu masuk untuk Vercel
│   ├── src/
│   │   ├── config/            ← Pembaca pengaturan dan koneksi database
│   │   ├── controllers/       ← Logika tiap endpoint
│   │   ├── routes/            ← Daftar alamat API
│   │   ├── models/            ← Kode pengambil data dari database
│   │   ├── middleware/        ← Penjaga (error, 404, pembatas kecepatan)
│   │   └── utils/             ← Validasi dan fungsi bantu
│   ├── tests/                 ← Tes otomatis
│   └── vercel.json            ← Pengaturan hosting backend
│
├── supabase/                  ← Skrip database (SQL)
│   ├── migrations/            ← Pembuat tabel
│   └── seed-data.json         ← Data awal
│
└── README.md                  ← File ini
```

---

## 7. Database

Ada **empat tabel**:

| Tabel | Isi |
|---|---|
| `services` | Layanan: nama, slug, deskripsi, manfaat, cakupan, cara pakai, gambar |
| `drivers` | Pengemudi: nama, slug, foto, pengalaman, deskripsi, kendaraan, transmisi, spesialisasi, ketersediaan |
| `driver_services` | Tabel penghubung: pengemudi A melayani layanan apa saja |
| `reviews` | Ulasan: nama pemberi ulasan, pengemudi yang diulas, rating, isi, tanggal, status tampil |

Penjelasan beberapa kolom:

- **`slug`** — Nama yang aman dipakai di alamat web, misalnya `andi-pratama`. Dipakai di alamat `/drivers/andi-pratama`.
- **`is_published`** (di `reviews`) — `true` berarti ulasan tampil, `false` berarti menunggu persetujuan.
- **`is_demo`** — Penanda data contoh. Kalau `true`, kartu menampilkan label "Demo" atau "Ulasan contoh". Untuk data asli, isi `false`.

Ada juga **view** (tabel virtual) bernama `drivers_with_stats`. Ia menggabungkan data pengemudi dengan **rating rata-rata, jumlah ulasan, dan daftar layanannya**, yang dihitung otomatis dari tabel `reviews`.

---

## 8. REST API

Semua jawaban berbentuk JSON dengan format yang sama:

```json
{ "success": true,  "data": ..., "meta": ... }
{ "success": false, "error": { "code": "...", "message": "..." } }
```

| Metode | Alamat | Fungsi |
|---|---|---|
| GET | `/api/health` | Cek server hidup dan sumber datanya |
| GET | `/api/services` | Daftar layanan |
| GET | `/api/services/:slug` | Detail layanan beserta pengemudi terkait |
| GET | `/api/drivers` | Daftar pengemudi. Parameter: `search`, `min_experience`, `min_rating`, `sort` (`rating`, `experience`, `name`), `page`, `limit` |
| GET | `/api/drivers/:slug` | Detail satu pengemudi (dengan rating dan jumlah ulasan) |
| GET | `/api/drivers/:slug/reviews` | Ulasan satu pengemudi beserta ringkasan |
| GET | `/api/reviews` | Semua ulasan. Parameter: `driver`, `rating`, `page`, `limit`, dan ringkasan rating |
| POST | `/api/reviews` | Mengirim ulasan baru (`customer_name`, `driver_slug`, `rating`, `comment`) |

**Kode status yang dipakai:**

| Kode | Artinya |
|---|---|
| 200 | Berhasil |
| 201 | Berhasil dibuat (ulasan terkirim) |
| 400 | Data yang dikirim tidak valid |
| 404 | Data atau alamat tidak ditemukan |
| 413 | Data yang dikirim terlalu besar |
| 429 | Terlalu banyak percobaan, coba lagi nanti |
| 502 | Database tidak bisa diakses |
| 500 | Kesalahan server lain |

---

## 9. Menjalankan di komputer

### Yang perlu dipasang dulu
- **Node.js** versi LTS (nodejs.org). Cek dengan `node -v`, minimal **v18**.
- **VS Code** (opsional, untuk mengedit).

### Langkah

**1. Siapkan database** — ikuti [Mengatur database Supabase](#mengatur-database-supabase) di bawah.

**2. Jalankan backend** (terminal 1):
```bash
cd backend
npm install
# salin .env.example menjadi .env, lalu isi (lihat bagian Pengaturan)
npm run dev
```
Cek di browser: `http://localhost:4100/api/health` (port sesuai `PORT` di `.env`).

**3. Jalankan frontend** (terminal 2):
```bash
cd frontend
npm install
npm run dev
```
Buka alamat yang muncul di terminal (misalnya `http://localhost:5174`).

### Melihat di HP lewat WiFi yang sama
Di `frontend/vite.config.js`, tambahkan `host: true` pada bagian `server`:
```js
server: { port: 5174, proxy, host: true },
```
Jalankan ulang `npm run dev`, lalu buka alamat **Network** (`http://192.168...:5174`) di browser HP. Cara ini hanya untuk **melihat**. Install dan offline butuh HTTPS, jadi baru berfungsi setelah deploy.

### Mengatur database Supabase

1. Daftar di **supabase.com** lalu klik **New project** (pilih region **Southeast Asia / Singapore**).
2. Buka **SQL Editor → New query**, tempel isi `supabase/migrations/001_init.sql`, lalu **Run**.
3. Isi data awal dengan menjalankan `supabase/seed.sql` (kalau ada), atau masukkan data aslimu (lihat [Mengganti konten](#11-mengganti-konten)).
4. Buka **Project Settings → API**, lalu salin:
   - **Project URL** (bentuknya `https://xxxx.supabase.co`, tanpa tambahan di belakangnya)
   - **service_role / secret key** (rahasia!)

### Mode tanpa database (untuk mencoba saja)
Backend punya mode `local` yang membaca `supabase/seed-data.json`:
```bash
cd backend
npm run dev:local
```
Data ulasan yang dikirim di mode ini hanya tersimpan sementara dan hilang saat server dimatikan.

---

## 10. Pengaturan (environment variable)

### Backend — file `backend/.env`

| Nama | Isi | Keterangan |
|---|---|---|
| `PORT` | `4100` | Port server di komputer |
| `NODE_ENV` | `development` / `production` | Mode jalan |
| `CORS_ORIGIN` | alamat website | Alamat frontend yang boleh meminta data, pisahkan dengan koma |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | Alamat project Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | kunci rahasia | **Jangan disebarkan** |
| `REVIEW_AUTO_PUBLISH` | `false` atau `true` | `false` = ulasan menunggu persetujuan. `true` = langsung tampil |
| `DATA_SOURCE` | `local` (opsional) | Pakai data lokal tanpa Supabase |

### Frontend — file `frontend/.env`

| Nama | Isi | Keterangan |
|---|---|---|
| `VITE_API_URL` | kosong (di komputer) / alamat backend Vercel | Kosong saat development karena Vite meneruskan `/api` otomatis |
| `VITE_WHATSAPP_NUMBER` | `6281234567890` | Nomor WhatsApp utama. Awali **62**, tanpa `+` dan tanpa `0` di depan |

> File `.env` tidak boleh diunggah ke GitHub. Sudah dicegah oleh `.gitignore`.
> Setelah mengubah `.env`, **jalankan ulang** server. Di Vercel, setelah mengubah variabel perlu **Redeploy**.

---

## 11. Mengganti konten

### Nomor WhatsApp
Isi `VITE_WHATSAPP_NUMBER` di `frontend/.env` (atau di Vercel). Nomor ini dipakai semua tombol WhatsApp, footer, dan halaman About.

### Logo
Timpa file di `frontend/public/branding/`:

- `drivora-logo.svg` (atau `.png`) — logo panjang untuk navbar dan footer
- `drivora-mark.svg` — logo kecil untuk ikon tab dan ikon aplikasi

Setelah mengganti `drivora-mark`, buat ulang ikon aplikasi:
```bash
cd frontend
npm run icons
```
Ukuran logo di layar diatur lewat angka `h-8`, `h-10`, dan seterusnya di `Navbar.jsx` dan `Footer.jsx`.

### Gambar
Semua gambar ada di `frontend/public/images/`:

| Gambar | Ukuran ideal |
|---|---|
| Foto pengemudi | 800×1000 px (tegak) |
| Foto layanan | 1200×800 px (melebar) |
| Hero (kota) | 800×1120 px (tegak) |
| Hero (mobil) | PNG transparan, lebar ±1600 px |
| About | 1000×1250 px (tegak) |

Kompres dulu (misalnya di squoosh.app) agar website tetap ringan. Foto layanan dan pengemudi **tersimpan alamatnya di database**. Setelah menaruh foto baru, perbarui kolom `photo_url` atau `image_url` di tabel lewat Supabase (Table Editor atau SQL Editor).

Kalau file gambar hilang atau salah nama, website menampilkan gambar cadangan, bukan gambar rusak.

### Data pengemudi, layanan, dan ulasan
Dikelola langsung di **Supabase → Table Editor** (tidak ada halaman admin). Untuk data asli, isi kolom `is_demo` dengan `false` agar label "Demo" tidak muncul.

---

## 12. Mengelola ulasan

Karena tidak ada login admin, ulasan disetujui lewat Supabase:

1. Buka **Supabase → Table Editor → `reviews`**.
2. Ulasan baru punya `is_published` = **false**.
3. Baca isinya. Kalau wajar, ubah `is_published` menjadi **true**, dan ulasan langsung tampil.
4. Kalau spam atau tidak pantas, hapus barisnya.

Mau ulasan langsung tampil tanpa persetujuan? Ubah `REVIEW_AUTO_PUBLISH=true` di backend. Risikonya spam dan rating palsu lebih mudah masuk.

---

## 13. Deploy ke Vercel

Satu repository GitHub dipakai untuk **dua project Vercel** (backend dan frontend).

### Langkah 1 — Unggah ke GitHub
```bash
git init
git add .
git commit -m "DRIVORA"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```
Sebelum `git add`, pastikan file `.env` tidak ikut (cek dengan `git status`).

### Langkah 2 — Deploy backend
1. Di **vercel.com**, klik **Add New → Project**, pilih repo.
2. **Root Directory:** `backend`. **Framework Preset:** *Other*.
3. Isi **Environment Variables:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NODE_ENV=production`, `REVIEW_AUTO_PUBLISH=false`, dan `CORS_ORIGIN` (sementara isi `http://localhost:5174`).
4. **Deploy**, lalu cek `https://ALAMAT-BACKEND.vercel.app/api/health` (`dataSource` harus `supabase`).

### Langkah 3 — Deploy frontend
1. **Add New → Project**, pilih repo yang sama.
2. **Root Directory:** `frontend`. **Framework Preset:** *Vite*.
3. **Environment Variables:** `VITE_API_URL` = alamat backend (tanpa garis miring di akhir), `VITE_WHATSAPP_NUMBER` = nomor aslimu.
4. **Deploy**.

### Langkah 4 — Hubungkan keduanya
Ubah `CORS_ORIGIN` di project **backend** menjadi alamat frontend (misalnya `https://drivora.vercel.app`), lalu **Redeploy** backend.

### Update berikutnya
Cukup `git push`. Vercel memperbarui website secara otomatis.

---

## 14. Meng-install di HP

Setelah dibuka lewat alamat Vercel (HTTPS):

**Android (Chrome):** ketuk menu **⋮ → Install app** (atau **Add to Home screen**) → **Install**.
**iPhone (harus Safari):** ketuk **Share → Add to Home Screen → Add**.
**Laptop (Chrome/Edge):** klik ikon install di ujung kanan kolom alamat.

**Uji offline:** buka semua halaman saat online, lalu nyalakan mode pesawat dan buka aplikasinya. Halaman yang sudah pernah dibuka tetap tampil dengan banner offline. Halaman yang belum pernah dibuka dan fitur kirim ulasan butuh internet.

---

## 15. Keamanan

| Hal | Cara |
|---|---|
| Kunci database tidak bocor | Hanya ada di backend (`.env` / Vercel), tidak pernah di frontend |
| Publik tidak bisa mengubah data seenaknya | RLS aktif, hanya baca. Menulis hanya lewat backend |
| Input pengunjung aman | Dibersihkan dan divalidasi di backend, React meng-escape tampilan |
| Spam ulasan | Moderasi, honeypot, pembatas kecepatan, batas ukuran data |
| Hanya website sendiri yang boleh memanggil API | CORS dengan daftar alamat yang diizinkan |
| Ulasan palsu menaikkan rating | Hanya ulasan yang disetujui (`is_published`) yang dihitung |

Catatan: pembatas kecepatan memakai memori server, sedangkan Vercel memakai banyak instance sementara, jadi ia berfungsi sebagai penghalang ringan. Pengaman utamanya adalah **moderasi ulasan**.

---

## 16. Pengujian

```bash
cd backend
npm test
```
Ada **16 tes otomatis** yang memeriksa semua endpoint, validasi, paginasi, filter, perhitungan rating, pengiriman ulasan, honeypot, dan pembatas kecepatan.

Untuk mencoba PWA secara lokal:
```bash
cd frontend
npm run build
npm run preview
```
Service worker hanya aktif pada versi build. Di `npm run dev`, fitur install dan offline **sengaja dimatikan**.

---

## 17. Kesesuaian dengan ketentuan tugas

| Ketentuan | Status |
|---|---|
| Menggunakan PWA (manifest, service worker, installable, offline) | Terpenuhi |
| Menggunakan JavaScript | Terpenuhi |
| REST API / Web Service buatan sendiri | Terpenuhi (Express) |
| Bottom Navigation Bar | Terpenuhi (mobile) |
| Minimal 5 halaman | 8 halaman |
| Minimal 2 halaman list yang bisa dibuka ke detail | Services → Detail, Drivers → Detail |
| Halaman About/Profile | Terpenuhi |
| Source code di GitHub | Ikuti [Deploy](#13-deploy-ke-vercel) |
| PWA di hosting gratis | Vercel |

---

## 18. Masalah yang sering terjadi

| Masalah | Penyebab | Solusi |
|---|---|---|
| Web tampil tapi data tidak muncul | Backend mati atau salah alamat | Cek `/api/health`. Pastikan `VITE_API_URL` benar |
| `Invalid path specified in request URL` | `SUPABASE_URL` ada tambahan `/rest/v1` | Isi hanya `https://xxxx.supabase.co` |
| `Invalid API key` | Kunci salah salin | Salin ulang, tanpa spasi |
| `Could not find the table` | SQL belum dijalankan | Jalankan migration di SQL Editor |
| Di Vercel data tidak muncul, di komputer lancar | `CORS_ORIGIN` belum diisi alamat frontend | Isi lalu Redeploy backend |
| Perubahan `.env` tidak terbaca | Server belum dijalankan ulang | Restart. Di Vercel, Redeploy |
| Tombol Install tidak muncul | Memakai `npm run dev` atau alamat non-HTTPS | Buka versi Vercel |
| Tab masih menampilkan project lain | Service worker project lama tertinggal di alamat yang sama | DevTools → Application → Service Workers → Unregister, lalu Clear site data |
| Merah "File name differs only in casing" | Nama file beda huruf besar-kecil | Samakan dengan nama di `import` |
| Gambar tidak berubah | Nama file atau alamat di database tidak sama | Cek ejaan, lalu refresh paksa (`Ctrl+Shift+R`) |

---

## 19. Kamus kecil

| Istilah | Artinya |
|---|---|
| **API** | Pintu resmi tempat program saling meminta dan memberi data |
| **Backend** | Bagian program di server yang mengurus data dan aturan |
| **Frontend** | Bagian program yang tampil di layar pengunjung |
| **Komponen** | Potongan tampilan yang bisa dipakai berulang |
| **Framework / Library** | Kumpulan alat siap pakai supaya tidak menulis semuanya dari nol |
| **Build** | Mengemas kode menjadi file kecil siap tayang |
| **Deploy** | Menaruh website di internet agar bisa dibuka siapa saja |
| **Hosting** | Tempat website "tinggal" di internet |
| **Repository (repo)** | Folder proyek yang disimpan dan dicatat riwayatnya oleh Git |
| **Commit / Push** | Menyimpan perubahan / mengirimnya ke GitHub |
| **Cache** | Salinan data yang disimpan agar akses lebih cepat atau tetap bisa offline |
| **Service Worker** | Skrip pembantu di browser yang mengatur cache dan mode offline |
| **Manifest** | File yang berisi nama, ikon, dan warna aplikasi PWA |
| **HTTPS** | Koneksi web yang terenkripsi dan aman |
| **Slug** | Nama versi alamat web, misalnya `andi-pratama` |
| **Honeypot** | Kolom jebakan tersembunyi untuk menangkap bot |
| **Moderasi** | Memeriksa dan menyetujui konten sebelum tampil |
| **Rate limit** | Batas jumlah permintaan dalam waktu tertentu |
| **Environment variable** | Pengaturan yang disimpan di luar kode, biasanya untuk data rahasia |
| **Serverless** | Kode backend yang hanya berjalan saat ada permintaan, tanpa mengurus server sendiri |
| **SPA** | Website satu halaman yang isinya berganti tanpa memuat ulang |
| **PWA** | Website yang bisa di-install dan dipakai offline seperti aplikasi |

---

**DRIVORA** — *Driver untuk Setiap Perjalanan.*
