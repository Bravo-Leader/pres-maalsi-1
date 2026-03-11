/**
 * Slide Manager - Handles slide navigation and state
 */
export class SlideManager {
    constructor(totalSlides) {
        this.currentSlide = 1;
        this.totalSlides = totalSlides;
        this.slides = document.querySelectorAll('.slide');
        this.progressBar = document.getElementById('progressBar');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
    }

    /**
     * Show a specific slide
     * @param {number} n - Slide number to show
     */
    showSlide(n) {
        if (n > this.totalSlides) this.currentSlide = this.totalSlides;
        else if (n < 1) this.currentSlide = 1;
        else this.currentSlide = n;

        this.slides.forEach((slide) => {
            slide.classList.remove('active');
            if (parseInt(slide.dataset.slide) === this.currentSlide) {
                slide.classList.add('active');
            }
        });

        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressBar.style.width = progress + '%';

        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;

        this.updateIndicators();
    }

    /**
     * Change slide by offset
     * @param {number} n - Offset (1 for next, -1 for previous)
     */
    changeSlide(n) {
        this.showSlide(this.currentSlide + n);
    }

    /**
     * Go to specific slide
     * @param {number} n - Slide number
     */
    goToSlide(n) {
        this.showSlide(n);
    }

    /**
     * Update slide indicators
     */
    updateIndicators() {
        const dots = document.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index + 1 === this.currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    /**
     * Get current slide number
     * @returns {number}
     */
    getCurrentSlide() {
        return this.currentSlide;
    }

    /**
     * Get total slides
     * @returns {number}
     */
    getTotalSlides() {
        return this.totalSlides;
    }
}
