/**
 * Main Application Entry Point
 */
import { SlideManager } from './slideManager.js';
import { ZoomManager } from './zoomManager.js';
import { IndicatorManager } from './indicatorManager.js';
import { InputManager } from './inputManager.js';
import { SlideLoader } from './slideLoader.js';

// Initialize managers
let slideManager;
let zoomManager;
let indicatorManager;
let inputManager;
let slideLoader;

// Theme management
const themes = ['dark', 'light', 'cesi', 'green', 'sunset', 'ocean', 'midnight', 'corporate'];
let currentTheme = 'dark';

// Matrix carousel state
let currentMatrixIndex = 0;
let totalMatrices = 0;

// Faibles carousel state
let currentFaiblesIndex = 0;
let totalFaibles = 0;

/**
 * Open theme popup
 */
function openThemePopup() {
    const overlay = document.getElementById('themePopupOverlay');
    if (overlay) {
        overlay.classList.add('active');
        updateThemeSelection();
    }
}

/**
 * Close theme popup
 */
function closeThemePopup() {
    const overlay = document.getElementById('themePopupOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

/**
 * Update theme selection in popup
 */
function updateThemeSelection() {
    const options = document.querySelectorAll('.theme-option');
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (themes[index] === currentTheme) {
            option.classList.add('selected');
        }
    });
}

/**
 * Select a theme
 */
function selectTheme(themeName) {
    currentTheme = themeName;

    if (themeName === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', themeName);
    }

    // Save theme preference
    localStorage.setItem('presentation-theme', themeName);

    // Update selection
    updateThemeSelection();

    // Close popup after a short delay
    setTimeout(() => {
        closeThemePopup();
    }, 200);

    console.log('[THEME] Switched to:', themeName);
}

/**
 * Load saved theme preference
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('presentation-theme');
    if (savedTheme && themes.includes(savedTheme)) {
        currentTheme = savedTheme;
        if (savedTheme !== 'dark') {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
}

/**
 * Initialize matrix carousel
 */
function initMatrixCarousel() {
    const container = document.getElementById('matrixContainer');
    const indicators = document.getElementById('matrixIndicators');

    if (!container || !indicators) return;

    const slides = container.querySelectorAll('.matrix-slide');
    totalMatrices = slides.length;

    if (totalMatrices === 0) return;

    // Create indicators
    indicators.innerHTML = '';
    for (let i = 0; i < totalMatrices; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToMatrix(i);
        indicators.appendChild(dot);
    }

    // Show first matrix
    showMatrix(0);

    console.log('[CAROUSEL] Matrix initialized with', totalMatrices, 'slides');
}

/**
 * Initialize faibles carousel
 */
function initFaiblesCarousel() {
    const container = document.getElementById('faiblesContainer');
    const indicators = document.getElementById('faiblesIndicators');

    if (!container || !indicators) return;

    const slides = container.querySelectorAll('.matrix-slide');
    totalFaibles = slides.length;

    if (totalFaibles === 0) return;

    // Create indicators
    indicators.innerHTML = '';
    for (let i = 0; i < totalFaibles; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToFaibles(i);
        indicators.appendChild(dot);
    }

    // Show first slide
    showFaibles(0);

    console.log('[CAROUSEL] Faibles initialized with', totalFaibles, 'slides');
}

/**
 * Change matrix slide
 */
function changeMatrix(direction) {
    const newIndex = currentMatrixIndex + direction;
    if (newIndex >= 0 && newIndex < totalMatrices) {
        showMatrix(newIndex);
    } else if (newIndex < 0) {
        showMatrix(totalMatrices - 1);
    } else {
        showMatrix(0);
    }
}

/**
 * Go to specific matrix
 */
function goToMatrix(index) {
    if (index >= 0 && index < totalMatrices) {
        showMatrix(index);
    }
}

/**
 * Show specific matrix
 */
function showMatrix(index) {
    currentMatrixIndex = index;

    const container = document.getElementById('matrixContainer');
    if (container) {
        container.style.transform = `translateX(-${index * 100}%)`;
    }

    // Update indicators
    const indicators = document.getElementById('matrixIndicators');
    if (indicators) {
        indicators.querySelectorAll('.carousel-indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
    }
}

/**
 * Change faibles slide
 */
function changeFaibles(direction) {
    const newIndex = currentFaiblesIndex + direction;
    if (newIndex >= 0 && newIndex < totalFaibles) {
        showFaibles(newIndex);
    } else if (newIndex < 0) {
        showFaibles(totalFaibles - 1);
    } else {
        showFaibles(0);
    }
}

/**
 * Go to specific faibles slide
 */
function goToFaibles(index) {
    if (index >= 0 && index < totalFaibles) {
        showFaibles(index);
    }
}

/**
 * Show specific faibles slide
 */
function showFaibles(index) {
    currentFaiblesIndex = index;

    const container = document.getElementById('faiblesContainer');
    if (container) {
        container.style.transform = `translateX(-${index * 100}%)`;
    }

    // Update indicators
    const indicators = document.getElementById('faiblesIndicators');
    if (indicators) {
        indicators.querySelectorAll('.carousel-indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
    }
}

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

    // Show first slide
    slideManager.showSlide(1);

    // Add zoom icons to diagrams
    zoomManager.addZoomIconsToDiagrams();

    // Load saved theme
    loadSavedTheme();

    // Initialize carousels
    initMatrixCarousel();
    initFaiblesCarousel();

    // Close popup on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeThemePopup();
        }
    });

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
window.openThemePopup = openThemePopup;
window.closeThemePopup = closeThemePopup;
window.selectTheme = selectTheme;
window.changeMatrix = changeMatrix;
window.goToMatrix = goToMatrix;
window.changeFaibles = changeFaibles;
window.goToFaibles = goToFaibles;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
