# 📊 Architecture C4 - Good Food 3.0

## 📦 Livrable : Diagrammes d'Architecture

### Projet
**Good Food 3.0** - Refonte de la plateforme de commande en ligne

### Équipe
[À compléter avec les noms des membres de l'équipe]

### Date
[Date de livraison]

---

## 📁 Contenu du Livrable

### Structure des Fichiers

```
C4_Architecture/
├── Niveau_1_Contexte/           → Vue stratégique pour Direction
│   ├── 01_Vue_Generale.puml
│   ├── 02_Parcours_Client.puml
│   └── 03_Gestion_Franchisé.puml
│
├── Niveau_2_Conteneurs/         → Vue fonctionnelle pour DSI
│   ├── 01_Architecture_Simplifiee.puml
│   └── 02_Flux_Commande_Client.puml
│
├── Niveau_3_Composants/         → Vue détaillée pour Architectes
│   └── 01_Detail_Gestion_Commandes.puml
│
└── exports/                     → Images PNG/SVG pour PowerPoint
    ├── 01_Vue_Generale.png
    ├── 02_Parcours_Client.png
    ├── 03_Gestion_Franchisé.png
    ├── 01_Architecture_Simplifiee.png
    ├── 02_Flux_Commande_Client.png
    └── 01_Detail_Gestion_Commandes.png
```

---

## 🎯 Résumé de l'Architecture Proposée

### Vision Globale

Good Food 3.0 sera une plateforme **moderne, scalable et sécurisée** composée de :

1. **Interfaces utilisateurs** (Web + Mobile)
2. **Services métier** modulaires et indépendants
3. **Intégrations** avec les systèmes existants (ERP, Sage, Banque)

### Avantages Clés

✅ **Performance** - Temps de réponse < 2 secondes
✅ **Scalabilité** - Support de 150 à 500+ restaurants
✅ **Sécurité** - Paiements PCI-DSS, données chiffrées
✅ **Évolutivité** - Architecture modulaire facile à étendre
✅ **Disponibilité** - 99.9% uptime garanti
✅ **Intégration** - Synchronisation temps réel avec l'ERP

---

## 📊 Les 9 Livrables du Projet

### ✅ 1. Organisation de l'équipe et rôles

**Rôles définis :**
- Chef de projet / Architecte principal : [Nom]
- Spécialiste architecture applicative : [Nom]
- Spécialiste infrastructure/technologies : [Nom]
- Spécialiste sécurité/performance : [Nom]
- Documentaliste/Présentateur : [Nom]

**Méthodologie :** Agile avec sprints de 2 semaines
**Outils :** VS Code, PlantUML, Git, Teams

---

### ✅ 2. Schéma de la couche applicative du SI

**Fichier :** `Niveau_1_Contexte/01_Vue_Generale.puml`

**Description :**
Ce diagramme montre l'écosystème complet de Good Food avec :
- Les utilisateurs (Clients, Franchisés, Administrateurs)
- Le système Good Food (nouveau)
- Les systèmes existants (ERP, Sage, Banque, TPE)
- Les flux de données entre tous les acteurs

**Système actuel (AS-IS) :**
- Application ASP.NET obsolète (Windows Server 2008 R2)
- Synchronisation 1x/jour avec l'ERP
- Performance limitée
- Pas d'application mobile

**Système cible (TO-BE) :**
- Architecture microservices moderne
- Synchronisation temps réel
- Application web et mobile
- Performance optimisée

---

### ✅ 3. Démarche de conception d'architecture

**Méthodologie appliquée : C4 Model**

**Étapes de conception :**

1. **Analyse** (Jour 1-2)
   - Étude du contexte Good Food
   - Identification des besoins métier
   - Analyse des exigences non-fonctionnelles

2. **Conception Niveau 1** (Jour 2)
   - Cartographie de l'écosystème
   - Identification des acteurs
   - Vue d'ensemble stratégique

3. **Conception Niveau 2** (Jour 3)
   - Décomposition en conteneurs (services)
   - Définition des technologies
   - Architecture applicative

4. **Conception Niveau 3** (Jour 3-4)
   - Détail des composants internes
   - Patterns de conception
   - Flux de données détaillés

5. **Validation** (Jour 4-5)
   - Vérification de cohérence
   - Alignement avec exigences
   - Revue par pairs

**Outils utilisés :**
- C4 Model (Simon Brown)
- PlantUML pour les diagrammes
- TOGAF pour le cadre global

**Justification :**
Le modèle C4 permet une **communication progressive** du niveau stratégique (Direction) au niveau technique (Développeurs), ce qui facilite la compréhension par tous les stakeholders.

---

### ✅ 4. Exigences non-fonctionnelles identifiées

| Exigence | Définition | Métrique | Impact Architecture |
|----------|------------|----------|---------------------|
| **Performance** | Temps de réponse acceptables | < 2s pour 95% des requêtes | Cache Redis, CDN |
| **Disponibilité** | Service accessible 24/7 | 99.9% uptime (43 min/mois) | Load balancing, réplication DB |
| **Scalabilité** | Montée en charge | 150 → 500+ restaurants | Architecture microservices, Kubernetes |
| **Sécurité** | Protection des données | PCI-DSS, RGPD | HTTPS, chiffrement DB, WAF |
| **Maintenabilité** | Facilité de maintenance | < 4h intervention | Services indépendants, logs centralisés |
| **Évolutivité** | Ajout de fonctionnalités | < 2 semaines pour nouvelle feature | Architecture modulaire, API REST |
| **Interopérabilité** | Intégration avec existant | APIs standardisées | Connecteurs ERP, Sage, Banque |
| **Portabilité** | Multi-environnements | Dev, Test, Prod identiques | Containers Docker, Infrastructure as Code |

**Priorisation :**
1. 🔴 **Critique** : Sécurité, Disponibilité
2. 🟡 **Haute** : Performance, Scalabilité
3. 🟢 **Moyenne** : Maintenabilité, Évolutivité

---

### ✅ 5. Schéma d'architecture logique

**Fichiers :**
- `Niveau_2_Conteneurs/01_Architecture_Simplifiee.puml`
- `Niveau_2_Conteneurs/02_Flux_Commande_Client.puml`

**Composants métier principaux :**

#### Couche Présentation
- **Application Web** (React/Vue.js)
- **Application Mobile** (React Native)
- **Interface Admin Franchisés**

#### Couche Services Métier
- **Service Authentification** - Gestion des sessions et sécurité
- **Service Clients** - Gestion des profils utilisateurs
- **Service Menus** - Catalogue de produits
- **Service Commandes** - Gestion du panier et des commandes
- **Service Paiement** - Transactions sécurisées
- **Service Livraison** - Organisation et suivi
- **Service Franchisés** - Gestion restaurants et stocks
- **Service Notifications** - Email, SMS, Push
- **Service Analytics** - Reporting et aide à la décision

#### Couche Données
- **Base de données principale** (PostgreSQL)
- **Cache** (Redis)
- **Data Warehouse** (BigQuery/Redshift)
- **Message Queue** (RabbitMQ/Kafka)

#### Couche Intégration
- **Connecteur ERP Dynamics 365**
- **Connecteur Sage Comptabilité**
- **Connecteur Bancaire (EBICS)**
- **Connecteur TPE**

**Dépendances :**
- Les services métier sont **indépendants** (microservices)
- Communication via **API REST** et **événements asynchrones**
- Pas de dépendances directes entre services (couplage faible)

---

### ✅ 6. Comparaison des styles d'architectures

| Style | Performance | Scalabilité | Maintenabilité | Évolutivité | Complexité | Coût | **Total** |
|-------|-------------|-------------|----------------|-------------|------------|------|-----------|
| Monolithique | 4/5 | 2/5 | 2/5 | 2/5 | 2/5 | 5/5 | **17/30** ❌ |
| En Couches | 3/5 | 3/5 | 3/5 | 3/5 | 3/5 | 4/5 | **19/30** |
| SOA | 3/5 | 4/5 | 4/5 | 4/5 | 3/5 | 3/5 | **21/30** |
| **Microservices** | 4/5 | 5/5 | 5/5 | 5/5 | 2/5 | 2/5 | **23/30** ✅ |
| Hexagonale | 4/5 | 4/5 | 5/5 | 5/5 | 3/5 | 3/5 | **24/30** ✅ |
| Event-Driven | 5/5 | 5/5 | 4/5 | 5/5 | 2/5 | 2/5 | **23/30** ✅ |

**Style retenu : Architecture Microservices avec approche Event-Driven**

**Justification :**

✅ **Pourquoi Microservices ?**
- **Scalabilité** : Chaque service peut scaler indépendamment
- **Évolutivité** : Ajout de nouveaux services sans impact
- **Maintenabilité** : Équipes autonomes par service
- **Résilience** : Panne d'un service n'affecte pas les autres

✅ **Pourquoi Event-Driven ?**
- **Découplage** : Services communiquent via événements
- **Performance** : Traitement asynchrone des tâches longues
- **Traçabilité** : Historique complet des événements
- **Flexibilité** : Ajout de nouveaux consommateurs d'événements

❌ **Pourquoi pas Monolithique ?**
- Pas de scalabilité (ne répond pas aux exigences de croissance)
- Difficile à maintenir à long terme
- Déploiements risqués (tout ou rien)

---

### ✅ 7. Template de matrice de choix technologique

**Critères d'évaluation (poids sur 100) :**

| Critère | Poids | Description |
|---------|-------|-------------|
| **Fonctionnalités** | 25% | Couverture des besoins métier |
| **Performance** | 20% | Temps de réponse, throughput |
| **Coût** | 15% | Coût total (licence + infra + maintenance) |
| **Maturité** | 15% | Stabilité, communauté, support |
| **Facilité d'utilisation** | 10% | Courbe d'apprentissage, documentation |
| **Évolutivité** | 10% | Capacité à grandir avec les besoins |
| **Intégration** | 5% | Compatibilité avec écosystème existant |

**Système de cotation : 1 à 5**
- 1 = Très faible / Inadapté
- 2 = Faible / Peu adapté
- 3 = Moyen / Acceptable
- 4 = Bon / Bien adapté
- 5 = Excellent / Parfaitement adapté

**Calcul du score final :**
```
Score = Σ (Note critère × Poids critère)
```

#### Exemple 1 : Comparaison Fournisseurs Cloud

| Critère (Poids) | AWS | Azure | GCP |
|-----------------|-----|-------|-----|
| Fonctionnalités (25%) | 5 | 4 | 4 |
| Performance (20%) | 5 | 5 | 5 |
| Coût (15%) | 3 | 4 | 4 |
| Maturité (15%) | 5 | 4 | 4 |
| Facilité (10%) | 3 | 4 | 4 |
| Évolutivité (10%) | 5 | 5 | 5 |
| Intégration (5%) | 4 | 5 | 3 |
| **Score Total** | **4.35** ✅ | **4.30** | **4.15** |

**Choix : AWS** - Score le plus élevé, leader du marché, maturité

#### Exemple 2 : Comparaison SGBDR

| Critère (Poids) | PostgreSQL | MySQL | Oracle |
|-----------------|------------|-------|--------|
| Fonctionnalités (25%) | 5 | 4 | 5 |
| Performance (20%) | 5 | 4 | 5 |
| Coût (15%) | 5 | 5 | 1 |
| Maturité (15%) | 5 | 5 | 5 |
| Facilité (10%) | 4 | 4 | 3 |
| Évolutivité (10%) | 5 | 4 | 5 |
| Intégration (5%) | 4 | 4 | 4 |
| **Score Total** | **4.85** ✅ | **4.25** | **4.10** |

**Choix : PostgreSQL** - Open source, performant, gratuit

#### Exemple 3 : Comparaison Message Queue

| Critère (Poids) | RabbitMQ | Kafka | ActiveMQ |
|-----------------|----------|-------|----------|
| Fonctionnalités (25%) | 4 | 5 | 3 |
| Performance (20%) | 4 | 5 | 3 |
| Coût (15%) | 5 | 5 | 5 |
| Maturité (15%) | 5 | 5 | 4 |
| Facilité (10%) | 5 | 3 | 4 |
| Évolutivité (10%) | 4 | 5 | 3 |
| Intégration (5%) | 4 | 4 | 3 |
| **Score Total** | **4.40** ✅ | **4.65** | **3.50** |

**Choix : Kafka** pour événements (haute volumétrie)
**Alternative : RabbitMQ** pour messages transactionnels (simplicité)

---

### ✅ 8. Points faibles / axes d'amélioration du SI

#### 🔴 Points Faibles Identifiés

| Point faible | Impact | Justification | Recommandation |
|--------------|--------|---------------|----------------|
| **Technologie obsolète** | 🔴 Critique | Windows Server 2008 R2 hors support, risques de sécurité | Migration urgente vers stack moderne |
| **Code non maintenable** | 🔴 Critique | Patchs sur patchs, pas de documentation, équipe originale partie | Refonte complète |
| **Pas d'application mobile** | 🟡 Haute | 80% des utilisateurs sur mobile, perte de CA | Développement mobile prioritaire |
| **Performance dégradée** | 🟡 Haute | Temps de réponse > 5s aux heures de pointe | Architecture scalable nécessaire |
| **Synchronisation 1x/jour** | 🟡 Haute | Données ERP non à jour, erreurs de stock | Synchronisation temps réel |
| **Mono-hébergeur** | 🟡 Haute | Risque de SPOF (Single Point of Failure) | Architecture cloud redondante |
| **Pas de monitoring** | 🟢 Moyenne | Impossible de détecter les pannes proactivement | Mise en place observabilité |
| **Données non chiffrées** | 🔴 Critique | Non-conformité RGPD, risques de fuite | Chiffrement end-to-end |

#### 💡 Axes d'Amélioration

1. **Migration Cloud**
   - Hébergement actuel : Mini datacenter prestataire
   - Amélioration : Cloud provider (AWS/Azure/GCP)
   - Bénéfices : Scalabilité, disponibilité, sécurité

2. **DevOps et CI/CD**
   - Situation actuelle : Déploiements manuels, risqués
   - Amélioration : Pipeline automatisé, tests automatiques
   - Bénéfices : Déploiements fréquents et sûrs

3. **Observabilité**
   - Situation actuelle : Aucun monitoring
   - Amélioration : Prometheus, Grafana, ELK
   - Bénéfices : Détection proactive, résolution rapide

4. **Sécurité**
   - Situation actuelle : Failles de sécurité multiples
   - Amélioration : WAF, HTTPS, chiffrement, audits
   - Bénéfices : Conformité, confiance client

5. **Documentation**
   - Situation actuelle : Code non documenté
   - Amélioration : Documentation technique et fonctionnelle
   - Bénéfices : Maintenabilité, transfert de connaissance

---

### ✅ 9. Bilan sur l'organisation du groupe

#### 💪 Points Forts de l'Équipe

✅ **Compétences complémentaires**
- Mix d'expertise technique et métier
- Couverture complète des domaines (architecture, dev, ops)

✅ **Méthodologie structurée**
- Utilisation du modèle C4 pour clarté
- Approche progressive (Contexte → Conteneurs → Composants)
- Documentation systématique

✅ **Communication efficace**
- Réunions quotidiennes (stand-ups)
- Outils collaboratifs (Teams, Git)
- Documentation partagée

✅ **Orientation utilisateur**
- Diagrammes adaptés au public business
- Langage simple et clair
- Focus sur la valeur métier

#### 🎯 Axes d'Amélioration

⚠️ **Gestion du temps**
- Difficulté initiale à estimer les tâches
- Amélioration : Utiliser des sprints plus courts avec revues

⚠️ **Expérience cloud**
- Équipe peu familière avec les architectures cloud natives
- Amélioration : Formation AWS/Azure recommandée

⚠️ **Tests de charge**
- Manque d'expérience en tests de performance
- Amélioration : Partenariat avec expert performance

⚠️ **Conformité RGPD**
- Compétences juridiques limitées
- Amélioration : Audit externe nécessaire

#### 📈 Recommandations pour l'Avenir

1. **Formation continue**
   - Certifications cloud (AWS, Azure)
   - Formation DevOps et Kubernetes
   - Veille technologique hebdomadaire

2. **Amélioration des processus**
   - Mettre en place des revues de code systématiques
   - Automatiser les tests
   - Documenter les décisions d'architecture (ADR)

3. **Renforcement de l'équipe**
   - Recruter un expert sécurité
   - Ajouter un DevOps senior
   - Former un Product Owner dédié

---

## 📊 Synthèse pour la Présentation

### Messages Clés

🎯 **Vision** : Plateforme moderne, scalable et sécurisée pour accompagner la croissance de Good Food

🚀 **Innovation** : Architecture microservices permettant agilité et évolutivité

🔒 **Sécurité** : Conformité RGPD, paiements sécurisés, données chiffrées

📈 **Performance** : < 2s de temps de réponse, disponibilité 99.9%

💰 **ROI** : Augmentation du CA (mobile), réduction des coûts de maintenance

### Chiffres Clés

- **150 restaurants** actuellement → **500+** avec la nouvelle architecture
- **1 million de repas** livrés/an → **3 millions** prévus
- **80% du CA** en ligne → **Objectif 90%** avec le mobile
- **99.9% disponibilité** garantie (vs 95% actuellement)
- **< 2 secondes** temps de réponse (vs > 5s actuellement)

---

## 📞 Contact

**Équipe Projet Good Food 3.0**

- Chef de projet : [Nom] - [Email]
- Architecte : [Nom] - [Email]
- Contact : [Email général du projet]

---

*Document créé pour le projet Good Food 3.0*
*CESI MAALSI - INFMAALSIAPC1*
*Date : [Date]*
*Version: 1.0*

