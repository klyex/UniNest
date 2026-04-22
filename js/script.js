/**
 * UniNest - Main JavaScript
 * General utility functions and DOM interactions
 */

// ===============================
// DOM Ready
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    console.log('UniNest application loaded');
    initializeApp();
});

/**
 * Initialize application
 */
function initializeApp() {
    setUpEventListeners();
    refreshUserSession();
    setupMobileMenu();
    setupSearchBar();
    setupLikeButtons();
}

/**
 * Set up global event listeners
 */
function setUpEventListeners() {
    // Filter price range slider
    const priceSlider = document.querySelector('input[type="range"][min="200"]');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            document.getElementById('priceDisplay').textContent = this.value;
        });
    }

    // Filter distance range slider
    const distanceSlider = document.querySelector('input[type="range"][min="0"]');
    if (distanceSlider) {
        distanceSlider.addEventListener('input', function() {
            document.getElementById('distanceDisplay').textContent = this.value + ' km';
        });
    }

    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
}

// ===============================
// USER SESSION
// ===============================

/**
 * Refresh user session information
 */
function refreshUserSession() {
    const userData = localStorage.getItem('user');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            updateUserDisplay(user);
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }
}

/**
 * Update user display elements
 */
function updateUserDisplay(user) {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    if (userName) userName.textContent = user.name || 'User';
    if (userEmail) userEmail.textContent = user.email || '';
}

/**
 * Logout user
 */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        window.location.href = '../index.html';
    }
}

// ===============================
// MOBILE MENU
// ===============================

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// ===============================
// SEARCH BAR
// ===============================

/**
 * Setup search bar functionality
 */
function setupSearchBar() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
}

/**
 * Handle search submission
 */
function handleSearch(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }

    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput ? searchInput.value.trim() : '';

    if (searchTerm.length < 2) {
        showNotification('Please enter at least 2 characters', 'warning');
        return;
    }

    console.log('Searching for:', searchTerm);
    showNotification('Searching for "' + searchTerm + '"...', 'info');
    
    // Redirect to listings page with search term
    setTimeout(() => {
        window.location.href = 'pages/listings.html?search=' + encodeURIComponent(searchTerm);
    }, 500);
}

// ===============================
// LIKE BUTTONS
// ===============================

/**
 * Setup like button functionality
 */
function setupLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', handleLikeClick);
    });
}

/**
 * Handle like button click
 */
function handleLikeClick(event) {
    event.preventDefault();
    const btn = event.target;
    const isLiked = btn.classList.contains('liked');
    
    if (isLiked) {
        btn.classList.remove('liked');
        btn.textContent = '♡';
        showNotification('Removed from favorites', 'info');
    } else {
        btn.classList.add('liked');
        btn.textContent = '♥';
        showNotification('Added to favorites!', 'success');
    }
}

// ===============================
// PROFILE MANAGEMENT
// ===============================

/**
 * Handle profile form update
 */
function handleProfileUpdate(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const profile = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        bio: formData.get('bio'),
        budget: formData.get('budget'),
        distance: formData.get('distance'),
        moveDate: formData.get('moveDate'),
        roomType: formData.getAll('roomType')
    };

    // Save to localStorage (for demo purposes)
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    showNotification('Profile updated successfully!', 'success');
}

/**
 * Change user password
 */
function changePassword() {
    const newPassword = prompt('Enter your new password:');
    if (newPassword && newPassword.length >= 6) {
        // In a real app, send this to backend
        localStorage.setItem('passwordChanged', new Date().toISOString());
        showNotification('Password changed successfully!', 'success');
    } else if (newPassword) {
        showNotification('Password must be at least 6 characters.', 'error');
    }
}

/**
 * Delete user account
 */
function deleteAccount() {
    if (confirm('Are you absolutely sure? This action cannot be undone.')) {
        if (confirm('This will permanently delete your account. Last chance to confirm.')) {
            localStorage.clear();
            showNotification('Account deleted. Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        }
    }
}

// ===============================
// LISTINGS & SEARCH
// ===============================

/**
 * Save listing to favorites
 */
function saveListing(listingId) {
    let savedListings = JSON.parse(localStorage.getItem('savedListings') || '[]');
    
    if (!savedListings.includes(listingId)) {
        savedListings.push(listingId);
        localStorage.setItem('savedListings', JSON.stringify(savedListings));
        showNotification('Listing saved!', 'success');
    } else {
        showNotification('Listing already saved.', 'info');
    }
}

/**
 * Remove listing from favorites
 */
function removeListing(listingId) {
    let savedListings = JSON.parse(localStorage.getItem('savedListings') || '[]');
    savedListings = savedListings.filter(id => id !== listingId);
    localStorage.setItem('savedListings', JSON.stringify(savedListings));
    showNotification('Listing removed.', 'success');
}

/**
 * Filter listings
 */
function filterListings() {
    const priceRange = document.querySelector('input[type="range"][min="200"]')?.value;
    const distance = document.querySelector('input[type="range"][min="0"]')?.value;
    
    console.log('Filtering with price:', priceRange, 'distance:', distance);
    
    // In a real app, this would filter the listings dynamically
    showNotification('Filters applied!', 'success');
}

// ===============================
// NOTIFICATIONS
// ===============================

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${getNotificationColor(type)};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Get notification color based on type
 */
function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    return colors[type] || colors.info;
}

// ===============================
// ANIMATIONS
// ===============================

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===============================
// UTILITY FUNCTIONS
// ===============================

/**
 * Format date to readable format
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

/**
 * Validate email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
