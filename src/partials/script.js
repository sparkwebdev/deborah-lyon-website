// Reviews carousel
const reviewsCarousel = {
    index: 0,
    timer: null,
    reviews: null,
    dots: null,
    container: null,

    init() {
        this.container = document.querySelector('.reviews__slideshow');
        this.reviews = document.querySelectorAll('.reviews__item');
        this.dots = document.querySelectorAll('.reviews__dot');
        if (!this.reviews.length) return;

        this.bindEvents();
        this.show();
        this.auto();
    },

    bindEvents() {
        // Dots
        this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.goTo(i)));

        // Nav buttons (event delegation)
        this.container?.addEventListener('click', e => {
            const nav = e.target.closest('[data-dir]');
            if (nav) this.goTo(this.index + parseInt(nav.dataset.dir));
        });

        // Touch/swipe
        let touchStartX = 0;
        this.container?.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.container?.addEventListener('touchend', e => {
            const swipe = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(swipe) > 50) this.goTo(this.index + (swipe > 0 ? 1 : -1));
        }, { passive: true });

        // Pause on hover/focus (WCAG 2.2.2)
        this.container?.addEventListener('mouseenter', () => this.pause());
        this.container?.addEventListener('mouseleave', () => this.auto());
        this.container?.addEventListener('focusin', () => this.pause());
        this.container?.addEventListener('focusout', () => this.auto());
    },

    pause() {
        clearTimeout(this.timer);
    },

    show() {
        this.reviews.forEach(r => r.style.opacity = '0');
        setTimeout(() => {
            this.reviews.forEach((r, i) => r.classList.toggle('active', i === this.index));
            setTimeout(() => this.reviews[this.index].style.opacity = '1', 50);
        }, 150);
        this.dots.forEach((d, i) => {
            d.classList.toggle('active', i === this.index);
            d.setAttribute('aria-selected', i === this.index);
        });
    },

    goTo(n, resetTimer = true) {
        if (resetTimer) clearTimeout(this.timer);
        this.index = (n + this.reviews.length) % this.reviews.length;
        this.show();
        if (resetTimer) this.auto();
    },

    auto() {
        this.timer = setTimeout(() => this.goTo(this.index + 1, false), 8000);
    }
};

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    reviewsCarousel.init();

    // Dialog handling (open, close, backdrop click)
    document.addEventListener('click', e => {
        // Open dialog
        const openBtn = e.target.closest('[data-dialog]');
        if (openBtn) {
            document.getElementById(openBtn.dataset.dialog)?.showModal();
            return;
        }

        // Close dialog
        if (e.target.closest('[data-close]')) {
            e.target.closest('dialog')?.close();
            return;
        }

        // Backdrop click
        const dialog = e.target.closest('dialog');
        if (dialog && e.target === dialog) {
            dialog.close();
        }
    });
});

// Netlify Identity
window.netlifyIdentity?.on('init', user => {
    if (!user) {
        window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
        });
    }
});
