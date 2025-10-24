<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Edit Pelanggan</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    @include('partials.navbar')
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Edit Pelanggan</h1>

        <div class="bg-white p-6 rounded-lg shadow-md">
            <form action="{{ route('pelanggan.update', $pelanggan->id_pelanggan) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="mb-4">
                    <label class="block text-left">Nama Pelanggan</label>
                    <input type="text" name="nama_pelanggan" value="{{ $pelanggan->nama_pelanggan }}" class="w-full px-3 py-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <label class="block text-left">Email</label>
                    <input type="email" name="email" value="{{ $pelanggan->email }}" class="w-full px-3 py-2 border rounded" required>
                </div>
                <div class="mb-4">
                    <label class="block text-left">No HP</label>
                    <input type="text" name="no_hp" value="{{ $pelanggan->no_hp }}" class="w-full px-3 py-2 border rounded">
                </div>
                <div class="mb-4">
                    <label class="block text-left">Alamat</label>
                    <textarea name="alamat" class="w-full px-3 py-2 border rounded">{{ $pelanggan->alamat }}</textarea>
                </div>
                <div class="flex justify-end">
                    <a href="{{ route('pelanggan.index') }}" class="mr-2 px-4 py-2 bg-gray-300 rounded">Batal</a>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>