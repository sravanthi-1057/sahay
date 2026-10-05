/**
 * SAHAY Platform — Authentication & User State Manager
 * Simulates user registration, login, session state, and dynamic navbar updates.
 */

// Key definitions for LocalStorage
const STORAGE_USERS_KEY = 'sahay_registered_users';
const STORAGE_CURRENT_USER_KEY = 'sahay_current_user';

// Initialize default users if empty
function getRegisteredUsers() {
  try {
    const users = localStorage.getItem(STORAGE_USERS_KEY);
    return users ? JSON.parse(users) : [
      { name: "Demo User", email: "user@sahay.org", password: "password123" }
    ];
  } catch (e) {
    return [];
  }
}

// Get currently logged-in user
function getCurrentUser() {
  try {
    const user = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

// Register a new user
function registerUser(name, email, password) {
  const users = getRegisteredUsers();
  
  // Check if email already exists
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser = { name, email: email.toLowerCase(), password };
  users.push(newUser);
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

  // Automatically log in user after signup
  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify({ name: newUser.name, email: newUser.email }));
  return { success: true, user: newUser };
}

// Log in user
function loginUser(email, password) {
  const users = getRegisteredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return { success: false, message: "Invalid email or password. Please try again." };
  }

  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify({ name: user.name, email: user.email }));
  return { success: true, user };
}

// Log out user
function logoutUser() {
  localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  window.location.reload();
}

// Dynamic Navbar Renderer
function updateNavbarAuthUI() {
  const authContainer = document.getElementById('navbarAuthButtons');
  if (!authContainer) return;

  const currentUser = getCurrentUser();

  if (currentUser) {
    // Authenticated state
    authContainer.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-sahay-outline btn-sm dropdown-toggle font-weight-bold d-flex align-items-center gap-2" type="button" id="userMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <div class="rounded-circle bg-espresso text-warning font-weight-bold d-flex align-items-center justify-content-center" style="width: 1.75rem; height: 1.75rem; font-size: 0.8rem;">
            ${currentUser.name.charAt(0).toUpperCase()}
          </div>
          <span>${escapeHtml(currentUser.name)}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-beige" aria-labelledby="userMenuDropdown">
          <li>
            <div class="dropdown-header">
              <strong class="text-dark d-block">${escapeHtml(currentUser.name)}</strong>
              <span class="small text-muted">${escapeHtml(currentUser.email)}</span>
            </div>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-link dropdown-item small font-weight-bold d-flex align-items-center gap-2" href="saved-services.html">
              <i class="bi bi-bookmark-fill text-warning"></i> Saved Services
            </a>
          </li>
          <li>
            <a class="dropdown-link dropdown-item small font-weight-bold d-flex align-items-center gap-2" href="find-help.html">
              <i class="bi bi-search text-orange"></i> Find Help
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <button onclick="logoutUser();" class="dropdown-item small text-danger font-weight-bold d-flex align-items-center gap-2">
              <i class="bi bi-box-arrow-right"></i> Log Out
            </button>
          </li>
        </ul>
      </div>
    `;
  } else {
    // Unauthenticated state
    authContainer.innerHTML = `
      <a href="login.html" class="btn btn-sahay-outline btn-sm font-weight-bold px-3">Login</a>
      <a href="signup.html" class="btn btn-sahay-primary btn-sm font-weight-bold px-3">Sign Up</a>
    `;
  }
}

// Run auth check when DOM is loaded
document.addEventListener('DOMContentLoaded', updateNavbarAuthUI);
