document.addEventListener('DOMContentLoaded', function() {
    const productId = getUrlParam('id');
    
    if (!productId) {
        window.location.href = 'produk.html';
        return;
    }

    // Load product details
    loadProductDetails(productId);
    
    // Load product tabs
    loadProductTabs(productId);
    
    // Load related products
    loadRelatedProducts(productId);
    
    // Initialize tabs
    initializeTabs();
});

// Update fungsi getUrlParam
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    return value ? parseInt(value) : null;
}

// Function to load product details
function loadProductDetails(productId) {
    // Simulasi data produk (dalam implementasi nyata, ini akan diambil dari API/database)
    const products = [
        {
            id: 1,
            name: 'Headphone Bluetooth Mahasiswa Edition',
            category: 'elektronik',
            categoryName: 'Elektronik',
            price: 299000,
            image: 'https://jete.id/wp-content/uploads/2023/06/jete-13-pro-13.jpg',
            description: 'Headphone bluetooth dengan kualitas suara premium, cocok untuk mahasiswa yang suka mendengarkan musik sambil belajar.',
            rating: 4.8,
            reviews: 120
        },
        {
            id: 2,
            name: 'Notebook Premium A5',
            category: 'alat-tulis',
            categoryName: 'Alat Tulis',
            price: 45000,
            image: 'https://down-id.img.susercontent.com/file/a905daf36db4379d7973c88090864fbd',
            description: 'Notebook berkualitas tinggi dengan kertas premium',
            rating: 4.5,
            reviews: 85
        }
        // Tambahkan produk lainnya sesuai dengan yang ada di produk.js
    ];

    // Cari produk berdasarkan ID
    const product = products.find(p => p.id === productId);

    if (!product) {
        console.error('Product not found');
        window.location.href = 'produk.html';
        return;
    }

    // Update document title
    document.title = `${product.name} - KrievvvShop`;

    // Render product details
    const productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) {
        productDetailContainer.innerHTML = `
            <div class="product-images">
                <img src="${product.image}" alt="${product.name}" class="main-image">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="product-meta">
                    <span class="category">${product.categoryName}</span>
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                        <span>(${product.reviews} ulasan)</span>
                    </div>
                </div>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                <div class="quantity-selector">
                    <label>Jumlah:</label>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="1" min="1" max="10" id="quantity">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" id="add-to-cart">
                        Tambah ke Keranjang
                    </button>
                    <button class="btn btn-outline" id="buy-now">
                        Beli Sekarang
                    </button>
                </div>
            </div>
        `;

        // Initialize controls
        initQuantityControls();
        initAddToCartButton(product);
        initBuyNowButton(product);
    }
}

// Initialize quantity controls
function initQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        if (quantityInput.value < 10) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }
    });
}

// Initialize add to cart button
function initAddToCartButton(product) {
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            addToCart(product, quantity);
        });
    }
}

// Initialize buy now button
function initBuyNowButton(product) {
    const buyNowBtn = document.getElementById('buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            // Add to cart first
            addToCart(product, quantity);
            // Redirect to checkout
            window.location.href = 'pembayaran.html';
        });
    }
}

// Generate star rating HTML
function generateStarRating(rating) {
    let starsHTML = '';

    // Full stars
    for (let i = 1; i <= Math.floor(rating); i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    // Half star
    if (rating % 1 >= 0.5) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    // Empty stars
    for (let i = Math.ceil(rating); i < 5; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Tambahkan di awal file jika belum ada
function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}