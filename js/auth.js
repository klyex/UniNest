/**
 * UniNest - Authentication Module
 * Handles login, signup, and session management
 */

// ===============================
// INITIALIZATION
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    initializeAuthForms();
});

function initializeAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Initialize password toggle functionality
    initializePasswordToggles();
}

// ===============================
// PASSWORD TOGGLE
// ===============================

/**
 * Initialize password visibility toggles
 */
function initializePasswordToggles() {
    const toggles = document.querySelectorAll('.password-toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const eyeIcon = this.querySelector('.eye-icon');
            
            if (input.type === 'password') {
                input.type = 'text';
                eyeIcon.textContent = '🙈'; // Closed eye when visible
            } else {
                input.type = 'password';
                eyeIcon.textContent = '👁️'; // Open eye when hidden
            }
        });
    });
}

// ===============================
// LOGIN
// ===============================

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Validation
    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters.');
        return;
    }
    
    // Simulate API call
    console.log('Attempting login with:', email);
    simulateLogin({ email, password });
}

/**
 * Simulate successful login
 */
function simulateLogin(credentials) {
    // In a real app, this would be an API call
    setTimeout(() => {
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', generateToken());
        
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 500);
}

// ===============================
// SIGNUP
// ===============================

/**
 * Handle signup form submission
 */
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const accountType = document.getElementById('accountType').value;
    
    // Validation
    if (!name) {
        showError('Please enter your full name.');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters.');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return;
    }
    
    if (!accountType) {
        showError('Please select an account type.');
        return;
    }
    
    // All validations passed
    console.log('Creating new account:', { name, email, accountType });
    processSignup({ name, email, password, accountType });
}

/**
 * Process signup
 */
function processSignup(data) {
    // Simulate API call
    setTimeout(() => {
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            email: data.email,
            accountType: data.accountType,
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', generateToken());
        localStorage.setItem('accountType', data.accountType);
        
        showSuccess('Account created successfully! Redirecting...');
        
        // Redirect to dashboard after a delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 500);
}

// ===============================
// VALIDATION
// ===============================

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

/**
 * Get current user
 */
function getCurrentUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
}

/**
 * Check if user is landlord
 */
function isLandlord() {
    const accountType = localStorage.getItem('accountType');
    return accountType === 'landlord';
}

// ===============================
// SESSION MANAGEMENT
// ===============================

/**
 * Generate authentication token (mock)
 */
function generateToken() {
    return 'token_' + Math.random().toString(36).substr(2) + '_' + Date.now();
}

/**
 * Clear user session
 */
function clearSession() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('accountType');
}

// ===============================
// NOTIFICATIONS
// ===============================

/**
 * Show error message
 */
function showError(message) {
    showNotificationMessage(message, 'error');
}

/**
 * Show success message
 */
function showSuccess(message) {
    showNotificationMessage(message, 'success');
}

/**
 * Show notification message
 */
function showNotificationMessage(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification-alert');
    if (existing) existing.remove();
    
    // Create notification
    const container = document.body;
    const notification = document.createElement('div');
    notification.className = `notification-alert notification-${type}`;
    notification.textContent = message;
    
    const backgroundColor = type === 'error' ? '#ef4444' : '#10b981';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        background-color: ${backgroundColor};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===============================
// ANIMATIONS
// ===============================

// Add animation styles
const authStyle = document.createElement('style');
authStyle.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(authStyle);
