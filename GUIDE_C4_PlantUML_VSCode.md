# Guide d'utilisation C4-PlantUML dans VS Code

## 🚀 Installation et Configuration

### 1. Prérequis

#### Installation de Graphviz (obligatoire)
**Windows:**
```powershell
# Via Chocolatey
choco install graphviz

# Ou téléchargez depuis: https://graphviz.org/download/
```

**Mac:**
```bash
brew install graphviz
```

**Linux:**
```bash
sudo apt-get install graphviz
```

#### Vérifier l'installation
```bash
dot -version
```

### 2. Extensions VS Code nécessaires

Installez ces extensions dans VS Code :

1. **PlantUML** (par jebbs)
   - ID: `jebbs.plantuml`
   - [Lien Marketplace](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

2. **PlantUML Previewer** (optionnel, mais recommandé)
   - Permet la prévisualisation en temps réel

### 3. Configuration VS Code

Ajoutez dans vos settings VS Code (`.vscode/settings.json`) :

```json
{
    "plantuml.render": "PlantUMLServer",
    "plantuml.server": "https://www.plantuml.com/plantuml",
    "plantuml.exportFormat": "png",
    "plantuml.exportSubFolder": false,
    "plantuml.exportOutDir": "diagrams_export"
}
```

---

## 📁 Structure des fichiers créés

```
Projet collaboratif 1/
├── C4_Diagrams_GoodFood.puml         # Diagramme de Contexte
├── C4_Container_GoodFood.puml        # Diagramme de Conteneurs
├── C4_Component_OrderService.puml    # Diagramme de Composants
├── C4_Deployment_GoodFood.puml       # Diagramme de Déploiement
└── GUIDE_C4_PlantUML_VSCode.md       # Ce guide
```

---

## 🎨 Utilisation dans VS Code

### Méthode 1 : Prévisualisation en temps réel

1. **Ouvrir un fichier `.puml`**
   ```
   Exemple: C4_Diagrams_GoodFood.puml
   ```

2. **Activer la prévisualisation**
   - **Raccourci:** `Alt + D` (Windows/Linux) ou `Option + D` (Mac)
   - **Menu:** Clic droit → `PlantUML: Preview Current Diagram`
   - **Palette de commandes:** `Ctrl + Shift + P` → `PlantUML: Preview`

3. **Panneau s'ouvre à droite**
   - Modification en temps réel
   - Zoom avec molette de souris
   - Export disponible

### Méthode 2 : Export en image

1. **Export PNG/SVG**
   - **Raccourci:** `Ctrl + Alt + Shift + E`
   - **Menu:** Clic droit → `PlantUML: Export Current Diagram`
   - Les images sont exportées dans le dossier configuré

2. **Formats disponibles**
   - PNG (par défaut)
   - SVG (vectoriel, recommandé pour PowerPoint)
   - PDF
   - EPS

---

## 📊 Les 4 niveaux C4 - Explications

### Niveau 1 : Contexte (System Context)
**Fichier:** `C4_Diagrams_GoodFood.puml`

**Usage:** Vue d'ensemble 10,000 pieds
- Montre le système dans son environnement
- Identifie les utilisateurs (Personas)
- Montre les systèmes externes
- **Pour qui:** Direction, DSI, parties prenantes

**Éléments clés:**
```plantuml
Person(client, "Client", "Description")
System(app, "Application", "Description")
System_Ext(external, "Système Externe", "Description")
Rel(client, app, "Utilise", "HTTPS")
```

### Niveau 2 : Conteneurs (Container Diagram)
**Fichier:** `C4_Container_GoodFood.puml`

**Usage:** Architecture applicative
- Décomposition en conteneurs (apps, DB, services)
- Montre les technologies utilisées
- Interactions entre conteneurs
- **Pour qui:** Architectes, développeurs seniors

**Éléments clés:**
```plantuml
Container(web, "Application Web", "React", "Description")
ContainerDb(db, "Base de Données", "PostgreSQL", "Description")
Container(api, "API", "Node.js", "Description")
```

### Niveau 3 : Composants (Component Diagram)
**Fichier:** `C4_Component_OrderService.puml`

**Usage:** Détail d'un conteneur
- Composants internes d'un service
- Architecture logicielle détaillée
- Patterns utilisés (Repository, Facade, etc.)
- **Pour qui:** Développeurs de l'équipe

**Éléments clés:**
```plantuml
Component(controller, "Controller", "REST Controller", "Description")
Component(service, "Service", "Business Logic", "Description")
Component(repo, "Repository", "Data Access", "Description")
```

### Niveau 4 : Déploiement (Deployment Diagram)
**Fichier:** `C4_Deployment_GoodFood.puml`

**Usage:** Infrastructure physique/cloud
- Serveurs, clusters, zones
- Déploiement des conteneurs
- Réseau et sécurité
- **Pour qui:** DevOps, Ops, Architectes infra

**Éléments clés:**
```plantuml
Deployment_Node(cloud, "AWS", "Cloud Provider") {
    Deployment_Node(k8s, "Kubernetes", "EKS") {
        Container(app, "App", "Node.js", "Description")
    }
}
```

---

## 🎯 Personnalisation des Personas

### Syntaxe de base

```plantuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

' Persona simple
Person(alias, "Label", "Description")

' Persona externe (en dehors de l'organisation)
Person_Ext(alias, "Label", "Description")

' Avec propriétés personnalisées
AddProperty("Nom", "Jean Dupont")
AddProperty("Rôle", "Client Premium")
AddProperty("Fréquence", "Quotidienne")
Person(client, "Client", "Utilisateur régulier de l'application")
```

### Exemples pour Good Food

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

' Client simple
Person(client_simple, "Client Occasionnel", "Commande 1-2 fois par mois")

' Client avec propriétés
SetPropertyHeader("Propriété", "Valeur")
AddProperty("Âge", "25-45 ans")
AddProperty("Localisation", "Zone urbaine")
AddProperty("Device", "Mobile 80%, Web 20%")
Person(client_premium, "Client Premium", "Client fidèle avec abonnement")

' Franchisé
AddProperty("Type", "Franchisé indépendant")
AddProperty("Nombre de restaurants", "3")
AddProperty("CA annuel", "500K€")
Person(franchisé, "Franchisé", "Propriétaire de restaurants du réseau")

' Personnel interne
Person_Ext(livreur, "Livreur", "Personnel de livraison externe")
Person(admin, "Administrateur SI", "Équipe technique du siège")

System(goodfood, "Good Food App", "Application de commande")

Rel(client_simple, goodfood, "Commande occasionnellement")
Rel(client_premium, goodfood, "Utilise quotidiennement")
Rel(franchisé, goodfood, "Gère son restaurant")
Rel(livreur, goodfood, "Consulte ses livraisons")
Rel(admin, goodfood, "Administre et supervise")

SHOW_LEGEND()
@enduml
```

---

## 🎨 Personnalisation visuelle

### Thèmes C4

```plantuml
' Thème par défaut
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

' Thème sombre
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/themes/dark/C4_Context.puml

' Thème clair
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/themes/light/C4_Context.puml
```

### Couleurs personnalisées

```plantuml
' Définir des couleurs personnalisées
!define TECH_COLOR #438DD5
!define BUSINESS_COLOR #85BBF0
!define EXTERNAL_COLOR #999999

' Appliquer aux éléments
Person(user, "User", $bgColor=BUSINESS_COLOR)
System(app, "App", $bgColor=TECH_COLOR)
System_Ext(ext, "External", $bgColor=EXTERNAL_COLOR)
```

### Layout et disposition

```plantuml
' Forcer la direction
Lay_D(element1, element2)  ' De haut en bas
Lay_R(element1, element2)  ' De gauche à droite
Lay_L(element1, element2)  ' De droite à gauche
Lay_U(element1, element2)  ' De bas en haut

' Relations voisines
Rel_Neighbor(elem1, elem2, "label")
```

---

## 💡 Astuces et Bonnes Pratiques

### 1. Organisation des fichiers

```
project/
├── architecture/
│   ├── c4/
│   │   ├── 01_context.puml
│   │   ├── 02_container.puml
│   │   ├── 03_component_*.puml
│   │   └── 04_deployment.puml
│   └── exports/
│       ├── context.png
│       └── container.svg
```

### 2. Réutilisation avec includes

Créez un fichier `_config.puml` :
```plantuml
' _config.puml
!define TECH_STACK "Node.js + PostgreSQL + Redis"
!define CLOUD_PROVIDER "AWS"
```

Utilisez-le :
```plantuml
!include _config.puml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

' Vos diagrammes ici
```

### 3. Snippets VS Code

Créez `.vscode/c4.code-snippets` :

```json
{
  "C4 Person": {
    "prefix": "c4person",
    "body": [
      "Person(${1:alias}, \"${2:Label}\", \"${3:Description}\")"
    ]
  },
  "C4 Container": {
    "prefix": "c4container",
    "body": [
      "Container(${1:alias}, \"${2:Label}\", \"${3:Technology}\", \"${4:Description}\")"
    ]
  },
  "C4 Relation": {
    "prefix": "c4rel",
    "body": [
      "Rel(${1:from}, ${2:to}, \"${3:Label}\", \"${4:Technology}\")"
    ]
  }
}
```

### 4. Export pour PowerPoint

**Format recommandé:** SVG
- Garde la qualité
- Éditable dans PowerPoint
- Taille de fichier réduite

**Commande:**
```
Settings → plantuml.exportFormat → "svg"
```

### 5. Collaboration en équipe

**Git-friendly:**
- Fichiers `.puml` en texte brut
- Facile à diff/merge
- Versionnable

**Ajoutez dans `.gitignore` :**
```
# PlantUML exports
*.png
*.svg
diagrams_export/
```

---

## 🐛 Dépannage

### Problème : "Graphviz not found"
**Solution:**
1. Installer Graphviz
2. Redémarrer VS Code
3. Vérifier PATH : `echo $PATH` (Mac/Linux) ou `echo %PATH%` (Windows)

### Problème : "Server timeout"
**Solution:**
Utiliser le serveur local :
```json
{
    "plantuml.render": "Local",
    "plantuml.java": "java"
}
```

### Problème : Diagramme trop grand
**Solution:**
Ajouter dans le `.puml` :
```plantuml
skinparam maxMessageSize 200
scale 0.8
```

### Problème : Caractères spéciaux
**Solution:**
Ajouter en haut du fichier :
```plantuml
@startuml
skinparam defaultTextAlignment center
skinparam charset UTF-8
```

---

## 📚 Ressources supplémentaires

### Documentation officielle
- [C4 Model](https://c4model.com/) - Site officiel du modèle C4
- [C4-PlantUML GitHub](https://github.com/plantuml-stdlib/C4-PlantUML) - Repository officiel
- [PlantUML](https://plantuml.com/) - Documentation PlantUML

### Tutoriels
- [C4 Model Tutorial](https://c4model.com/tutorial)
- [PlantUML C4 Examples](https://github.com/plantuml-stdlib/C4-PlantUML/tree/master/samples)

### Outils complémentaires
- [Structurizr](https://structurizr.com/) - Outil complet pour C4
- [PlantUML Server](https://www.plantuml.com/plantuml/) - Serveur en ligne
- [Real World PlantUML](https://real-world-plantuml.com/) - Exemples réels

---

## ✅ Checklist pour votre présentation

- [ ] Diagramme de Contexte créé et exporté
- [ ] Diagramme de Conteneurs créé et exporté
- [ ] Diagramme(s) de Composants pour services clés
- [ ] Diagramme de Déploiement créé et exporté
- [ ] Tous les diagrammes exportés en SVG/PNG haute qualité
- [ ] Légendes activées avec `SHOW_LEGEND()`
- [ ] Personas clairement identifiées
- [ ] Technologies mentionnées sur chaque conteneur
- [ ] Relations annotées avec protocoles
- [ ] Couleurs cohérentes sur tous les diagrammes

---

*Guide créé pour le projet Good Food 3.0*
*Framework: C4 Model avec PlantUML*
*Version: 1.0*

