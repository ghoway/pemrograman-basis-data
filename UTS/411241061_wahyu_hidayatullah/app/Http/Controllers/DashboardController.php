<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelanggan;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPelanggan = Pelanggan::count();
        $totalTransaksi = Transaksi::count();

        $transaksis = DB::table('t_transaksi')
            ->join('t_pelanggan', 't_transaksi.id_pelanggan', '=', 't_pelanggan.id_pelanggan')
            ->select('t_transaksi.id_transaksi', 't_pelanggan.nama_pelanggan', 't_pelanggan.email', 't_transaksi.tanggal_transaksi', 't_transaksi.total_transaksi')
            ->get();

        $pelanggans = Pelanggan::all();

        // Data for chart: transactions per month
        $chartData = DB::table('t_transaksi')
            ->selectRaw('MONTH(tanggal_transaksi) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month')
            ->toArray();

        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $chartLabels = [];
        $chartValues = [];
        foreach ($chartData as $month => $count) {
            $chartLabels[] = $months[$month - 1];
            $chartValues[] = $count;
        }

        return view('dashboard', compact('totalPelanggan', 'totalTransaksi', 'transaksis', 'pelanggans', 'chartLabels', 'chartValues'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_pelanggan' => 'required|exists:t_pelanggan,id_pelanggan',
            'tanggal_transaksi' => 'required|date',
            'total_transaksi' => 'required|numeric',
        ]);

        Transaksi::create($request->all());

        return redirect()->route('dashboard')->with('success', 'Transaksi berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $transaksi = Transaksi::findOrFail($id);

        $request->validate([
            'id_pelanggan' => 'required|exists:t_pelanggan,id_pelanggan',
            'tanggal_transaksi' => 'required|date',
            'total_transaksi' => 'required|numeric',
        ]);

        $transaksi->update($request->all());

        return redirect()->route('dashboard')->with('success', 'Transaksi berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();

        return redirect()->route('dashboard')->with('success', 'Transaksi berhasil dihapus.');
    }
}
