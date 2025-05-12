document.addEventListener('DOMContentLoaded', function() {
    // Load checkout items
    loadCheckoutItems();
    
    // Initialize payment button
    initializePaymentButton();
});

// Load checkout items
function loadCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    
    if (!checkoutItemsContainer) return;
    
    // Get cart items from localStorage
    const cartItems = getCartItems();
    
    // Generate checkout items HTML
    let checkoutItemsHTML = '';
    
    cartItems.forEach(item => {
        checkoutItemsHTML += `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="checkout-item-details">
                    <h4 class="checkout-item-title">${item.name}</h4>
                    <div class="checkout-item-price">
                        ${item.quantity} x ${formatCurrency(item.price)}
                    </div>
                </div>
            </div>
        `;
    });
    
    checkoutItemsContainer.innerHTML = checkoutItemsHTML;
    
    // Update subtotal and total
    updateSummaryTotals(cartItems);
}

// Update summary totals
function updateSummaryTotals(cartItems) {
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

// Initialize payment button
function initializePaymentButton() {
    const payButton = document.getElementById('pay-button');
    
    if (!payButton) return;
    
    payButton.addEventListener('click', function() {
        // Get shipping information
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const province = document.getElementById('province').value;
        const postal = document.getElementById('postal').value;
        const notes = document.getElementById('notes').value;
        
        // Get payment method
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        // Get cart items
        const cartItems = getCartItems();
        
        // Validate shipping information
        if (!name || !phone || !email || !address || !city || !province || !postal) {
            alert('Mohon lengkapi informasi pengiriman.');
            return;
        }
        
        // Confirm payment
        if (confirm('Apakah Anda yakin ingin melakukan pembayaran?')) {
            // Process payment
            processPayment(name, phone, email, address, city, province, postal, notes, paymentMethod, cartItems);
        }
    });
}

// Process payment
function processPayment(name, phone, email, address, city, province, postal, notes, paymentMethod, cartItems) {
    // Simulate payment processing
    alert('Pembayaran berhasil! Terima kasih atas pesanan Anda.');
    
    // Clear cart
    clearCart();
    
    // Redirect to transaction history
    window.location.href = 'history-transaksi.html';
}