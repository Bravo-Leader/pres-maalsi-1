/**
 * Slide Loader - Dynamically loads slide content from separate HTML files
 */
export class SlideLoader {
    constructor() {
        this.slidesCache = {};
        this.slidesIndex = null;
    }

    /**
     * Load slides index
     */
    async loadIndex() {
        try {
            const response = await fetch('slides/index.json');
            this.slidesIndex = await response.json();
            console.log(`[SlideLoader] Loaded index: ${this.slidesIndex.total} slides`);
            return this.slidesIndex;
        } catch (error) {
            console.error('[SlideLoader] Failed to load index:', error);
            return null;
        }
    }

    /**
     * Load a specific slide HTML
     * @param {number} slideNumber - Slide number to load
     * @returns {Promise<string>} - HTML content
     */
    async loadSlide(slideNumber) {
        // Check cache first
        if (this.slidesCache[slideNumber]) {
            return this.slidesCache[slideNumber];
        }

        // Find slide file from index
        if (!this.slidesIndex) {
            await this.loadIndex();
        }

        const slideInfo = this.slidesIndex.slides.find(s => s.number === slideNumber);
        if (!slideInfo) {
            console.error(`[SlideLoader] Slide ${slideNumber} not found in index`);
            return null;
        }

        try {
            const response = await fetch(`slides/${slideInfo.file}`);
            const html = await response.text();

            // Cache it
            this.slidesCache[slideNumber] = html;

            console.log(`[SlideLoader] Loaded slide ${slideNumber}`);
            return html;
        } catch (error) {
            console.error(`[SlideLoader] Failed to load slide ${slideNumber}:`, error);
            return null;
        }
    }

    /**
     * Load all slides into the container
     */
    async loadAllSlides() {
        const container = document.querySelector('.slide-container');
        if (!container) {
            console.error('[SlideLoader] Slide container not found!');
            return false;
        }

        // Check if slides are already in the HTML (static mode)
        const existingSlides = container.querySelectorAll('.slide');
        if (existingSlides.length > 0) {
            console.log(`[SlideLoader] Found ${existingSlides.length} slides already in DOM (static mode)`);
            // Count them for consistency
            this.slidesIndex = { total: existingSlides.length, slides: [] };
            return true;
        }

        // Load index first (dynamic mode)
        await this.loadIndex();
        if (!this.slidesIndex) {
            console.error('[SlideLoader] No index loaded!');
            return false;
        }

        // Load all slides
        console.log(`[SlideLoader] Loading ${this.slidesIndex.total} slides from files...`);

        for (const slideInfo of this.slidesIndex.slides) {
            const html = await this.loadSlide(slideInfo.number);
            if (html) {
                container.insertAdjacentHTML('beforeend', html);
            }
        }

        console.log('[SlideLoader] All slides loaded successfully');
        return true;
    }

    /**
     * Get total number of slides
     */
    getTotalSlides() {
        return this.slidesIndex ? this.slidesIndex.total : 0;
    }
}
