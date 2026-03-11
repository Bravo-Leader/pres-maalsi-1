#!/usr/bin/env python3
"""
Build Script - Generates final presentation/index.html with all slides
"""

import re
from pathlib import Path

# Paths
OLD_HTML_PATH = Path('presentation_slides.html')
OUTPUT_PATH = Path('presentation/index.html')

def main():
    print("[BUILD] Building presentation...")

    # Read old HTML
    print(f"[READ] Reading {OLD_HTML_PATH}...")
    old_html = OLD_HTML_PATH.read_text(encoding='utf-8')

    # Extract slides container content
    # Find content between <div class="slide-container"> and </div> before navigation
    match = re.search(
        r'<div class="slide-container">(.*?)</div>\s*(?=<!--\s*NAVIGATION|<div class="navigation">)',
        old_html,
        re.DOTALL
    )

    if not match:
        print("[ERROR] Could not find slide container!")
        return 1

    slides_content = match.group(1).strip()

    # Replace image paths
    slides_content = slides_content.replace('C4_Architecture/exports/', 'images/')

    # Build new HTML
    html = f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Architecture Good Food 3.0 - Présentation</title>

    <!-- CSS Modules -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/slides.css">
    <link rel="stylesheet" href="css/layouts.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/navigation.css">
    <link rel="stylesheet" href="css/zoom-modal.css">
</head>
<body>
    <!-- Progress Bar -->
    <div class="progress-bar" id="progressBar"></div>

    <!-- Slide Container -->
    <div class="slide-container">
{slides_content}
    </div>

    <!-- Navigation -->
    <div class="navigation">
        <button class="nav-btn" id="prevBtn" onclick="changeSlide(-1)">◀ Précédent</button>
        <button class="nav-btn" id="nextBtn" onclick="changeSlide(1)">Suivant ▶</button>
    </div>

    <!-- Slide Indicators -->
    <div class="slide-indicator" id="slideIndicator"></div>

    <!-- Zoom Modal -->
    <div class="zoom-modal" id="zoomModal">
        <div class="close-zoom" onclick="closeZoom()">✕</div>
        <div class="zoom-content" id="zoomContent">
            <img id="zoomImage" src="" alt="Zoomed diagram">
        </div>
        <div class="zoom-controls">
            <button class="zoom-btn" onclick="zoomIn()" title="Zoom In">+</button>
            <button class="zoom-btn" onclick="resetZoom()" title="Reset">⟲</button>
            <button class="zoom-btn" onclick="zoomOut()" title="Zoom Out">−</button>
        </div>
    </div>

    <!-- JavaScript Modules -->
    <script type="module" src="js/main.js"></script>
</body>
</html>
'''

    # Write output
    print(f"[WRITE] Writing to {OUTPUT_PATH}...")
    OUTPUT_PATH.write_text(html, encoding='utf-8')

    # Count slides
    slide_count = len(re.findall(r'data-slide="\d+"', slides_content))

    print("[SUCCESS] Presentation built successfully!")
    print(f"[OUTPUT] File: {OUTPUT_PATH}")
    print(f"[SLIDES] Total: {slide_count}")
    print(f"[ASSETS] Images: presentation/images/")
    print(f"[ASSETS] CSS: presentation/css/")
    print(f"[ASSETS] JS: presentation/js/")

    return 0

if __name__ == '__main__':
    exit(main())
