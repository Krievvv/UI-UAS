document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutData(); // Combines item loading and summary update
    initializePaymentMethodSelection();
    initializeFormValidationAndPayButton();
    updateCartCount(); // Update navbar cart icon on page load
});

// --- Helper Functions (Ideally from main.js or shared utility) ---
function getCartItems() {
    const items = localStorage.getItem('checkout_items'); // From keranjang.js
    return items ? JSON.parse(items) : [];
}

function formatCurrency(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

function clearCartStorage() { // Renamed to avoid conflict if main.js has 'clearCart' for different purpose
    localStorage.removeItem('checkout_items');
    localStorage.removeItem('checkout_subtotal');
    localStorage.removeItem('checkout_shipping');
    localStorage.removeItem('checkout_total');
    localStorage.removeItem('cart'); // Also clear the main cart
    updateCartCount(); // Update navbar cart icon
}

function updateCartCount() { // Assumed to be in main.js, duplicate for completeness if not
    const mainCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = mainCart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-icon .cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}
// --- End Helper Functions ---

function loadCheckoutData() {
    const checkoutItemsContainer = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');
    const payButton = document.getElementById('pay-button');

    const cartItems = getCartItems();
    const subtotal = parseFloat(localStorage.getItem('checkout_subtotal')) || 0;
    const shipping = parseFloat(localStorage.getItem('checkout_shipping')) || 0;
    const total = parseFloat(localStorage.getItem('checkout_total')) || 0;

    if (cartItems.length === 0 || !total) {
        checkoutItemsContainer.innerHTML = '<p class="loading-text">Keranjang Anda kosong atau data tidak ditemukan. Silakan kembali ke <a href="keranjang.html">keranjang</a>.</p>';
        if (payButton) payButton.disabled = true;
        if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
        if (shippingEl) shippingEl.textContent = formatCurrency(0);
        if (totalEl) totalEl.textContent = formatCurrency(0);
        return;
    }

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
                <div class="checkout-item-subtotal">
                    ${formatCurrency(item.quantity * item.price)}
                </div>
            </div>
        `;
    });
    checkoutItemsContainer.innerHTML = checkoutItemsHTML;

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (shippingEl) shippingEl.textContent = formatCurrency(shipping);
    if (totalEl) totalEl.textContent = formatCurrency(total);
    if (payButton) payButton.disabled = false; // Enable button if items are loaded
}

function initializePaymentMethodSelection() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const qrisImage = document.getElementById('qris-image'); // Dapatkan elemen gambar QRIS

    paymentMethods.forEach(method => {
        const radio = method.querySelector('input[type="radio"]');
        
        method.addEventListener('click', () => {
            if (radio) {
                radio.checked = true; // Ensure radio is checked
                // Trigger change event manually to update UI if needed by other listeners
                radio.dispatchEvent(new Event('change', { bubbles: true })); 
            }
        });

        if (radio) {
            radio.addEventListener('change', () => { // Dengarkan event 'change' pada radio button
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');

                // Logika untuk menampilkan/menyembunyikan gambar QRIS
                if (radio.value === 'qris' && radio.checked) {
                    if (qrisImage) qrisImage.style.display = 'block';
                } else {
                    if (qrisImage) qrisImage.style.display = 'none';
                }
            });
        }

        // Initial active state and QRIS visibility based on checked radio
        if (radio && radio.checked) {
            method.classList.add('active');
            if (radio.value === 'qris') {
                if (qrisImage) qrisImage.style.display = 'block';
            } else {
                if (qrisImage) qrisImage.style.display = 'none';
            }
        }
    });
}


function initializeFormValidationAndPayButton() {
    const form = document.getElementById('checkout-main-form');
    const payButton = document.getElementById('pay-button');
    const buttonText = payButton.querySelector('.button-text');
    const spinner = payButton.querySelector('.spinner');

    const inputsToValidate = [
        { id: 'name', errorId: 'name-error', validation: (val) => val.trim() !== '', message: 'Nama lengkap wajib diisi.' },
        { id: 'phone', errorId: 'phone-error', validation: (val) => /^(08)\d{8,11}$/.test(val.trim()), message: 'Nomor telepon tidak valid (Contoh: 081234567890).' },
        { id: 'email', errorId: 'email-error', validation: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()), message: 'Format email tidak valid.' },
        { id: 'address', errorId: 'address-error', validation: (val) => val.trim() !== '', message: 'Alamat lengkap wajib diisi.' },
        { id: 'city', errorId: 'city-error', validation: (val) => val.trim() !== '', message: 'Kota/Kabupaten wajib diisi.' },
        { id: 'province', errorId: 'province-error', validation: (val) => val.trim() !== '', message: 'Provinsi wajib diisi.' },
        { id: 'postal', errorId: 'postal-error', validation: (val) => /^\d{5}$/.test(val.trim()), message: 'Kode pos tidak valid (harus 5 digit).' }
    ];

    inputsToValidate.forEach(field => {
        const inputElement = document.getElementById(field.id);
        if (inputElement) {
            inputElement.addEventListener('input', () => validateField(inputElement, field.errorId, field.validation, field.message));
            inputElement.addEventListener('blur', () => validateField(inputElement, field.errorId, field.validation, field.message));
        }
    });
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateAllFields()) {
                if (confirm('Apakah Anda yakin dengan data pesanan dan ingin melanjutkan pembayaran?')) {
                    // Show spinner, disable button
                    buttonText.style.display = 'none';
                    spinner.style.display = 'inline-block';
                    payButton.disabled = true;
                    
                    processPayment();
                }
            } else {
                alert('Mohon periksa kembali data Anda. Terdapat informasi yang belum valid.');
            }
        });
    }

    function validateField(inputElement, errorId, validationFn, message) {
        const errorElement = document.getElementById(errorId);
        if (!inputElement.value.trim() && !inputElement.required) { // Don't validate empty optional fields on input/blur unless required
             errorElement.textContent = '';
             inputElement.classList.remove('input-error');
             return true;
        }
        if (validationFn(inputElement.value)) {
            errorElement.textContent = '';
            inputElement.classList.remove('input-error');
            return true;
        } else {
            errorElement.textContent = message;
            inputElement.classList.add('input-error');
            return false;
        }
    }

    function validateAllFields() {
        let isFormValid = true;
        inputsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            // Hanya validasi field yang required atau yang tidak kosong jika opsional
            if (inputElement.required || inputElement.value.trim() !== '') { 
                 if (!validateField(inputElement, field.errorId, field.validation, field.message)) {
                    isFormValid = false;
                }
            }
        });

        // Validate payment method
        const paymentMethodError = document.getElementById('payment_method-error');
        const selectedPaymentMethod = form.querySelector('input[name="payment_method"]:checked');
        if (!selectedPaymentMethod) {
            paymentMethodError.textContent = 'Mohon pilih metode pembayaran.';
            isFormValid = false;
        } else {
            paymentMethodError.textContent = '';
        }
        return isFormValid;
    }
}

function processPayment() {
    const form = document.getElementById('checkout-main-form');
    const payButton = document.getElementById('pay-button');
    const buttonText = payButton.querySelector('.button-text');
    const spinner = payButton.querySelector('.spinner');

    // Collect data (already validated)
    const shippingInfo = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        address: form.address.value,
        city: form.city.value,
        province: form.province.value,
        postal: form.postal.value,
        notes: form.notes.value,
        paymentMethod: form.querySelector('input[name="payment_method"]:checked').value
    };
    const cartItems = getCartItems();
    const totalAmount = parseFloat(localStorage.getItem('checkout_total')) || 0;

    console.log("Processing payment for:", shippingInfo, cartItems, totalAmount);

    // Simulate payment processing delay
    setTimeout(() => {
        alert('Pembayaran Berhasil! Terima kasih atas pesanan Anda.\nAnda akan dialihkan ke halaman riwayat transaksi.');
        
        clearCartStorage();
        
        // Restore button state (though we are redirecting)
        buttonText.style.display = 'inline-block';
        spinner.style.display = 'none';
        // payButton.disabled = false; // Not strictly needed if redirecting

        window.location.href = 'history-transaksi.html'; // Ganti dengan halaman sukses atau riwayat yang sesuai
    }, 2000); // 2 second delay
}