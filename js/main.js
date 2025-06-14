document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      mobileMenu.classList.remove("active")
    }
  })

  // Update copyright year
  const currentYearElements = document.querySelectorAll("#current-year")
  const currentYear = new Date().getFullYear()

  currentYearElements.forEach((element) => {
    element.textContent = currentYear
  })

  // Initialize cart count from localStorage
  updateCartCount()

  // Initialize modal functionality
  function initModals() {
    const closeButtons = document.querySelectorAll(".modal .close")

    closeButtons.forEach((button) => {
      const modal = button.closest(".modal")
      button.addEventListener("click", () => {
        closeModal(modal.id)
      })
    })

    // Close modal when clicking outside content
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal.id)
        }
      })
    })
  }
  initModals()
})

// Cart Functions
// Add to cart function
function addToCart(product, quantity = 1) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")

  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()

  // Show success message
  showToast("Produk berhasil ditambahkan ke keranjang!", "success")
}

// Get cart items
function getCartItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  const cartCounts = document.querySelectorAll(".cart-count")
  cartCounts.forEach((el) => {
    el.textContent = count
  })
}

// Clear cart
function clearCart() {
  localStorage.removeItem("cart")
  updateCartCount()
  showToast("Keranjang berhasil dikosongkan", "info")
}

// Format currency
function formatCurrency(amount) {
  return "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// Toast notification
function showToast(message, type = "success", duration = 3000) {
  const toastContainer = document.getElementById("toast-container")

  if (!toastContainer) {
    const container = document.createElement("div")
    container.id = "toast-container"
    document.body.appendChild(container)
  }

  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  let iconClass = "fa-check-circle"
  let title = "Sukses"

  switch (type) {
    case "error":
      iconClass = "fa-times-circle"
      title = "Error"
      break
    case "warning":
      iconClass = "fa-exclamation-triangle"
      title = "Peringatan"
      break
    case "info":
      iconClass = "fa-info-circle"
      title = "Informasi"
      break
  }

  toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `

  document.getElementById("toast-container").appendChild(toast)

  // Add event listener to close button
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.remove()
  })

  // Auto remove toast after duration
  setTimeout(() => {
    toast.style.opacity = "0"
    setTimeout(() => {
      toast.remove()
    }, 300)
  }, duration)
}

// Scroll to top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.querySelector(".scroll-to-top")

  if (!scrollToTopBtn) return

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Initialize scroll to top
document.addEventListener("DOMContentLoaded", initScrollToTop)

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "" // Restore scrolling
  }
}

// Get URL parameters
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

// Add the logout functionality to the main.js file

// Add these functions at the end of the file:

// Logout functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize logout buttons
  initLogoutButtons()
})

function initLogoutButtons() {
  const logoutButtons = document.querySelectorAll(
    "#logout-btn, #mobile-logout-btn, #sidebar-logout-btn, #header-logout-btn",
  )

  logoutButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        logout()
      })
    }
  })
}

function logout() {
  // Clear user session
  localStorage.removeItem("currentUser")
  sessionStorage.removeItem("currentUser")

  // Show success message
  showToast("Berhasil keluar dari akun", "success")

  // Redirect to login page after a short delay
  setTimeout(() => {
    window.location.href = "login.html"
  }, 1000)
}
