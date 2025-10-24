<!-- Modal -->
<div id="{{ $modalId ?? 'modal' }}" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto h-full w-full hidden z-50">
    <div class="relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4" id="{{ $modalId ?? 'modal' }}-title">{{ $modalTitle ?? 'Modal Title' }}</h3>
            <div id="{{ $modalId ?? 'modal' }}-content">
                {{ $modalContent ?? '' }}
            </div>
            <div class="flex justify-end mt-4">
                <button type="button" onclick="closeModal('{{ $modalId ?? 'modal' }}')" class="mr-2 px-4 py-2 bg-gray-300 rounded">Tutup</button>
                {!! $modalFooter ?? '' !!}
            </div>
        </div>
    </div>
</div>

<script>
function openModal(modalId, title = '', content = '', footer = '') {
    const modal = document.getElementById(modalId);
    if (title) document.getElementById(modalId + '-title').textContent = title;
    if (content) document.getElementById(modalId + '-content').innerHTML = content;
    if (footer) {
        const footerDiv = modal.querySelector('.flex.justify-end');
        footerDiv.innerHTML = '<button type="button" onclick="closeModal(\'' + modalId + '\')" class="mr-2 px-4 py-2 bg-gray-300 rounded">Tutup</button>' + footer;
    }
    modal.classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}
</script>