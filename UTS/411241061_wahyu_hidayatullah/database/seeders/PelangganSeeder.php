<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pelanggan;

class PelangganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pelanggan::create([
            'nama_pelanggan' => 'Ahmad Rahman',
            'email' => 'ahmad@example.com',
            'no_hp' => '081234567890',
            'alamat' => 'Jl. Sudirman No. 1, Jakarta',
        ]);

        Pelanggan::create([
            'nama_pelanggan' => 'Siti Nurhaliza',
            'email' => 'siti@example.com',
            'no_hp' => '081234567891',
            'alamat' => 'Jl. Thamrin No. 2, Jakarta',
        ]);

        Pelanggan::create([
            'nama_pelanggan' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'no_hp' => '081234567892',
            'alamat' => 'Jl. Gatot Subroto No. 3, Jakarta',
        ]);

        Pelanggan::create([
            'nama_pelanggan' => 'Dewi Lestari',
            'email' => 'dewi@example.com',
            'no_hp' => '081234567893',
            'alamat' => 'Jl. Malioboro No. 4, Yogyakarta',
        ]);

        Pelanggan::create([
            'nama_pelanggan' => 'Eko Prasetyo',
            'email' => 'eko@example.com',
            'no_hp' => '081234567894',
            'alamat' => 'Jl. Malioboro No. 5, Yogyakarta',
        ]);
    }
}
