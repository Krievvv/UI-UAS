document.addEventListener('DOMContentLoaded', function () {
    // Load products
    loadProducts();

    // Initialize add product button
    initializeAddProductButton();
});

// Load products
function loadProducts() {
    const productsTableBody = document.getElementById('products-table-body');

    if (!productsTableBody) return;

    // Sample products data
    const products = [
        {
            id: 1,
            name: 'Headphone Bluetooth',
            category: 'Elektronik',
            price: 299000,
            image: 'https://jete.id/wp-content/uploads/2023/06/jete-13-pro-13.jpg',
            stock: 50,
            status: 'in-stock'
        },
        {
            id: 2,
            name: 'Notebook Premium A5',
            category: 'Alat Tulis',
            price: 45000,
            image: 'https://i.pinimg.com/736x/ed/9c/42/ed9c42752976d5c7f490714808ac3526.jpg',
            stock: 100,
            status: 'in-stock'
        },
        {
            id: 3,
            name: 'USB Flash Drive 32GB',
            category: 'Elektronik',
            price: 85000,
            image: 'https://cdn.pixabay.com/photo/2014/03/24/17/07/flash-drive-295105_1280.png',
            stock: 10,
            status: 'out-of-stock'
        }
    ];

    // Generate products HTML
    let productsHTML = '';

    products.forEach(product => {
        productsHTML += `
        <tr>
            <td>${product.id}</td>
            <td>
                <div class="product-info">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <span class="product-name">${product.name}</span>
                </div>
            </td>
            <td>${product.category}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge ${product.status}">${product.status}</span></td>
            <td>
                <button class="action-btn edit-btn" data-id="${product.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
    });


    productsTableBody.innerHTML = productsHTML;
}

// Initialize add product button
function initializeAddProductButton() {
    const addProductBtn = document.getElementById('add-product-btn');

    if (!addProductBtn) return;

    addProductBtn.addEventListener('click', function () {
        openModal('product-modal');
    });
}