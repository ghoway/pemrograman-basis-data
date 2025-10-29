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
        Transaksi::insert([
            [
                'id_pelanggan' => 1,
                'tanggal_transaksi' => '2025-05-04',
                'total_transaksi' => 1200000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pelanggan' => 2,
                'tanggal_transaksi' => '2025-05-10',
                'total_transaksi' => 2500000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pelanggan' => 3,
                'tanggal_transaksi' => '2025-06-15',
                'total_transaksi' => 1750000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pelanggan' => 4,
                'tanggal_transaksi' => '2025-06-22',
                'total_transaksi' => 3000000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pelanggan' => 5,
                'tanggal_transaksi' => '2025-06-24',
                'total_transaksi' => 2250000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
