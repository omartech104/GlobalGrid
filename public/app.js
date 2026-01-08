// Global State Management
let state = {
    page: 1,
    limit: 10,
    status: '',
    search: '',
    data: [],
    meta: {}
};

// 1. Fetch List Data
async function fetchShipments() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '<tr><td colspan="5" class="p-10 text-center loading text-slate-400 font-medium">Connecting to GlobalGrid API...</td></tr>';

    try {
        const queryParams = new URLSearchParams({
            page: state.page,
            limit: state.limit,
            status: state.status,
            trackingNumber: state.search
        });

        const response = await fetch(`http://localhost:3000/shipments?${queryParams}`);
        const result = await response.json();

        state.data = result.data;
        state.meta = result.meta;

        renderTable();
        renderPagination();
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="5" class="p-10 text-center text-red-500 font-semibold">API connection failed. Ensure NestJS is running with CORS enabled.</td></tr>';
    }
}

// 2. Render Table Rows
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = state.data.map(item => `
        <tr>
            <td class="px-6 py-4 font-mono text-sm font-bold text-blue-600">${item.trackingNumber}</td>
            <td class="px-6 py-4">
                <div class="flex items-center gap-2 text-sm">
                    <span class="font-semibold text-slate-700">${item.origin || 'Main Port'}</span>
                    <i data-lucide="arrow-right" class="w-3 h-3 text-slate-400"></i>
                    <span class="font-semibold text-slate-700">${item.destination || 'Destination'}</span>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="status-pill status-${item.status.toLowerCase()}">${item.status}</span>
            </td>
            <td class="px-6 py-4 text-xs text-slate-500 font-medium">${new Date(item.createdAt).toLocaleDateString()}</td>
            <td class="px-6 py-4">
                <button onclick="viewDetails('${item.id}')" class="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 px-3 py-1 rounded transition-all text-xs font-bold">
                    View Details
                </button>
            </td>
        </tr>
    `).join('');
    // Refresh Lucide icons for the newly injected arrows
    lucide.createIcons();
}

// 3. View Single Shipment (Modal)
async function viewDetails(id) {
    const modal = document.getElementById('shipmentModal');
    const content = document.getElementById('modalContent');
    
    modal.classList.remove('hidden');
    content.innerHTML = '<div class="text-center py-10 loading text-blue-600 font-bold">Fetching Logistics Route...</div>';

    try {
        const response = await fetch(`http://localhost:3000/shipments/${id}`);
        const item = await response.json();

        content.innerHTML = `
            <div class="space-y-8">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Tracking</h4>
                        <p class="text-2xl font-mono font-bold text-slate-800">${item.trackingNumber}</p>
                    </div>
                    <span class="status-pill status-${item.status.toLowerCase()}">${item.status}</span>
                </div>

                <div class="relative flex justify-between items-center px-4">
                    <div class="z-10 bg-white pr-2 text-center">
                        <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                            <i data-lucide="anchor"></i>
                        </div>
                        <p class="text-[10px] text-slate-400 font-bold uppercase">Origin</p>
                        <p class="text-sm font-bold text-slate-800">${item.origin || 'Main Port'}</p>
                    </div>

                    <div class="absolute left-0 right-0 top-5 h-[2px] bg-slate-100 -z-0"></div>

                    <div class="z-10 bg-white pl-2 text-center">
                        <div class="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                            <i data-lucide="map-pin"></i>
                        </div>
                        <p class="text-[10px] text-slate-400 font-bold uppercase">Destination</p>
                        <p class="text-sm font-bold text-slate-800">${item.destination || 'Customer'}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                    <div>
                        <p class="text-xs text-slate-400 font-bold uppercase">Timestamp</p>
                        <p class="text-sm font-semibold">${new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-400 font-bold uppercase">System ID</p>
                        <p class="text-[10px] font-mono text-slate-400 truncate">${item.id}</p>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    } catch (error) {
        content.innerHTML = '<p class="text-red-500 text-center font-bold">Failed to load detailed record.</p>';
    }
}

function closeModal() { document.getElementById('shipmentModal').classList.add('hidden'); }

// 4. Pagination
function renderPagination() {
    const controls = document.getElementById('paginationControls');
    const { currentPage, totalPages, totalItems } = state.meta;
    document.getElementById('paginationInfo').innerText = `Page ${currentPage} of ${totalPages} (${totalItems} results)`;

    controls.innerHTML = `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} 
                class="px-4 py-2 border rounded-lg bg-white text-xs font-bold hover:bg-slate-50 disabled:opacity-40 transition-all">PREV</button>
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} 
                class="px-4 py-2 border rounded-lg bg-white text-xs font-bold hover:bg-slate-50 disabled:opacity-40 transition-all">NEXT</button>
    `;
}

function changePage(p) { state.page = p; fetchShipments(); }

// 5. Initializers and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    fetchShipments();

    // Filter Change
    document.getElementById('statusFilter').addEventListener('change', (e) => {
        state.status = e.target.value;
        state.page = 1;
        fetchShipments();
    });

    // Search Input with Debounce
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.search = e.target.value;
            state.page = 1;
            fetchShipments();
        }, 400);
    });
});