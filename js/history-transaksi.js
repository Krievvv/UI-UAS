document.addEventListener('DOMContentLoaded', function () {
    loadTransactions();
    setupEventListeners(); // Panggil fungsi untuk setup event listener
});

function loadTransactions() {
    const transactionsContainer = document.getElementById('transactions-container');
    if (!transactionsContainer) return;

    // Data transaksi tetap sama seperti sebelumnya
    const transactions = [
        {
            id: 'INV-20250501',
            customer: 'Pengguna 1',
            date: '1 Mei 2025',
            paymentMethod: 'Transfer Bank',
            items: [
                { productId: 'jete-13-pro', name: 'Headphone Bluetooth', quantity: 1, imageUrl: 'https://jete.id/wp-content/uploads/2023/06/jete-13-pro-13.jpg' },
                { productId: 'notebook-a5', name: 'Notebook Premium A5', quantity: 2, imageUrl: 'https://i.pinimg.com/736x/ed/9c/42/ed9c42752976d5c7f490714808ac3526.jpg' }
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
                { productId: 'usb-32gb', name: 'USB Flash Drive 32GB', quantity: 1, imageUrl: 'https://cdn.pixabay.com/photo/2014/03/24/17/07/flash-drive-295105_1280.png' },
                { productId: 'mouse-wireless', name: 'Mouse Wireless', quantity: 1, imageUrl: 'https://i.pinimg.com/736x/2b/20/46/2b2046c848ce96ac8c2462543aff974b.jpg' }
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
                { productId: 'keyboard-mech', name: 'Keyboard Mechanical', quantity: 1, imageUrl: 'https://i.pinimg.com/736x/e0/1b/9b/e01b9bb381987343c0215795858d9b76.jpg' }
            ],
            total: 365000,
            status: 'dibayar'
        }
    ];
    // Simpan data transaksi agar bisa diakses oleh fungsi lain
    transactionsContainer.dataset.transactions = JSON.stringify(transactions);


    function formatCurrency(amount) {
        return 'Rp' + amount.toLocaleString('id-ID');
    }

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
                    ${transaction.items.map(item => {
                        const imageUrl = item.imageUrl;
                        return `
                            <div class="transaction-item">
                                <div class="transaction-item-image">
                                    <img src="${imageUrl}" alt="${item.name}">
                                </div>
                                <div class="transaction-item-details">
                                    <h4 class="transaction-item-title">${item.name}</h4>
                                    <div class="transaction-item-quantity">Jumlah: ${item.quantity}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="transaction-footer">
                    <div class="transaction-total">
                        <div class="transaction-total-label">Total</div>
                        <div class="transaction-total-value">${formatCurrency(transaction.total)}</div>
                    </div>
                    <div class="transaction-actions">
                        <button class="btn btn-outline btn-detail" data-transaction-id="${transaction.id}">Detail</button>
                    </div>
                </div>
            </div>
        `;
    });
    transactionsContainer.innerHTML = transactionsHTML;
}

function getTransactionStatusText(status) {
    switch (status) {
        case 'dibayar': return 'Diproses';
        case 'dikirim': return 'Dikirim';
        case 'selesai': return 'Selesai';
        case 'dibatalkan': return 'Dibatalkan';
        default: return 'Tidak Diketahui';
    }
}

function setupEventListeners() {
    const transactionsContainer = document.getElementById('transactions-container');
    if (!transactionsContainer) return;

    transactionsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-detail')) {
            const transactionId = event.target.dataset.transactionId;
            const allTransactions = JSON.parse(transactionsContainer.dataset.transactions || '[]');
            const transaction = allTransactions.find(t => t.id === transactionId);

            if (transaction) {
                showTransactionDetailsModal(transaction); // Ganti ke fungsi modal baru
            } else {
                alert('Detail transaksi tidak ditemukan.'); // Fallback jika ada masalah
            }
        }
    });
}

function formatCurrencyForModal(amount) { // Fungsi format currency terpisah jika diperlukan
    return 'Rp' + amount.toLocaleString('id-ID');
}

function showTransactionDetailsModal(transaction) {
    // Hapus modal sebelumnya jika ada
    const existingModal = document.getElementById('transactionDetailModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Buat elemen modal
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'transactionDetailModal';
    // Styling minimal untuk overlay dan modal (tanpa mengubah file CSS eksternal)
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.zIndex = '1000'; // Pastikan modal di atas konten lain

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '25px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '90%';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    modalContent.style.fontFamily = 'Arial, sans-serif'; // Font dasar

    // Tombol Close
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;'; // Karakter 'x'
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.fontSize = '24px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'transparent';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#333';
    closeButton.onclick = () => modalOverlay.remove();

    modalContent.style.position = 'relative'; // Untuk positioning tombol close
    modalContent.appendChild(closeButton);

    // Judul Modal
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Detail Transaksi';
    modalTitle.style.marginTop = '0';
    modalTitle.style.marginBottom = '20px';
    modalTitle.style.color = '#333';
    modalTitle.style.borderBottom = '1px solid #eee';
    modalTitle.style.paddingBottom = '10px';
    modalContent.appendChild(modalTitle);

    // Fungsi helper untuk membuat baris detail
    function createDetailRow(label, value) {
        const row = document.createElement('p');
        row.style.margin = '8px 0';
        row.style.fontSize = '14px';
        row.innerHTML = `<strong style="color: #555;">${label}:</strong> <span style="color: #333;">${value}</span>`;
        return row;
    }

    // Tambahkan detail transaksi
    modalContent.appendChild(createDetailRow('ID Transaksi', transaction.id));
    modalContent.appendChild(createDetailRow('Tanggal', transaction.date));
    modalContent.appendChild(createDetailRow('Pelanggan', transaction.customer));
    modalContent.appendChild(createDetailRow('Metode Pembayaran', transaction.paymentMethod));
    modalContent.appendChild(createDetailRow('Status', getTransactionStatusText(transaction.status)));
    modalContent.appendChild(createDetailRow('Total', formatCurrencyForModal(transaction.total)));

    // Item yang dibeli
    const itemsTitle = document.createElement('h4');
    itemsTitle.textContent = 'Item yang Dibeli:';
    itemsTitle.style.marginTop = '20px';
    itemsTitle.style.marginBottom = '10px';
    itemsTitle.style.color = '#444';
    itemsTitle.style.fontSize = '16px';
    modalContent.appendChild(itemsTitle);

    const itemsList = document.createElement('ul');
    itemsList.style.listStyleType = 'none';
    itemsList.style.paddingLeft = '0';
    transaction.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.style.padding = '8px 0';
        listItem.style.borderBottom = '1px solid #f0f0f0';
        listItem.style.fontSize = '14px';
        listItem.style.display = 'flex';
        listItem.style.alignItems = 'center';

        // Gambar item (opsional, jika ingin ditampilkan di modal)
        const itemImage = document.createElement('img');
        itemImage.src = item.imageUrl;
        itemImage.alt = item.name;
        itemImage.style.width = '40px';
        itemImage.style.height = '40px';
        itemImage.style.marginRight = '10px';
        itemImage.style.borderRadius = '4px';
        listItem.appendChild(itemImage);

        const itemDetails = document.createElement('span');
        itemDetails.textContent = `${item.name} (Jumlah: ${item.quantity})`;
        itemDetails.style.color = '#333';
        listItem.appendChild(itemDetails);
        
        itemsList.appendChild(listItem);
    });
    itemsList.lastChild.style.borderBottom = 'none'; // Hapus border untuk item terakhir
    modalContent.appendChild(itemsList);

    // Tombol Aksi di Footer Modal (jika diperlukan)
    const modalFooter = document.createElement('div');
    modalFooter.style.marginTop = '25px';
    modalFooter.style.textAlign = 'right';

    const okButton = document.createElement('button');
    okButton.textContent = 'Tutup';
    okButton.style.padding = '10px 20px';
    okButton.style.backgroundColor = '#007bff'; // Warna primer, sesuaikan jika ada
    okButton.style.color = 'white';
    okButton.style.border = 'none';
    okButton.style.borderRadius = '5px';
    okButton.style.cursor = 'pointer';
    okButton.onclick = () => modalOverlay.remove();
    // Efek hover sederhana
    okButton.onmouseover = () => okButton.style.backgroundColor = '#0056b3';
    okButton.onmouseout = () => okButton.style.backgroundColor = '#007bff';


    modalFooter.appendChild(okButton);
    modalContent.appendChild(modalFooter);

    // Tambahkan konten modal ke overlay, lalu overlay ke body
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Tutup modal jika klik di luar area konten
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}