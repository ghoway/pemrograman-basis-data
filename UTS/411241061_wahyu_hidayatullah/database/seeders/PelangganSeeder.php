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
        Pelanggan::insert([
            [
                'nama_pelanggan' => 'Kamaria Utami',
                'email' => 'kamaria.utami1991@mail.com',
                'no_hp' => '089641055828',
                'alamat' => 'Jl. Moch. Yamin No. 789, Metro Lampung',
            ],
            [
                'nama_pelanggan' => 'Gawati Hastuti',
                'email' => 'gawati.hastuti1986@mail.com',
                'no_hp' => '085895321686',
                'alamat' => 'Jl. Jend. A. Yani No. 787, Bekasi',
            ],
            [
                'nama_pelanggan' => 'Lasmono Samosir',
                'email' => 'lasmono.samosir1994@mail.com',
                'no_hp' => '085939322139',
                'alamat' => 'Jl. Ki. Sutarto No. 128, Yogyakarta',
            ],
            [
                'nama_pelanggan' => 'Dedi Setiawan',
                'email' => 'dedi.setiawan1982@mail.com',
                'no_hp' => '087860062457',
                'alamat' => 'Gg. Pelajar Pejuang 45, Probolinggo',
            ],
            [
                'nama_pelanggan' => 'Zulaikha Riyanti',
                'email' => 'zulaikha.riyanti2000@mail.com',
                'no_hp' => '081252522404',
                'alamat' => 'Jl. Tubagus Ismail No. 89, Surakarta',
            ],
            [
                'nama_pelanggan' => 'Ella Fujiati',
                'email' => 'fajella.fujiati2001@mail.com',
                'no_hp' => '081237235964',
                'alamat' => 'Jl. Transad No. 61, Surabaya',
            ],
        ]);
    }
}
