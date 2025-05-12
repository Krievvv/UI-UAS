document.addEventListener('DOMContentLoaded', function () {
    // Load products
    loadProducts();

    // Initialize category buttons
    initializeCategories();

    // Initialize sort select
    initializeSortSelect();

    // Initialize search
    initializeSearch();
});

// Load products
function loadProducts(category = 'all', sortBy = 'terbaru') {
    const productsContainer = document.getElementById('products-container');

    if (!productsContainer) return;

    // Sample products data
    const products = [
        {
            id: 1,
            name: 'Headphone Bluetooth Mahasiswa Edition',
            category: 'elektronik',
            categoryName: 'Elektronik',
            price: 299000,
            image: 'https://jete.id/wp-content/uploads/2023/06/jete-13-pro-13.jpg',
            rating: 4.8,
            reviews: 120,
            date: new Date('2025-05-01')
        },
        {
            id: 2,
            name: 'Notebook Premium A5',
            category: 'alat-tulis',
            categoryName: 'Alat Tulis',
            price: 45000,
            image: 'https://down-id.img.susercontent.com/file/a905daf36db4379d7973c88090864fbd',
            rating: 4.5,
            reviews: 85,
            date: new Date('2025-04-28')
        },
        {
            id: 3,
            name: 'USB Flash Drive 32GB',
            category: 'elektronik',
            categoryName: 'Elektronik',
            price: 85000,
            image: 'https://cdn.pixabay.com/photo/2014/03/24/17/07/flash-drive-295105_1280.png',
            rating: 4.7,
            reviews: 64,
            date: new Date('2025-04-25')
        },
        {
            id: 4,
            name: 'Buku Panduan Kuliah',
            category: 'buku',
            categoryName: 'Buku',
            price: 75000,
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/107/MTA-154926368/gramedia_gramedia_full01.jpg',
            rating: 4.6,
            reviews: 42,
            date: new Date('2025-04-22')
        },
        {
            id: 5,
            name: 'Mouse Wireless',
            category: 'elektronik',
            categoryName: 'Elektronik',
            price: 150000,
            image: 'img/product-5.jpg',
            rating: 4.4,
            reviews: 56,
            date: new Date('2025-04-20')
        },
        {
            id: 6,
            name: 'Keyboard Mechanical',
            category: 'elektronik',
            categoryName: 'Elektronik',
            price: 350000,
            image: 'img/product-6.jpg',
            rating: 4.9,
            reviews: 38,
            date: new Date('2025-04-18')
        },
        {
            id: 7,
            name: 'Sabun Mandi',
            category: 'kebutuhan-sehari-hari',
            categoryName: 'Kebutuhan Sehari-hari',
            price: 15000,
            image: 'img/product-7.jpg',
            rating: 4.3,
            reviews: 92,
            date: new Date('2025-04-15')
        },
        {
            id: 8,
            name: 'Deterjen Sachet',
            category: 'kebutuhan-sehari-hari',
            categoryName: 'Kebutuhan Sehari-hari',
            price: 5000,
            image: 'img/product-8.jpg',
            rating: 4.2,
            reviews: 78,
            date: new Date('2025-04-12')
        }
    ];

    // Filter products by category if needed
    let filteredProducts = category === 'all'
        ? products
        : products.filter(product => product.category === category);

    // Sort products
    switch (sortBy) {
        case 'termurah':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'termahal':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'terbaru':
        default:
            filteredProducts.sort((a, b) => b.date - a.date);
            break;
    }

    // Generate HTML for products
    let productsHTML = '';

    if (filteredProducts.length === 0) {
        productsHTML = '<div class="no-results">Tidak ada produk yang ditemukan.</div>';
    } else {
        filteredProducts.forEach(product => {
            productsHTML += `
                <div class="product-card">
                    <a href="produk-detail.html?id=${product.id}">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <div class="product-category">${product.categoryName}</div>
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
    }

    productsContainer.innerHTML = productsHTML;
}

// Initialize category buttons
function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get category from data attribute
            const category = this.getAttribute('data-category');

            // Get current sort value
            const sortBy = document.getElementById('sort-select').value;

            // Load products with selected category and sort
            loadProducts(category, sortBy);
        });
    });
}

// Initialize sort select
function initializeSortSelect() {
    const sortSelect = document.getElementById('sort-select');

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            // Get current category
            const category = getActiveCategory();

            // Get selected sort value
            const sortBy = this.value;

            // Load products with current category and selected sort
            loadProducts(category, sortBy);
        });
    }
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('produk-search');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase().trim();

            if (searchTerm.length < 2) {
                // If search term is too short, show all products
                loadProducts(getActiveCategory(), document.getElementById('sort-select').value);
                return;
            }

            // Get all product cards
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const category = card.querySelector('.product-category').textContent.toLowerCase();

                // Show/hide based on search term
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });

            // Show message if no results
            const visibleCards = document.querySelectorAll('.product-card[style="display: none;"]');
            const noResults = document.querySelector('.no-results');

            if (visibleCards.length === productCards.length) {
                if (!noResults) {
                    const container = document.getElementById('products-container');
                    container.innerHTML += '<div class="no-results">Tidak ada produk yang ditemukan.</div>';
                }
            } else {
                if (noResults) {
                    noResults.remove();
                }
            }
        });
    }
}

// Get active category
function getActiveCategory() {
    const activeButton = document.querySelector('.category-btn.active');
    return activeButton ? activeButton.getAttribute('data-category') : 'all';
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