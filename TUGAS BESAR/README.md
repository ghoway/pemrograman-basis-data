# Sistem Manajemen Aset Sekolah

Proyek tugas besar mata kuliah Perancangan Basis Data untuk mengelola aset sekolah seperti laptop, proyektor, dan peralatan lainnya.

## Teknologi yang Digunakan

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web untuk API
- **MySQL2** - Driver untuk koneksi ke database MySQL
- **CORS** - Middleware untuk cross-origin requests
- **dotenv** - Manajemen variabel environment

### Frontend
- **Next.js 15** - Framework React untuk web aplikasi
- **React 19** - Library UI
- **TypeScript** - Superset JavaScript dengan type safety
- **Tailwind CSS** - Framework CSS utility-first
- **Chart.js** - Library untuk visualisasi data

### Database
- **MySQL** - Sistem manajemen basis data relasional
- Tabel: departments, employees, vendors, assets, loans

## Struktur Proyek
```
pbd/
├── backend/          # API server
│   ├── config/       # Konfigurasi database
│   ├── controllers/  # Logika bisnis
│   ├── database/     # Schema dan migrasi
│   ├── routes/       # Definisi endpoint API
│   └── server.js     # Entry point server
├── frontend/         # Aplikasi web
│   ├── src/
│   │   ├── app/      # Pages Next.js
│   │   └── components/ # Komponen React
│   └── package.json
└── README.md
```

## Instalasi

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- MySQL Server
- npm atau yarn

### Langkah Instalasi

1. **Clone atau download proyek ini**

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Konfigurasi Database:**
   - Buat database MySQL baru
   - Buat file `.env` di folder `backend/` dengan konfigurasi berikut:
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASS=your_mysql_password
     DB_NAME=manajemen_aset_sekolah
     DB_PORT=3306
     ```

5. **Inisialisasi Database:**
   ```bash
   cd backend
   node init-db.js
   ```

6. **(Opsional) Insert Data Sample:**
   ```bash
   node sample-data.js
   ```

## Menjalankan Aplikasi

### Backend
```bash
cd backend
npm run dev
```
Server akan berjalan di `http://localhost:5000`

### Frontend
```bash
cd frontend
npm run dev
```
Aplikasi web akan berjalan di `http://localhost:3000`

### Menjalankan Kedua Server Secara Bersamaan

Untuk kemudahan development, Anda bisa menjalankan backend dan frontend secara bersamaan:

1. Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

2. Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

Atau gunakan tool seperti `concurrently` jika diinginkan.

## Fitur Utama

- **Manajemen Departemen**: Tambah, edit, hapus departemen
- **Manajemen Karyawan**: Kelola data karyawan dan departemen mereka (tabel menampilkan nama departemen)
- **Manajemen Vendor**: Data supplier aset
- **Manajemen Aset**: Inventarisasi dan tracking status aset dengan modal detail lengkap
- **Manajemen Peminjaman**: Sistem peminjaman dan pengembalian aset dengan modal detail peminjaman
- **Analytics**: Dashboard dengan visualisasi data menggunakan Chart.js

## Antarmuka Pengguna

- **Responsive Design**: Menggunakan Tailwind CSS untuk tampilan yang responsif
- **Modal Dialog**: Detail aset dan peminjaman ditampilkan dalam modal dengan tabel rapi
- **Form Interaktif**: Combobox untuk pemilihan kategori, vendor, dll.
- **Tabel Dinamis**: Tabel dengan kolom yang relevan dan aksi edit/hapus/detail

## API Endpoints

- `GET/POST/PUT/DELETE /api/departments` - Departemen
- `GET/POST/PUT/DELETE /api/employees` - Karyawan
- `GET/POST/PUT/DELETE /api/vendors` - Vendor
- `GET/POST/PUT/DELETE /api/assets` - Aset
- `GET/POST/PUT/DELETE /api/transactions` - Transaksi peminjaman
- `GET /api/analytics` - Data analytics

## Lisensi

ISC