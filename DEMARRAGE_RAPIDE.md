# 🚀 Démarrage Rapide - Architecture C4 Good Food

## ⚡ En 3 minutes

### ✅ Étape 1 : Vérifier les fichiers

Vous devriez avoir cette structure :
```
📁 Projet collaboratif 1/
├── 📁 C4_Architecture/
│   ├── 📁 Niveau_1_Contexte/     ← 3 diagrammes
│   ├── 📁 Niveau_2_Conteneurs/   ← 2 diagrammes  
│   ├── 📁 Niveau_3_Composants/   ← 1 diagramme
│   ├── 📁 exports/               ← Pour les images
│   ├── README.md
│   ├── INDEX.md
│   └── INSTALLATION_WINDOWS.md
├── 📁 .vscode/
│   └── settings.json             ← Configuration PlantUML
└── 🎯 DEMARRAGE_RAPIDE.md        ← Ce fichier
```

---

### ✅ Étape 2 : Installer PlantUML

#### Option A : Si Graphviz n'est pas installé
1. Télécharger : https://graphviz.org/download/
2. Installer en cochant **"Add to PATH"**
3. Redémarrer votre ordinateur

#### Option B : Utiliser le serveur en ligne (plus simple)
**Rien à installer !** Les paramètres sont déjà configurés dans `.vscode/settings.json`

---

### ✅ Étape 3 : Installer l'extension VS Code

1. Ouvrir VS Code
2. Aller dans **Extensions** (Ctrl + Shift + X)
3. Chercher : **"PlantUML"**
4. Installer l'extension par **jebbs**
5. Redémarrer VS Code

---

### ✅ Étape 4 : Tester !

1. Ouvrir le fichier :
   ```
   C4_Architecture/Niveau_1_Contexte/01_Vue_Generale.puml
   ```

2. Appuyer sur **Alt + D** (ou clic droit > "Preview Current Diagram")

3. 🎉 Le diagramme apparaît à droite !

---

## 📊 Parcourir les Diagrammes

### 🌍 Commencez par le Niveau 1 (Vue d'ensemble)

**Ouvrez dans cet ordre :**
1. `Niveau_1_Contexte/01_Vue_Generale.puml`
   - 👁️ Vision globale de Good Food

2. `Niveau_1_Contexte/02_Parcours_Client.puml`
   - 🛒 Parcours d'achat du client

3. `Niveau_1_Contexte/03_Gestion_Franchisé.puml`
   - 🏪 Outils pour les franchisés

### 🏗️ Continuez avec le Niveau 2 (Architecture)

4. `Niveau_2_Conteneurs/01_Architecture_Simplifiee.puml`
   - 📦 Les 3 blocs principaux

5. `Niveau_2_Conteneurs/02_Flux_Commande_Client.puml`
   - 🔄 Processus de commande détaillé

### ⚙️ Terminez par le Niveau 3 (Détails)

6. `Niveau_3_Composants/01_Detail_Gestion_Commandes.puml`
   - 🔍 Fonctionnement interne d'un service

---

## 💾 Exporter pour PowerPoint

### Méthode Rapide

1. **Ouvrir** un fichier `.puml`
2. **Prévisualiser** avec Alt + D
3. **Clic droit** sur le diagramme > "Export Current Diagram"
4. **Choisir format** : PNG ou SVG (recommandé)
5. **Résultat** : Fichier dans `C4_Architecture/exports/`

### Formats Recommandés

| Format | Usage | Qualité |
|--------|-------|---------|
| **SVG** | PowerPoint (éditable) | ⭐⭐⭐⭐⭐ |
| **PNG** | Documents, rapports | ⭐⭐⭐⭐ |
| **PDF** | Impression | ⭐⭐⭐⭐⭐ |

---

## 📖 Documentation Complète

Pour plus d'informations :

📘 **Guide complet** : `C4_Architecture/README.md`
- Explication des niveaux C4
- Guide par persona
- Comment lire les diagrammes

📑 **Index des diagrammes** : `C4_Architecture/INDEX.md`
- Liste complète des diagrammes
- Ordre de présentation
- Checklist présentation

🪟 **Installation Windows** : `C4_Architecture/INSTALLATION_WINDOWS.md`
- Installation détaillée de Graphviz
- Résolution de problèmes
- Configuration VS Code

---

## 🎯 Pour la Présentation (20 min)

### Diagrammes essentiels à présenter :

1. **Vue Générale** (3 min)
   - Contexte et écosystème

2. **Parcours Client** (4 min)
   - Expérience utilisateur

3. **Architecture Simplifiée** (5 min)
   - Les blocs techniques

4. **Flux Commande** (4 min)
   - Processus métier

5. **Détail Service** (2 min)
   - Exemple de robustesse

6. **Gestion Franchisé** (2 min)
   - Outils réseau

**Total : 20 minutes** + 15 min Q&A = 35 min

---

## 🐛 Problèmes Courants

### ❌ "Je ne vois pas le diagramme"

**Solution 1 :** Vérifier que l'extension PlantUML est installée
- Extensions (Ctrl+Shift+X) > Chercher "PlantUML"

**Solution 2 :** Utiliser le serveur en ligne
- Déjà configuré dans `.vscode/settings.json`
- Pas besoin de Graphviz

**Solution 3 :** Aller sur le site
- https://www.plantuml.com/plantuml/
- Copier-coller le contenu du fichier

### ❌ "Graphviz not found"

**Solution :** Ne pas installer Graphviz !
- Utiliser le mode serveur (déjà configuré)
- Ça fonctionne directement

### ❌ "Le diagramme est trop petit"

**Solution :** Zoomer dans VS Code
- Ctrl + Molette de souris
- Ou : Ctrl + "+" pour agrandir

---

## 💡 Astuces

### Raccourcis Clavier VS Code

| Raccourci | Action |
|-----------|--------|
| **Alt + D** | Prévisualiser le diagramme |
| **Ctrl + Shift + P** | Palette de commandes |
| **Ctrl + /** | Commenter une ligne |
| **Ctrl + S** | Sauvegarder |

### Navigation Rapide

Pour ouvrir rapidement un fichier :
1. **Ctrl + P**
2. Taper le nom (ex: "vue generale")
3. Entrée

### Édition

Les fichiers `.puml` sont du **texte simple** !
Vous pouvez les modifier avec n'importe quel éditeur.

---

## 🎓 Prochaines Étapes

### ✅ Vous avez terminé le démarrage rapide !

**Maintenant :**

1. 📖 Lire le `C4_Architecture/README.md` complet
2. 📊 Parcourir tous les diagrammes
3. 💾 Exporter les images pour PowerPoint
4. 🎯 Préparer votre présentation
5. 🎤 Répéter votre pitch (20 min)

### 📚 Ressources Supplémentaires

- **Tâches du projet** : `Project_Tasks.md`
- **Architecture TOGAF** : `TOGAF_Architecture_GoodFood.md`
- **Guide C4-PlantUML** : `GUIDE_C4_PlantUML_VSCode.md`

---

## ✉️ Besoin d'Aide ?

- **Documentation C4** : https://c4model.com/
- **PlantUML** : https://plantuml.com/
- **Extension VS Code** : https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml

---

## 🎉 C'est Parti !

Vous êtes maintenant prêt à utiliser les diagrammes C4 pour votre présentation Good Food !

**Bon courage pour votre projet ! 🚀**

---

*Guide de démarrage rapide - Good Food 3.0*
*Version: 1.0*

