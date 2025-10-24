<nav class="bg-blue-600 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <a href="{{ url('/') }}" class="text-white font-bold text-xl">{{ config('app.name') }}</a>
        <div class="space-x-4">
            <a href="{{ route('dashboard') }}" class="text-white hover:text-gray-200">Dashboard</a>
            <a href="{{ route('pelanggan.index') }}" class="text-white hover:text-gray-200">Pelanggan</a>
        </div>
    </div>
</nav>