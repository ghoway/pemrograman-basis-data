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
            ->whereNull('t_transaksi.deleted_at')
            ->whereNull('t_pelanggan.deleted_at')
            ->get();

        $pelanggans = Pelanggan::all();

        // Data for chart: transactions per month
        $chartData = DB::table('t_transaksi')
            ->whereNull('deleted_at')
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

        // Data for pelanggan chart: transactions per pelanggan
        $pelangganChartData = DB::table('t_transaksi')
            ->join('t_pelanggan', 't_transaksi.id_pelanggan', '=', 't_pelanggan.id_pelanggan')
            ->whereNull('t_transaksi.deleted_at')
            ->whereNull('t_pelanggan.deleted_at')
            ->selectRaw('t_pelanggan.nama_pelanggan, COUNT(t_transaksi.id_transaksi) as count')
            ->groupBy('t_pelanggan.nama_pelanggan')
            ->orderBy('count', 'desc')
            ->pluck('count', 'nama_pelanggan')
            ->toArray();

        $pelangganChartLabels = array_keys($pelangganChartData);
        $pelangganChartValues = array_values($pelangganChartData);

        return view('dashboard', compact('totalPelanggan', 'totalTransaksi', 'transaksis', 'pelanggans', 'chartLabels', 'chartValues', 'pelangganChartLabels', 'pelangganChartValues'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_pelanggan' => 'required|exists:t_pelanggan,id_pelanggan',
            'tanggal_transaksi' => 'required|date',
            'total_transaksi' => 'required|numeric|min:1',
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
            'total_transaksi' => 'required|numeric|min:1',
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

    public function getChartData(Request $request)
    {
        $type = $request->query('type');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = DB::table('t_transaksi')->whereNull('deleted_at');

        if ($startDate && $endDate) {
            $query->whereBetween('tanggal_transaksi', [$startDate, $endDate]);
        }

        if ($type === 'transaksi') {
            $chartData = $query->selectRaw('MONTH(tanggal_transaksi) as month, COUNT(*) as count')
                ->groupBy('month')
                ->orderBy('month')
                ->pluck('count', 'month')
                ->toArray();

            $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            $labels = [];
            $values = [];
            foreach ($chartData as $month => $count) {
                $labels[] = $months[$month - 1];
                $values[] = $count;
            }
        } else        if ($type === 'pelanggan') {
            $chartData = $query->join('t_pelanggan', 't_transaksi.id_pelanggan', '=', 't_pelanggan.id_pelanggan')
                ->whereNull('t_pelanggan.deleted_at')
                ->selectRaw('t_pelanggan.nama_pelanggan, COUNT(t_transaksi.id_transaksi) as count')
                ->groupBy('t_pelanggan.nama_pelanggan')
                ->orderBy('count', 'desc')
                ->pluck('count', 'nama_pelanggan')
                ->toArray();

            $labels = array_keys($chartData);
            $values = array_values($chartData);
        }

        return response()->json(['labels' => $labels, 'values' => $values]);
    }
}
