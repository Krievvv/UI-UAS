// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
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
});

// Cart Functions
// Add to cart function
function addToCart(product, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    alert('Produk berhasil ditambahkan ke keranjang!');
}

// Get cart items
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(el => {
        el.textContent = count;
    });
}

// Clear cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// Format currency
function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Toast notification
function showToast(message, type = 'success') {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);

        // Add toast styles if not in CSS
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

    // Set message and show toast
    toast.textContent = message;
    toast.style.opacity = '1';

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize modal close buttons
document.addEventListener('DOMContentLoaded', function () {
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

// Get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}