/**
 * Zoom Manager - Handles diagram zoom functionality
 */
export class ZoomManager {
    constructor() {
        this.currentZoomLevel = 1;
        this.zoomModal = document.getElementById('zoomModal');
        this.zoomImage = document.getElementById('zoomImage');
        this.zoomContent = document.getElementById('zoomContent');

        // Pan state
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;

        this.setupEventListeners();
    }

    /**
     * Setup event listeners for zoom functionality
     */
    setupEventListeners() {
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeZoom();
            }
        });

        // Close on background click
        this.zoomModal.addEventListener('click', (e) => {
            if (e.target.id === 'zoomModal') {
                this.closeZoom();
            }
        });

        // Mouse wheel zoom
        this.zoomContent.addEventListener('wheel', (e) => {
            if (!this.zoomModal.classList.contains('active')) return;

            e.preventDefault();

            // Get mouse position relative to image
            const rect = this.zoomImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Zoom in or out
            if (e.deltaY < 0) {
                // Scroll up - zoom in
                this.zoomInAtPoint(x, y);
            } else {
                // Scroll down - zoom out
                this.zoomOutAtPoint(x, y);
            }
        }, { passive: false });

        // Pan with mouse drag
        this.zoomImage.addEventListener('mousedown', (e) => {
            if (this.currentZoomLevel > 1) {
                this.isPanning = true;
                this.startX = e.clientX - this.translateX;
                this.startY = e.clientY - this.translateY;
                this.zoomImage.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isPanning) {
                this.translateX = e.clientX - this.startX;
                this.translateY = e.clientY - this.startY;
                this.updateTransform();
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.isPanning) {
                this.isPanning = false;
                this.zoomImage.style.cursor = this.currentZoomLevel > 1 ? 'grab' : 'zoom-in';
            }
        });

        // Update cursor based on zoom level
        this.zoomImage.addEventListener('mouseenter', () => {
            if (this.currentZoomLevel > 1) {
                this.zoomImage.style.cursor = 'grab';
            } else {
                this.zoomImage.style.cursor = 'zoom-in';
            }
        });
    }

    /**
     * Add zoom icons to all diagram containers
     */
    addZoomIconsToDiagrams() {
        const diagramContainers = document.querySelectorAll('.diagram-container');
        diagramContainers.forEach(container => {
            const img = container.querySelector('img');
            if (img && img.src) {
                // Add zoom icon
                const zoomIcon = document.createElement('div');
                zoomIcon.className = 'zoom-icon';
                zoomIcon.innerHTML = '🔍';
                zoomIcon.title = 'Click to zoom';
                container.appendChild(zoomIcon);

                // Click handlers
                const openZoom = () => {
                    this.zoomImage.src = img.src;
                    this.zoomModal.classList.add('active');
                    this.currentZoomLevel = 1;
                };

                zoomIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openZoom();
                });

                img.addEventListener('click', openZoom);
            }
        });
    }

    /**
     * Update transform with current zoom and pan
     */
    updateTransform() {
        this.zoomImage.style.transform =
            `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentZoomLevel})`;
    }

    /**
     * Close zoom modal
     */
    closeZoom() {
        this.zoomModal.classList.remove('active');
        this.currentZoomLevel = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.zoomImage.classList.remove('zoomed');
        this.zoomImage.style.transform = '';
        this.zoomImage.style.cursor = 'zoom-in';
    }

    /**
     * Zoom in at a specific point
     */
    zoomInAtPoint(x, y) {
        const oldZoom = this.currentZoomLevel;
        this.currentZoomLevel = Math.min(this.currentZoomLevel + 0.25, 5);

        // Adjust pan to zoom towards the mouse position
        const zoomRatio = this.currentZoomLevel / oldZoom;
        this.translateX = x - (x - this.translateX) * zoomRatio;
        this.translateY = y - (y - this.translateY) * zoomRatio;

        this.updateTransform();
        this.zoomImage.style.cursor = 'grab';
    }

    /**
     * Zoom out at a specific point
     */
    zoomOutAtPoint(x, y) {
        const oldZoom = this.currentZoomLevel;
        this.currentZoomLevel = Math.max(this.currentZoomLevel - 0.25, 0.5);

        // Adjust pan to zoom towards the mouse position
        const zoomRatio = this.currentZoomLevel / oldZoom;
        this.translateX = x - (x - this.translateX) * zoomRatio;
        this.translateY = y - (y - this.translateY) * zoomRatio;

        this.updateTransform();

        if (this.currentZoomLevel <= 1) {
            this.translateX = 0;
            this.translateY = 0;
            this.updateTransform();
            this.zoomImage.style.cursor = 'zoom-in';
        }
    }

    /**
     * Zoom in (button)
     */
    zoomIn() {
        const rect = this.zoomImage.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        this.zoomInAtPoint(centerX, centerY);
    }

    /**
     * Zoom out (button)
     */
    zoomOut() {
        const rect = this.zoomImage.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        this.zoomOutAtPoint(centerX, centerY);
    }

    /**
     * Reset zoom level
     */
    resetZoom() {
        this.currentZoomLevel = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
        this.zoomImage.style.cursor = 'zoom-in';
    }
}
