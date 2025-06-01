document.addEventListener('DOMContentLoaded', function () {
    // Initialize revenue chart
    initializeRevenueChart();

    // Initialize order status chart
    initializeOrderStatusChart();

    // Initialize category chart
    initializeCategoryChart();

    // Initialize low stock button functionality
    initializeAddStockButtons();
});

// Initialize revenue chart
function initializeRevenueChart() {
    const revenueChartCanvas = document.getElementById('revenue-chart');

    if (!revenueChartCanvas) return;

    const revenueChart = new Chart(revenueChartCanvas, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'],
            datasets: [{
                label: 'Pendapatan (Rp)',
                data: [2500000, 3200000, 4500000, 3800000, 5500000],
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                borderColor: 'rgba(249, 115, 22, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize order status chart
function initializeOrderStatusChart() {
    const orderStatusChartCanvas = document.getElementById('order-status-chart');

    if (!orderStatusChartCanvas) return;

    const orderStatusChart = new Chart(orderStatusChartCanvas, {
        type: 'pie',
        data: {
            labels: ['Selesai', 'Dikirim', 'Diproses', 'Dibatalkan'],
            datasets: [{
                label: 'Status Pesanan',
                data: [60, 25, 10, 5],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Initialize category chart
function initializeCategoryChart() {
    const categoryChartCanvas = document.getElementById('category-chart');

    if (!categoryChartCanvas) return;

    const categoryChart = new Chart(categoryChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Elektronik', 'Buku', 'Alat Tulis', 'Kebutuhan Sehari-hari', 'Lainnya'],
            datasets: [{
                label: 'Jumlah Produk',
                data: [14, 10, 8, 6, 2],
                backgroundColor: 'rgba(249, 115, 22, 0.8)',
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to initialize "Tambah Stok" button functionality
function initializeAddStockButtons() {
    const addStockButtons = document.querySelectorAll('.product-item .product-stock .btn-outline');

    addStockButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productItem = event.target.closest('.product-item');
            if (productItem) {
                const stockCountElement = productItem.querySelector('.stock-count.low');
                if (stockCountElement) {
                    let currentStockText = stockCountElement.textContent; 
                    // Extract the number part
                    let currentStockNumber = parseInt(currentStockText.split(':')[1].trim());
                    
                    if (!isNaN(currentStockNumber)) {
                        currentStockNumber++; 
                        stockCountElement.textContent = `Stok: ${currentStockNumber}`; 
                        
                    }
                }
            }
        });
    });
}