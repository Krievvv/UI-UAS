document.addEventListener("DOMContentLoaded", () => {
  // Initialize settings tabs
  initSettingsTabs()

  // Initialize password toggle
  initPasswordToggle()

  // Initialize theme options
  initThemeOptions()

  // Initialize toggle switches
  initToggleSwitches()

  // Initialize user dropdown
  initUserDropdown()

  // Load user profile data
  loadUserProfile()

  // Initialize form submissions
  initFormSubmissions()

  // Initialize avatar upload
  initAvatarUpload()
})

// Settings tabs functionality
function initSettingsTabs() {
  const tabLinks = document.querySelectorAll(".settings-nav li")
  const tabContents = document.querySelectorAll(".settings-tab")

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      // Remove active class from all links and tabs
      tabLinks.forEach((item) => item.classList.remove("active"))
      tabContents.forEach((tab) => tab.classList.remove("active"))

      // Add active class to clicked link
      link.classList.add("active")

      // Show corresponding tab content
      const tabId = link.getAttribute("data-tab")
      document.getElementById(`${tabId}-tab`).classList.add("active")

      // Update URL hash
      window.location.hash = tabId
    })
  })

  // Check for hash in URL
  const hash = window.location.hash.substring(1)
  if (hash) {
    const activeTab = document.querySelector(`.settings-nav li[data-tab="${hash}"]`)
    if (activeTab) {
      activeTab.click()
    }
  }
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

// Theme options functionality
function initThemeOptions() {
  const themeOptions = document.querySelectorAll(".theme-option")

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove active class from all options
      themeOptions.forEach((item) => item.classList.remove("active"))

      // Add active class to clicked option
      option.classList.add("active")

      // Here you would implement theme switching logic
      // For now, we'll just show a toast notification
      const themeName = option.querySelector("span").textContent
      showToast(`Tema ${themeName} diterapkan`, "success")
    })
  })
}

// Toggle switches functionality
function initToggleSwitches() {
  const toggleInputs = document.querySelectorAll(".toggle-input")

  toggleInputs.forEach((input) => {
    // Update toggle status text if it exists
    const statusElement = input.parentElement.nextElementSibling
    if (statusElement && statusElement.classList.contains("toggle-status")) {
      statusElement.textContent = input.checked ? "Aktif" : "Nonaktif"
    }

    // Add change event listener
    input.addEventListener("change", () => {
      if (statusElement && statusElement.classList.contains("toggle-status")) {
        statusElement.textContent = input.checked ? "Aktif" : "Nonaktif"
      }
    })
  })
}

// User dropdown functionality
function initUserDropdown() {
  const dropdownToggle = document.querySelector(".dropdown-toggle")
  const userDropdown = document.querySelector(".user-dropdown")

  if (dropdownToggle && userDropdown) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      userDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!userDropdown.contains(e.target)) {
        userDropdown.classList.remove("active")
      }
    })
  }
}

// Load user profile data
function loadUserProfile() {
  // Get current user from localStorage or sessionStorage
  const currentUser = getCurrentUser()

  if (currentUser) {
    // Update profile information
    document.getElementById("profile-name").textContent = currentUser.name
    document.getElementById("profile-email").textContent = currentUser.email
    document.getElementById("welcome-name").textContent = currentUser.name

    // Update form fields
    document.getElementById("fullname").value = currentUser.name
    document.getElementById("email").value = currentUser.email

    // Update avatar with user initials if no profile picture
    const profileAvatar = document.getElementById("profile-avatar")
    if (profileAvatar) {
      profileAvatar.src =
        currentUser.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=f97316&color=fff`
    }
  }
}

// Initialize form submissions
function initFormSubmissions() {
  // Account form
  const accountForm = document.getElementById("account-form")
  if (accountForm) {
    accountForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("fullname").value.trim()
      const email = document.getElementById("email").value.trim()
      const phone = document.getElementById("phone").value.trim()
      const birthdate = document.getElementById("birthdate").value
      const gender = document.getElementById("gender").value
      const bio = document.getElementById("bio").value.trim()

      // Update user profile (in a real app, this would be a server request)
      const currentUser = getCurrentUser()
      if (currentUser) {
        currentUser.name = name
        currentUser.email = email
        currentUser.phone = phone
        currentUser.birthdate = birthdate
        currentUser.gender = gender
        currentUser.bio = bio

        // Save updated user
        saveUserSession(currentUser)

        // Update displayed name
        document.getElementById("profile-name").textContent = name
        document.getElementById("profile-email").textContent = email

        // Show success message
        showToast("Profil berhasil diperbarui", "success")
      }
    })
  }

  // Security form
  const securityForm = document.getElementById("security-form")
  if (securityForm) {
    securityForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const currentPassword = document.getElementById("current-password").value
      const newPassword = document.getElementById("new-password").value
      const confirmPassword = document.getElementById("confirm-password").value

      // Simple validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        showToast("Semua field harus diisi", "error")
        return
      }

      if (newPassword !== confirmPassword) {
        showToast("Password baru tidak cocok", "error")
        return
      }

      // In a real app, you would verify the current password and update with the new one
      // For this demo, we'll just show a success message
      showToast("Password berhasil diubah", "success")

      // Reset form
      securityForm.reset()
    })
  }
}

// Initialize avatar upload
function initAvatarUpload() {
  const avatarUpload = document.getElementById("avatar-upload")
  const profileAvatar = document.getElementById("profile-avatar")

  if (avatarUpload && profileAvatar) {
    avatarUpload.addEventListener("change", (e) => {
      const file = e.target.files[0]

      if (file) {
        // Check if file is an image
        if (!file.type.startsWith("image/")) {
          showToast("File harus berupa gambar", "error")
          return
        }

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          showToast("Ukuran file maksimal 2MB", "error")
          return
        }

        // Create file reader to read the image
        const reader = new FileReader()
        reader.onload = (event) => {
          // Update avatar image
          profileAvatar.src = event.target.result

          // In a real app, you would upload the image to a server
          // For this demo, we'll just update the user object
          const currentUser = getCurrentUser()
          if (currentUser) {
            currentUser.avatar = event.target.result
            saveUserSession(currentUser)
          }

          showToast("Foto profil berhasil diperbarui", "success")
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

// Get current logged in user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(sessionStorage.getItem("currentUser"))
}

// Save user session
function saveUserSession(user) {
  // Check if user was stored in localStorage or sessionStorage
  if (localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    sessionStorage.setItem("currentUser", JSON.stringify(user))
  }
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
