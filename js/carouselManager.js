/**
 * Generic Carousel Manager - Can be reused for different carousels
 */
export class CarouselManager {
    constructor(containerId, indicatorsId) {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.containerId = containerId;
        this.indicatorsId = indicatorsId;
        this.container = null;
        this.indicators = null;
    }

    /**
     * Initialize the carousel
     */
    init() {
        this.container = document.getElementById(this.containerId);
        this.indicators = document.getElementById(this.indicatorsId);

        if (!this.container) return;

        // Count children divs as slides
        const slides = this.container.children;
        this.totalSlides = slides.length;

        // Create indicators
        this.createIndicators();
        this.updateCarousel();
    }

    /**
     * Create indicator dots
     */
    createIndicators() {
        if (!this.indicators) return;

        this.indicators.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(indicator);
        }
    }

    /**
     * Change slide by offset
     */
    changeSlide(offset) {
        this.currentSlide = (this.currentSlide + offset + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    /**
     * Go to specific slide
     */
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    /**
     * Update carousel position and indicators
     */
    updateCarousel() {
        if (!this.container) return;

        // Update transform
        const offset = -this.currentSlide * 100;
        this.container.style.transform = `translateX(${offset}%)`;

        // Update indicators
        if (this.indicators) {
            const dots = this.indicators.querySelectorAll('.carousel-indicator');
            dots.forEach((dot, index) => {
                if (index === this.currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
}

