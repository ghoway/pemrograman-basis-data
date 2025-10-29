<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>{{ config('app.name') }} - Daftar Pelanggan</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    @include('partials.navbar')
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">Daftar Pelanggan</h1>
            <button onclick="openCreateModal()" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah Pelanggan</button>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="overflow-x-auto">
                <table class="min-w-full table-auto">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-4 py-2 text-left">ID</th>
                            <th class="px-4 py-2 text-left">Nama</th>
                            <th class="px-4 py-2 text-left">Email</th>
                            <th class="px-4 py-2 text-left">No HP</th>
                            <th class="px-4 py-2 text-left">Alamat</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pelanggans as $pelanggan)
                        <tr class="border-b">
                            <td class="px-4 py-2">{{ $pelanggan->id_pelanggan }}</td>
                            <td class="px-4 py-2">{{ $pelanggan->nama_pelanggan }}</td>
                            <td class="px-4 py-2">{{ $pelanggan->email }}</td>
                            <td class="px-4 py-2">{{ $pelanggan->no_hp }}</td>
                            <td class="px-4 py-2">{{ $pelanggan->alamat }}</td>
                            <td class="px-4 py-2">
                                <button onclick="openViewModal({{ $pelanggan->id_pelanggan }}, '{{ $pelanggan->nama_pelanggan }}', '{{ $pelanggan->email }}', '{{ $pelanggan->telepon }}', '{{ $pelanggan->alamat }}')" class="bg-green-500 text-white px-2 py-1 rounded mr-2">View</button>
                                <button onclick="openEditModal({{ $pelanggan->id_pelanggan }}, '{{ $pelanggan->nama_pelanggan }}', '{{ $pelanggan->email }}', '{{ $pelanggan->telepon }}', '{{ $pelanggan->alamat }}')" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onclick="openDeleteModal({{ $pelanggan->id_pelanggan }})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <div class="mt-4">
            <a href="{{ route('dashboard') }}" class="bg-gray-500 text-white px-4 py-2 rounded">Kembali ke Dashboard</a>
        </div>
    </div>

    @include('partials.modal', ['modalId' => 'createModal', 'modalTitle' => 'Tambah Pelanggan'])
    @include('partials.modal', ['modalId' => 'viewModal', 'modalTitle' => 'Detail Pelanggan'])
    @include('partials.modal', ['modalId' => 'editModal', 'modalTitle' => 'Edit Pelanggan'])
    @include('partials.modal', ['modalId' => 'deleteModal', 'modalTitle' => 'Konfirmasi Hapus'])
    @include('partials.modal', ['modalId' => 'successModal', 'modalTitle' => 'Berhasil'])

    <script>
        function openCreateModal() {
            const content = `
                <form id="createForm" method="POST" action="{{ route('pelanggan.store') }}">
                    @csrf
                    <div class="mb-4">
                        <label class="block text-left">Nama Pelanggan</label>
                        <input type="text" name="nama_pelanggan" class="w-full px-3 py-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-left">Email</label>
                        <input type="email" name="email" class="w-full px-3 py-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-left">No HP</label>
                        <input type="text" name="no_hp" class="w-full px-3 py-2 border rounded">
                    </div>
                    <div class="mb-4">
                        <label class="block text-left">Alamat</label>
                        <textarea name="alamat" class="w-full px-3 py-2 border rounded"></textarea>
                    </div>
                </form>
            `;
            const footer = '<button type="submit" form="createForm" class="px-4 py-2 bg-blue-500 text-white rounded">Simpan</button>';
            openModal('createModal', 'Tambah Pelanggan', content, footer);
        }

        function openViewModal(id, nama, email, telepon, alamat) {
            const content = `
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Nama:</strong> ${nama}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>No HP:</strong> ${telepon}</p>
                <p><strong>Alamat:</strong> ${alamat}</p>
            `;
            openModal('viewModal', 'Detail Pelanggan', content);
        }

        function openEditModal(id, nama, email, telepon, alamat) {
            const content = `
                <form id="editForm" method="POST" action="/pelanggan/${id}">
                    @csrf
                    @method('PUT')
                    <div class="mb-4">
                        <label class="block text-left">Nama Pelanggan</label>
                        <input type="text" name="nama_pelanggan" value="${nama}" class="w-full px-3 py-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-left">Email</label>
                        <input type="email" name="email" value="${email}" class="w-full px-3 py-2 border rounded" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-left">No HP</label>
                        <input type="text" name="no_hp" value="${telepon}" class="w-full px-3 py-2 border rounded">
                    </div>
                    <div class="mb-4">
                        <label class="block text-left">Alamat</label>
                        <textarea name="alamat" class="w-full px-3 py-2 border rounded">${alamat}</textarea>
                    </div>
                </form>
            `;
            const footer = '<button type="submit" form="editForm" class="px-4 py-2 bg-blue-500 text-white rounded">Update</button>';
            openModal('editModal', 'Edit Pelanggan', content, footer);
        }

        function openDeleteModal(id) {
            const content = '<p>Apakah Anda yakin ingin menghapus pelanggan ini?</p>';
            const footer = `
                <form id="deleteForm" method="POST" action="/pelanggan/${id}">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded">Hapus</button>
                </form>
            `;
            openModal('deleteModal', 'Konfirmasi Hapus', content, footer);
        }

        // Show success message if any
        @if(session('success'))
            openModal('successModal', 'Berhasil', '{{ session("success") }}');
        @endif

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
            const modals = ['createModal', 'viewModal', 'editModal', 'deleteModal', 'successModal'];
            modals.forEach(id => {
                const modal = document.getElementById(id);
                if (modal && !modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            });
        }
    </script>
</body>
</html>