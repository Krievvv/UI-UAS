document.addEventListener('DOMContentLoaded', function () {
    loadCartContent();
    updateCartSummary();
    initializeGlobalEventListeners(); // Untuk event delegation
});

// Asumsi fungsi-fungsi ini ada di main.js atau di sini
// Jika belum ada, Anda perlu mengimplementasikannya
function getCartItems() {
    // Contoh implementasi:
    const items = localStorage.getItem('cart');
    return items ? JSON.parse(items) : [];
    // return [ // Contoh data untuk testing
    //     { id: 1, name: 'Headphone Bluetooth Mahasiswa Edition', price: 299000, quantity: 1, image: 'https://via.placeholder.com/100' },
    //     { id: 2, name: 'Mouse Gaming Keren', price: 150000, quantity: 2, image: 'https://via.placeholder.com/100' }
    // ];
}

function updateCartItemQuantity(productId, quantity) {
    let cartItems = getCartItems();
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount(); // Update cart count in navbar
    }
}

function removeFromCart(productId) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount(); // Update cart count in navbar
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount(); // Update cart count in navbar
}

function formatCurrency(amount) {
    // Contoh implementasi sederhana:
    return 'Rp ' + amount.toLocaleString('id-ID');
    // Implementasi lebih baik jika sudah ada
}

function updateCartCount() {
    // Fungsi untuk update angka di ikon keranjang di navbar
    const cartItems = getCartItems();
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }
}
// Akhir fungsi asumsi

function loadCartContent() {
    const cartContentContainer = document.getElementById('cart-content');
    const cartItems = getCartItems();

    // Hapus pesan loading jika ada
    const loadingMessage = cartContentContainer.querySelector('.cart-loading');
    if (loadingMessage) loadingMessage.remove();

    if (cartItems.length === 0) {
        cartContentContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2>Keranjang Belanja Anda Kosong</h2>
                <p>Anda belum menambahkan produk apapun ke keranjang.</p>
                <a href="produk.html" class="btn-shop">Mulai Belanja</a>
            </div>
        `;
        document.getElementById('clear-cart-button').style.display = 'none';
        return;
    }

    document.getElementById('clear-cart-button').style.display = 'block';
    let cartHTML = '';
    cartItems.forEach(item => {
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                        <div class="item-price">${formatCurrency(item.price)}</div>
                    </div>
                    <div class="item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" aria-label="Kurangi jumlah" data-action="decrease">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="item-quantity" value="${item.quantity}" min="1" max="50" aria-label="Jumlah item">
                            <button class="quantity-btn plus" aria-label="Tambah jumlah" data-action="increase">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item" aria-label="Hapus item" data-action="remove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartContentContainer.innerHTML = cartHTML;
}

function initializeGlobalEventListeners() {
    const cartContentContainer = document.getElementById('cart-content');

    // Event listener untuk tombol di dalam item keranjang (delegation)
    if (cartContentContainer) {
        cartContentContainer.addEventListener('click', function(event) {
            const target = event.target;
            const cartItemElement = target.closest('.cart-item');
            if (!cartItemElement) return;

            const productId = parseInt(cartItemElement.dataset.id);
            const action = target.closest('[data-action]')?.dataset.action;

            if (action === 'increase' || action === 'decrease') {
                const quantityInput = cartItemElement.querySelector('.item-quantity');
                let quantity = parseInt(quantityInput.value);
                if (action === 'increase' && quantity < 50) quantity++;
                if (action === 'decrease' && quantity > 1) quantity--;
                quantityInput.value = quantity;
                updateCartItemQuantity(productId, quantity);
                updateCartSummary();
            } else if (action === 'remove') {
                if (confirm('Apakah Anda yakin ingin menghapus item ini dari keranjang?')) {
                    removeFromCart(productId);
                    loadCartContent(); // Reload content untuk menghapus item dari DOM
                    updateCartSummary();
                }
            }
        });

        cartContentContainer.addEventListener('change', function(event) {
            const target = event.target;
            if (target.classList.contains('item-quantity')) {
                const cartItemElement = target.closest('.cart-item');
                if (!cartItemElement) return;

                const productId = parseInt(cartItemElement.dataset.id);
                let quantity = parseInt(target.value);

                if (isNaN(quantity) || quantity < 1) {
                    quantity = 1;
                } else if (quantity > 50) { // Max quantity
                    quantity = 50;
                }
                target.value = quantity; // Update input field dengan nilai yang valid
                updateCartItemQuantity(productId, quantity);
                updateCartSummary();
            }
        });
    }

    // Event listener untuk tombol di luar item (Checkout & Clear Cart)
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Logika checkout Anda sudah benar, pastikan checkLoginStatus() ada jika diperlukan
            // if (!checkLoginStatus()) {
            //     alert('Silakan login terlebih dahulu untuk melanjutkan pembayaran.');
            //     // window.location.href = 'login.html'; // Arahkan ke login
            //     return;
            // }

            const cartItems = getCartItems();
            if (cartItems.length > 0) {
                const subtotal = calculateSubtotal(cartItems);
                const shipping = cartItems.length > 0 ? 15000 : 0; // Sama seperti di updateCartSummary
                const total = subtotal + shipping;

                localStorage.setItem('checkout_items', JSON.stringify(cartItems));
                localStorage.setItem('checkout_subtotal', subtotal.toString());
                localStorage.setItem('checkout_shipping', shipping.toString());
                localStorage.setItem('checkout_total', total.toString());

                window.location.href = 'pembayaran.html';
            }
        });
    }

    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
                clearCart();
                loadCartContent();
                updateCartSummary();
            }
        });
    }
}


function updateCartSummary() {
    const cartItems = getCartItems();
    const subtotal = calculateSubtotal(cartItems);
    const shipping = cartItems.length > 0 ? 15000 : 0; // Biaya kirim jika ada item
    const total = subtotal + shipping;

    document.getElementById('total-items').textContent = `${cartItems.reduce((sum, item) => sum + item.quantity, 0)} item`;
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('shipping').textContent = formatCurrency(shipping);
    document.getElementById('total').textContent = formatCurrency(total);

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.disabled = cartItems.length === 0;
    }

    const clearCartBtn = document.getElementById('clear-cart-button');
    if (clearCartBtn) {
        clearCartBtn.style.display = cartItems.length > 0 ? 'block' : 'none';
    }

    updateCartCount(); // Untuk sinkronisasi dengan counter di navbar
}

function calculateSubtotal(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Fungsi untuk mengisi tahun copyright di footer (dari main.js Anda)
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// (Opsional) Fungsi checkLoginStatus jika Anda memerlukannya sebelum checkout
// function checkLoginStatus() {
//     // Implementasi pengecekan status login, misalnya dari localStorage atau session
//     // return localStorage.getItem('isLoggedIn') === 'true'; 
//     return true; // Placeholder, asumsikan selalu login untuk contoh ini
// }