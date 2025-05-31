document.addEventListener('DOMContentLoaded', function () {
    // Initialize carousel
    initCarousel();

    // Load featured products (unchanged from original)
    loadFeaturedProducts();

    // Load featured articles (unchanged from original)
    loadFeaturedArticles();

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });
    }

    // Update copyright year
    const currentYearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();

    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Initialize cart count from localStorage
    updateCartCount();

    // Initialize modal close buttons
    const closeButtons = document.querySelectorAll('.modal .close');

    closeButtons.forEach(button => {
        const modal = button.closest('.modal');
        button.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close modal when clicking outside content
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.hero-carousel');

    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    let currentSlide = 0;
    const slideCount = slides.length;

    // Automatically change slides every 5 seconds
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Add event listeners to buttons
    prevButton.addEventListener('click', () => {
        resetAutoplay();
        prevSlide();
    });

    nextButton.addEventListener('click', () => {
        resetAutoplay();
        nextSlide();
    });

    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            resetAutoplay();
            goToSlide(index);
        });
    });

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        slides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');

        currentSlide = slideIndex;
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slideCount;
        goToSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(prevIndex);
    }

    // Reset autoplay timer
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const carouselContainer = carousel.querySelector('.carousel-container');

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const minSwipeDistance = 50;

        if (touchEndX < touchStartX - minSwipeDistance) {
            resetAutoplay();
            nextSlide();
        }

        if (touchEndX > touchStartX + minSwipeDistance) {
            resetAutoplay();
            prevSlide();
        }
    }

    // Initialize with first slide active
    goToSlide(0);
}

// Load featured products (unchanged from original)
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
            image: 'https://jete.id/wp-content/uploads/2023/06/jete-13-pro-13.jpg',
            rating: 4.8,
            reviews: 120
        },
        {
            id: 2,
            name: 'Notebook Premium A5',
            category: 'Alat Tulis',
            price: 45000,
            image: 'https://i.pinimg.com/736x/ed/9c/42/ed9c42752976d5c7f490714808ac3526.jpg',
            rating: 4.5,
            reviews: 85
        },
        {
            id: 3,
            name: 'USB Flash Drive 32GB',
            category: 'Elektronik',
            price: 85000,
            image: 'https://cdn.pixabay.com/photo/2014/03/24/17/07/flash-drive-295105_1280.png',
            rating: 4.7,
            reviews: 64
        },
        {
            id: 4,
            name: 'Buku Panduan Kuliah',
            category: 'Buku',
            price: 75000,
            image: 'https://i.pinimg.com/736x/20/bb/a7/20bba7ccd98273ce8d6fb5e73eea24d3.jpg',
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

// Load featured articles (unchanged from original)
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
            image: 'https://osccdn.medcom.id/images/content/2024/08/27/8d005a005f1bdeb16cc53303df5eb9eb.png',
            excerpt: 'Berbagai cara menghemat pengeluaran selama kuliah tanpa mengurangi kualitas hidup.'
        },
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'Tips Kuliah',
            date: '10 Mei 2025',
            image: 'https://adminsekolah.net/wp-content/uploads/2020/07/TIPS-SUKSES-BELAJAR-ONLINE.png',
            excerpt: 'Strategi belajar online yang efektif untuk mahasiswa di era digital.'
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'Teknologi',
            date: '8 Mei 2025',
            image: 'https://i.pinimg.com/736x/53/16/d4/5316d4847dfbdd7239114a07f51a8e68.jpg',
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

// Format currency
function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Cart management functions
function updateCartCount() {
    const cartItems = getCartItems();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

function getCartItems() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCartItems(items) {
    localStorage.setItem('cart', JSON.stringify(items));
    updateCartCount();
}

function addToCart(product, quantity = 1) {
    const cartItems = getCartItems();

    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push({
            ...product,
            quantity
        });
    }

    saveCartItems(cartItems);
    showToast(`${product.name} ditambahkan ke keranjang!`);
}

function removeFromCart(productId) {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== productId);
    saveCartItems(updatedItems);
}

function updateCartItemQuantity(productId, quantity) {
    const cartItems = getCartItems();
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        } else {
            cartItems[itemIndex].quantity = quantity;
        }

        saveCartItems(cartItems);
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// Toast notification
function showToast(message, type = 'success') {
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);

        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '4px';
        toast.style.backgroundColor = type === 'success' ? '#10b981' : '#ef4444';
        toast.style.color = 'white';
        toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        toast.style.zIndex = '1000';
        toast.style.transition = 'opacity 0.3s ease';
    }

    toast.textContent = message;
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}