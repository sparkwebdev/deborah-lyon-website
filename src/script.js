// Reviews slideshow functionality
let reviewIndex = 1;
let reviewTimer;
const reviewSection = document.querySelector('#reviews');
const reviewDots = reviewSection ? reviewSection.querySelectorAll('.reviews__dot') : [];

function showReviews(n) {
    let reviews = document.querySelectorAll(".reviews__item");

    if (n > reviews.length) { reviewIndex = 1; }
    if (n < 1) { reviewIndex = reviews.length; }

    // Fade out current review
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].classList.contains("active")) {
            reviews[i].style.opacity = "0";
            setTimeout(() => {
                reviews[i].classList.remove("active");
                reviews[i].style.display = "";
            }, 150);
        } else {
            reviews[i].classList.remove("active");
        }
    }

    reviewDots.forEach(dot => dot.classList.remove("active"));

    // Fade in new review
    setTimeout(() => {
        reviews[reviewIndex - 1].classList.add("active");
        setTimeout(() => {
            reviews[reviewIndex - 1].style.opacity = "1";
        }, 50);
    }, 150);

    if (reviewDots[reviewIndex - 1]) {
        reviewDots[reviewIndex - 1].classList.add("active");
    }
}

function currentReview(n) {
    clearTimeout(reviewTimer);
    reviewIndex = n;
    showReviews(reviewIndex);
}

function changeReview(direction) {
    clearTimeout(reviewTimer);
    reviewIndex += direction;
    showReviews(reviewIndex);
}

function nextReview() {
    reviewIndex++;
    showReviews(reviewIndex);
}

function autoReview() {
    reviewTimer = setTimeout(() => {
        nextReview();
        autoReview();
    }, 8000);
}

// Calculate and set consistent review heights
function setReviewHeights() {
    const reviews = document.querySelectorAll('.reviews__item');
    let maxHeight = 0;
    const originalDisplay = [];

    // Store original display states and temporarily show all reviews to measure their natural height
    reviews.forEach((review, index) => {
        originalDisplay[index] = getComputedStyle(review).display;
        review.style.height = 'auto';
        review.style.display = 'flex';
    });

    // Find the tallest review
    reviews.forEach(review => {
        const height = review.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // Set all reviews to the maximum height and restore original display states
    reviews.forEach((review, index) => {
        review.style.height = maxHeight + 'px';
        // Don't override display with inline styles - let CSS classes handle it
        review.style.display = '';
    });
}

// Close about dialog when clicking outside content
const aboutDialog = document.getElementById('aboutDialog');
if (aboutDialog) {
    aboutDialog.addEventListener('click', function(e) {
        if (e.target === this) {
            this.close();
        }
    });
}

// Initialize independent slideshows
document.addEventListener('DOMContentLoaded', function() {

    // Initialize review dots click handlers
    const reviewSection = document.querySelector('#reviews');
    if (reviewSection) {
        const dots = reviewSection.querySelectorAll('.reviews__dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentReview(index + 1);
            });
        });
    }

    showReviews(reviewIndex);
    autoReview();

    // Set consistent review heights after DOM is loaded
    setTimeout(() => {
        setReviewHeights();
    }, 100);

    // Add touch/swipe support for mobile reviews
    let touchStartX = 0;
    let touchEndX = 0;

    const reviewsContainer = document.querySelector('.reviews__slideshow');
    if (reviewsContainer) {
        reviewsContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        reviewsContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }

    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swiped left - go to next review
                changeReview(1);
            } else {
                // Swiped right - go to previous review
                changeReview(-1);
            }
        }
    }
});

// Recalculate heights on window resize
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        setReviewHeights();
    }, 250);
});

// Lightbox functionality
let lightbox = null;
let lightboxImage = null;

function createLightbox() {
    if (lightbox) return;

    lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';

    lightboxImage = document.createElement('img');
    lightboxImage.alt = 'Gallery Image';

    lightbox.appendChild(lightboxImage);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            lightbox.close();
        }
    });
}

document.addEventListener('click', function(e) {
    const trigger = e.target.closest('[data-lightbox]');
    if (trigger) {
        createLightbox();
        lightboxImage.src = trigger.dataset.lightbox;
        lightbox.showModal();
    }
});


// Netlify Identity redirect handling
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}