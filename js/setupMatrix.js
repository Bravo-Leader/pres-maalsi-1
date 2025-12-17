import { MatrixCarouselManager } from './matrixCarousel.js';
import { MatrixRenderer } from './matrixRenderer.js';

/**
 * Setup and initialize the Matrix Carousel with dynamic data
 */
export function setupMatrixCarousel() {
    // 1. Generate HTML content
    const renderer = new MatrixRenderer();
    const htmlContent = renderer.renderAll();
    
    // 2. Inject into container
    const container = document.getElementById('matrixContainer');
    if (container) {
        container.innerHTML = htmlContent;
        console.log('[Matrix] Dynamic content injected');
    } else {
        console.error('[Matrix] Container not found');
        return null;
    }

    // 3. Initialize Carousel Logic
    const manager = new MatrixCarouselManager();
    manager.init();
    
    // Expose global function for buttons
    window.changeMatrix = (offset) => {
        manager.changeMatrix(offset);
    };
    
    return manager;
}

