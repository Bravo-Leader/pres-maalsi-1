# Architecture C4 - Good Food (Vue Business)

## 📁 Organisation des Diagrammes

Cette architecture est organisée de manière **simple et progressive** pour un public **non-technique** (direction, responsables métier, franchisés).

```
C4_Architecture/
├── Niveau_1_Contexte/          ← Vue stratégique (Direction, DSI)
│   ├── 01_Vue_Generale.puml
│   ├── 02_Parcours_Client.puml
│   └── 03_Gestion_Franchisé.puml
│
├── Niveau_2_Conteneurs/        ← Vue fonctionnelle (Responsables métier)
│   ├── 01_Architecture_Simplifiee.puml
│   └── 02_Flux_Commande_Client.puml
│
└── Niveau_3_Composants/        ← Vue détaillée (Chefs de produit)
    └── 01_Detail_Gestion_Commandes.puml
```

---

## 🎯 Les 3 Niveaux Expliqués (Version Business)

### 📊 **Niveau 1 : Vue d'Ensemble (Contexte)**
**Pour qui ?** Direction, DSI, Comité de direction

**Ce qu'on voit :**
- Les **utilisateurs** de la plateforme (clients, franchisés, admin)
- Le **système Good Food** dans sa globalité
- Les **systèmes externes** avec lesquels on interagit
- Les **flux métier principaux**

**Objectif :** Comprendre l'écosystème complet en un coup d'œil

#### 📄 Diagrammes disponibles :
1. **Vue Générale** - Vision globale de la plateforme
2. **Parcours Client** - L'expérience utilisateur de A à Z
3. **Gestion Franchisé** - Les outils du réseau de franchises

---

### 🔧 **Niveau 2 : Architecture Fonctionnelle (Conteneurs)**
**Pour qui ?** Responsables métier, Product Owners, Directeurs opérationnels

**Ce qu'on voit :**
- Les **grandes briques fonctionnelles** (gestion commandes, paiements, etc.)
- L'**application web** et l'**application mobile**
- Les **bases de données**
- Les **flux entre les différentes parties**

**Objectif :** Comprendre comment les fonctions métier s'organisent

#### 📄 Diagrammes disponibles :
1. **Architecture Simplifiée** - Les 3 blocs principaux de la plateforme
2. **Flux Commande Client** - Le parcours complet d'une commande

---

### ⚙️ **Niveau 3 : Détail Fonctionnel (Composants)**
**Pour qui ?** Chefs de produit, Responsables fonctionnels

**Ce qu'on voit :**
- Le **détail interne** d'une fonction métier
- Les **étapes de traitement**
- Les **règles de validation**
- Les **interactions détaillées**

**Objectif :** Comprendre comment fonctionne une fonctionnalité précise

#### 📄 Diagrammes disponibles :
1. **Détail Gestion Commandes** - Comment fonctionne le service commandes

---

## 👥 Guide par Persona

### 🎯 **Vous êtes un DIRIGEANT / DSI**
**Commencez par :**
1. `Niveau_1_Contexte/01_Vue_Generale.puml`
   - Vision stratégique complète

**Pourquoi ?** Pour comprendre l'investissement global et les bénéfices attendus

---

### 👔 **Vous êtes RESPONSABLE COMMERCIAL / MARKETING**
**Commencez par :**
1. `Niveau_1_Contexte/02_Parcours_Client.puml`
   - Le parcours d'achat du client
2. `Niveau_2_Conteneurs/02_Flux_Commande_Client.puml`
   - Le détail du processus de commande

**Pourquoi ?** Pour optimiser l'expérience client et le tunnel de conversion

---

### 🏪 **Vous êtes RESPONSABLE RÉSEAU FRANCHISES**
**Commencez par :**
1. `Niveau_1_Contexte/03_Gestion_Franchisé.puml`
   - Les outils pour les franchisés
2. `Niveau_2_Conteneurs/01_Architecture_Simplifiee.puml`
   - L'organisation des services

**Pourquoi ?** Pour comprendre les outils mis à disposition des franchisés

---

### 💼 **Vous êtes CHEF DE PRODUIT / PRODUCT OWNER**
**Parcours complet recommandé :**
1. `Niveau_1_Contexte/` - Comprendre le contexte global
2. `Niveau_2_Conteneurs/` - Voir les interactions entre fonctions
3. `Niveau_3_Composants/` - Détail d'une fonctionnalité

**Pourquoi ?** Pour définir précisément les spécifications fonctionnelles

---

## 📖 Comment lire ces diagrammes

### 🔵 **Rectangles Bleus** = Personnes
- Ce sont les **utilisateurs** du système
- Exemples : Client, Franchisé, Administrateur

### 🟦 **Grands Rectangles** = Systèmes
- Le système **Good Food** (le nôtre)
- Les systèmes **externes** (banque, ERP, etc.)

### 📦 **Boîtes à l'intérieur** = Fonctions/Services
- Les **briques fonctionnelles** de l'application
- Exemples : Gestion Commandes, Paiements, Menus

### ➡️ **Flèches** = Interactions
- Montrent **qui fait quoi** et **qui communique avec qui**
- Le texte sur la flèche explique l'action

### 💾 **Cylindres** = Données
- Représentent le **stockage** d'informations
- Base de données, cache, etc.

---

## 🎨 Visualiser les diagrammes

### Option 1 : VS Code (Recommandé)
1. Installer l'extension **PlantUML**
2. Ouvrir un fichier `.puml`
3. Appuyer sur `Alt + D` pour voir le diagramme
4. Exporter en image pour PowerPoint

### Option 2 : En ligne
1. Aller sur https://www.plantuml.com/plantuml/
2. Copier-coller le contenu du fichier `.puml`
3. Voir le résultat instantanément
4. Télécharger l'image

### Option 3 : Export direct
Les diagrammes peuvent être exportés en :
- **PNG** - Pour documents et présentations
- **SVG** - Pour qualité maximale et édition
- **PDF** - Pour impression

---

## 💡 Points Clés pour la Présentation

### ✅ **Pour convaincre le DSI**

**Niveau 1 - Montrez :**
- ✨ La **simplicité** pour les utilisateurs
- 🔗 L'**intégration** avec l'existant (ERP, Sage, Banque)
- 📈 La **scalabilité** pour la croissance

**Niveau 2 - Montrez :**
- 🏗️ L'**architecture modulaire** (facile à faire évoluer)
- 🔒 La **sécurité** (paiements séparés)
- ⚡ La **performance** (cache, services indépendants)

**Niveau 3 - Montrez :**
- ✅ Les **validations métier**
- 🔄 Les **processus robustes**
- 📊 La **traçabilité** des opérations

---

## 📞 Questions Fréquentes

### ❓ "C'est trop technique pour moi"
➡️ **Commencez par le Niveau 1** - C'est fait pour vous !
Les diagrammes du Niveau 1 sont volontairement simplifiés.

### ❓ "Je ne vois pas la technologie"
➡️ **C'est volontaire !** Les niveaux 1 et 2 se concentrent sur le MÉTIER.
Les technologies sont mentionnées en petits caractères quand nécessaire.

### ❓ "Où est le détail de [fonctionnalité X] ?"
➡️ Le Niveau 3 peut être étendu avec autant de diagrammes que nécessaire.
Actuellement, seul "Gestion Commandes" est détaillé (c'est le plus critique).

### ❓ "Comment je modifie ces diagrammes ?"
➡️ Ce sont des **fichiers texte** ! Ouvrez-les dans n'importe quel éditeur.
La syntaxe est simple et lisible même sans générer le diagramme.

---

## 🚀 Prochaines Étapes

### Pour enrichir cette documentation :

**Niveau 1 - Ajoutez :**
- [ ] Vue pour les livreurs
- [ ] Vue pour le service comptabilité
- [ ] Vue pour le service communication

**Niveau 2 - Ajoutez :**
- [ ] Flux de gestion des stocks
- [ ] Processus de création de promotions
- [ ] Système de reporting

**Niveau 3 - Ajoutez :**
- [ ] Détail Service Paiement
- [ ] Détail Service Livraison
- [ ] Détail Service Analytics

---

*Documentation créée pour le projet Good Food 3.0*
*Approche C4 simplifiée pour public business*
*Version: 1.0*

