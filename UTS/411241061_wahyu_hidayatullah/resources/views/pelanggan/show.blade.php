<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Detail Pelanggan</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    @include('partials.navbar')
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Detail Pelanggan</h1>

        <div class="bg-white p-6 rounded-lg shadow-md">
            <p><strong>ID:</strong> {{ $pelanggan->id_pelanggan }}</p>
            <p><strong>Nama:</strong> {{ $pelanggan->nama_pelanggan }}</p>
            <p><strong>Email:</strong> {{ $pelanggan->email }}</p>
            <p><strong>No HP:</strong> {{ $pelanggan->no_hp }}</p>
            <p><strong>Alamat:</strong> {{ $pelanggan->alamat }}</p>
            <div class="mt-4">
                <a href="{{ route('pelanggan.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded">Kembali</a>
            </div>
        </div>
    </div>
</body>
</html>