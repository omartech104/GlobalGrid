// Current state of our dashboard
let state = {
    page: 1,
    limit: 10,
    status: '',
    search: '',
    data: [],
    meta: {}
};

async function fetchShipments() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '<tr><td colspan="4" class="p-10 text-center loading">Loading shipments...</td></tr>';

    try {
        // Constructing the URL with our Pagination DTO parameters
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
        tableBody.innerHTML = '<tr><td colspan="4" class="p-10 text-center text-red-500 text-sm">Error connecting to NestJS API. Check console.</td></tr>';
    }
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = state.data.map(item => `
        <tr>
            <td class="px-6 py-4 font-mono text-sm font-medium">${item.trackingNumber}</td>
            <td class="px-6 py-4">
                <span class="status-pill status-${item.status.toLowerCase()}">${item.status}</span>
            </td>
            <td class="px-6 py-4 text-sm text-slate-500">${new Date(item.createdAt).toLocaleDateString()}</td>
            <td class="px-6 py-4">
                <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">Details</button>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const controls = document.getElementById('paginationControls');
    const info = document.getElementById('paginationInfo');
    const { currentPage, totalPages, totalItems } = state.meta;

    info.innerText = `Page ${currentPage} of ${totalPages} (${totalItems} total items)`;

    controls.innerHTML = `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} 
                class="px-3 py-1 border rounded bg-white hover:bg-slate-50 disabled:opacity-50">Prev</button>
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} 
                class="px-3 py-1 border rounded bg-white hover:bg-slate-50 disabled:opacity-50">Next</button>
    `;
}

function changePage(newPage) {
    state.page = newPage;
    fetchShipments();
}

// Initializing Icons and Data
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    fetchShipments();
    
    // Event Listeners for Filters
    document.getElementById('statusFilter').addEventListener('change', (e) => {
        state.status = e.target.value;
        state.page = 1; // Reset to page 1 on filter
        fetchShipments();
    });
});