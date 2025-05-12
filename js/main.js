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

    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cartItems.push({
            ...product,
            quantity
        });
    }

    saveCartItems(cartItems);

    // Show success message
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
            // Remove item if quantity is 0 or less
            cartItems.splice(itemIndex, 1);
        } else {
            // Update quantity
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

// Format currency
function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}