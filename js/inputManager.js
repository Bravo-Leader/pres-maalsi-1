/**
 * Input Manager - Handles keyboard and touch input
 */
export class InputManager {
    constructor(slideManager) {
        this.slideManager = slideManager;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.setupEventListeners();
    }

    /**
     * Setup event listeners for keyboard and touch input
     */
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.slideManager.changeSlide(-1);
                    break;
                case 'ArrowRight':
                    this.slideManager.changeSlide(1);
                    break;
                case 'Home':
                    this.slideManager.goToSlide(1);
                    break;
                case 'End':
                    this.slideManager.goToSlide(this.slideManager.getTotalSlides());
                    break;
            }
        });

        // Touch/swipe support
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    /**
     * Handle swipe gestures
     */
    handleSwipe() {
        if (this.touchEndX < this.touchStartX - 50) {
            this.slideManager.changeSlide(1);
        }
        if (this.touchEndX > this.touchStartX + 50) {
            this.slideManager.changeSlide(-1);
        }
    }
}
