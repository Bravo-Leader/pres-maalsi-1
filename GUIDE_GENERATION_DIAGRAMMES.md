# 📊 Guide de Génération des Diagrammes C4

## Vue d'Ensemble

Vous avez maintenant **25 slides professionnelles** dans le fichier `presentation_slides.html`.

Pour une présentation complète, vous devez **générer les images** à partir des fichiers PlantUML et les intégrer dans les slides.

---

## 📁 Fichiers PlantUML Disponibles

### Architecture AS-IS (Actuel)
- `C4_Architecture/AS-IS_Architecture_Actuelle/N1_Contexte_Actuel.puml`
- `C4_Architecture/AS-IS_Architecture_Actuelle/N2_Architecture_Actuelle.puml`

### Architecture TO-BE (Proposée)
- `C4_Architecture/TO-BE_Architecture_Proposee/N1_Contexte_Cible.puml`
- `C4_Architecture/TO-BE_Architecture_Proposee/N2_Architecture_Hexagonale.puml`
- `C4_Architecture/TO-BE_Architecture_Proposee/N3_Detail_Hexagonal_Commande.puml`
- `C4_Architecture/TO-BE_Architecture_Proposee/N3_Detail_Service_Commande.puml`

### Vues par Persona
- `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Client.puml`
- `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Franchise.puml`
- `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Livreur.puml`
- `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Administrateur.puml`

### Comparaisons
- `C4_Architecture/COMPARAISON_Avant_Apres.puml`
- `C4_Architecture/COMPARAISON_Hexagonale.puml`

---

## 🎨 Méthode 1: Générer avec VS Code (Recommandé)

### Prérequis
1. **Installer l'extension PlantUML dans VS Code**
   - Ouvrir VS Code
   - Extensions (Ctrl+Shift+X)
   - Rechercher "PlantUML"
   - Installer l'extension "PlantUML" de jebbs

2. **Installer Java** (requis pour PlantUML)
   - Télécharger Java JDK: https://www.oracle.com/java/technologies/downloads/
   - Installer et redémarrer VS Code

3. **Installer Graphviz** (pour les diagrammes complexes)
   - Télécharger: https://graphviz.org/download/
   - Installer et ajouter au PATH

### Génération des Images

**Pour chaque fichier .puml :**

1. **Ouvrir le fichier** dans VS Code
   ```
   Exemple: C4_Architecture/AS-IS_Architecture_Actuelle/N1_Contexte_Actuel.puml
   ```

2. **Prévisualiser** (facultatif)
   - Appuyer sur `Alt + D`
   - Voir le rendu en temps réel

3. **Exporter en PNG**
   - Clic droit dans l'éditeur
   - Choisir "PlantUML: Export Current Diagram"
   - Sélectionner format: **PNG**
   - Choisir l'emplacement: `C4_Architecture/exports/`

4. **Renommer l'image** selon le slide
   ```
   Exemples:
   - slide2-as-is-contexte.png
   - slide3-as-is-architecture.png
   - slide8-to-be-contexte.png
   - slide9-hexagonale.png
   - etc.
   ```

### Qualité d'Export Recommandée

Dans VS Code, configurer la qualité :
- Ouvrir Settings (Ctrl+,)
- Rechercher "plantuml"
- **PlantUML > Export: Format** → PNG
- **PlantUML > Export: Scale** → 2 (pour haute résolution)

---

## 🌐 Méthode 2: Générer en Ligne (Alternative)

Si VS Code ne fonctionne pas, utiliser le serveur en ligne :

### Étapes

1. **Aller sur** https://www.plantuml.com/plantuml/uml/

2. **Copier le contenu** d'un fichier .puml
   - Ouvrir par exemple: `N1_Contexte_Actuel.puml`
   - Tout sélectionner (Ctrl+A)
   - Copier (Ctrl+C)

3. **Coller** dans l'éditeur en ligne

4. **Télécharger l'image**
   - Le diagramme s'affiche automatiquement
   - Clic droit sur l'image → "Enregistrer l'image sous..."
   - Sauvegarder dans `C4_Architecture/exports/`

---

## 📸 Intégration dans les Slides

### Option A: Intégration Directe (Recommandé)

Une fois les images générées, **remplacer les placeholders** dans `presentation_slides.html` :

**Exemple pour le Slide 2 :**

Chercher dans le HTML :
```html
<div class="diagram-placeholder">
    <p style="color: #666; font-size: 1.2em;">📄 Diagramme C4 Niveau 1</p>
    <p style="color: #999; margin-top: 10px;">AS-IS_Architecture_Actuelle/N1_Contexte_Actuel.puml</p>
</div>
```

Remplacer par :
```html
<img src="C4_Architecture/exports/slide2-as-is-contexte.png"
     alt="Architecture AS-IS Contexte"
     style="max-width: 100%; height: auto;">
```

### Option B: Affichage des Images depuis le Dossier

**Structure recommandée :**
```
presentation_slides.html
C4_Architecture/
└── exports/
    ├── slide2-as-is-contexte.png
    ├── slide3-as-is-architecture.png
    ├── slide8-to-be-contexte.png
    ├── slide9-hexagonale.png
    ├── slide10-detail-commande.png
    ├── slide11-persona-client.png
    ├── slide12-persona-franchise.png
    ├── slide13-persona-livreur.png
    ├── slide14-persona-admin.png
    └── slide15-comparaison.png
```

---

## 📋 Liste des Images à Générer

| Slide | Fichier Source | Nom d'Export Recommandé |
|-------|---------------|------------------------|
| 2 | `AS-IS_Architecture_Actuelle/N1_Contexte_Actuel.puml` | `slide2-as-is-contexte.png` |
| 3 | `AS-IS_Architecture_Actuelle/N2_Architecture_Actuelle.puml` | `slide3-as-is-architecture.png` |
| 8 | `TO-BE_Architecture_Proposee/N1_Contexte_Cible.puml` | `slide8-to-be-contexte.png` |
| 9 | `TO-BE_Architecture_Proposee/N2_Architecture_Hexagonale.puml` | `slide9-hexagonale.png` |
| 10 | `TO-BE_Architecture_Proposee/N3_Detail_Hexagonal_Commande.puml` | `slide10-detail-commande.png` |
| 11 | `TO-BE_Architecture_Proposee/Persona_Client.puml` | `slide11-persona-client.png` |
| 12 | `TO-BE_Architecture_Proposee/Persona_Franchise.puml` | `slide12-persona-franchise.png` |
| 13 | `TO-BE_Architecture_Proposee/Persona_Livreur.puml` | `slide13-persona-livreur.png` |
| 14 | `TO-BE_Architecture_Proposee/Persona_Administrateur.puml` | `slide14-persona-admin.png` |
| 15 | `COMPARAISON_Avant_Apres.puml` | `slide15-comparaison.png` |

---

## 🚀 Utilisation de la Présentation

### Ouvrir la Présentation
1. Double-cliquer sur `presentation_slides.html`
2. S'ouvre dans votre navigateur par défaut

### Navigation
- **Souris:** Boutons "Précédent" / "Suivant"
- **Clavier:** Flèches ← et →
- **Raccourcis:**
  - `Home` : Aller au premier slide
  - `End` : Aller au dernier slide
- **Indicateurs:** Cliquer sur les points en bas de l'écran
- **Mobile:** Swipe gauche/droite

### Mode Présentation
- Appuyer sur `F11` pour le plein écran
- Parfait pour présenter au DSI/CTO

### Export PDF
- `Ctrl+P` (Imprimer)
- Destination: "Enregistrer au format PDF"
- Toutes les 25 slides seront exportées

---

## 🎯 Correspondance Slides ↔ Grille d'Évaluation

| Critère Grille | Slides Correspondants |
|----------------|----------------------|
| **Schéma du SI existant** | Slides 2-3 |
| **Exigences non-fonctionnelles** | Slide 4 |
| **Démarche de conception** | Slide 5 |
| **Comparaison styles architecturaux** | Slides 6-7 |
| **Architecture logique détaillée** | Slides 8-10 |
| **Matrice de choix technologiques** | Slides 16-17 |
| **Points faibles / axes d'amélioration** | Slides 18-20 |
| **Organisation du groupe** | Slides 21-23 |

---

## 📊 Structure des 25 Slides

1. **Slide 1** - Page de titre
2. **Slide 2** - Contexte Actuel (AS-IS) avec diagramme N1
3. **Slide 3** - Architecture Actuelle (AS-IS) avec diagramme N2
4. **Slide 4** - Exigences Non-Fonctionnelles
5. **Slide 5** - Démarche de Conception
6. **Slide 6** - Comparaison des Styles Architecturaux
7. **Slide 7** - Justification des Choix
8. **Slide 8** - Architecture Cible (TO-BE) Contexte avec diagramme N1
9. **Slide 9** - Architecture Hexagonale avec diagramme N2
10. **Slide 10** - Détail Service Commande avec diagramme N3
11. **Slide 11** - Vue Client (Persona) avec diagramme
12. **Slide 12** - Vue Franchisé (Persona) avec diagramme
13. **Slide 13** - Vue Livreur (Persona) avec diagramme
14. **Slide 14** - Vue Administrateur (Persona) avec diagramme
15. **Slide 15** - Comparaison Avant/Après avec diagramme
16. **Slide 16** - Matrice de Choix Technologiques
17. **Slide 17** - Stack Technologique Complète
18. **Slide 18** - Points Faibles du SI Actuel
19. **Slide 19** - Axes d'Amélioration Prioritaires
20. **Slide 20** - ROI et Bénéfices Attendus
21. **Slide 21** - Organisation de l'Équipe
22. **Slide 22** - Points Forts de l'Équipe
23. **Slide 23** - Axes d'Amélioration de l'Équipe
24. **Slide 24** - Résumé Exécutif
25. **Slide 25** - Questions & Contact

---

## 💡 Conseils de Présentation

### Timing Recommandé (30-35 minutes)

- **Introduction** (Slide 1) : 1 min
- **Analyse Existant** (Slides 2-3) : 4 min
- **Exigences & Démarche** (Slides 4-5) : 5 min
- **Comparaison Styles** (Slides 6-7) : 4 min
- **Architecture Cible** (Slides 8-15) : 10 min
- **Choix Technologiques** (Slides 16-17) : 4 min
- **Amélioration SI** (Slides 18-20) : 4 min
- **Organisation Équipe** (Slides 21-23) : 3 min
- **Résumé** (Slide 24) : 2 min
- **Questions** (Slide 25) : 3 min

### Messages Clés par Section

**Architecture AS-IS :**
> "Le système actuel est obsolète et présente des risques critiques"

**Architecture TO-BE :**
> "Nous proposons une architecture moderne, scalable et sécurisée"

**Choix Architecturaux :**
> "Microservices + Hexagonale + Event-Driven répondent parfaitement aux exigences"

**ROI :**
> "350% de ROI sur 3 ans avec des bénéfices quantifiés"

---

## 🔧 Dépannage

### PlantUML ne s'affiche pas dans VS Code
1. Vérifier que Java est installé : `java -version` dans un terminal
2. Redémarrer VS Code
3. Vérifier l'extension PlantUML est activée

### Images floues
- Augmenter le scale d'export à 2 ou 3
- Exporter en SVG plutôt qu'en PNG (vectoriel, meilleure qualité)

### Diagrammes complexes ne s'affichent pas
- Installer Graphviz
- Vérifier que Graphviz est dans le PATH
- Redémarrer VS Code

---

## 📞 Support

Pour toute question sur :
- **PlantUML** : https://plantuml.com/
- **C4 Model** : https://c4model.com/
- **Extension VS Code** : https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml

---

**Bon courage pour votre présentation !** 🚀

*Document créé pour le projet Good Food 3.0*
*CESI MAALSI - INFMAALSIAPC1*
