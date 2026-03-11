# Structure de la Présentation - Good Food 3.0

## 📁 Architecture Modulaire

La présentation suit une architecture modulaire avec séparation complète des préoccupations:

```
presentation/
├── index.html              # Version statique (toutes les slides incluses)
├── index-dynamic.html      # Version dynamique (slides chargées à la volée)
├── README.md              # Documentation utilisateur
├── STRUCTURE.md           # Ce fichier - Documentation technique
│
├── css/                   # 7 fichiers CSS modulaires
│   ├── variables.css      # Thème: couleurs, espacements, transitions
│   ├── base.css          # Reset CSS, typographie, éléments de base
│   ├── slides.css        # Structure et animations des slides
│   ├── layouts.css       # Grilles et layouts (colonnes, cards)
│   ├── components.css    # Composants UI (badges, stats, diagrammes)
│   ├── navigation.css    # Contrôles de navigation et progression
│   └── zoom-modal.css    # Modal de zoom pour les diagrammes
│
├── js/                    # 6 modules JavaScript ES6
│   ├── main.js           # Point d'entrée, initialisation
│   ├── slideManager.js   # Gestion de la navigation entre slides
│   ├── zoomManager.js    # Fonctionnalités de zoom des diagrammes
│   ├── indicatorManager.js # Gestion des indicateurs visuels
│   ├── inputManager.js   # Gestion des entrées (clavier, tactile)
│   └── slideLoader.js    # **NOUVEAU** Chargement dynamique des slides
│
├── images/                # 10 diagrammes PNG (1.7 MB)
│   ├── slide2-as-is-contexte.png (184 KB)
│   ├── slide3-as-is-architecture.png (194 KB)
│   ├── slide8-to-be-contexte.png (229 KB)
│   ├── slide9-hexagonale.png (228 KB)
│   ├── slide10-detail-commande.png (282 KB)
│   ├── slide11-persona-client.png (106 KB)
│   ├── slide12-persona-franchise.png (120 KB)
│   ├── slide13-persona-livreur.png (125 KB)
│   ├── slide14-persona-admin.png (152 KB)
│   └── slide15-comparaison.png (124 KB)
│
├── slides/                # **NOUVEAU** Slides séparées (un fichier par slide)
│   ├── index.json        # Index des slides
│   ├── slide-01-Architecture-Good-Food-30.html
│   ├── slide-03-Architecture-Technique-Actuelle-N2.html
│   ├── slide-04-Exigences-Non-Fonctionnelles.html
│   ├── ... (24 fichiers HTML au total)
│   └── slide-25-Slide-25.html
│
└── data/                  # Configuration et données
    └── slides-config.json # Métadonnées des slides
```

## 🎯 Deux Modes de Fonctionnement

### Mode 1: Statique (index.html)
- **Avantage:** Fonctionne sans serveur HTTP, directement dans le navigateur
- **Utilisation:** Double-clic sur `index.html`
- **Inconvénient:** Un seul gros fichier HTML (54 KB)

### Mode 2: Dynamique (index-dynamic.html) ⭐ **RECOMMANDÉ**
- **Avantage:** Slides séparées, chargement à la demande, meilleure maintenabilité
- **Utilisation:** Nécessite un serveur HTTP local
- **Inconvénient:** Nécessite `python -m http.server` ou équivalent

```bash
# Lancer avec Python
cd presentation
python -m http.server 8000

# Ouvrir: http://localhost:8000/index-dynamic.html
```

## 📝 Structure des Slides

### Slides Séparées (slides/)

Chaque slide est un fichier HTML autonome contenant:

```html
<div class="slide" data-slide="1">
    <div class="slide-header">
        <div class="slide-number">Slide 1/25</div>
        <h2>Titre de la Slide</h2>
    </div>
    <div class="slide-content">
        <!-- Contenu de la slide -->
    </div>
    <div class="slide-footer">
        <span>Good Food 3.0 - Architecture Logicielle</span>
        <span>CESI MAALSI</span>
    </div>
</div>
```

### Index des Slides (slides/index.json)

```json
{
  "total": 24,
  "slides": [
    {"number": 1, "file": "slide-01-Architecture-Good-Food-30.html"},
    {"number": 3, "file": "slide-03-Architecture-Technique-Actuelle-N2.html"},
    ...
  ]
}
```

## 🔧 Workflow de Développement

### 1. Modifier les Slides

**Option A: Modifier les fichiers séparés** (recommandé)
```bash
# Éditer une slide spécifique
vim presentation/slides/slide-05-Demarche-de-Conception-Architecture.html

# Recharger la présentation dans le navigateur
```

**Option B: Modifier le fichier source**
```bash
# Éditer le fichier original
vim presentation_slides.html

# Reconstruire tout
python build-presentation.py
python extract-slides.py
```

### 2. Ajouter une Nouvelle Slide

```bash
# Créer un nouveau fichier dans slides/
vim presentation/slides/slide-26-Nouvelle-Slide.html

# Mettre à jour slides/index.json
vim presentation/slides/index.json
```

### 3. Modifier les Styles

```bash
# Modifier les variables de thème
vim presentation/css/variables.css

# Modifier un composant spécifique
vim presentation/css/components.css
```

### 4. Ajouter une Fonctionnalité JS

```bash
# Créer un nouveau module
vim presentation/js/newFeature.js

# L'importer dans main.js
vim presentation/js/main.js
```

## 🚀 Scripts de Build

### build-presentation.py
Génère `presentation/index.html` (version statique) depuis `presentation_slides.html`:

```bash
python build-presentation.py
```

**Actions:**
1. Extrait le contenu des slides
2. Remplace les chemins d'images
3. Génère HTML avec imports CSS/JS modulaires

### extract-slides.py
Extrait chaque slide dans un fichier séparé:

```bash
python extract-slides.py
```

**Actions:**
1. Lit `presentation/index.html`
2. Extrait chaque `<div class="slide">`
3. Crée un fichier par slide dans `slides/`
4. Génère `slides/index.json`

## 📊 Modules CSS Détaillés

### variables.css (Thème)
```css
:root {
    --primary-color: #2c3e50;
    --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --transition-fast: 0.2s ease;
    --z-zoom-modal: 10000;
}
```

### base.css (Foundation)
- Reset CSS (`*, body, h1-h6, ul, table`)
- Typographie de base
- Styles des éléments HTML

### slides.css (Slides)
- `.slide-container`, `.slide`
- Animations `@keyframes slideIn`
- `.slide-header`, `.slide-content`, `.slide-footer`
- `.title-slide`, `.scrollable-content`

### layouts.css (Layouts)
- `.two-columns`, `.three-columns`, `.four-columns`
- `.content-box`, `.grid-stats`, `.stat-card`
- `.architecture-layer`

### components.css (UI)
- `.badge`, `.big-number`, `.highlight`
- `.diagram-container`, `.zoom-icon`
- `.score-high`, `.score-low`

### navigation.css (Navigation)
- `.navigation`, `.nav-btn`
- `.progress-bar`
- `.slide-indicator`, `.indicator-dot`

### zoom-modal.css (Zoom)
- `.zoom-modal`, `.zoom-content`
- `.zoom-controls`, `.zoom-btn`
- `.close-zoom`

## 📦 Modules JavaScript Détaillés

### main.js (Orchestrateur)
```javascript
// Imports
import { SlideManager } from './slideManager.js';
import { SlideLoader } from './slideLoader.js';

// Initialisation asynchrone
async function init() {
    await slideLoader.loadAllSlides();
    slideManager = new SlideManager(totalSlides);
    // ...
}
```

### slideManager.js
```javascript
class SlideManager {
    showSlide(n)       // Afficher slide N
    changeSlide(offset) // +1 ou -1
    goToSlide(n)       // Direct
    updateIndicators() // Sync dots
}
```

### slideLoader.js **NOUVEAU**
```javascript
class SlideLoader {
    loadIndex()         // Charger slides/index.json
    loadSlide(n)        // Charger slide N (avec cache)
    loadAllSlides()     // Charger toutes les slides
    getTotalSlides()    // Nombre total
}
```

### zoomManager.js
```javascript
class ZoomManager {
    addZoomIconsToDiagrams() // Ajouter icônes
    closeZoom()              // Fermer modal
    zoomIn/Out/Reset()       // Contrôles zoom
}
```

### indicatorManager.js
```javascript
class IndicatorManager {
    createIndicators() // Créer dots navigation
}
```

### inputManager.js
```javascript
class InputManager {
    setupEventListeners() // Clavier + tactile
    handleSwipe()         // Gestes swipe
}
```

## 🎨 Personnalisation

### Changer le Thème
```css
/* presentation/css/variables.css */
:root {
    --bg-gradient: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
}
```

### Ajouter une Animation
```css
/* presentation/css/slides.css */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.slide {
    animation: fadeIn 0.5s;
}
```

### Créer un Nouveau Layout
```css
/* presentation/css/layouts.css */
.five-columns {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
}
```

## 🧪 Tests et Débogage

### Ouvrir la Console
```javascript
// La console affiche les logs:
[INIT] Initializing presentation...
[SlideLoader] Loaded index: 24 slides
[SlideLoader] Loaded slide 1
[INIT] Total slides: 24
[INIT] Presentation initialized successfully
```

### Tester une Slide Spécifique
```javascript
// Dans la console du navigateur
goToSlide(10); // Aller à la slide 10
```

### Vérifier le Chargement
```javascript
// Dans la console
console.log(slideLoader.slidesCache); // Voir les slides en cache
console.log(slideManager.currentSlide); // Slide actuelle
```

## 📖 Références

- **ES6 Modules:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- **CSS Variables:** https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

**Auteurs:** CESI MAALSI - INFMAALSIAPC1
**Projet:** Good Food 3.0 - Architecture Logicielle
**Version:** 2.0 (Modulaire + Slides Séparées)
**Date:** 2025-12-17
