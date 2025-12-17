# Structure de la Présentation - Good Food 3.0

## 📁 Architecture Modulaire

La présentation suit une architecture modulaire avec chargement dynamique des slides :

```
presentation/
├── index.html              # Point d'entrée (Dynamic Loader)
├── index.static.html       # Version statique (Backup)
├── README.md               # Documentation utilisateur
├── STRUCTURE.md            # Ce fichier - Documentation technique
│
├── css/                    # 7 fichiers CSS modulaires
│   ├── variables.css       # Thème: couleurs, espacements, transitions
│   ├── base.css            # Reset CSS, typographie, éléments de base
│   ├── slides.css          # Structure et animations des slides
│   ├── layouts.css         # Grilles et layouts (colonnes, cards)
│   ├── components.css      # Composants UI (badges, stats, diagrammes)
│   ├── navigation.css      # Contrôles de navigation et progression
│   └── zoom-modal.css      # Modal de zoom pour les diagrammes
│
├── js/                     # Modules JavaScript ES6
│   ├── main.js             # Point d'entrée, initialisation
│   ├── slideLoader.js      # Chargement dynamique des slides depuis slides/
│   ├── slideManager.js     # Gestion de la navigation entre slides
│   ├── zoomManager.js      # Fonctionnalités de zoom des diagrammes
│   ├── indicatorManager.js # Gestion des indicateurs visuels
│   └── inputManager.js     # Gestion des entrées (clavier, tactile)
│
├── slides/                 # Slides séparées (un fichier par slide)
│   ├── index.json          # Configuration et ordre des slides
│   ├── slide-01-....html
│   └── ...
│
└── images/                 # Diagrammes et assets
```

## 🎯 Fonctionnement Dynamique

La présentation fonctionne désormais par défaut en mode dynamique (`index.html`).

### Processus de Chargement
1. `index.html` charge les styles CSS et le module `js/main.js`.
2. `main.js` initialise `SlideLoader`.
3. `SlideLoader` charge `slides/index.json` pour obtenir la liste des slides.
4. Pour chaque slide configurée, le loader récupère le fichier HTML correspondant dans `slides/`.
5. Le contenu HTML est injecté dans le conteneur `.slide-container`.
6. Une fois toutes les slides chargées, `SlideManager` initialise la navigation.

### Configuration (`slides/index.json`)
```json
{
  "total": 25,
  "slides": [
    {
      "number": 1,
      "file": "slide-01-Architecture-Good-Food-30.html"
    },
    ...
  ]
}
```

## 🔧 Maintenance

### Ajouter/Modifier des Slides
1. **Création** : Ajouter un fichier HTML dans le dossier `slides/`.
2. **Configuration** : Ajouter une entrée dans `slides/index.json`.
3. **Structure d'une slide** :
```html
<div class="slide" data-slide="X">
    <div class="slide-header">...</div>
    <div class="slide-content">...</div>
    <div class="slide-footer">...</div>
</div>
```

### Styles et Thèmes
Tout est centralisé dans `css/variables.css` pour les couleurs et dimensions principales.

## 📦 Modules JavaScript

- **SlideLoader** : Gère le `fetch` des fichiers et le cache.
- **SlideManager** : Gère l'état actif, la progression et l'affichage.
- **ZoomManager** : Gère l'affichage modal des images.
- **InputManager** : Gère les événements clavier et touch.

---

**Auteurs:** CESI MAALSI - INFMAALSIAPC1
**Version:** 2.1 (Full Dynamic)
**Date:** 2025-12-17
