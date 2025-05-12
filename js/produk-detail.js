document.addEventListener('DOMContentLoaded', function () {
    // Get product ID from URL
    const productId = getUrlParam('id') || 1;

    // Load product details
    loadProductDetails(productId);

    // Load product tabs content
    loadProductTabs(productId);

    // Load related products
    loadRelatedProducts(productId);

    // Initialize tabs
    initializeTabs();
});

// Load product details
function loadProductDetails(productId) {
    const productDetailContainer = document.getElementById('product-detail');

    if (!productDetailContainer) return;

    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Headphone Bluetooth Mahasiswa Edition',
            category: 'Elektronik',
            price: 299000,
            images: [
                'img/product-detail.jpg',
                'img/product-detail-2.jpg',
                'img/product-detail-3.jpg',
                'img/product-detail-4.jpg'
            ],
            rating: 4.8,
            reviews: 120,
            sold: 250,
            stock: 50,
            description: 'Headphone Bluetooth dengan kualitas suara premium, baterai tahan lama hingga 20 jam, dan desain yang nyaman untuk penggunaan sehari-hari. Cocok untuk mahasiswa yang sering belajar online atau mendengarkan musik.',
            features: [
                'Koneksi: Bluetooth 5.0',
                'Baterai: 20 jam',
                'Fitur: Noise Cancelling',
                'Warna: Hitam'
            ]
        }
    ];

    // Find product by ID
    const product = products.find(product => product.id === parseInt(productId)) || products[0];

    // Generate product HTML
    const productHTML = `
        &lt;!-- Product Images -->
        <div class="product-images">
            <div class="main-image">
                <img src="${product.images[0]}" alt="${product.name}" id="main-product-image">
            </div>
            <div class="thumbnail-images">
                ${product.images.map((image, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                        <img src="${image}" alt="Thumbnail ${index + 1}">
                    </div>
                `).join('')}
            </div>
        </div>

        &lt;!-- Product Info -->
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h1 class="product-title">${product.name}</h1>
            <div class="product-rating">
                <div class="stars">
                    ${generateStarRating(product.rating)}
                    <span>${product.rating} (${product.reviews} ulasan)</span>
                </div>
                <div class="sold">Terjual ${product.sold}+</div>
            </div>
            <div class="product-price">${formatCurrency(product.price)}</div>

            <div class="product-description">
                <h3>Deskripsi</h3>
                <p>${product.description}</p>
                <ul class="product-features">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="product-quantity">
                <div class="quantity-control">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" value="1" min="1" max="${product.stock}" id="quantity">
                    <button class="quantity-btn plus">+</button>
                </div>
                <div class="stock">Stok: ${product.stock}</div>
            </div>

            <div class="product-actions">
                <button class="btn btn-primary add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i> Tambah ke Keranjang
                </button>
                <button class="btn btn-outline wishlist-btn">
                    <i class="far fa-heart"></i> Wishlist
                </button>
                <button class="btn btn-icon share-btn">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>

            <div class="product-benefits">
                <div class="benefit">
                    <i class="fas fa-truck"></i>
                    <span>Pengiriman Cepat</span>
                </div>
                <div class="benefit">
                    <i class="fas fa-shield-alt"></i>
                    <span>Garansi 1 Tahun</span>
                </div>
                <div class="benefit">
                    <i class="fas fa-undo"></i>
                    <span>30 Hari Pengembalian</span>
                </div>
            </div>
        </div>
    `;

    productDetailContainer.innerHTML = productHTML;

    // Update page title
    document.title = `${product.name} - AndyShop`;

    // Initialize thumbnail click events
    initializeThumbnails();

    // Initialize quantity buttons
    initializeQuantityButtons();

    // Initialize add to cart button
    initializeAddToCart(product);
}

// Load product tabs content
function loadProductTabs(productId) {
    // Load description tab
    const descriptionTab = document.getElementById('description');
    if (descriptionTab) {
        descriptionTab.innerHTML = `
            <div class="tab-content">
                <p>Headphone Bluetooth Mahasiswa Edition dirancang khusus untuk memenuhi kebutuhan mahasiswa modern. Dengan desain yang ergonomis dan bahan berkualitas tinggi, headphone ini nyaman digunakan untuk waktu yang lama.</p>
                <p>Fitur noise cancelling membantu Anda fokus pada pelajaran atau pekerjaan tanpa terganggu oleh suara sekitar. Baterai tahan lama hingga 20 jam memastikan Anda dapat menggunakan headphone sepanjang hari tanpa perlu mengisi ulang.</p>
                <p>Kualitas suara premium dengan bass yang dalam dan treble yang jernih memberikan pengalaman mendengarkan yang luar biasa, baik untuk musik, podcast, atau panggilan video.</p>
            </div>
        `;
    }

    // Load specification tab
    const specificationTab = document.getElementById('specification');
    if (specificationTab) {
        specificationTab.innerHTML = `
            <div class="tab-content">
                <div class="specifications">
                    <div class="spec-group">
                        <h3>Spesifikasi Teknis</h3>
                        <table class="spec-table">
                            <tr>
                                <td>Koneksi</td>
                                <td>Bluetooth 5.0</td>
                            </tr>
                            <tr>
                                <td>Jarak Koneksi</td>
                                <td>Hingga 10 meter</td>
                            </tr>
                            <tr>
                                <td>Baterai</td>
                                <td>500mAh, 20 jam penggunaan</td>
                            </tr>
                            <tr>
                                <td>Waktu Pengisian</td>
                                <td>2 jam</td>
                            </tr>
                            <tr>
                                <td>Driver</td>
                                <td>40mm</td>
                            </tr>
                        </table>
                    </div>
                    <div class="spec-group">
                        <h3>Fitur</h3>
                        <ul class="feature-list">
                            <li><i class="fas fa-check"></i> Active Noise Cancellation</li>
                            <li><i class="fas fa-check"></i> Mikrofon Berkualitas Tinggi</li>
                            <li><i class="fas fa-check"></i> Kontrol Sentuh</li>
                            <li><i class="fas fa-check"></i> Kompatibel dengan Asisten Suara</li>
                            <li><i class="fas fa-check"></i> Bahan Kulit Sintetis yang Nyaman</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // Load reviews tab
    const reviewsTab = document.getElementById('reviews');
    if (reviewsTab) {
        reviewsTab.innerHTML = `
            <div class="tab-content">
                <div class="reviews-summary">
                    <div class="rating-summary">
                        <div class="average-rating">
                            <div class="rating-number">4.8<span>/5</span></div>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="total-reviews">Berdasarkan 120 ulasan</div>
                        </div>
                        <div class="rating-bars">
                            <div class="rating-bar">
                                <div class="rating-label">5 ★</div>
                                <div class="progress-bar">
                                    <div class="progress" style="width: 70%"></div>
                                </div>
                                <div class="rating-percent">70%</div>
                            </div>
                            <div class="rating-bar">
                                <div class="rating-label">4 ★</div>
                                <div class="progress-bar">
                                    <div class="progress" style="width: 20%"></div>
                                </div>
                                <div class="rating-percent">20%</div>
                            </div>
                            <div class="rating-bar">
                                <div class="rating-label">3 ★</div>
                                <div class="progress-bar">
                                    <div class="progress" style="width: 7%"></div>
                                </div>
                                <div class="rating-percent">7%</div>
                            </div>
                            <div class="rating-bar">
                                <div class="rating-label">2 ★</div>
                                <div class="progress-bar">
                                    <div class="progress" style="width: 2%"></div>
                                </div>
                                <div class="rating-percent">2%</div>
                            </div>
                            <div class="rating-bar">
                                <div class="rating-label">1 ★</div>
                                <div class="progress-bar">
                                    <div class="progress" style="width: 1%"></div>
                                </div>
                                <div class="rating-percent">1%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reviews-list">
                    <div class="review-item">
                        <div class="review-header">
                            <div class="reviewer">Pengguna1</div>
                            <div class="review-date">2 minggu yang lalu</div>
                        </div>
                        <div class="review-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="review-content">
                            <p>Headphone ini sangat bagus untuk harganya. Suaranya jernih dan bass-nya mantap. Baterai tahan lama dan nyaman dipakai seharian. Cocok untuk kuliah online dan dengerin musik.</p>
                        </div>
                        <div class="review-images">
                            <img src="img/review-1.jpg" alt="Review image">
                        </div>
                    </div>

                    <div class="review-item">
                        <div class="review-header">
                            <div class="reviewer">Pengguna2</div>
                            <div class="review-date">3 minggu yang lalu</div>
                        </div>
                        <div class="review-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="review-content">
                            <p>Kualitas suara bagus, noise cancelling bekerja dengan baik. Sangat membantu saat belajar di kos yang berisik. Baterai tahan lama sesuai deskripsi.</p>
                        </div>
                    </div>

                    <div class="review-item">
                        <div class="review-header">
                            <div class="reviewer">Pengguna3</div>
                            <div class="review-date">1 bulan yang lalu</div>
                        </div>
                        <div class="review-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <div class="review-content">
                            <p>Headphone nyaman dipakai, tapi noise cancelling tidak sebaik yang diharapkan. Untuk harganya masih worth it sih. Pengiriman cepat dan packaging aman.</p>
                        </div>
                    </div>
                </div>

                <button class="btn btn-outline view-all-reviews">Lihat Semua Ulasan</button>
            </div>
        `;
    }
}

// Load related products
function loadRelatedProducts(currentProductId) {
    const relatedProductsContainer = document.getElementById('related-products');

    if (!relatedProductsContainer) return;

    // Sample related products data
    const relatedProducts = [
        {
            id: 2,
            name: 'Notebook Premium A5',
            category: 'Alat Tulis',
            price: 45000,
            image: 'https://down-id.img.susercontent.com/file/a905daf36db4379d7973c88090864fbd'
        },
        {
            id: 3,
            name: 'USB Flash Drive 32GB',
            category: 'Elektronik',
            price: 85000,
            image: 'img/product-3.jpg'
        },
        {
            id: 5,
            name: 'Mouse Wireless',
            category: 'Elektronik',
            price: 150000,
            image: 'img/product-5.jpg'
        },
        {
            id: 6,
            name: 'Keyboard Mechanical',
            category: 'Elektronik',
            price: 350000,
            image: 'img/product-6.jpg'
        }
    ].filter(product => product.id !== parseInt(currentProductId));

    // Generate HTML for related products
    let productsHTML = '';

    relatedProducts.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <a href="produk-detail.html?id=${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h4 class="product-title">${product.name}</h4>
                        <div class="product-price">${formatCurrency(product.price)}</div>
                    </div>
                </a>
            </div>
        `;
    });

    relatedProductsContainer.innerHTML = productsHTML;
}

// Initialize tabs
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get tab ID from data attribute
            const tabId = this.getAttribute('data-tab');

            // Show corresponding panel
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize thumbnails
function initializeThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');

    if (!thumbnails.length || !mainImage) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));

            // Add active class to clicked thumbnail
            this.classList.add('active');

            // Update main image
            const imageUrl = this.getAttribute('data-image');
            mainImage.src = imageUrl;
        });
    });
}

// Initialize quantity buttons
function initializeQuantityButtons() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('quantity');

    if (!minusBtn || !plusBtn || !quantityInput) return;

    minusBtn.addEventListener('click', function () {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });

    plusBtn.addEventListener('click', function () {
        let quantity = parseInt(quantityInput.value);
        const maxQuantity = parseInt(quantityInput.getAttribute('max'));

        if (quantity < maxQuantity) {
            quantityInput.value = quantity + 1;
        }
    });
}

// Initialize add to cart button
function initializeAddToCart(product) {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (!addToCartBtn) return;

    addToCartBtn.addEventListener('click', function () {
        const quantity = parseInt(document.getElementById('quantity').value);

        // Add product to cart
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            category: product.category
        }, quantity);
    });
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