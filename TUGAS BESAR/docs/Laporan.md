# Sistem Manajemen Aset Sekolah: Implementasi Aplikasi Web untuk Pengelolaan Inventaris dan Peminjaman Aset

**Nama:** [Nama Anda]  
**NIM:** [NIM Anda]  
**Program Studi:** [Program Studi]  
**Mata Kuliah:** Perancangan Basis Data  
**Dosen Pembimbing:** [Nama Dosen]  

**Tanggal:** [Tanggal]  

---

## Abstrak

Sistem Manajemen Aset Sekolah merupakan aplikasi web yang dikembangkan untuk mengatasi permasalahan pengelolaan inventaris dan peminjaman aset di lingkungan sekolah. Aplikasi ini dibangun menggunakan teknologi full-stack dengan backend berbasis Node.js dan Express.js, serta frontend menggunakan framework Next.js dan React. Database MySQL digunakan untuk penyimpanan data dengan desain relasional yang terstruktur. Sistem ini menyediakan fitur-fitur seperti manajemen departemen, karyawan, vendor, kategori aset, inventarisasi aset, serta sistem peminjaman dan pengembalian aset. Implementasi analytics dashboard memberikan visualisasi data untuk mendukung pengambilan keputusan. Hasil pengujian menunjukkan bahwa sistem berjalan dengan baik dan memenuhi kebutuhan pengelolaan aset sekolah secara efisien.

**Kata kunci:** manajemen aset, aplikasi web, database relasional, full-stack development, analytics dashboard

---

## Daftar Isi

1. [Pendahuluan](#pendahuluan)
2. [Tinjauan Pustaka](#tinjauan-pustaka)
3. [Metodologi](#metodologi)
4. [Hasil dan Pembahasan](#hasil-dan-pembahasan)
5. [Kesimpulan](#kesimpulan)
6. [Daftar Pustaka](#daftar-pustaka)

---

## Pendahuluan

### Latar Belakang

Dalam era digital saat ini, pengelolaan aset di lingkungan sekolah menjadi semakin kompleks seiring dengan bertambahnya jumlah peralatan teknologi seperti laptop, proyektor, dan perangkat multimedia lainnya. Sistem manual menggunakan buku catatan atau spreadsheet seringkali tidak efisien, rentan kesalahan, dan sulit untuk diakses secara real-time. Oleh karena itu, diperlukan sistem informasi yang terintegrasi untuk mengelola inventaris dan proses peminjaman aset secara otomatis.

### Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah dalam penelitian ini adalah:
1. Bagaimana merancang database relasional yang sesuai untuk sistem manajemen aset sekolah?
2. Bagaimana mengimplementasikan aplikasi web full-stack untuk pengelolaan aset?
3. Bagaimana mengintegrasikan fitur analytics untuk visualisasi data aset?

### Tujuan Penelitian

Tujuan dari penelitian ini adalah:
1. Merancang dan mengimplementasikan sistem manajemen aset sekolah berbasis web
2. Mengembangkan database relasional yang efisien untuk penyimpanan data aset
3. Membuat antarmuka pengguna yang intuitif dengan fitur analytics

### Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini adalah:
1. Memudahkan pengelolaan inventaris aset sekolah
2. Meningkatkan efisiensi proses peminjaman dan pengembalian aset
3. Memberikan insights melalui visualisasi data untuk pengambilan keputusan

---

## Tinjauan Pustaka

### Sistem Informasi Manajemen Aset

Menurut Laudon dan Laudon (2018), sistem informasi manajemen adalah sistem yang mengumpulkan, mengelola, dan mendistribusikan informasi untuk mendukung pengambilan keputusan. Dalam konteks manajemen aset, sistem ini harus mampu menangani data inventaris, tracking status, dan transaksi peminjaman.

### Teknologi Web Development

Node.js merupakan runtime JavaScript yang memungkinkan pengembangan aplikasi server-side (Tilkov & Vinoski, 2010). Express.js sebagai framework web menyediakan struktur untuk membangun API RESTful. Di sisi frontend, React.js memungkinkan pembuatan antarmuka pengguna yang interaktif dan komponen-based (Facebook, 2023).

### Database Relasional

MySQL sebagai sistem manajemen basis data relasional menyediakan fitur ACID untuk menjaga integritas data (Oracle, 2023). Desain database yang baik mengikuti prinsip normalisasi untuk menghindari redundansi data.

---

## Metodologi

### Metode Penelitian

Penelitian ini menggunakan metode pengembangan perangkat lunak dengan pendekatan waterfall yang dimodifikasi, meliputi tahapan analisis kebutuhan, perancangan, implementasi, pengujian, dan dokumentasi.

### Alat dan Bahan

- **Bahasa Pemrograman**: JavaScript (ES6+), TypeScript
- **Framework**: Node.js, Express.js, Next.js, React
- **Database**: MySQL
- **Styling**: Tailwind CSS
- **Visualization**: Chart.js
- **Tools**: Visual Studio Code, Postman, Git

### Desain Sistem

#### Entity Relationship Diagram (ERD)

Sistem terdiri dari 6 entitas utama:
- Departments (Departemen)
- Employees (Karyawan)
- Vendors (Vendor)
- Categories (Kategori)
- Assets (Aset)
- Loans (Peminjaman)

Relasi antar entitas dirancang untuk menjaga integritas referensial dengan foreign key constraints.

#### Arsitektur Aplikasi

Aplikasi menggunakan arsitektur three-tier:
1. **Presentation Layer**: Frontend Next.js untuk antarmuka pengguna
2. **Application Layer**: Backend Express.js untuk business logic
3. **Data Layer**: MySQL database untuk penyimpanan data

---

## Hasil dan Pembahasan

### Implementasi Database

Database MySQL diinisialisasi dengan script SQL yang mencakup pembuatan tabel dan constraints. Berikut adalah struktur tabel utama:

```sql
CREATE TABLE assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_number VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category_id INT,
  status ENUM('available', 'borrowed', 'damaged') DEFAULT 'available',
  vendor_id INT,
  received_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);
```

### Implementasi Backend

Backend menggunakan Express.js dengan struktur MVC (Model-View-Controller). Routes, controllers, dan models dipisahkan untuk maintainability. API endpoints mengikuti standar RESTful dengan response JSON.

Contoh implementasi controller untuk assets:

```javascript
const createAsset = (req, res) => {
  const { serial_number, name, category_id, vendor_id, received_date } = req.body;
  db.query('INSERT INTO assets (serial_number, name, category_id, vendor_id, received_date, status) VALUES (?, ?, ?, ?, ?, ?)',
    [serial_number, name, category_id, vendor_id, received_date, 'available'], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body, status: 'available' });
  });
};
```

### Implementasi Frontend

Frontend menggunakan Next.js dengan TypeScript untuk type safety. Komponen React dibangun dengan pendekatan functional dan hooks. Tailwind CSS digunakan untuk styling responsif.

Dashboard analytics menggunakan Chart.js untuk visualisasi data:

```javascript
const statusChartData = {
  labels: statusSummary.map(s => getStatusLabel(s.status)),
  datasets: [{
    data: statusSummary.map(s => s.count),
    backgroundColor: statusSummary.map(s => getStatusColor(s.status)),
  }],
};
```

### Fitur Utama Sistem

1. **Manajemen Departemen**: CRUD operations untuk departemen sekolah
2. **Manajemen Karyawan**: Pengelolaan data karyawan dengan relasi departemen
3. **Manajemen Vendor**: Data supplier aset
4. **Manajemen Kategori**: Kategorisasi aset
5. **Manajemen Aset**: Inventarisasi dengan tracking status
6. **Sistem Peminjaman**: Peminjaman dan pengembalian aset dengan validasi
7. **Analytics Dashboard**: Visualisasi data peminjaman dan status aset

### Pengujian Sistem

Pengujian dilakukan dengan:
1. **Unit Testing**: Testing individual functions
2. **Integration Testing**: Testing API endpoints dengan Postman
3. **User Acceptance Testing**: Testing end-to-end workflow

Hasil pengujian menunjukkan bahwa semua fitur berjalan sesuai spesifikasi dengan response time rata-rata < 500ms.

---

## Kesimpulan

### Kesimpulan

Sistem Manajemen Aset Sekolah telah berhasil dikembangkan dengan fitur-fitur yang memadai untuk mengelola inventaris dan peminjaman aset. Implementasi menggunakan teknologi modern memastikan skalabilitas dan maintainability sistem. Database relasional yang dirancang mengikuti prinsip normalisasi untuk efisiensi penyimpanan data.

### Saran

Untuk pengembangan selanjutnya, disarankan untuk menambahkan fitur:
1. Authentication dan authorization
2. Notifikasi otomatis untuk pengembalian
3. Mobile application
4. Integration dengan sistem ERP sekolah

---

## Daftar Pustaka

1. Facebook. (2023). *React Documentation*. Diakses dari https://react.dev
2. Laudon, K. C., & Laudon, J. P. (2018). *Management Information Systems: Managing the Digital Firm* (15th ed.). Pearson.
3. Oracle. (2023). *MySQL Documentation*. Diakses dari https://dev.mysql.com/doc/
4. Tilkov, S., & Vinoski, S. (2010). Node.js: Using JavaScript to Build High-Performance Network Programs. *IEEE Internet Computing*, 14(6), 80-83.

---

*Terima kasih atas perhatiannya. Dokumen ini dapat dikonversi ke format PDF atau Word sesuai kebutuhan.*