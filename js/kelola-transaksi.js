document.addEventListener('DOMContentLoaded', function () {
    const transactionsTableBody = document.getElementById('transactions-table-body');
    const transactionModal = document.getElementById('transaction-modal');
    const closeModalSpans = document.querySelectorAll('.modal .close, #close-detail-btn');
    const printInvoiceBtn = document.getElementById('print-invoice-btn');
    const adminTransactionSearch = document.getElementById('admin-transaction-search');
    const searchButton = document.querySelector('.search-container button[type="submit"]');

    const paginationInfo = document.querySelector('.pagination-info');
    const paginationButtonsContainer = document.querySelector('.pagination-buttons');

    // Updated Sample Transaction Data based on your products
    let allTransactions = [
        {
            id: 'INV-20250501',
            customer: 'Pengguna 1',
            email: 'user1@example.com',
            phone: '081234567890',
            date: '2025-05-01',
            paymentMethod: 'Transfer Bank',
            items: [
                { name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 },
                { name: 'Notebook Premium A5', price: 45000, quantity: 2 }
            ],
            shippingAddress: 'Jl. Kos Indah No. 123',
            shippingCity: 'Surabaya Timur',
            shippingZip: '60115',
            shippingCost: 15000,
            status: 'Lunas'
        },
        {
            id: 'INV-20250502',
            customer: 'Pelanggan Setia',
            email: 'setia@example.com',
            phone: '081234567891',
            date: '2025-05-02',
            paymentMethod: 'GoPay',
            items: [
                { name: 'USB Flash Drive 32GB', price: 85000, quantity: 1 }
            ],
            shippingAddress: 'Jl. Merdeka No. 1',
            shippingCity: 'Jakarta Pusat',
            shippingZip: '10110',
            shippingCost: 20000,
            status: 'Pending'
        },
        {
            id: 'INV-20250503',
            customer: 'User Test Tiga',
            email: 'test3@example.com',
            phone: '081234567892',
            date: '2025-05-03',
            paymentMethod: 'Kartu Kredit',
            items: [
                { name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 },
                { name: 'USB Flash Drive 32GB', price: 85000, quantity: 2 }
            ],
            shippingAddress: 'Jl. Pahlawan No. 45',
            shippingCity: 'Bandung',
            shippingZip: '40111',
            shippingCost: 18000,
            status: 'Dibatalkan'
        },
        // Add more transactions using the provided products or variations
        {
            id: 'INV-20250504', customer: 'Pelanggan A', date: '2025-05-04', paymentMethod: 'OVO',
            items: [{ name: 'Notebook Premium A5', price: 45000, quantity: 3 }],
            shippingCost: 10000, status: 'Lunas', email: 'pa@example.com', phone: '081...',
            shippingAddress: 'Jl. A', shippingCity: 'Kota A', shippingZip: '123'
        },
        {
            id: 'INV-20250505', customer: 'Pelanggan B', date: '2025-05-05', paymentMethod: 'Transfer Bank',
            items: [
                { name: 'USB Flash Drive 32GB', price: 85000, quantity: 1 },
                { name: 'Notebook Premium A5', price: 45000, quantity: 1 }
            ],
            shippingCost: 12000, status: 'Pending', email: 'pb@example.com', phone: '082...',
            shippingAddress: 'Jl. B', shippingCity: 'Kota B', shippingZip: '124'
        },
        {
            id: 'INV-20250506', customer: 'Pelanggan C', date: '2025-05-06', paymentMethod: 'GoPay',
            items: [{ name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 }],
            shippingCost: 15000, status: 'Lunas', email: 'pc@example.com', phone: '083...',
            shippingAddress: 'Jl. C', shippingCity: 'Kota C', shippingZip: '125'
        },
        {
            id: 'INV-20250507', customer: 'Pelanggan D', date: '2025-05-07', paymentMethod: 'Kartu Kredit',
            items: [{ name: 'Notebook Premium A5', price: 45000, quantity: 5 }],
            shippingCost: 8000, status: 'Dibatalkan', email: 'pd@example.com', phone: '084...',
            shippingAddress: 'Jl. D', shippingCity: 'Kota D', shippingZip: '126'
        },
        {
            id: 'INV-20250508', customer: 'Pelanggan E', date: '2025-05-08', paymentMethod: 'OVO',
            items: [{ name: 'USB Flash Drive 32GB', price: 85000, quantity: 2 }],
            shippingCost: 20000, status: 'Lunas', email: 'pe@example.com', phone: '085...',
            shippingAddress: 'Jl. E', shippingCity: 'Kota E', shippingZip: '127'
        },
        {
            id: 'INV-20250509', customer: 'Pelanggan F', date: '2025-05-09', paymentMethod: 'Transfer Bank',
            items: [
                { name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 },
                { name: 'Notebook Premium A5', price: 45000, quantity: 1 },
                { name: 'USB Flash Drive 32GB', price: 85000, quantity: 1 }
            ],
            shippingCost: 10000, status: 'Pending', email: 'pf@example.com', phone: '086...',
            shippingAddress: 'Jl. F', shippingCity: 'Kota F', shippingZip: '128'
        },
        {
            id: 'INV-20250510', customer: 'Pelanggan G', date: '2025-05-10', paymentMethod: 'GoPay',
            items: [{ name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 2 }],
            shippingCost: 25000, status: 'Lunas', email: 'pg@example.com', phone: '087...',
            shippingAddress: 'Jl. G', shippingCity: 'Kota G', shippingZip: '129'
        },
        {
            id: 'INV-20250511', customer: 'Pelanggan H', date: '2025-05-11', paymentMethod: 'Kartu Kredit',
            items: [{ name: 'Notebook Premium A5', price: 45000, quantity: 4 }],
            shippingCost: 12000, status: 'Lunas', email: 'ph@example.com', phone: '088...',
            shippingAddress: 'Jl. H', shippingCity: 'Kota H', shippingZip: '130'
        },
        {
            id: 'INV-20250512', customer: 'Pelanggan I', date: '2025-05-12', paymentMethod: 'OVO',
            items: [{ name: 'USB Flash Drive 32GB', price: 85000, quantity: 3 }],
            shippingCost: 15000, status: 'Pending', email: 'pi@example.com', phone: '089...',
            shippingAddress: 'Jl. I', shippingCity: 'Kota I', shippingZip: '131'
        },
        {
            id: 'INV-20250513', customer: 'Pelanggan J', date: '2025-05-13', paymentMethod: 'Transfer Bank',
            items: [{ name: 'Notebook Premium A5', price: 45000, quantity: 1 }],
            shippingCost: 10000, status: 'Dibatalkan', email: 'pj@example.com', phone: '0810...',
            shippingAddress: 'Jl. J', shippingCity: 'Kota J', shippingZip: '132'
        },
        {
            id: 'INV-20250514', customer: 'Pelanggan K', date: '2025-05-14', paymentMethod: 'GoPay',
            items: [
                { name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 },
                { name: 'USB Flash Drive 32GB', price: 85000, quantity: 1 }
            ],
            shippingCost: 18000, status: 'Lunas', email: 'pk@example.com', phone: '0811...',
            shippingAddress: 'Jl. K', shippingCity: 'Kota K', shippingZip: '133'
        },
        {
            id: 'INV-20250515', customer: 'Pelanggan L', date: '2025-05-15', paymentMethod: 'Kartu Kredit',
            items: [{ name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 }],
            shippingCost: 22000, status: 'Pending', email: 'pl@example.com', phone: '0812...',
            shippingAddress: 'Jl. L', shippingCity: 'Kota L', shippingZip: '134'
        },
        {
            id: 'INV-20250516', customer: 'Pelanggan M', date: '2025-05-16', paymentMethod: 'OVO',
            items: [{ name: 'Notebook Premium A5', price: 45000, quantity: 2 }],
            shippingCost: 10000, status: 'Lunas', email: 'pm@example.com', phone: '0813...',
            shippingAddress: 'Jl. M', shippingCity: 'Kota M', shippingZip: '135'
        },
        {
            id: 'INV-20250517', customer: 'Pelanggan N', date: '2025-05-17', paymentMethod: 'Transfer Bank',
            items: [{ name: 'USB Flash Drive 32GB', price: 85000, quantity: 1 }],
            shippingCost: 13000, status: 'Dibatalkan', email: 'pn@example.com', phone: '0814...',
            shippingAddress: 'Jl. N', shippingCity: 'Kota N', shippingZip: '136'
        },
        {
            id: 'INV-20250518', customer: 'Pelanggan O', date: '2025-05-18', paymentMethod: 'GoPay',
            items: [{ name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 }],
            shippingCost: 10000, status: 'Lunas', email: 'po@example.com', phone: '0815...',
            shippingAddress: 'Jl. O', shippingCity: 'Kota O', shippingZip: '137'
        },
        {
            id: 'INV-20250519', customer: 'Pelanggan P', date: '2025-05-19', paymentMethod: 'Kartu Kredit',
            items: [
                { name: 'Notebook Premium A5', price: 45000, quantity: 2 },
                { name: 'USB Flash Drive 32GB', price: 85000, quantity: 1 }
            ],
            shippingCost: 30000, status: 'Pending', email: 'pp@example.com', phone: '0816...',
            shippingAddress: 'Jl. P', shippingCity: 'Kota P', shippingZip: '138'
        },
        {
            id: 'INV-20250520', customer: 'Pelanggan Q', date: '2025-05-20', paymentMethod: 'OVO',
            items: [{ name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1 }],
            shippingCost: 15000, status: 'Lunas', email: 'pq@example.com', phone: '0817...',
            shippingAddress: 'Jl. Q', shippingCity: 'Kota Q', shippingZip: '139'
        }
    ];

    let filteredTransactions = [...allTransactions];
    let currentPage = 1;
    const itemsPerPage = 10;

    function formatCurrency(amount) {
        return 'Rp ' + amount.toLocaleString('id-ID');
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    function getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'lunas': return 'status-paid';
            case 'pending': return 'status-pending';
            case 'dibatalkan': return 'status-cancelled';
            default: return '';
        }
    }

    function renderTransactions() {
        if (!transactionsTableBody) return;
        transactionsTableBody.innerHTML = ''; // Clear existing rows

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const transactionsToRender = filteredTransactions.slice(startIndex, endIndex);

        if (transactionsToRender.length === 0 && filteredTransactions.length > 0) {
             // If current page is empty due to filtering, reset to page 1
            currentPage = 1;
            renderTransactions(); // Re-render with page 1
            return;
        }
         if (transactionsToRender.length === 0 && filteredTransactions.length === 0) {
            transactionsTableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Tidak ada transaksi ditemukan.</td></tr>';
        }


        transactionsToRender.forEach(transaction => {
            const row = transactionsTableBody.insertRow();
            const totalItemsAmount = transaction.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const grandTotal = totalItemsAmount + transaction.shippingCost;

            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.customer}</td>
                <td>${formatDate(transaction.date)}</td>
                <td>${transaction.paymentMethod}</td>
                <td>${transaction.items.length} item${transaction.items.length > 1 ? 's' : ''}</td>
                <td>${formatCurrency(grandTotal)}</td>
                <td><span class="status ${getStatusClass(transaction.status)}">${transaction.status}</span></td>
                <td>
                    <button class="action-btn detail-btn" data-id="${transaction.id}"><i class="fas fa-eye"></i> Detail</button>
                    <button class="action-btn delete-btn" data-id="${transaction.id}"><i class="fas fa-trash"></i> Hapus</button>
                </td>
            `;
        });
        addTableButtonListeners();
        updatePagination();
    }

    function addTableButtonListeners() {
        const detailButtons = transactionsTableBody.querySelectorAll('.detail-btn');
        const deleteButtons = transactionsTableBody.querySelectorAll('.delete-btn');

        detailButtons.forEach(button => {
            button.addEventListener('click', function () {
                const transactionId = this.dataset.id;
                openTransactionModal(transactionId);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const transactionId = this.dataset.id;
                if (confirm(`Apakah Anda yakin ingin menghapus transaksi ${transactionId}?`)) {
                    // Placeholder for actual delete logic
                    console.log(`Menghapus transaksi ${transactionId}`);
                    // For demo: remove from allTransactions and re-render
                    allTransactions = allTransactions.filter(t => t.id !== transactionId);
                    applySearchFilter(); // This will re-filter and re-render
                }
            });
        });
    }

    function openTransactionModal(transactionId) {
        const transaction = allTransactions.find(t => t.id === transactionId);
        if (!transaction || !transactionModal) return;

        // Populate Modal Header
        transactionModal.querySelector('.modal-header h2').textContent = `Detail Transaksi #${transaction.id}`;

        // Populate Customer Info
        const customerInfoDiv = transactionModal.querySelector('.detail-section:nth-child(1) .detail-info');
        customerInfoDiv.innerHTML = `
            <p><span>Nama:</span> ${transaction.customer}</p>
            <p><span>Email:</span> ${transaction.email || '-'}</p>
            <p><span>Telepon:</span> ${transaction.phone || '-'}</p>
        `;

        // Populate Shipping Info
        const shippingInfoDiv = transactionModal.querySelector('.detail-row:nth-child(1) .detail-section:nth-child(2) .detail-info');
        shippingInfoDiv.innerHTML = `
            <p><span>Alamat:</span> ${transaction.shippingAddress || '-'}</p>
            <p><span>Kota:</span> ${transaction.shippingCity || '-'}</p>
            <p><span>Kode Pos:</span> ${transaction.shippingZip || '-'}</p>
        `;
        
        // Populate Order Items
        const orderItemsTbody = transactionModal.querySelector('#order-items');
        orderItemsTbody.innerHTML = '';
        let subtotal = 0;
        transaction.items.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;
            const itemRow = orderItemsTbody.insertRow();
            itemRow.innerHTML = `
                <td>${item.name}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(itemSubtotal)}</td>
            `;
        });

        // Populate Payment Info
        const paymentInfoDiv = transactionModal.querySelector('.detail-row:nth-child(3) .detail-section:nth-child(1) .detail-info');
        paymentInfoDiv.innerHTML = `
            <p><span>Metode:</span> ${transaction.paymentMethod}</p>
            <p><span>Status:</span> <span class="status ${getStatusClass(transaction.status)}">${transaction.status}</span></p>
            <p><span>Tanggal:</span> ${formatDate(transaction.date)}</p>
        `;

        // Populate Cost Summary
        const summaryDiv = transactionModal.querySelector('.detail-section .summary');
        const grandTotal = subtotal + transaction.shippingCost;
        summaryDiv.innerHTML = `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Pengiriman:</span>
                <span>${formatCurrency(transaction.shippingCost)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>${formatCurrency(grandTotal)}</span>
            </div>
        `;

        transactionModal.style.display = 'block';
    }

    function closeTransactionModal() {
        if (transactionModal) {
            transactionModal.style.display = 'none';
        }
    }

    closeModalSpans.forEach(span => {
        span.addEventListener('click', closeTransactionModal);
    });

    window.addEventListener('click', function (event) {
        if (event.target === transactionModal) {
            closeTransactionModal();
        }
    });

    if (printInvoiceBtn) {
        printInvoiceBtn.addEventListener('click', function () {
            alert('Mencetak Invoice... (belum bisa hehe)');
        });
    }
    
    function updatePagination() {
        if (!paginationInfo || !paginationButtonsContainer) return;

        const totalItems = filteredTransactions.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, totalItems);

        paginationInfo.textContent = `Menampilkan ${startItem}-${endItem} dari ${totalItems} transaksi`;

        paginationButtonsContainer.innerHTML = ''; 

        const prevButton = document.createElement('button');
        prevButton.classList.add('pagination-btn');
        prevButton.textContent = 'Sebelumnya';
        if (currentPage === 1) {
            prevButton.classList.add('disabled');
            prevButton.disabled = true;
        }
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTransactions();
            }
        });
        paginationButtonsContainer.appendChild(prevButton);

        let ellipsisStartShown = false;
        let ellipsisEndShown = false;

        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 5) { // Apply ellipsis logic only if more than 5 pages
                if (i > 2 && i < currentPage - 1 && i !== 1) { // Ellipsis for pages before current page group
                    if (!ellipsisStartShown) {
                        const ellipsis = document.createElement('span');
                        ellipsis.classList.add('pagination-btn', 'disabled');
                        ellipsis.textContent = '...';
                        paginationButtonsContainer.appendChild(ellipsis);
                        ellipsisStartShown = true;
                    }
                    continue;
                }
                if (i < totalPages - 1 && i > currentPage + 1 && i !== totalPages) { // Ellipsis for pages after current page group
                     if (!ellipsisEndShown) {
                        const ellipsis = document.createElement('span');
                        ellipsis.classList.add('pagination-btn', 'disabled');
                        ellipsis.textContent = '...';
                        paginationButtonsContainer.appendChild(ellipsis);
                        ellipsisEndShown = true;
                    }
                    continue;
                }
                 // Always show first, last, current, and +/- 1 from current
                if (i !== 1 && i !== totalPages && i !== currentPage && i !== currentPage - 1 && i !== currentPage + 1) {
                   // if it doesn't fit the narrow window and we have many pages, skip.
                   if(totalPages > 5) continue;
                }
            }


            const pageButton = document.createElement('button');
            pageButton.classList.add('pagination-btn');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderTransactions();
            });
            paginationButtonsContainer.appendChild(pageButton);
        }
        

        const nextButton = document.createElement('button');
        nextButton.classList.add('pagination-btn');
        nextButton.textContent = 'Selanjutnya';
        if (currentPage === totalPages || totalPages === 0) {
            nextButton.classList.add('disabled');
            nextButton.disabled = true;
        }
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTransactions();
            }
        });
        paginationButtonsContainer.appendChild(nextButton);
    }

    function applySearchFilter() {
        const searchTerm = adminTransactionSearch ? adminTransactionSearch.value.toLowerCase() : '';
        if (searchTerm) {
            filteredTransactions = allTransactions.filter(transaction => {
                return (
                    transaction.id.toLowerCase().includes(searchTerm) ||
                    transaction.customer.toLowerCase().includes(searchTerm) ||
                    transaction.paymentMethod.toLowerCase().includes(searchTerm) ||
                    transaction.status.toLowerCase().includes(searchTerm) ||
                    transaction.items.some(item => item.name.toLowerCase().includes(searchTerm)) // Search in item names too
                );
            });
        } else {
            filteredTransactions = [...allTransactions];
        }
        currentPage = 1; 
        renderTransactions();
    }

    if (adminTransactionSearch && searchButton) {
        adminTransactionSearch.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                 applySearchFilter();
            }
        });
        searchButton.addEventListener('click', applySearchFilter);
    } else {
        console.warn("Search input or button not found in kelola-transaksi.js");
    }
    

    renderTransactions();

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => { // Use arrow function for brevity
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    const filterButtons = document.querySelectorAll('.filter-buttons .filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.textContent.trim().toLowerCase();
                if (action.includes('filter')) {
                    alert('Fungsi filter belum diimplementasikan.');
                } else if (action.includes('urutkan')) {
                    alert('Fungsi urutkan belum diimplementasikan.');
                }
            });
        });
    }
});