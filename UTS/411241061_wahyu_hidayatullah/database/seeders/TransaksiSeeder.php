<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaksi;

class TransaksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaksi::create([
            'id_pelanggan' => 1,
            'tanggal_transaksi' => '2023-10-01',
            'total_transaksi' => 150000.00,
        ]);

        Transaksi::create([
            'id_pelanggan' => 2,
            'tanggal_transaksi' => '2023-10-02',
            'total_transaksi' => 200000.00,
        ]);

        Transaksi::create([
            'id_pelanggan' => 3,
            'tanggal_transaksi' => '2023-10-03',
            'total_transaksi' => 250000.00,
        ]);

        Transaksi::create([
            'id_pelanggan' => 4,
            'tanggal_transaksi' => '2023-10-04',
            'total_transaksi' => 300000.00,
        ]);

        Transaksi::create([
            'id_pelanggan' => 5,
            'tanggal_transaksi' => '2023-10-05',
            'total_transaksi' => 350000.00,
        ]);
    }
}
