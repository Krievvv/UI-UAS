document.addEventListener('DOMContentLoaded', function () {
    // Load transactions
    loadTransactions();
});

// Load transactions
function loadTransactions() {
    const transactionsContainer = document.getElementById('transactions-container');

    if (!transactionsContainer) return;

    // Sample transactions data
    const transactions = [
        {
            id: 'INV-20250501',
            customer: 'Pengguna 1',
            date: '1 Mei 2025',
            paymentMethod: 'Transfer Bank',
            items: [
                { name: 'Headphone Bluetooth', quantity: 1 },
                { name: 'Notebook Premium A5', quantity: 2 }
            ],
            total: 404000,
            status: 'selesai'
        },
        {
            id: 'INV-20250428',
            customer: 'Pengguna 2',
            date: '28 April 2025',
            paymentMethod: 'E-Wallet',
            items: [
                { name: 'USB Flash Drive 32GB', quantity: 1 },
                { name: 'Mouse Wireless', quantity: 1 }
            ],
            total: 250000,
            status: 'dikirim'
        },
        {
            id: 'INV-20250425',
            customer: 'Pengguna 3',
            date: '25 April 2025',
            paymentMethod: 'QRIS',
            items: [
                { name: 'Keyboard Mechanical', quantity: 1 }
            ],
            total: 365000,
            status: 'dibayar'
        }
    ];

    // Generate transactions HTML
    let transactionsHTML = '';

    transactions.forEach(transaction => {
        transactionsHTML += `
            <div class="transaction-card">
                <div class="transaction-header">
                    <div class="transaction-date">${transaction.date}</div>
                    <div class="transaction-id">${transaction.id}</div>
                    <div class="transaction-status ${transaction.status}">${getTransactionStatusText(transaction.status)}</div>
                </div>
                <div class="transaction-items">
                    ${transaction.items.map(item => `
                        <div class="transaction-item">
                            <div class="transaction-item-image">
                                <img src="img/product-1.jpg" alt="${item.name}">
                            </div>
                            <div class="transaction-item-details">
                                <h4 class="transaction-item-title">${item.name}</h4>
                                <div class="transaction-item-quantity">Jumlah: ${item.quantity}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="transaction-footer">
                    <div class="transaction-total">
                        <div class="transaction-total-label">Total</div>
                        <div class="transaction-total-value">${formatCurrency(transaction.total)}</div>
                    </div>
                    <div class="transaction-actions">
                        <button class="btn btn-outline">Detail</button>
                    </div>
                </div>
            </div>
        `;
    });

    transactionsContainer.innerHTML = transactionsHTML;
}

// Get transaction status text
function getTransactionStatusText(status) {
    switch (status) {
        case 'dibayar':
            return 'Diproses';
        case 'dikirim':
            return 'Dikirim';
        case 'selesai':
            return 'Selesai';
        case 'dibatalkan':
            return 'Dibatalkan';
        default:
            return 'Tidak Diketahui';
    }
}