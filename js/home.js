document.addEventListener('DOMContentLoaded', function () {
    // Load featured products
    loadFeaturedProducts();

    // Load featured articles
    loadFeaturedArticles();
});

// Load featured products
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');

    if (!featuredProductsContainer) return;

    // Sample featured products data
    const featuredProducts = [
        {
            id: 1,
            name: 'Headphone Bluetooth Mahasiswa Edition',
            category: 'Elektronik',
            price: 299000,
            image: 'img/product-1.jpg',
            rating: 4.8,
            reviews: 120
        },
        {
            id: 2,
            name: 'Notebook Premium A5',
            category: 'Alat Tulis',
            price: 45000,
            image: 'img/product-2.jpg',
            rating: 4.5,
            reviews: 85
        },
        {
            id: 3,
            name: 'USB Flash Drive 32GB',
            category: 'Elektronik',
            price: 85000,
            image: 'img/product-3.jpg',
            rating: 4.7,
            reviews: 64
        },
        {
            id: 4,
            name: 'Buku Panduan Kuliah',
            category: 'Buku',
            price: 75000,
            image: 'img/product-4.jpg',
            rating: 4.6,
            reviews: 42
        }
    ];

    // Generate HTML for featured products
    let productsHTML = '';

    featuredProducts.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <a href="produk-detail.html?id=${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-rating">
                            <div class="stars">
                                ${generateStarRating(product.rating)}
                                <span>${product.rating} (${product.reviews})</span>
                            </div>
                        </div>
                        <div class="product-price">${formatCurrency(product.price)}</div>
                    </div>
                </a>
            </div>
        `;
    });

    featuredProductsContainer.innerHTML = productsHTML;
}

// Load featured articles
function loadFeaturedArticles() {
    const featuredArticlesContainer = document.getElementById('featured-articles');

    if (!featuredArticlesContainer) return;

    // Sample featured articles data
    const featuredArticles = [
        {
            id: 1,
            title: 'Tips Hemat untuk Mahasiswa Kos di Surabaya Timur',
            category: 'Tips Kuliah',
            date: '12 Mei 2025',
            image: 'img/article-1.jpg',
            excerpt: 'Berbagai cara menghemat pengeluaran selama kuliah tanpa mengurangi kualitas hidup.'
        },
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'Tips Kuliah',
            date: '10 Mei 2025',
            image: 'img/article-2.jpg',
            excerpt: 'Strategi belajar online yang efektif untuk mahasiswa di era digital.'
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'Teknologi',
            date: '8 Mei 2025',
            image: 'img/article-3.jpg',
            excerpt: 'Pilihan gadget terbaik untuk menunjang kegiatan perkuliahan dengan budget terbatas.'
        }
    ];

    // Generate HTML for featured articles
    let articlesHTML = '';

    featuredArticles.forEach(article => {
        articlesHTML += `
            <div class="article-card">
                <a href="artikel-detail.html?id=${article.id}">
                    <div class="article-image">
                        <img src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="article-info">
                        <div class="article-date">${article.date} • ${article.category}</div>
                        <h3 class="article-title">${article.title}</h3>
                        <p class="article-excerpt">${article.excerpt}</p>
                    </div>
                </a>
            </div>
        `;
    });

    featuredArticlesContainer.innerHTML = articlesHTML;
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