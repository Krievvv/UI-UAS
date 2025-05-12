document.addEventListener('DOMContentLoaded', function() {
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
            stock: 50,
            status: 'in-stock'
        },
        {
            id: 2,
            name: 'Notebook Premium A5',
            category: 'Alat Tulis',
            price: 45000,
            stock: 100,
            status: 'in-stock'
        },
        {
            id: 3,
            name: 'USB Flash Drive 32GB',
            category: 'Elektronik',
            price: 85000,
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
                        <img src="img/product-1.jpg" alt="${product.name}" class="product-image">
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
    
    addProductBtn.addEventListener('click', function() {
        openModal('product-modal');
    });
}