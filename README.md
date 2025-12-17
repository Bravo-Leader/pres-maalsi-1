# Good Food 3.0 - Présentation Architecture

Présentation professionnelle de l'architecture Good Food 3.0, refactorisée avec une structure modulaire et dynamique.

## 📁 Structure du Projet

```
presentation/
├── index.html              # Point d'entrée principal (chargement dynamique)
├── index.static.html       # Backup version statique
├── README.md               # Ce fichier
├── STRUCTURE.md            # Documentation technique détaillée
│
├── css/                    # Fichiers CSS modulaires
│   ├── variables.css       # Variables CSS et thème
│   ├── base.css            # Styles de base et reset
│   ├── slides.css          # Styles des slides
│   ├── layouts.css         # Composants de layout (colonnes, grilles)
│   ├── components.css      # Composants UI (badges, cards, etc.)
│   ├── navigation.css      # Navigation et contrôles
│   └── zoom-modal.css      # Modal de zoom pour les diagrammes
│
├── js/                     # Modules JavaScript
│   ├── main.js             # Point d'entrée principal
│   ├── slideLoader.js      # Chargement dynamique des slides
│   ├── slideManager.js     # Gestion de la navigation des slides
│   ├── zoomManager.js      # Gestion du zoom des diagrammes
│   ├── indicatorManager.js # Gestion des indicateurs de slides
│   └── inputManager.js     # Gestion des entrées clavier/tactiles
│
├── slides/                 # Slides individuelles (HTML)
│   ├── index.json          # Configuration et ordre des slides
│   └── slide-*.html        # Fichiers HTML des slides
│
├── images/                 # Images et diagrammes
│   └── ...
│
└── data/                   # Données et configuration
    └── slides-config.json  # Configuration optionnelle
```

## 🚀 Utilisation

### Pré-requis
La présentation utilise des modules ES6 et le chargement dynamique via `fetch`, ce qui nécessite un serveur HTTP local pour éviter les restrictions de sécurité CORS des navigateurs (file:// protocol).

### Lancer la Présentation

1. **Avec Python** (installé par défaut sur macOS/Linux/certains Windows)
   ```bash
   cd presentation
   python -m http.server 8000
   # Ouvrir http://localhost:8000
   ```

2. **Avec Node.js**
   ```bash
   npx serve presentation
   # Ouvrir l'URL indiquée
   ```

3. **Avec VS Code**
   - Installer l'extension "Live Server"
   - Clic droit sur `index.html` -> "Open with Live Server"

### Navigation

- **Clavier:**
  - `←` / `→` : Slide précédent / suivant
  - `Home` : Première slide
  - `End` : Dernière slide
  - `Esc` : Fermer le zoom

- **Souris:**
  - Boutons de navigation en bas à droite
  - Indicateurs de slides en bas au centre
  - Clic sur les diagrammes pour zoomer

- **Tactile:**
  - Swipe gauche/droite pour naviguer

## 🔧 Développement

### Modifier une Slide
Les slides sont situées dans le dossier `slides/`. Chaque fichier HTML correspond à une slide.
Modifiez simplement le fichier HTML correspondant et rafraîchissez la page.

### Ajouter une Slide
1. Créez un nouveau fichier HTML dans `slides/`.
2. Ajoutez son entrée dans `slides/index.json`.

### Personnalisation
Les styles sont dans le dossier `css/`. Modifiez `variables.css` pour changer le thème global.

## 📊 Contenu

La présentation contient 25 slides couvrant :
- Introduction et Contexte
- Architecture AS-IS vs TO-BE
- Choix Techniques (Microservices, Hexagonale, etc.)
- Personas et Vues
- Organisation de l'équipe et ROI

---

**Auteurs:** CESI MAALSI - INFMAALSIAPC1
**Projet:** Good Food 3.0 - Architecture Logicielle
**Date:** 2025-12-17
