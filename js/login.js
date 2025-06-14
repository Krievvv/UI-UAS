document.addEventListener("DOMContentLoaded", () => {
  // Initialize tab functionality
  initTabs()

  // Initialize password toggle
  initPasswordToggle()

  // Initialize forgot password functionality
  initForgotPassword()

  // Initialize login form
  initLoginForm()

  // Initialize register form
  initRegisterForm()

  // Initialize reset password form
  initResetPasswordForm()

  // Check if user is already logged in
  checkLoggedInStatus()

  // Update copyright year
  updateCopyrightYear()
})

// Tab functionality
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Show corresponding tab pane
      const tabId = button.getAttribute("data-tab")
      if (tabId === "login") {
        document.getElementById("login-form").classList.add("active")
      } else if (tabId === "register") {
        document.getElementById("register-form").classList.add("active")
      }
    })
  })
}

// Password toggle functionality
function initPasswordToggle() {
  const toggleButtons = document.querySelectorAll(".toggle-password")

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.previousElementSibling
      const icon = button.querySelector("i")

      // Toggle password visibility
      if (input.type === "password") {
        input.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        input.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })
}

// Forgot password functionality
function initForgotPassword() {
  const forgotPasswordLink = document.getElementById("forgot-password-link")
  const forgotPasswordForm = document.getElementById("forgot-password-form")
  const loginForm = document.getElementById("login-form")
  const backToLoginBtn = document.getElementById("back-to-login-btn")
  const loginTabs = document.querySelector(".login-tabs")

  if (forgotPasswordLink && forgotPasswordForm && loginForm && backToLoginBtn) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault()
      loginForm.classList.remove("active")
      forgotPasswordForm.classList.add("active")
      loginTabs.style.display = "none"
    })

    backToLoginBtn.addEventListener("click", () => {
      forgotPasswordForm.classList.remove("active")
      loginForm.classList.add("active")
      loginTabs.style.display = "flex"
    })
  }
}

// Login form functionality
function initLoginForm() {
  const loginForm = document.getElementById("login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value
      const rememberMe = document.getElementById("remember-me").checked

      // Reset error messages
      document.getElementById("email-error").textContent = ""
      document.getElementById("password-error").textContent = ""

      // Validate form
      let isValid = true

      if (!email) {
        document.getElementById("email-error").textContent = "Email harus diisi"
        isValid = false
      } else if (!isValidEmail(email)) {
        document.getElementById("email-error").textContent = "Format email tidak valid"
        isValid = false
      }

      if (!password) {
        document.getElementById("password-error").textContent = "Password harus diisi"
        isValid = false
      }

      if (isValid) {
        // Check credentials against sample users
        const user = authenticateUser(email, password)

        if (user) {
          // Save user session
          saveUserSession(user, rememberMe)

          // Show success message
          showToast("Login berhasil! Mengalihkan...", "success")

          // Redirect based on user role
          setTimeout(() => {
            if (isAdminEmail(email)) {
              window.location.href = "dashboard.html"
            } else {
              window.location.href = "index.html"
            }
          }, 1500)
        } else {
          // Show error message
          showToast("Email atau password salah", "error")
        }
      }
    })
  }
}

// Register form functionality
function initRegisterForm() {
  const registerForm = document.getElementById("register-form")

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("register-name").value.trim()
      const email = document.getElementById("register-email").value.trim()
      const password = document.getElementById("register-password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const termsAccepted = document.getElementById("terms").checked

      // Reset error messages
      document.getElementById("name-error").textContent = ""
      document.getElementById("register-email-error").textContent = ""
      document.getElementById("register-password-error").textContent = ""
      document.getElementById("confirm-password-error").textContent = ""
      document.getElementById("terms-error").textContent = ""

      // Validate form
      let isValid = true

      if (!name) {
        document.getElementById("name-error").textContent = "Nama harus diisi"
        isValid = false
      }

      if (!email) {
        document.getElementById("register-email-error").textContent = "Email harus diisi"
        isValid = false
      } else if (!isValidEmail(email)) {
        document.getElementById("register-email-error").textContent = "Format email tidak valid"
        isValid = false
      } else if (isEmailTaken(email)) {
        document.getElementById("register-email-error").textContent = "Email sudah terdaftar"
        isValid = false
      }

      if (!password) {
        document.getElementById("register-password-error").textContent = "Password harus diisi"
        isValid = false
      } else if (password.length < 6) {
        document.getElementById("register-password-error").textContent = "Password minimal 6 karakter"
        isValid = false
      }

      if (!confirmPassword) {
        document.getElementById("confirm-password-error").textContent = "Konfirmasi password harus diisi"
        isValid = false
      } else if (password !== confirmPassword) {
        document.getElementById("confirm-password-error").textContent = "Password tidak cocok"
        isValid = false
      }

      if (!termsAccepted) {
        document.getElementById("terms-error").textContent = "Anda harus menyetujui syarat dan ketentuan"
        isValid = false
      }

      if (isValid) {
        // Register new user
        const newUser = registerUser(name, email, password)

        // Show success message
        showToast("Pendaftaran berhasil! Silakan login.", "success")

        // Switch to login tab
        setTimeout(() => {
          document.querySelector('[data-tab="login"]').click()
          document.getElementById("email").value = email
        }, 1500)
      }
    })
  }
}

// Reset password form functionality
function initResetPasswordForm() {
  const resetForm = document.getElementById("reset-password-form")

  if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const email = document.getElementById("reset-email").value.trim()

      // Reset error messages
      document.getElementById("reset-email-error").textContent = ""

      // Validate form
      let isValid = true

      if (!email) {
        document.getElementById("reset-email-error").textContent = "Email harus diisi"
        isValid = false
      } else if (!isValidEmail(email)) {
        document.getElementById("reset-email-error").textContent = "Format email tidak valid"
        isValid = false
      } else if (!isEmailRegistered(email)) {
        document.getElementById("reset-email-error").textContent = "Email tidak terdaftar"
        isValid = false
      }

      if (isValid) {
        // Show success message
        showToast("Link reset password telah dikirim ke email Anda", "success")

        // Switch back to login tab
        setTimeout(() => {
          document.getElementById("back-to-login-btn").click()
        }, 1500)
      }
    })
  }
}

// Check if user is already logged in
function checkLoggedInStatus() {
  const currentUser = getCurrentUser()

  if (currentUser) {
    // Redirect based on user role
    if (isAdminEmail(currentUser.email)) {
      window.location.href = "admin/dashboard.html"
    } else {
      window.location.href = "user/dashboard.html"
    }
  }
}

// Update copyright year
function updateCopyrightYear() {
  const currentYearElements = document.querySelectorAll("#current-year")
  const currentYear = new Date().getFullYear()

  currentYearElements.forEach((element) => {
    element.textContent = currentYear
  })
}

// Helper Functions

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Check if email is already registered
function isEmailTaken(email) {
  const users = getSampleUsers()
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase())
}

// Check if email is registered
function isEmailRegistered(email) {
  const users = getSampleUsers()
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase())
}

// Authenticate user
function authenticateUser(email, password) {
  const users = getSampleUsers()
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password)
}

// Register new user
function registerUser(name, email, password) {
  const users = getSampleUsers()

  // Determine role based on email domain
  const role = isAdminEmail(email) ? "admin" : "user"

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
  }

  // Add to sample users (in a real app, this would be a server-side operation)
  users.push(newUser)
  localStorage.setItem("sampleUsers", JSON.stringify(users))

  return newUser
}

// Save user session
function saveUserSession(user, rememberMe) {
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }

  if (rememberMe) {
    localStorage.setItem("currentUser", JSON.stringify(sessionUser))
  } else {
    sessionStorage.setItem("currentUser", JSON.stringify(sessionUser))
  }
}

// Get current logged in user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(sessionStorage.getItem("currentUser"))
}

// Check if email is admin email
function isAdminEmail(email) {
  // Admin emails are either from admin.krievvvshop.com domain or specific email addresses
  return (
    email.toLowerCase().endsWith("@admin.krievvvshop.com") ||
    email.toLowerCase() === "admin@krievvvshop.com" ||
    email.toLowerCase() === "admin@gmail.com"
  )
}

// Get sample users
function getSampleUsers() {
  let users = JSON.parse(localStorage.getItem("sampleUsers"))

  if (!users) {
    // Initialize with sample users if none exist
    users = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@krievvvshop.com",
        password: "admin123",
        role: "admin",
        createdAt: "2023-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        name: "Regular User",
        email: "user@gmail.com",
        password: "user123",
        role: "user",
        createdAt: "2023-01-02T00:00:00.000Z",
      },
    ]
    localStorage.setItem("sampleUsers", JSON.stringify(users))
  }

  return users
}

// Show toast notification
function showToast(message, type = "success") {
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
  }, 3000)
}
