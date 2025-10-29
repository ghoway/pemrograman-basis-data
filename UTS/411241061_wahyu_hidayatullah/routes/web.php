<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PelangganController;


Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::post('/', [DashboardController::class, 'store'])->name('dashboard.store');
Route::put('/{id}', [DashboardController::class, 'update'])->name('dashboard.update');
Route::delete('/{id}', [DashboardController::class, 'destroy'])->name('dashboard.destroy');
Route::get('/chart-data', [DashboardController::class, 'getChartData'])->name('dashboard.chart-data');

Route::resource('pelanggan', PelangganController::class);
