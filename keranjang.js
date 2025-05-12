document.addEventListener('DOMContentLoaded', function () {
    // Load cart content
    loadCartContent();
});

// Load cart content
function loadCartContent() {
    const cartContentContainer = document.getElementById('cart-content');

    if (!cartContentContainer) return;

    // Get cart items from localStorage
    const cartItems = getCartItems();

    // Generate cart HTML
    let cartHTML = '';

    if (cartItems.length === 0) {
        // Empty cart
        cartHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2>Keranjang Belanja Anda Kosong</h2>
                <p>Anda belum menambahkan produk apapun ke keranjang.</p>
                <a href="produk.html" class="btn btn-primary">Belanja Sekarang</a>
            </div>
        `;
    } else {
        // Cart with items
        const subtotal = calculateSubtotal(cartItems);

        cartHTML = `
            <div class="cart-container">
                <div class="cart-items">
                    ${cartItems.map(item => `
                        <div class="cart-item" data-id="${item.id}">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-details">
                                <h3 class="cart-item-title">${item.name}</h3>
                                <div class="cart-item-category">${item.category}</div>
                                <div class="cart-item-price">${formatCurrency(item.price)}</div>
                                <div class="product-quantity">
                                    <div class="quantity-control">
                                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                        <input type="number" value="${item.quantity}" min="1" max="50" class="item-quantity" data-id="${item.id}">
                                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                    </div>
                                </div>
                            </div>
                            <button class="remove-item-btn" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                    
                    <div class="cart-actions">
                        <a href="produk.html" class="btn btn-outline">Lanjut Belanja</a>
                        <button class="btn btn-outline clear-cart-btn">Kosongkan Keranjang</button>
                    </div>
                </div>
                
                <div class="cart-summary">
                    <h3 class="summary-title">Ringkasan Belanja</h3>
                    <div class="summary-row">
                        <span>Total Harga (${cartItems.length} barang)</span>
                        <span id="subtotal">${formatCurrency(subtotal)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Pengiriman</span>
                        <span id="shipping">Rp 15.000</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span id="total">${formatCurrency(subtotal + 15000)}</span>
                    </div>
                    <a href="pembayaran.html" class="btn btn-primary btn-block">Checkout</a>
                </div>
            </div>
        `;
    }

    cartContentContainer.innerHTML = cartHTML;

    // Initialize cart events
    if (cartItems.length > 0) {
        initializeCartEvents();
    }
}

// Initialize cart events
function initializeCartEvents() {
    // Quantity buttons
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.item-quantity');
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    const clearCartBtn = document.querySelector('.clear-cart-btn');

    // Minus buttons
    minusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const input = document.querySelector(`.item-quantity[data-id="${productId}"]`);
            let quantity = parseInt(input.value);

            if (quantity > 1) {
                quantity--;
                input.value = quantity;
                updateCartItemQuantity(productId, quantity);
                updateCartSummary();
            }
        });
    });

    // Plus buttons
    plusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const input = document.querySelector(`.item-quantity[data-id="${productId}"]`);
            let quantity = parseInt(input.value);

            if (quantity < 50) {
                quantity++;
                input.value = quantity;
                updateCartItemQuantity(productId, quantity);
                updateCartSummary();
            }
        });
    });

    // Quantity inputs
    quantityInputs.forEach(input => {
        input.addEventListener('change', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            let quantity = parseInt(this.value);

            // Validate quantity
            if (isNaN(quantity) || quantity < 1) {
                quantity = 1;
                this.value = 1;
            } else if (quantity > 50) {
                quantity = 50;
                this.value = 50;
            }

            updateCartItemQuantity(productId, quantity);
            updateCartSummary();
        });
    });

    // Remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);

            // Remove item from DOM
            const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
            cartItem.remove();

            // Update cart summary
            updateCartSummary();

            // Reload cart if empty
            const cartItems = getCartItems();
            if (cartItems.length === 0) {
                loadCartContent();
            }
        });
    });

    // Clear cart button
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function () {
            if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
                clearCart();
                loadCartContent();
            }
        });
    }
}

// Update cart summary
function updateCartSummary() {
    const cartItems = getCartItems();
    const subtotal = calculateSubtotal(cartItems);

    // Update subtotal
    const subtotalElement = document.getElementById('subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = formatCurrency(subtotal);
    }

    // Update total
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = formatCurrency(subtotal + 15000);
    }
}

// Calculate subtotal
function calculateSubtotal(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}