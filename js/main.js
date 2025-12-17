/**
 * Main Application Entry Point
 */
import { SlideManager } from './slideManager.js';
import { ZoomManager } from './zoomManager.js';
import { IndicatorManager } from './indicatorManager.js';
import { InputManager } from './inputManager.js';
import { SlideLoader } from './slideLoader.js';
import { setupMatrixCarousel } from './setupMatrix.js';
import { setupAnalysisCarousel } from './setupAnalysis.js';

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
    console.log('[INIT] Initializing presentation... v2'); // Bump version to force module refresh if cached

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

    // Initialize carousels (after slides are loaded)
    console.log('[INIT] Setting up carousels...');
    try {
        setupMatrixCarousel();
        console.log('[INIT] Matrix carousel setup complete');
    } catch (e) {
        console.error('[INIT] Matrix carousel setup failed:', e);
    }

    try {
        setupAnalysisCarousel();
        console.log('[INIT] Analysis carousel setup complete');
    } catch (e) {
        console.error('[INIT] Analysis carousel setup failed:', e);
    }

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
