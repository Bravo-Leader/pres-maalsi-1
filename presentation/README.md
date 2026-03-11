# Good Food 3.0 - Présentation Architecture

Présentation professionnelle de l'architecture Good Food 3.0, refactorisée avec une structure modulaire et organisée.

## 📁 Structure du Projet

```
presentation/
├── index.html              # Page principale de la présentation
├── README.md               # Ce fichier
│
├── css/                    # Fichiers CSS modulaires
│   ├── variables.css       # Variables CSS et thème
│   ├── base.css           # Styles de base et reset
│   ├── slides.css         # Styles des slides
│   ├── layouts.css        # Composants de layout (colonnes, grilles)
│   ├── components.css     # Composants UI (badges, cards, etc.)
│   ├── navigation.css     # Navigation et contrôles
│   └── zoom-modal.css     # Modal de zoom pour les diagrammes
│
├── js/                     # Modules JavaScript
│   ├── main.js            # Point d'entrée principal
│   ├── slideManager.js    # Gestion de la navigation des slides
│   ├── zoomManager.js     # Gestion du zoom des diagrammes
│   ├── indicatorManager.js # Gestion des indicateurs de slides
│   └── inputManager.js    # Gestion des entrées clavier/tactiles
│
├── images/                 # Images et diagrammes
│   ├── slide2-as-is-contexte.png
│   ├── slide3-as-is-architecture.png
│   ├── slide8-to-be-contexte.png
│   ├── slide9-hexagonale.png
│   ├── slide10-detail-commande.png
│   ├── slide11-persona-client.png
│   ├── slide12-persona-franchise.png
│   ├── slide13-persona-livreur.png
│   ├── slide14-persona-admin.png
│   └── slide15-comparaison.png
│
└── data/                   # Données et configuration
    └── slides-config.json  # Configuration des slides
```

## 🚀 Utilisation

### Ouvrir la Présentation

1. **Option 1: Directement dans le navigateur**
   ```bash
   # Ouvrez simplement le fichier
   open presentation/index.html
   # ou
   start presentation/index.html
   ```

2. **Option 2: Avec un serveur local (recommandé pour ES6 modules)**
   ```bash
   # Avec Python
   cd presentation
   python -m http.server 8000

   # Avec Node.js
   npx serve presentation

   # Ensuite, ouvrez: http://localhost:8000
   ```

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

## 🔧 Reconstruction

Si vous modifiez le fichier `presentation_slides.html` original, reconstruisez la présentation:

```bash
# Depuis la racine du projet
python build-presentation.py
```

Le script:
1. Lit `presentation_slides.html`
2. Extrait le contenu des slides
3. Remplace les chemins d'images
4. Génère `presentation/index.html` avec les modules CSS/JS

## 🎨 Personnalisation

### Couleurs et Thème

Modifiez `css/variables.css` pour changer les couleurs:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Styles

Les styles sont organisés par responsabilité:
- **variables.css** : Thème et variables
- **base.css** : Reset et styles de base
- **slides.css** : Structure des slides
- **layouts.css** : Layouts (colonnes, grilles)
- **components.css** : Composants UI
- **navigation.css** : Contrôles de navigation
- **zoom-modal.css** : Fonctionnalité de zoom

### JavaScript

Les modules JavaScript sont:
- **main.js** : Initialisation
- **slideManager.js** : Navigation entre slides
- **zoomManager.js** : Zoom des diagrammes
- **indicatorManager.js** : Indicateurs visuels
- **inputManager.js** : Gestion des entrées

## 📊 Contenu de la Présentation

### 25 Slides au Total

1. **Page de titre** - Introduction
2-3. **AS-IS** - Architecture actuelle
4-7. **Analyse & Conception** - Démarche et choix
8-10. **TO-BE Architecture** - Nouvelle architecture
11-14. **Personas** - Vues par utilisateur
15. **Comparaison** - Avant/Après
16-20. **Détails Techniques** - Stack, ROI, Améliora tions
21-24. **Équipe & Organisation**
25. **Conclusion** - Questions

## 🔍 Caractéristiques

- ✅ Structure modulaire (CSS/JS séparés)
- ✅ Navigation intuitive (clavier, souris, tactile)
- ✅ Zoom interactif sur les diagrammes
- ✅ Indicateurs de progression
- ✅ Design responsive
- ✅ Mode impression
- ✅ Animations fluides
- ✅ Code bien organisé et documenté

## 📝 Notes

- Les modules JavaScript utilisent ES6 modules (`type="module"`)
- Les images sont optimisées (PNG, ~1.7 MB total)
- Compatible avec tous les navigateurs modernes
- Testée sur Chrome, Firefox, Safari, Edge

---

**Auteurs:** CESI MAALSI - INFMAALSIAPC1
**Projet:** Good Food 3.0 - Architecture Logicielle
**Date:** 2025-12-17
