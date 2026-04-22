/**
 * UniNest - Listings Page JavaScript
 * Handles filters, sorting, and card interactions
 */

// ===============================
// INITIALIZATION
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Listings page loaded');
    initializeListingsPage();
});

function initializeListingsPage() {
    setupFilterToggle();
    setupPriceFilter();
    setupDistanceFilter();
    setupFilterForm();
    setupCardLikeButtons();
    setupSorting();
}

// ===============================
// FILTER SIDEBAR TOGGLE
// ===============================

/**
 * Setup filter toggle button for mobile
 */
function setupFilterToggle() {
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    const filtersClose = document.querySelector('.filters-close');

    if (filtersToggle && filtersSidebar) {
        filtersToggle.addEventListener('click', function() {
            filtersSidebar.classList.toggle('active');
        });
    }

    if (filtersClose) {
        filtersClose.addEventListener('click', function() {
            filtersSidebar.classList.remove('active');
        });
    }

    // Close filters when clicking outside
    document.addEventListener('click', function(event) {
        if (filtersSidebar && filtersSidebar.classList.contains('active')) {
            if (!filtersSidebar.contains(event.target) && !filtersToggle.contains(event.target)) {
                filtersSidebar.classList.remove('active');
            }
        }
    });
}

// ===============================
// PRICE FILTER
// ===============================

/**
 * Setup price range filter
 */
function setupPriceFilter() {
    const priceSlider = document.getElementById('priceSlider');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const priceDisplay = document.getElementById('priceDisplay');

    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            const value = this.value;
            priceDisplay.textContent = value;
            if (priceMax) {
                priceMax.value = value;
            }
        });
    }

    if (priceMin && priceMax) {
        priceMin.addEventListener('change', function() {
            if (priceSlider && parseInt(this.value) <= parseInt(priceMax.value)) {
                priceSlider.min = this.value;
            }
        });

        priceMax.addEventListener('change', function() {
            if (priceSlider && parseInt(this.value) >= parseInt(priceMin.value)) {
                priceSlider.value = this.value;
                priceDisplay.textContent = this.value;
            }
        });
    }
}

// ===============================
// DISTANCE FILTER
// ===============================

/**
 * Setup distance range filter
 */
function setupDistanceFilter() {
    const distanceSlider = document.getElementById('distanceSlider');
    const distanceDisplay = document.getElementById('distanceDisplay');

    if (distanceSlider) {
        distanceSlider.addEventListener('input', function() {
            const value = this.value;
            distanceDisplay.textContent = value;
        });
    }
}

// ===============================
// FILTER FORM HANDLING
// ===============================

/**
 * Setup filter form submission
 */
function setupFilterForm() {
    const filtersForm = document.getElementById('filtersForm');

    if (filtersForm) {
        filtersForm.addEventListener('submit', handleFilterSubmit);
        filtersForm.addEventListener('reset', handleFilterReset);
    }
}

/**
 * Handle filter form submission
 */
function handleFilterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Get filter values
    const filters = {
        price: document.getElementById('priceSlider').value,
        distance: document.getElementById('distanceSlider').value,
        university: formData.getAll('university'),
        rating: formData.getAll('rating'),
        amenities: formData.getAll('amenities'),
    };

    console.log('Filters applied:', filters);
    applyFilters(filters);

    // Close sidebar on mobile
    document.querySelector('.filters-sidebar').classList.remove('active');
}

/**
 * Handle filter form reset
 */
function handleFilterReset() {
    console.log('Filters cleared');
    setTimeout(() => {
        applyFilters({
            price: 1500,
            distance: 25,
            university: [],
            rating: [],
            amenities: []
        });
    }, 0);
}

/**
 * Apply filters to listings
 */
function applyFilters(filters) {
    const listings = document.querySelectorAll('.listing-card');
    let visibleCount = 0;

    listings.forEach(listing => {
        // For demo purposes, show all listings
        // In production, you would filter based on actual data attributes
        listing.style.display = 'block';
        visibleCount++;
    });

    // Update result count
    document.getElementById('resultCount').textContent = visibleCount;

    showNotification('Filters applied! Showing ' + visibleCount + ' listings', 'success');
}

// ===============================
// CARD LIKE BUTTONS
// ===============================

/**
 * Setup like button functionality
 */
function setupCardLikeButtons() {
    const likeButtons = document.querySelectorAll('.card-like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            handleCardLike(this);
        });
    });
}

/**
 * Handle card like button click
 */
function handleCardLike(button) {
    const isLiked = button.classList.contains('liked');

    if (isLiked) {
        button.classList.remove('liked');
        button.textContent = '♡';
        showNotification('Removed from favorites', 'info');
    } else {
        button.classList.add('liked');
        button.textContent = '♥';
        showNotification('Added to favorites!', 'success');
    }

    // Save to localStorage
    const card = button.closest('.listing-card');
    const cardTitle = card.querySelector('.card-title').textContent;
    saveFavorite(cardTitle, !isLiked);
}

/**
 * Save favorite to localStorage
 */
function saveFavorite(title, isFavorited) {
    let favorites = JSON.parse(localStorage.getItem('favoriteListings') || '[]');

    if (isFavorited) {
        if (!favorites.includes(title)) {
            favorites.push(title);
        }
    } else {
        favorites = favorites.filter(fav => fav !== title);
    }

    localStorage.setItem('favoriteListings', JSON.stringify(favorites));
}

/**
 * Load favorites from localStorage
 */
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteListings') || '[]');

    document.querySelectorAll('.listing-card').forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent;
        const likeButton = card.querySelector('.card-like-btn');

        if (favorites.includes(cardTitle)) {
            likeButton.classList.add('liked');
            likeButton.textContent = '♥';
        }
    });
}

// ===============================
// SORTING
// ===============================

/**
 * Setup sorting functionality
 */
function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');

    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
}

/**
 * Handle sorting
 */
function handleSort(event) {
    const sortBy = event.target.value;
    console.log('Sorting by:', sortBy);

    // For demo, just show notification
    let message = '';
    switch (sortBy) {
        case 'recommended':
            message = 'Sorted by Recommended';
            break;
        case 'price-low':
            message = 'Sorted by Price: Low to High';
            break;
        case 'price-high':
            message = 'Sorted by Price: High to Low';
            break;
        case 'distance':
            message = 'Sorted by Distance';
            break;
        case 'rating':
            message = 'Sorted by Rating';
            break;
    }

    showNotification(message, 'info');
}

// ===============================
// NOTIFICATIONS
// ===============================

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification-message');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification-message notification-${type}`;
    notification.textContent = message;

    const backgroundColor = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    }[type] || '#3b82f6';

    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 12px 20px;
        background-color: ${backgroundColor};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto-remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===============================
// UTILITIES
// ===============================

// Add animations
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

// Load favorites on page load
window.addEventListener('load', loadFavorites);
