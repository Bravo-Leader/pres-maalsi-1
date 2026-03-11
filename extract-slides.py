#!/usr/bin/env python3
"""
Extract each slide into separate HTML files
"""

import re
from pathlib import Path

# Paths
SOURCE_HTML = Path('presentation/index.html')
OUTPUT_DIR = Path('presentation/slides')

def main():
    print("[EXTRACT] Extracting slides to separate files...")

    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)

    # Read source HTML
    html = SOURCE_HTML.read_text(encoding='utf-8')

    # Extract slide container content
    # Find from slide-container to before navigation
    start_marker = '<div class="slide-container">'
    end_marker = '<!-- Navigation -->'

    start_idx = html.find(start_marker)
    end_idx = html.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        print("[ERROR] Could not find slide markers!")
        return 1

    # Extract content between markers
    slides_html = html[start_idx + len(start_marker):end_idx].strip()

    match = True  # Fake match for compatibility

    # slides_html already extracted above

    # Split by slides - each slide starts with <div class="slide"
    # Use regex to find each slide div with its complete content
    slide_pattern = r'(<div class="slide[^>]*?data-slide="\d+"[^>]*?>.*?</div>)\s*(?=<div class="slide|$)'
    slides = re.findall(slide_pattern, slides_html, re.DOTALL)

    print(f"[INFO] Found {len(slides)} slides")

    # Extract and save each slide
    for slide_html in slides:
        # Extract slide number
        slide_num_match = re.search(r'data-slide="(\d+)"', slide_html)
        if not slide_num_match:
            continue

        slide_num = int(slide_num_match.group(1))

        # Extract title for filename
        title_match = re.search(r'<h[12]>([^<]+)</h[12]>', slide_html)
        title = title_match.group(1) if title_match else f"Slide {slide_num}"

        # Clean title for filename
        clean_title = re.sub(r'[^\w\s-]', '', title)
        clean_title = re.sub(r'[-\s]+', '-', clean_title).strip('-')[:50]

        # Create filename
        filename = f"slide-{slide_num:02d}-{clean_title}.html"
        filepath = OUTPUT_DIR / filename

        # Write slide
        filepath.write_text(slide_html, encoding='utf-8')
        print(f"[CREATED] {filename}")

    # Create index file for slides
    create_slides_index(len(slides))

    print(f"[SUCCESS] Extracted {len(slides)} slides to {OUTPUT_DIR}")
    return 0


def create_slides_index(total_slides):
    """Create an index.json file listing all slides"""
    import json

    slides_list = []
    for slide_file in sorted(OUTPUT_DIR.glob('slide-*.html')):
        # Extract slide number from filename
        match = re.search(r'slide-(\d+)', slide_file.name)
        if match:
            slide_num = int(match.group(1))
            slides_list.append({
                'number': slide_num,
                'file': slide_file.name
            })

    index = {
        'total': total_slides,
        'slides': slides_list
    }

    index_file = OUTPUT_DIR / 'index.json'
    index_file.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"[CREATED] slides/index.json")


if __name__ == '__main__':
    exit(main())
