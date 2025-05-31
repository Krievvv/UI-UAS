document.addEventListener('DOMContentLoaded', function() {
    const productId = getUrlParam('id');

    if (!productId) {
        // Redirect to products page if no ID is found, or show an error
        document.getElementById('product-detail').innerHTML = '<p class="loading-placeholder">Produk tidak ditemukan. <a href="produk.html">Kembali ke katalog</a>.</p>';
        document.querySelector('.product-tabs').style.display = 'none';
        document.querySelector('.related-products').style.display = 'none';
        return;
    }

    // This sample data should ideally come from an API or a shared products.js file
    const allProductsData = [
        {
            id: 1,
            name: 'Headphone Bluetooth Mahasiswa Edition',
            category: 'elektronik',
            categoryName: 'Elektronik',
            price: 299000,
            oldPrice: 350000, // Optional: for sale items
            image: 'https://jete.id/wp-content/uploads/2023/06/jete-13-pro-13.jpg',
            images: [ // For image gallery
                'https://jete.id/wp-content/uploads/2023/06/jete-13-pro-13.jpg',
                'https://i.pinimg.com/736x/a9/5f/ab/a95fab75ac3b0c268933ca235ef1493a.jpg',
                'https://i.pinimg.com/736x/79/7c/30/797c303f5211c1f67b2b4f62b570eec0.jpg'
            ],
            shortDescription: 'Headphone bluetooth nirkabel dengan kualitas suara premium, bass mendalam, dan noise cancelling.',
            fullDescription: 'Rasakan pengalaman audio imersif dengan Headphone Bluetooth Mahasiswa Edition. Didesain khusus untuk kenyamanan maksimal dan kualitas suara superior, headphone ini menjadi teman setia untuk belajar, bekerja, maupun bersantai. Fitur Active Noise Cancellation (ANC) efektif meredam suara bising di sekitar, memungkinkan Anda fokus penuh pada musik atau podcast favorit. Dengan daya tahan baterai hingga 20 jam, Anda tidak perlu khawatir kehabisan daya di tengah aktivitas. Konektivitas Bluetooth 5.0 menjamin koneksi yang stabil dan cepat ke perangkat Anda.',
            specifications: {
                'Konektivitas': 'Bluetooth 5.0, AUX Cable input',
                'Versi Bluetooth': 'v5.0 + EDR',
                'Jangkauan': 'Hingga 10 meter',
                'Driver': '40mm Neodymium Dynamic Drivers',
                'Frekuensi Response': '20Hz - 20kHz',
                'Impedansi': '32 Ohm',
                'Fitur Unggulan': 'Active Noise Cancellation, Built-in Microphone, Kontrol Sentuh, Foldable Design',
                'Warna Tersedia': 'Hitam Matte, Putih Glossy, Biru Navy',
                'Material': 'ABS Plastik kualitas tinggi, Soft leatherette earcups & headband',
                'Waktu Pengisian': 'Sekitar 2 jam',
                'Waktu Putar Musik': 'Hingga 20 jam (ANC off), Hingga 15 jam (ANC on)',
                'Berat': '250g'
            },
            reviewsData: [
                { user: 'Andi S.', rating: 5, comment: 'Suaranya jernih banget, ANCnya juga oke! Nyaman dipakai berjam-jam.', date: '20 Mei 2025' },
                { user: 'Bunga C.', rating: 4, comment: 'Baterai awet, desainnya juga keren. Untuk harga segini sangat worth it.', date: '18 Mei 2025' },
                { user: 'Rizky P.', rating: 5, comment: 'Pengiriman cepat, packing aman. Produk sesuai ekspektasi. Mantap!', date: '15 Mei 2025' }
            ],
            rating: 4.8, // Average rating (can be calculated from reviewsData)
            reviewsCount: 120 // Total number of reviews
        },
        {
            id: 2,
            name: 'Notebook Premium A5 Kertas Tebal untuk Catatan',
            category: 'alat-tulis',
            categoryName: 'Alat Tulis',
            price: 45000,
            image: 'https://i.pinimg.com/736x/ed/9c/42/ed9c42752976d5c7f490714808ac3526.jpg',
            images: [
                'https://i.pinimg.com/736x/ed/9c/42/ed9c42752976d5c7f490714808ac3526.jpg',
                'https://i.pinimg.com/736x/35/3f/da/353fda55ed71173bb1a4377d1091aba3.jpg',
                'https://i.pinimg.com/736x/0d/9e/da/0d9eda159b5b7716671c4e0799a32240.jpg'
            ],
            shortDescription: 'Notebook A5 dengan sampul hardcover elegan dan kertas tebal berkualitas tinggi (100gsm).',
            fullDescription: 'Abadikan ide-ide brilian Anda dengan Notebook Premium A5 kami. Dirancang dengan sampul hardcover yang kokoh dan elegan, notebook ini tidak hanya tahan lama tetapi juga nyaman digenggam. Kertas berkualitas tinggi 100gsm berwarna krem lembut di mata dan ideal untuk berbagai jenis alat tulis, mulai dari pulpen hingga spidol tipis, tanpa khawatir tembus (ghosting/bleeding). Dilengkapi dengan pita pembatas dan kantong di bagian dalam sampul belakang untuk menyimpan catatan kecil atau kartu nama.',
            specifications: {
                'Ukuran': 'A5 (14.8 x 21 cm)',
                'Jumlah Halaman': '200 halaman (100 lembar)',
                'Jenis Kertas': 'Bookpaper 100gsm, Cream, Acid-Free',
                'Layout Kertas': 'Bergaris (Ruled)',
                'Sampul': 'Hardcover dengan lapisan Linen Texture',
                'Fitur Tambahan': 'Pita Pembatas Satin, Kantong Dalam di Sampul Belakang, Elastic Band Closure'
            },
            reviewsData: [
                { user: 'Citra D.', rating: 5, comment: 'Kertasnya tebal dan halus, enak banget buat nulis. Desainnya simpel tapi elegan.', date: '22 Mei 2025' },
                { user: 'Doni E.', rating: 4, comment: 'Covernya bagus, cocok buat hadiah. Pengiriman juga cepat.', date: '20 Mei 2025' }
            ],
            rating: 4.7,
            reviewsCount: 85
        },
        // ... Add more product details as needed
    ];

    const product = allProductsData.find(p => p.id === productId);

    if (!product) {
        document.getElementById('product-detail').innerHTML = '<p class="loading-placeholder">Detail produk tidak ditemukan. <a href="produk.html">Kembali ke katalog</a>.</p>';
        document.querySelector('.product-tabs').style.display = 'none';
        document.querySelector('.related-products').style.display = 'none';
        return;
    }

    document.title = `${product.name} - KrievvvShop`;
    document.getElementById('breadcrumb-product-name').textContent = product.name;
    
    loadProductDetails(product);
    loadProductTabsContent(product);
    loadRelatedProducts(product.id, allProductsData);
    initializeTabs();
    updateCartCount(); // Initial cart count on navbar
});

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    return value ? parseInt(value) : null;
}

function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function generateStarRating(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.4 ? 1 : 0; // Adjusted threshold for half star
    const emptyStars = 5 - fullStars - halfStar;

    for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fas fa-star"></i>';
    if (halfStar) starsHTML += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="far fa-star"></i>';
    return starsHTML;
}

function loadProductDetails(product) {
    const productDetailContainer = document.getElementById('product-detail');
    if (!productDetailContainer) return;

    let thumbnailHTML = '';
    if (product.images && product.images.length > 0) {
        product.images.forEach((imgUrl, index) => {
            thumbnailHTML += `<img src="${imgUrl}" alt="Thumbnail ${index + 1}" class="${index === 0 ? 'active' : ''}" onclick="changeMainImage('${imgUrl}', this)">`;
        });
    } else { // Fallback if only single 'image' field is present
        thumbnailHTML = `<img src="${product.image}" alt="Thumbnail 1" class="active" onclick="changeMainImage('${product.image}', this)">`;
    }
    
    const mainImageUrl = (product.images && product.images.length > 0) ? product.images[0] : product.image;

    productDetailContainer.innerHTML = `
        <div class="product-images">
            <img src="${mainImageUrl}" alt="${product.name}" class="main-image" id="main-product-image">
            ${product.images && product.images.length > 1 ? `<div class="thumbnail-images">${thumbnailHTML}</div>` : ''}
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <div class="product-meta">
                <span class="category">${product.categoryName}</span>
                <div class="rating">
                    ${generateStarRating(product.rating)}
                    <span>(${product.reviewsCount} ulasan)</span>
                </div>
            </div>
            <div class="product-price">
                ${formatCurrency(product.price)}
                ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
            </div>
            <div class="product-description-short">
                <p>${product.shortDescription || product.fullDescription.substring(0,150)+'...'}</p>
            </div>
            <div class="quantity-selector">
                <label for="quantity">Jumlah:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" aria-label="Kurangi jumlah">-</button>
                    <input type="number" value="1" min="1" max="10" id="quantity" aria-label="Kuantitas produk">
                    <button class="quantity-btn plus" aria-label="Tambah jumlah">+</button>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" id="add-to-cart-btn">
                    <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                </button>
                <button class="btn btn-outline" id="buy-now-btn">
                    <i class="fas fa-bolt"></i> Beli Sekarang
                </button>
            </div>
        </div>
    `;

    initQuantityControls();
    initActionButtons(product);
}

function changeMainImage(newImageUrl, thumbnailElement) {
    document.getElementById('main-product-image').src = newImageUrl;
    document.querySelectorAll('.thumbnail-images img').forEach(img => img.classList.remove('active'));
    if (thumbnailElement) {
        thumbnailElement.classList.add('active');
    }
}

function initQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    if (!quantityInput || !minusBtn || !plusBtn) return;

    minusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) quantityInput.value = currentValue - 1;
    });

    plusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        const maxVal = parseInt(quantityInput.max) || 10; // Use max attribute or default to 10
        if (currentValue < maxVal) quantityInput.value = currentValue + 1;
    });

    quantityInput.addEventListener('change', () => { // Handle direct input
        let currentValue = parseInt(quantityInput.value);
        const minVal = parseInt(quantityInput.min) || 1;
        const maxVal = parseInt(quantityInput.max) || 10;
        if (isNaN(currentValue) || currentValue < minVal) quantityInput.value = minVal;
        if (currentValue > maxVal) quantityInput.value = maxVal;
    });
}

function initActionButtons(product) {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            if (typeof addToCart === "function") {
                addToCart(product, quantity);
                showToast(`${product.name} (x${quantity}) ditambahkan ke keranjang!`);
            } else {
                console.error("Fungsi addToCart tidak ditemukan.");
                alert("Gagal menambahkan ke keranjang. Fungsi tidak tersedia.");
            }
        });
    }

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            
            // Clear existing checkout items
            localStorage.removeItem('checkout_items');
            
            // Create direct checkout item
            const checkoutItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: (product.images && product.images.length > 0) ? product.images[0] : product.image,
                quantity: quantity
            };

            // Calculate totals
            const subtotal = product.price * quantity;
            const shipping = 10000; // Biaya pengiriman tetap, sesuaikan jika perlu
            const total = subtotal + shipping;

            // Set checkout data
            localStorage.setItem('checkout_items', JSON.stringify([checkoutItem]));
            localStorage.setItem('checkout_subtotal', subtotal.toString());
            localStorage.setItem('checkout_shipping', shipping.toString());
            localStorage.setItem('checkout_total', total.toString());

            // Redirect to checkout page
            window.location.href = 'pembayaran.html';
        });
    }
}


function loadProductTabsContent(product) {
    // Description Tab
    const descPanel = document.getElementById('description');
    if (descPanel) {
        descPanel.innerHTML = `<p>${product.fullDescription || product.shortDescription || 'Deskripsi tidak tersedia.'}</p>`;
    }

    // Specification Tab
    const specPanel = document.getElementById('specification');
    if (specPanel && product.specifications) {
        let specHTML = '<table>';
        for (const key in product.specifications) {
            specHTML += `<tr><th>${key}</th><td>${product.specifications[key]}</td></tr>`;
        }
        specHTML += '</table>';
        specPanel.innerHTML = specHTML;
    } else if (specPanel) {
        specPanel.innerHTML = '<p>Spesifikasi tidak tersedia.</p>';
    }

    // Reviews Tab
    const reviewPanel = document.getElementById('reviews');
    const reviewCountSpan = document.getElementById('review-count');
    if (reviewCountSpan) reviewCountSpan.textContent = product.reviewsData ? product.reviewsData.length : 0;

    if (reviewPanel && product.reviewsData && product.reviewsData.length > 0) {
        let reviewsHTML = '';
        product.reviewsData.forEach(review => {
            reviewsHTML += `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-user">${review.user}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <div class="review-rating">${generateStarRating(review.rating)}</div>
                    <p class="review-comment">${review.comment}</p>
                </div>
            `;
        });
        reviewPanel.innerHTML = reviewsHTML;
    } else if (reviewPanel) {
        reviewPanel.innerHTML = '<p class="no-reviews">Belum ada ulasan untuk produk ini.</p>';
    }
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Activate clicked
            button.classList.add('active');
            const targetTab = button.dataset.tab;
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

function loadRelatedProducts(currentProductId, allProducts) {
    const relatedGrid = document.getElementById('related-products-grid');
    if (!relatedGrid) return;

    // Filter out current product and get a few others (e.g., same category or just random)
    // This is a simple random selection for demo.
    const related = allProducts
        .filter(p => p.id !== currentProductId)
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 4); // Get up to 4 related products

    if (related.length === 0) {
        relatedGrid.innerHTML = '<p class="loading-placeholder">Tidak ada produk terkait.</p>';
        return;
    }

    let relatedHTML = '';
    related.forEach(product => {
        relatedHTML += `
            <div class="product-card-related">
                <a href="produk-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="info">
                        <h3>${product.name}</h3>
                        <p class="price">${formatCurrency(product.price)}</p>
                    </div>
                </a>
            </div>
        `;
    });
    relatedGrid.innerHTML = relatedHTML;
}

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Toast disappears after 3 seconds
}

// --- Stubs for functions assumed to be in main.js ---
// Anda HARUS memiliki implementasi nyata dari fungsi-fungsi ini di js/main.js

// Dummy addToCart (replace with your actual localStorage logic from main.js)
function addToCart(product, quantity, isBuyNow = false) {
    console.log(`Adding to cart: ${product.name}, Qty: ${quantity}, BuyNow: ${isBuyNow}`);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            image: (product.images && product.images.length > 0) ? product.images[0] : product.image, // use first image for cart
            quantity: quantity 
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Update navbar cart icon
}

// Dummy updateCartCount (replace with your actual logic from main.js)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-icon .cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    console.log(`Cart count updated: ${totalItems}`);
}
// --- End of Stubs ---

// Update copyright year
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}