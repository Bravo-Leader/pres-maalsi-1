/**
 * Indicator Manager - Handles slide indicators
 */
export class IndicatorManager {
    constructor(totalSlides, slideManager) {
        this.totalSlides = totalSlides;
        this.slideManager = slideManager;
        this.indicator = document.getElementById('slideIndicator');
        this.createIndicators();
    }

    /**
     * Create slide indicator dots
     */
    createIndicators() {
        for (let i = 1; i <= this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.onclick = () => this.slideManager.goToSlide(i);
            dot.title = `Slide ${i}`;
            this.indicator.appendChild(dot);
        }
    }
}
