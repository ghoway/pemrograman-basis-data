-- Buat database
CREATE DATABASE IF NOT EXISTS 411241061_wahyu_hidayatullah;
USE 411241061_wahyu_hidayatullah;

-- Buat tabel t_pelanggan
CREATE TABLE t_pelanggan (
    id_pelanggan INT AUTO_INCREMENT PRIMARY KEY,
    nama_pelanggan VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    no_hp VARCHAR(15) NOT NULL,
    alamat VARCHAR(200) NOT NULL
);

-- Buat tabel t_transaksi
CREATE TABLE t_transaksi (
    id_transaksi INT AUTO_INCREMENT PRIMARY KEY,
    id_pelanggan INT NOT NULL,
    tanggal_transaksi DATE NOT NULL,
    total_transaksi DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pelanggan) REFERENCES t_pelanggan(id_pelanggan)
);

-- Insert data pelanggan (6 pelanggan, salah satu tanpa transaksi)
INSERT INTO t_pelanggan (nama_pelanggan, email, no_hp, alamat) VALUES
('Ahmad Rahman', 'ahmad@example.com', '081234567890', 'Jl. Sudirman No. 1, Jakarta'),
('Siti Nurhaliza', 'siti@example.com', '081234567891', 'Jl. Thamrin No. 2, Jakarta'),
('Budi Santoso', 'budi@example.com', '081234567892', 'Jl. Gatot Subroto No. 3, Jakarta'),
('Dewi Lestari', 'dewi@example.com', '081234567893', 'Jl. Malioboro No. 4, Yogyakarta'),
('Eko Prasetyo', 'eko@example.com', '081234567894', 'Jl. Malioboro No. 5, Yogyakarta'),
('Fajar Setiawan', 'fajar@example.com', '081234567895', 'Jl. Malioboro No. 6, Yogyakarta');

-- Insert data transaksi (5 transaksi, masing-masing ke pelanggan berbeda)
INSERT INTO t_transaksi (id_pelanggan, tanggal_transaksi, total_transaksi) VALUES
(1, '2023-10-01', 150000.00),
(2, '2023-10-02', 200000.00),
(3, '2023-10-03', 250000.00),
(4, '2023-10-04', 300000.00),
(5, '2023-10-05', 350000.00);

-- Tampilkan seluruh transaksi beserta nama pelanggan dan email menggunakan JOIN
SELECT t.id_transaksi, p.nama_pelanggan, p.email, t.tanggal_transaksi, t.total_transaksi
FROM t_transaksi t
JOIN t_pelanggan p ON t.id_pelanggan = p.id_pelanggan;

-- Ubah total_transaksi dari transaksi dengan id_transaksi = 2 menjadi 1.500.000
UPDATE t_transaksi SET total_transaksi = 1500000.00 WHERE id_transaksi = 2;

-- Hapus pelanggan yang belum pernah melakukan transaksi
DELETE FROM t_pelanggan WHERE id_pelanggan NOT IN (SELECT DISTINCT id_pelanggan FROM t_transaksi);