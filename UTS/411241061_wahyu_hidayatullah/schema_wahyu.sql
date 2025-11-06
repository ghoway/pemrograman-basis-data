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

INSERT INTO t_pelanggan (nama_pelanggan, email, no_hp, alamat) VALUES
('Kamaria Utami', 'kamaria.utami1991@mail.com', '089641055828', 'Jl. Moch. Yamin No. 789, Metro Lampung'),
('Gawati Hastuti', 'gawati.hastuti1986@mail.com', '085895321686', 'Jl. Jend. A. Yani No. 787, Bekasi'),
('Lasmono Samosir', 'lasmono.samosir1994@mail.com', '085939322139', 'Jl. Ki. Sutarto No. 128, Yogyakarta'),
('Dedi Setiawan', 'dedi.setiawan1982@mail.com', '087860062457', 'Gg. Pelajar Pejuang 45, Probolinggo'),
('Zulaikha Riyanti', 'zulaikha.riyanti2000@mail.com', '081252522404', 'Jl. Tubagus Ismail No. 89, Surakarta'),
('Ella Fujiati', 'fajella.fujiati2001@mail.com', '081237235964', 'Jl. Transad No. 61, Surabaya');

INSERT INTO t_transaksi (id_pelanggan, tanggal_transaksi, total_transaksi) VALUES
(1, '2025-05-04', 1200000.00),
(2, '2025-05-10', 2000000.00),
(3, '2025-06-15', 1750000.00),
(4, '2025-06-22', 3000000.00),
(5, '2025-06-24', 2250000.00);

SELECT t.id_transaksi, p.nama_pelanggan, p.email, t.tanggal_transaksi, t.total_transaksi
FROM t_transaksi t
JOIN t_pelanggan p ON t.id_pelanggan = p.id_pelanggan;

UPDATE t_transaksi SET total_transaksi = 1500000.00 WHERE id_transaksi = 2;

DELETE FROM t_pelanggan WHERE id_pelanggan NOT IN (SELECT DISTINCT id_pelanggan FROM t_transaksi);