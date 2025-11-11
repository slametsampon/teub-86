# 🧩 TEUB-86

Repositori ini merupakan proyek berbasis **Next.js (App Router)** yang ditujukan sebagai **platform dokumentasi digital alumni** TEUB-86 (Teknik Elektro Universitas Brawijaya Angkatan 1986). Platform ini bersifat **ringan, modular, dan extensible**, cocok digunakan untuk:

- 📚 Menulis dan mempublikasikan artikel alumni
- 🧠 Berbagi pengetahuan & pengalaman kerja
- 🧾 Mencatat sejarah dan dokumentasi kegiatan reuni

Konten disusun dalam format **Markdown (MDX)** dan dikelola menggunakan **Contentlayer**, sehingga sangat fleksibel untuk pengelolaan konten teknis maupun non-teknis.

Repositori: [https://github.com/slametsampon/teub-86](https://github.com/slametsampon/teub-86)

---

## ✨ Fitur Utama

- ⚡ Dibangun dengan Next.js + App Router (`/app`)
- 🎨 Styling menggunakan Tailwind CSS
- 📦 Konten berbasis Markdown/MDX via Contentlayer
- 📂 Terstruktur menjadi dua entitas utama: **Blog** dan **Reuni**
- 🧠 Ditulis penuh dalam TypeScript
- 🌐 Siap dideploy ke GitHub Pages
- ✅ Cocok untuk dokumentasi komunitas, alumni, atau knowledge platform

---

## 📁 Struktur Konten

Proyek ini memiliki dua kanal utama:

| Kanal | Path     | Deskripsi                                                |
| ----- | -------- | -------------------------------------------------------- |
| Blog  | `/blog`  | Artikel bebas, opini, pengalaman, teknologi, berita, dll |
| Reuni | `/reuni` | Dokumentasi kegiatan reuni alumni (narasi + foto)        |

Semua konten dapat ditulis langsung dalam `.mdx` dan diletakkan dalam folder `content/`.

---

## 🛠️ Persyaratan Sistem

Pastikan Anda sudah menginstall:

- **Node.js** versi 18+
  👉 [https://nodejs.org](https://nodejs.org)
- **Git**
  👉 [https://git-scm.com](https://git-scm.com)

---

## 🚀 Setup Proyek (Lokal)

### 1. Clone repositori

```bash
git clone https://github.com/slametsampon/teub-86.git
cd teub-86
```

### 2. Install dependensi

```bash
npm install
```

### 3. Jalankan lokal

```bash
npm run dev
```

Buka browser di:

```
http://localhost:3000
```

### 4. Build untuk Produksi

```bash
npm run build
npm run start
```

---

## 🚢 Deploy ke GitHub Pages

### 1. Update `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/teub-86',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

> Sesuaikan `basePath` dengan nama repositori GitHub.

### 2. Tambahkan script ke `package.json`

```json
"scripts": {
  "dev": "next dev",
  "build": "next build && next export",
  "start": "next start",
  "deploy": "npm run build && npx gh-pages -d out"
}
```

### 3. Install `gh-pages`

```bash
npm install gh-pages --save-dev
```

### 4. Jalankan Deploy

```bash
npm run deploy
```

### 5. Atur GitHub Pages

- GitHub > Settings > Pages
- Source: `gh-pages` branch
- Folder: `/ (root)`

Link deploy:

```
https://slametsampon.github.io/teub-86
```

---

## 📁 Struktur Direktori

```
teub-86/
├── app/                      # Routing dengan App Router
├── components/               # Komponen UI
├── content/
│   ├── blog/                 # Artikel alumni
│   ├── reuni/                # Dokumentasi kegiatan reuni
│   └── pages/                # Static page seperti about.mdx
├── data/                     # Metadata konfigurasi
├── layouts/                  # Layout halaman
├── public/                   # Aset statis (gambar, icon)
├── .contentlayer/            # Output contentlayer
├── out/                      # Hasil export untuk GitHub Pages
├── tailwind.config.ts        # Konfigurasi Tailwind
├── contentlayer.config.ts    # Konfigurasi struktur konten
├── next.config.js            # Konfigurasi Next.js
├── tsconfig.json             # TypeScript config
├── package.json              # Dependensi & script
└── README.md                 # Dokumentasi ini
```

---

## 📦 Daftar Perintah Penting

| Perintah         | Deskripsi                           |
| ---------------- | ----------------------------------- |
| `npm install`    | Install dependensi                  |
| `npm run dev`    | Jalankan proyek di `localhost:3000` |
| `npm run build`  | Build produksi                      |
| `npm run start`  | Jalankan hasil build                |
| `npm run deploy` | Deploy ke GitHub Pages              |

---

## ❓ FAQ

### 🔹 Kenapa kontennya terpisah menjadi Blog dan Reuni?

Agar struktur tetap modular dan jelas:

- **Blog**: fleksibel untuk berbagai topik.
- **Reuni**: arsip dokumentasi kegiatan berdasarkan tahun atau lokasi.

### 🔹 Bisa menambahkan artikel tanpa koding?

Konten `.mdx` cukup ditambahkan dalam folder `content/blog/` atau `content/reuni/`. Anda bisa menulis langsung menggunakan Markdown tanpa menyentuh JavaScript.

---

## 🙌 Kontribusi

Semua alumni TEUB-86 dipersilakan berkontribusi.

Langkah:

1. Fork repositori
2. Buat branch baru (`feature/nama-fitur`)
3. Tambahkan konten
4. Buat Pull Request

---

## 📬 Kontak

Dikelola oleh: [@slametsampon](https://github.com/slametsampon)
Silakan gunakan [Issue](https://github.com/slametsampon/teub-86/issues) untuk pertanyaan atau usulan.

---

Terima kasih telah menggunakan TEUB-86 🚀
Mari kita dokumentasikan kenangan dan pengetahuan bersama.
