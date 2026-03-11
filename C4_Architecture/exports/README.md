# Exports de Diagrammes pour Présentation

Ce dossier contient les exports PNG de tous les diagrammes PlantUML utilisés dans la présentation Good Food 3.0.

## Liste des Diagrammes Exportés

### Architecture AS-IS (Actuelle)
- **slide2-as-is-contexte.png** (184 KB) - Vue contexte de l'architecture actuelle
  - Source: `C4_Architecture/AS-IS_Architecture_Actuelle/N1_Contexte_Actuel.puml`

- **slide3-as-is-architecture.png** (194 KB) - Architecture technique niveau N2
  - Source: `C4_Architecture/AS-IS_Architecture_Actuelle/N2_Architecture_Actuelle.puml`

### Architecture TO-BE (Proposée)
- **slide8-to-be-contexte.png** (229 KB) - Vue contexte de la nouvelle architecture
  - Source: `C4_Architecture/TO-BE_Architecture_Proposee/N1_Contexte_Cible.puml`
  - ✅ **Corrigé**: Couleurs optimisées pour meilleure lisibilité (texte vert foncé #155724 sur fond vert clair #D4EDDA)

- **slide9-hexagonale.png** (228 KB) - Architecture hexagonale complète
  - Source: `C4_Architecture/TO-BE_Architecture_Proposee/N2_Architecture_Hexagonale.puml`
  - Note: Utilise le fichier N2_Architecture_Hexagonale.puml (version sans emojis problématiques)

- **slide10-detail-commande.png** (282 KB) - Détail du service commande
  - Source: `C4_Architecture/TO-BE_Architecture_Proposee/N3_Detail_Hexagonal_Commande.puml`

### Personas
- **slide11-persona-client.png** (106 KB) - Vue client
  - Source: `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Client.puml`

- **slide12-persona-franchise.png** (120 KB) - Vue franchisé
  - Source: `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Franchise.puml`

- **slide13-persona-livreur.png** (125 KB) - Vue livreur
  - Source: `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Livreur.puml`

- **slide14-persona-admin.png** (152 KB) - Vue administrateur
  - Source: `C4_Architecture/TO-BE_Architecture_Proposee/Persona_Administrateur.puml`

### Comparaison
- **slide15-comparaison.png** (124 KB) - Comparaison avant/après
  - Source: `C4_Architecture/COMPARAISON_Avant_Apres.puml`
  - ✅ **Corrigé**: Couleurs optimisées pour meilleure lisibilité
    - Rouge: texte #721C24 sur fond #F8D7DA
    - Vert: texte #155724 sur fond #D4EDDA

## Corrections Appliquées

### 1. Problème de lisibilité du texte (résolu)
**Fichiers concernés:**
- `N1_Contexte_Cible.puml`
- `COMPARAISON_Avant_Apres.puml`

**Problème:** Texte blanc sur fond vert pomme (#B3FFB3) peu lisible

**Solution:** Utilisation de couleurs Bootstrap pour meilleure lisibilité:
- Fond vert: #D4EDDA (vert clair)
- Texte: #155724 (vert foncé)
- Bordure: #28A745 (vert Bootstrap)

### 2. Erreur de syntaxe diagram hexagonal (contournée)
**Fichier concerné:** `N2_Architecture_Hexagonale_Complete.puml`

**Problème:** Erreur ligne 27 lors de la génération (probablement liée aux emojis UTF-8)

**Solution:** Utilisation du fichier alternatif `N2_Architecture_Hexagonale.puml` qui génère correctement

## Régénération des Diagrammes

Pour régénérer tous les diagrammes après modification:

```bash
# Méthode 1: Script PowerShell
.\generate_all_diagrams.ps1

# Méthode 2: Commande directe
java -jar plantuml.jar "C4_Architecture/**/*.puml" -tpng -charset UTF-8
```

## Utilisation dans la Présentation

Ces diagrammes sont référencés dans le fichier `presentation_slides.html`:
- Slide 2: slide2-as-is-contexte.png
- Slide 3: slide3-as-is-architecture.png
- Slide 8: slide8-to-be-contexte.png
- Slide 9: slide9-hexagonale.png
- Slide 10: slide10-detail-commande.png
- Slide 11: slide11-persona-client.png
- Slide 12: slide12-persona-franchise.png
- Slide 13: slide13-persona-livreur.png
- Slide 14: slide14-persona-admin.png
- Slide 15: slide15-comparaison.png

**Total**: 10 diagrammes (1.7 MB)

---
*Dernière mise à jour: 2025-12-17*
*Good Food 3.0 - CESI MAALSI*