/**
 * Main Application Entry Point
 */
import { SlideManager } from './slideManager.js';
import { ZoomManager } from './zoomManager.js';
import { IndicatorManager } from './indicatorManager.js';
import { InputManager } from './inputManager.js';
import { SlideLoader } from './slideLoader.js';
import { setupMatrixCarousel } from './setupMatrix.js';

// Initialize managers
let slideManager;
let zoomManager;
let indicatorManager;
let inputManager;
let slideLoader;

/**
 * Initialize the presentation
 */
async function init() {
    console.log('[INIT] Initializing presentation...');

    // Initialize slide loader
    slideLoader = new SlideLoader();

    // Load all slides first
    const slidesLoaded = await slideLoader.loadAllSlides();
    if (!slidesLoaded) {
        console.error('[INIT] Failed to load slides!');
        return;
    }

    // Get total slides from loader
    const totalSlides = slideLoader.getTotalSlides();
    console.log(`[INIT] Total slides: ${totalSlides}`);

    // Initialize slide manager
    slideManager = new SlideManager(totalSlides);

    // Initialize zoom manager
    zoomManager = new ZoomManager();

    // Initialize indicator manager
    indicatorManager = new IndicatorManager(totalSlides, slideManager);

    // Initialize input manager
    inputManager = new InputManager(slideManager);

    // Initialize matrix carousel (after slides are loaded)
    // Now uses the new setupMatrix.js which handles rendering AND logic
    setupMatrixCarousel();

    // Show first slide
    slideManager.showSlide(1);

    // Add zoom icons to diagrams
    zoomManager.addZoomIconsToDiagrams();

    console.log('[INIT] Presentation initialized successfully');
}

/**
 * Global functions for button clicks (exposed to window)
 */
window.changeSlide = (n) => slideManager.changeSlide(n);
window.goToSlide = (n) => slideManager.goToSlide(n);
window.closeZoom = () => zoomManager.closeZoom();
window.zoomIn = () => zoomManager.zoomIn();
window.zoomOut = () => zoomManager.zoomOut();
window.resetZoom = () => zoomManager.resetZoom();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
