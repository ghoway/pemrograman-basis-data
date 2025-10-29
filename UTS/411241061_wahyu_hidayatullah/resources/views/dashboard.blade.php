<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>{{ config('app.name') }} - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-100">
    @include('partials.navbar')
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Dashboard</h1>

        <!-- Cards for totals -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-2">Total Jumlah Pelanggan</h2>
                <p class="text-3xl font-bold text-blue-600">{{ $totalPelanggan }}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-2">Total Jumlah Transaksi</h2>
                <p class="text-3xl font-bold text-green-600">{{ $totalTransaksi }}</p>
            </div>
        </div>

        <!-- Chart placeholder -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-xl font-semibold mb-4">Chart Transaksi</h2>
            <canvas id="transaksiChart"></canvas>
        </div>

        <!-- Table for transactions -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Daftar Transaksi</h2>
                <button onclick="openModal('create')" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah Transaksi</button>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full table-auto">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-4 py-2 text-left">ID Transaksi</th>
                            <th class="px-4 py-2 text-left">Nama Pelanggan</th>
                            <th class="px-4 py-2 text-left">Email</th>
                            <th class="px-4 py-2 text-left">Tanggal Transaksi</th>
                            <th class="px-4 py-2 text-left">Total Transaksi</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($transaksis as $transaksi)
                        <tr class="border-b">
                            <td class="px-4 py-2">{{ $transaksi->id_transaksi }}</td>
                            <td class="px-4 py-2">{{ $transaksi->nama_pelanggan }}</td>
                            <td class="px-4 py-2">{{ $transaksi->email }}</td>
                            <td class="px-4 py-2">{{ $transaksi->tanggal_transaksi }}</td>
                            <td class="px-4 py-2">Rp {{ number_format($transaksi->total_transaksi, 0, ',', '.') }}</td>
                            <td class="px-4 py-2">
                                <button onclick="openModal('edit', {{ $transaksi->id_transaksi }}, '{{ $transaksi->nama_pelanggan }}', '{{ $transaksi->email }}', '{{ $transaksi->tanggal_transaksi }}', {{ $transaksi->total_transaksi }})" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onclick="openDeleteModal({{ $transaksi->id_transaksi }})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal for Create/Edit -->
        <div id="modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto h-full w-full hidden z-50">
            <div class="relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <h3 class="text-lg font-medium text-gray-900" id="modal-title">Tambah Transaksi</h3>
                    <form id="transaksi-form" method="POST" class="mt-4">
                        @csrf
                        <input type="hidden" name="_method" id="method" value="POST">
                        <input type="hidden" name="id" id="transaksi-id">
                        <div class="mb-4">
                            <label class="block text-left">Pelanggan</label>
                            <select name="id_pelanggan" id="id_pelanggan" class="w-full px-3 py-2 border rounded">
                                @foreach($pelanggans as $pelanggan)
                                <option value="{{ $pelanggan->id_pelanggan }}">{{ $pelanggan->nama_pelanggan }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-left">Tanggal Transaksi</label>
                            <input type="date" name="tanggal_transaksi" id="tanggal_transaksi" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-left">Total Transaksi</label>
                            <input type="number" step="0.01" name="total_transaksi" id="total_transaksi" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <div class="flex justify-end">
                            <button type="button" onclick="closeModal('modal')" class="mr-2 px-4 py-2 bg-gray-300 rounded">Tutup</button>
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Modal for Delete Confirmation -->
        <div id="delete-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto h-full w-full hidden z-50">
            <div class="relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <h3 class="text-lg font-medium text-gray-900">Konfirmasi Hapus</h3>
                    <p class="text-sm text-gray-500 mt-2">Apakah Anda yakin ingin menghapus transaksi ini?</p>
                    <form id="delete-form" method="POST" class="mt-4">
                        @csrf
                        @method('DELETE')
                        <div class="flex justify-end">
                            <button type="button" onclick="closeModal('delete-modal')" class="mr-2 px-4 py-2 bg-gray-300 rounded">Tutup</button>
                            <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded">Hapus</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Success Modal -->
        <div id="success-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto h-full w-full hidden z-50">
            <div class="relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <h3 class="text-lg font-medium text-gray-900" id="success-modal-title">Berhasil</h3>
                    <div id="success-modal-content"></div>
                    <div class="flex justify-end mt-4">
                        <button type="button" onclick="closeModal('success-modal')" class="px-4 py-2 bg-blue-500 text-white rounded">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Chart example with real data
        const ctx = document.getElementById('transaksiChart').getContext('2d');
        const transaksiChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: @json($chartLabels),
                datasets: [{
                    label: 'Transaksi',
                    data: @json($chartValues),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Modal functions
        function openModal(type, id = null, nama = '', email = '', tanggal = '', total = '') {
            const modal = document.getElementById('modal');
            const form = document.getElementById('transaksi-form');
            const title = document.getElementById('modal-title');
            const method = document.getElementById('method');
            const transaksiId = document.getElementById('transaksi-id');

            if (type === 'create') {
                title.textContent = 'Tambah Transaksi';
                form.action = '{{ route("dashboard.store") }}';
                method.value = 'POST';
                transaksiId.value = '';
                document.getElementById('id_pelanggan').value = '';
                document.getElementById('tanggal_transaksi').value = '';
                document.getElementById('total_transaksi').value = '';
            } else {
                title.textContent = 'Edit Transaksi';
                form.action = '{{ route("dashboard.update", ":id") }}'.replace(':id', id);
                method.value = 'PUT';
                transaksiId.value = id;
                // Set values based on parameters
                document.getElementById('tanggal_transaksi').value = tanggal;
                document.getElementById('total_transaksi').value = total;
                // For pelanggan, need to find id from nama
                const select = document.getElementById('id_pelanggan');
                for (let option of select.options) {
                    if (option.text === nama) {
                        option.selected = true;
                        break;
                    }
                }
            }
            modal.classList.remove('hidden');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
        }

        function openDeleteModal(id) {
            const modal = document.getElementById('delete-modal');
            const form = document.getElementById('delete-form');
            form.action = '{{ route("dashboard.destroy", ":id") }}'.replace(':id', id);
            modal.classList.remove('hidden');
        }

        function closeDeleteModal() {
            document.getElementById('delete-modal').classList.add('hidden');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
        }

        // Close modal on ESC key or click outside
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeAllModals();
            }
        });

        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('bg-gray-600')) {
                closeAllModals();
            }
        });

        function closeAllModals() {
            const modals = ['modal', 'delete-modal', 'success-modal'];
            modals.forEach(id => {
                const modal = document.getElementById(id);
                if (modal && !modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            });
        }

        // Show success message if any
        @if(session('success'))
            document.getElementById('success-modal-content').innerHTML = '{{ session("success") }}';
            document.getElementById('success-modal').classList.remove('hidden');
        @endif
    </script>
</body>
</html>