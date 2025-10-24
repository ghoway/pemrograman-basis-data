# Dokumentasi Sistem Manajemen Aset Sekolah

## Deskripsi Sistem

Sistem Manajemen Aset Sekolah adalah aplikasi web yang dirancang untuk mengelola inventarisasi dan peminjaman aset sekolah seperti laptop, proyektor, dan peralatan lainnya. Sistem ini dibangun menggunakan arsitektur full-stack dengan backend Node.js/Express dan frontend Next.js/React.

### Fitur Utama
- **Manajemen Departemen**: CRUD departemen sekolah
- **Manajemen Karyawan**: Kelola data karyawan dan asosiasinya dengan departemen
- **Manajemen Vendor**: Data supplier/pemasok aset
- **Manajemen Kategori**: Kategorisasi aset
- **Manajemen Aset**: Inventarisasi aset dengan tracking status (tersedia, dipinjam, rusak)
- **Manajemen Peminjaman**: Sistem peminjaman dan pengembalian aset
- **Analytics**: Dashboard dengan visualisasi data peminjaman dan status aset

### Teknologi yang Digunakan
- **Backend**: Node.js, Express.js, MySQL, CORS, dotenv
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Chart.js
- **Database**: MySQL dengan 6 tabel utama

### Arsitektur Sistem
- **RESTful API**: Endpoint untuk semua operasi CRUD
- **Single Page Application**: Frontend responsif dengan routing client-side
- **Database Relational**: Relasi antara tabel untuk integritas data

## ERD (Entity Relationship Diagram)

Lihat file `erd.dbml` untuk script dbdiagram.io yang dapat di-import ke https://dbdiagram.io untuk visualisasi ERD.

## Penjelasan Query

### 1. Query untuk Mendapatkan Semua Aset
```sql
SELECT * FROM assets;
```
Query ini mengambil semua data aset dari tabel assets.

### 2. Query untuk Peminjaman Aset
```sql
INSERT INTO loans (id, asset_id, employee_id, borrow_date, expected_return_date) VALUES (?, ?, ?, ?, ?);
UPDATE assets SET status = 'borrowed' WHERE id = ?;
```
Query ini menambahkan record peminjaman dan mengupdate status aset menjadi 'borrowed'.

### 3. Query untuk Pengembalian Aset
```sql
UPDATE loans SET actual_return_date = ?, return_condition = ?, status = 'returned' WHERE id = ?;
UPDATE assets SET status = ? WHERE id = ?;
```
Query ini mengupdate data pengembalian dan status aset berdasarkan kondisi pengembalian.

### 4. Query Analytics - Peminjam Terbanyak
```sql
SELECT e.name, COUNT(l.id) as borrow_count
FROM loans l
JOIN employees e ON l.employee_id = e.id
GROUP BY l.employee_id, e.name
ORDER BY borrow_count DESC;
```
Query ini menghitung jumlah peminjaman per karyawan dan mengurutkan descending.

### 5. Query Analytics - Kategori Paling Banyak Dipinjam
```sql
SELECT c.name as category, COUNT(l.id) as borrow_count
FROM loans l
JOIN assets a ON l.asset_id = a.id
JOIN categories c ON a.category_id = c.id
GROUP BY c.name
ORDER BY borrow_count DESC;
```
Query ini menghitung peminjaman per kategori aset.

### 6. Query Analytics - Ringkasan Status Aset
```sql
SELECT status, COUNT(*) as count
FROM assets
GROUP BY status;
```
Query ini menghitung jumlah aset per status.

## Cara Menjalankan Sistem

1. Setup database MySQL
2. Jalankan `node init-db.js` untuk membuat tabel
3. Jalankan backend: `npm run dev` di folder backend
4. Jalankan frontend: `npm run dev` di folder frontend
5. Akses aplikasi di http://localhost:3000

## API Documentation

Lihat file `backend/docs/openapi.yaml` untuk spesifikasi lengkap API menggunakan OpenAPI 3.0.3.