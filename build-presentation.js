/**
 * Build Script - Generates final index.html with all slides
 * Node.js script to combine template with slides content
 */

const fs = require('fs');
const path = require('path');

// Paths
const TEMPLATE_PATH = './presentation/index.html';
const OLD_HTML_PATH = './presentation_slides.html';
const OUTPUT_PATH = './presentation/index.html';

// Read the old HTML
const oldHTML = fs.readFileSync(OLD_HTML_PATH, 'utf-8');

// Extract slides content (from slide 3 onwards, since we have 1 and 2 in template)
const slideRegex = /<!-- SLIDE 3:.*?<\/div>\s*(?=<!-- SLIDE |<\/div>\s*<!--)/gs;
const slides = oldHTML.match(slideRegex);

// Read template
let template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

// Find insertion point
const insertionPoint = '<!-- Additional slides will be loaded from slides-content.html -->';
const insertionIndex = template.indexOf(insertionPoint);

if (insertionIndex === -1) {
    console.error('Insertion point not found!');
    process.exit(1);
}

// Build slides content
let slidesContent = '';
if (slides) {
    slidesContent = slides.join('\n\n        ');
}

// Replace paths: C4_Architecture/exports/ -> images/
slidesContent = slidesContent.replace(/C4_Architecture\/exports\//g, 'images/');

// Insert slides into template
const beforeInsertion = template.substring(0, insertionIndex);
const afterInsertion = template.substring(insertionIndex + insertionPoint.length);

const finalHTML = beforeInsertion + '\n        ' + slidesContent + '\n        ' + afterInsertion;

// Write output
fs.writeFileSync(OUTPUT_PATH, finalHTML, 'utf-8');

console.log('✅ Presentation built successfully!');
console.log(`📄 Output: ${OUTPUT_PATH}`);
console.log(`📊 Total slides extracted: ${slides ? slides.length + 2 : 2}`);
