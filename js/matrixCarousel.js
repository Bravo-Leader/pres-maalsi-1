/**
 * Matrix Carousel Manager - Handles navigation between technology choice matrices
 */
export class MatrixCarouselManager {
    constructor() {
        this.currentMatrix = 0;
        this.totalMatrices = 0;
        this.container = null;
        this.indicators = null;
    }

    /**
     * Initialize the carousel
     */
    init() {
        this.container = document.getElementById('matrixContainer');
        this.indicators = document.getElementById('matrixIndicators');

        if (!this.container) return;

        const slides = this.container.querySelectorAll('.matrix-slide');
        this.totalMatrices = slides.length;

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
        for (let i = 0; i < this.totalMatrices; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToMatrix(i));
            this.indicators.appendChild(indicator);
        }
    }

    /**
     * Change matrix by offset
     */
    changeMatrix(offset) {
        this.currentMatrix = (this.currentMatrix + offset + this.totalMatrices) % this.totalMatrices;
        this.updateCarousel();
    }

    /**
     * Go to specific matrix
     */
    goToMatrix(index) {
        this.currentMatrix = index;
        this.updateCarousel();
    }

    /**
     * Update carousel position and indicators
     */
    updateCarousel() {
        if (!this.container) return;

        // Update transform
        const offset = -this.currentMatrix * 100;
        this.container.style.transform = `translateX(${offset}%)`;

        // Update indicators
        if (this.indicators) {
            const dots = this.indicators.querySelectorAll('.carousel-indicator');
            dots.forEach((dot, index) => {
                if (index === this.currentMatrix) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
}

