// ==================== LISTING DETAIL PAGE JAVASCRIPT ====================

let currentImageIndex = 0;
const totalImages = 4;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupImageGallery();
    setupSaveButton();
    setupBookingButtons();
    loadSavedListings();
});

// ==================== IMAGE GALLERY ====================

function setupImageGallery() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateGallery();
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateGallery();
        });
    }

    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
    });

    // Thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            updateGallery();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            updateGallery();
        }
    });
}

function updateGallery() {
    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.src = '../assets/images/placeholder.jpg';
            mainImage.style.opacity = '1';
        }, 100);
    }

    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

// ==================== SAVE LISTING (FAVORITES) ====================

function setupSaveButton() {
    const saveBtn = document.getElementById('saveListingBtn');

    if (saveBtn) {
        // Check if already saved
        const listingTitle = document.querySelector('.property-type').textContent;
        const savedListings = getSavedListings();
        
        if (savedListings.includes(listingTitle)) {
            saveBtn.classList.add('saved');
            saveBtn.innerHTML = '♥ Saved';
        }

        saveBtn.addEventListener('click', () => {
            const title = document.querySelector('.property-type').textContent;
            const savedListings = getSavedListings();

            if (saveBtn.classList.contains('saved')) {
                // Remove from saved
                const index = savedListings.indexOf(title);
                if (index > -1) {
                    savedListings.splice(index, 1);
                }
                saveBtn.classList.remove('saved');
                saveBtn.innerHTML = '♡ Save';
                showNotification('Removed from saved listings', 'info');
            } else {
                // Add to saved
                savedListings.push(title);
                saveBtn.classList.add('saved');
                saveBtn.innerHTML = '♥ Saved';
                showNotification('Added to saved listings', 'success');
            }

            // Save to localStorage
            localStorage.setItem('savedListings', JSON.stringify(savedListings));
        });
    }
}

function getSavedListings() {
    const saved = localStorage.getItem('savedListings');
    return saved ? JSON.parse(saved) : [];
}

function loadSavedListings() {
    // This is called on page load to check if listing is saved
    const saveBtn = document.getElementById('saveListingBtn');
    if (saveBtn) {
        const listingTitle = document.querySelector('.property-type').textContent;
        const savedListings = getSavedListings();
        
        if (savedListings.includes(listingTitle)) {
            saveBtn.classList.add('saved');
            saveBtn.innerHTML = '♥ Saved';
        }
    }
}

// ==================== BOOKING BUTTONS ====================

function setupBookingButtons() {
    const requestBtn = document.getElementById('requestBookingBtn');
    const contactBtn = document.getElementById('contactLandlordBtn');

    if (requestBtn) {
        requestBtn.addEventListener('click', handleRequestBooking);
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', handleContactLandlord);
    }
}

function handleRequestBooking() {
    const propertyName = document.querySelector('.property-type').textContent;
    
    // Show confirmation dialog
    showNotification('Booking request sent! The landlord will review your application.', 'success');
    
    // Log booking intent to (mock) database
    const bookingData = {
        property: propertyName,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save to localStorage for demo purposes
    let bookings = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookingRequests', JSON.stringify(bookings));
    
    // Optional: Could also scroll to landlord card or requirements section
    setTimeout(() => {
        document.querySelector('.landlord-card')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

function handleContactLandlord() {
    const propertyName = document.querySelector('.property-type').textContent;
    
    // Show modal or navigate to messaging (for now, just a notification)
    showNotification('Opening conversation with landlord...', 'info');
    
    // In a real app, this would open a messaging interface or modal
    // For now, we'll log it
    console.log('Contact landlord for:', propertyName);
}

// ==================== NOTIFICATIONS ====================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-message';
    notification.textContent = message;

    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${colors[type] || colors.info};
        color: #ffffff;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
        max-width: 90%;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== ANIMATIONS ====================

// Add animation keyframes if not already present
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

    .save-btn.saved {
        background-color: var(--primary-color);
        color: #ffffff;
        border-color: var(--primary-color);
    }

    .save-btn.saved:hover {
        background-color: var(--primary-dark);
    }
`;

document.head.appendChild(style);

// ==================== UTILITY FUNCTIONS ====================

// Smooth scroll helper
function smoothScroll(element) {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Format date helper
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Logger for debugging
function log(message, data = null) {
    console.log(`[Listing Detail] ${message}`, data || '');
}
