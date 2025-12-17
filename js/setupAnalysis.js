import { CarouselManager } from './carouselManager.js';

// Specific instance for the analysis carousel (Slide 18)
let analysisCarousel;

export function setupAnalysisCarousel() {
    // Check if the container exists (we are on the right slide)
    if (document.getElementById('analysisContainer')) {
        analysisCarousel = new CarouselManager('analysisContainer', 'analysisIndicators');
        analysisCarousel.init();
        
        // Expose global function for this specific carousel
        window.changeAnalysisSlide = (offset) => {
            analysisCarousel.changeSlide(offset);
        };
    }
}

