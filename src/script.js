// Reviews slideshow functionality
let reviewIndex = 1;
let reviewTimer;
const reviewSection = document.querySelector('#reviews');
const reviewDots = reviewSection ? reviewSection.querySelectorAll('.dot') : [];

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
    }, 5000);
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

// Read more toggle functionality
function toggleReadMore() {
    const content = document.getElementById('readMoreContent');
    const button = document.querySelector('.read-more-btn');

    if (content.classList.contains('show')) {
        content.classList.remove('show');
        button.textContent = "Read more about Deborah's expertise";
    } else {
        content.classList.add('show');
        button.textContent = "Read less";

        // Scroll the read more content into view
        setTimeout(() => {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const contentRect = content.getBoundingClientRect();
            const scrollTo = contentRect.top + window.scrollY - headerHeight - 80;

            window.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Initialize independent slideshows
document.addEventListener('DOMContentLoaded', function() {

    // Initialize review dots click handlers
    const reviewSection = document.querySelector('#reviews');
    if (reviewSection) {
        const dots = reviewSection.querySelectorAll('.dot');
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
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = imageSrc;
    lightbox.showModal();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.close();
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Close lightbox with escape key (browser default, but we can ensure it)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});


// Netlify Load content from JSON files
async function loadContent() {
    try {
        // Load hero content
        const heroResponse = await fetch('/content/hero.json');
        if (heroResponse.ok) {
            const heroData = await heroResponse.json();
            // Update hero section if elements exist
            const heroHeading = document.querySelector('.hero h1');
            const heroSubheading = document.querySelector('.hero p');
            if (heroHeading) heroHeading.textContent = heroData.heading;
            if (heroSubheading) heroSubheading.textContent = heroData.subheading;
        }

        // Load about content
        const aboutResponse = await fetch('/content/about.json');
        if (aboutResponse.ok) {
            const aboutData = await aboutResponse.json();
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                const heading = aboutSection.querySelector('h2');
                if (heading) heading.textContent = aboutData.heading;

                const paragraphs = aboutSection.querySelectorAll('.about-text p');
                if (paragraphs.length >= 3) {
                    paragraphs[0].textContent = aboutData.bio1;
                    paragraphs[1].textContent = aboutData.bio2;
                    paragraphs[2].textContent = aboutData.bio3;
                }
            }
        }

        // Load opening hours
        const hoursResponse = await fetch('/content/hours.json');
        if (hoursResponse.ok) {
            const hoursData = await hoursResponse.json();
            const hoursSection = document.querySelector('.contact-info');
            if (hoursSection) {
                const heading = hoursSection.querySelector('h3');
                if (heading && heading.textContent.includes('Opening Hours')) {
                    heading.textContent = hoursData.heading;
                }

                const hoursList = hoursSection.querySelector('.hours');
                if (hoursList) {
                    hoursList.innerHTML = hoursData.schedule.map(item =>
                        `<p><strong>${item.day}:</strong> ${item.time}</p>`
                    ).join('');
                }
            }
        }

        // Load gallery images
        const galleryResponse = await fetch('/content/gallery/');
        // Note: Gallery loading will require a server with directory listing
        // For static hosting, you may need to maintain a gallery index file

    } catch (error) {
        console.log('Content files not found, using default content');
    }
}

// Load content when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
} else {
    loadContent();
}

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