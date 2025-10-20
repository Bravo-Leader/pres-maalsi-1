# Architecture TOGAF - Good Food 3.0

## Vue d'ensemble
Ce document présente l'architecture d'entreprise de Good Food selon le framework TOGAF (The Open Group Architecture Framework).

---

## 1. Architecture Métier (Business Architecture)

### 1.1 Cartographie des Acteurs et Processus Métier

```mermaid
graph TB
    subgraph "Acteurs Externes"
        CLIENT[👤 Clients]
        FRANCHISES[🏪 Franchisés/Restaurants]
        LIVREURS[🚴 Livreurs]
        FOURNISSEURS[📦 Fournisseurs]
    end
    
    subgraph "Good Food - Siège"
        DIRECTION[🏢 Direction]
        COMPTA[💰 Service Comptabilité]
        COMM[📢 Service Communication]
        IT[💻 Service Informatique]
    end
    
    subgraph "Partenaires Externes"
        PWI[☁️ PWI - Hébergement]
        DIW[🔧 DIW - Développement]
        TPSYSTEM[💳 TP System - TPE]
        BNB[🏦 BNB - Banque]
    end
    
    CLIENT -->|Commande| FRANCHISES
    CLIENT -->|Réclamation| COMM
    FRANCHISES -->|Données ventes| COMPTA
    FRANCHISES -->|Commandes| FOURNISSEURS
    FRANCHISES -->|Livraison| LIVREURS
    IT -->|Support| FRANCHISES
    IT -->|Gestion| PWI
    IT -->|Coordination| DIW
    COMPTA -->|Paiements| BNB
    FRANCHISES -->|Paiements TPE| TPSYSTEM
    TPSYSTEM -->|Transactions| BNB
```

### 1.2 Processus Métier Principaux

```mermaid
graph LR
    subgraph "Processus de Commande"
        A[Inscription/Connexion] --> B[Consultation Menu]
        B --> C[Ajout au Panier]
        C --> D[Paiement en Ligne]
        D --> E[Confirmation Commande]
        E --> F[Préparation Restaurant]
        F --> G[Livraison]
        G --> H[Réception Client]
    end
    
    subgraph "Processus Support"
        I[Réclamation Client] --> J[Traitement Communication]
        J --> K[Suivi dans ERP]
    end
    
    subgraph "Processus Gestion"
        L[Gestion Stocks] --> M[Commande Fournisseurs]
        M --> N[Réception]
        N --> O[Mise à jour ERP]
    end
```

---

## 2. Architecture Applicative (Application Architecture)

### 2.1 Vue de la Couche Applicative du SI Actuel (AS-IS)

```mermaid
graph TB
    subgraph "Applications Client"
        WEB[🌐 Site Web Good Food<br/>ASP.NET C# 2005<br/>Windows Server 2008 R2]
        VITRINE[📄 Site Vitrine<br/>PHP/MySQL/Apache 2.2]
    end
    
    subgraph "Applications Métier"
        ERP[📊 Microsoft Dynamics 365<br/>Finance, RH, Clients, Stocks]
        SAGE[💼 Sage Comptabilité<br/>On-premise]
        SYNC[🔄 App Synchronisation<br/>C# WCF]
    end
    
    subgraph "Données"
        SQLGF[🗄️ SQL Server 2008<br/>Base Good Food]
        SQLERP[🗄️ Base Dynamics 365]
        SQLSAGE[🗄️ Base Sage]
        MYSQL[🗄️ MySQL Community<br/>Site Vitrine]
    end
    
    subgraph "Services Externes"
        TPE[💳 TP System<br/>Terminaux Paiement]
        BANK[🏦 BNB<br/>Paiement en ligne<br/>EBICS]
        M365[📧 Microsoft 365<br/>Messagerie & Suite]
    end
    
    WEB -->|Commandes| SQLGF
    SQLGF -->|Sync 1x/jour 5h| SYNC
    SYNC -->|WCF| SQLERP
    ERP --> SQLERP
    SAGE --> SQLSAGE
    WEB -->|Paiement| BANK
    TPE -->|Transactions| BANK
    BANK -->|EBICS| SQLSAGE
    SQLSAGE -->|Données globales| SQLERP
    
    style WEB fill:#ff9999
    style SQLGF fill:#ff9999
    style SYNC fill:#ff9999
```

### 2.2 Architecture Applicative Cible (TO-BE)

```mermaid
graph TB
    subgraph "Canaux Client"
        WEBAPP[📱 Application Web<br/>Progressive Web App]
        MOBILE[📱 Application Mobile<br/>iOS/Android Hybride]
        VITRINE2[📄 Site Vitrine<br/>Modernisé]
    end
    
    subgraph "API Gateway & Sécurité"
        GATEWAY[🚪 API Gateway<br/>Authentification/Autorisation<br/>Rate Limiting]
    end
    
    subgraph "Microservices Métier"
        AUTH[🔐 Service Authentification<br/>JWT/OAuth2]
        USER[👤 Service Clients<br/>Gestion comptes]
        MENU[🍽️ Service Menus<br/>Catalogue produits]
        ORDER[🛒 Service Commandes<br/>Panier & Commandes]
        PAYMENT[💳 Service Paiement<br/>Transactions]
        DELIVERY[🚚 Service Livraison<br/>Organisation livraisons]
        BOOKING[📅 Service Réservations]
        FRANCHISE[🏪 Service Franchisés<br/>Gestion & Promotions]
        ANALYTICS[📊 Service Analytics<br/>Aide à la décision]
        NOTIF[🔔 Service Notifications<br/>Email/Push/SMS]
    end
    
    subgraph "Intégrations"
        ERPINT[🔗 Connecteur ERP<br/>Dynamics 365]
        SAGEINT[🔗 Connecteur Sage]
        TPEINT[🔗 Connecteur TPE]
        BANKINT[🔗 Connecteur Bancaire<br/>EBICS]
    end
    
    subgraph "Données"
        MAINDB[(🗄️ Base Principale<br/>PostgreSQL/MySQL)]
        CACHEDB[(⚡ Cache Redis)]
        DWH[(📊 Data Warehouse<br/>Analytics)]
    end
    
    subgraph "Systèmes Externes"
        ERP2[📊 Dynamics 365]
        SAGE2[💼 Sage]
        TPE2[💳 TP System]
        BANK2[🏦 BNB]
    end
    
    WEBAPP --> GATEWAY
    MOBILE --> GATEWAY
    
    GATEWAY --> AUTH
    GATEWAY --> USER
    GATEWAY --> MENU
    GATEWAY --> ORDER
    GATEWAY --> PAYMENT
    GATEWAY --> DELIVERY
    GATEWAY --> BOOKING
    GATEWAY --> FRANCHISE
    GATEWAY --> ANALYTICS
    
    AUTH --> MAINDB
    USER --> MAINDB
    MENU --> MAINDB
    ORDER --> MAINDB
    PAYMENT --> MAINDB
    DELIVERY --> MAINDB
    BOOKING --> MAINDB
    FRANCHISE --> MAINDB
    
    ORDER --> CACHEDB
    MENU --> CACHEDB
    
    ANALYTICS --> DWH
    USER --> DWH
    ORDER --> DWH
    
    PAYMENT --> NOTIF
    ORDER --> NOTIF
    DELIVERY --> NOTIF
    
    ORDER --> ERPINT
    USER --> ERPINT
    ERPINT --> ERP2
    
    PAYMENT --> SAGEINT
    SAGEINT --> SAGE2
    
    PAYMENT --> TPEINT
    TPEINT --> TPE2
    
    PAYMENT --> BANKINT
    BANKINT --> BANK2
    
    style GATEWAY fill:#90EE90
    style MAINDB fill:#87CEEB
    style CACHEDB fill:#FFD700
```

---

## 3. Architecture des Composants Logiques

### 3.1 Décomposition en Composants Métier (Architecture Logique)

```mermaid
graph TB
    subgraph "Couche Présentation"
        UI_WEB[Interface Web]
        UI_MOBILE[Interface Mobile]
        UI_ADMIN[Interface Admin Franchisés]
    end
    
    subgraph "Couche API & Orchestration"
        API_GATEWAY[API Gateway]
        ORCHESTRATOR[Orchestrateur de Services]
    end
    
    subgraph "Couche Services Métier"
        subgraph "Gestion Client"
            COMP_AUTH[Authentification<br/>& Autorisation]
            COMP_USER[Gestion Profils<br/>Clients]
            COMP_RECLA[Gestion<br/>Réclamations]
        end
        
        subgraph "Gestion Catalogue"
            COMP_MENU[Gestion Menus]
            COMP_PROMO[Gestion Promotions]
            COMP_PRIX[Gestion Tarifs]
        end
        
        subgraph "Gestion Commandes"
            COMP_CART[Panier]
            COMP_ORDER[Commandes]
            COMP_TRACK[Suivi Commandes]
        end
        
        subgraph "Gestion Paiement"
            COMP_PAY[Traitement<br/>Paiement]
            COMP_REFUND[Remboursements]
        end
        
        subgraph "Gestion Livraison"
            COMP_DELIV[Organisation<br/>Livraisons]
            COMP_ROUTE[Optimisation<br/>Tournées]
            COMP_TRACK_DELIV[Suivi Temps Réel]
        end
        
        subgraph "Gestion Franchisés"
            COMP_RESTO[Gestion<br/>Restaurants]
            COMP_STOCK[Gestion Stocks]
            COMP_FOURNISS[Gestion<br/>Fournisseurs]
        end
        
        subgraph "Services Transverses"
            COMP_NOTIF[Notifications]
            COMP_ANALYTICS[Analytics &<br/>Reporting]
            COMP_SEARCH[Recherche]
        end
    end
    
    subgraph "Couche Intégration"
        INT_ERP[Intégration ERP]
        INT_COMPTA[Intégration Comptabilité]
        INT_BANK[Intégration Bancaire]
        INT_TPE[Intégration TPE]
    end
    
    subgraph "Couche Données"
        DATA_TRANS[Données<br/>Transactionnelles]
        DATA_REF[Données<br/>Référentielles]
        DATA_ANAL[Données<br/>Analytiques]
    end
    
    UI_WEB --> API_GATEWAY
    UI_MOBILE --> API_GATEWAY
    UI_ADMIN --> API_GATEWAY
    
    API_GATEWAY --> ORCHESTRATOR
    
    ORCHESTRATOR --> COMP_AUTH
    ORCHESTRATOR --> COMP_USER
    ORCHESTRATOR --> COMP_MENU
    ORCHESTRATOR --> COMP_CART
    ORCHESTRATOR --> COMP_ORDER
    ORCHESTRATOR --> COMP_PAY
    ORCHESTRATOR --> COMP_DELIV
    ORCHESTRATOR --> COMP_RESTO
    
    COMP_ORDER --> COMP_NOTIF
    COMP_PAY --> COMP_NOTIF
    COMP_DELIV --> COMP_NOTIF
    
    COMP_ORDER --> INT_ERP
    COMP_USER --> INT_ERP
    COMP_PAY --> INT_COMPTA
    COMP_PAY --> INT_BANK
    COMP_PAY --> INT_TPE
    
    COMP_USER --> DATA_TRANS
    COMP_ORDER --> DATA_TRANS
    COMP_MENU --> DATA_REF
    COMP_ANALYTICS --> DATA_ANAL
```

---

## 4. Architecture de Données

### 4.1 Modèle de Données Conceptuel

```mermaid
erDiagram
    CLIENT ||--o{ COMMANDE : passe
    CLIENT ||--o{ RECLAMATION : émet
    CLIENT {
        int id_client PK
        string email
        string nom
        string prenom
        string telephone
        string adresse
        datetime date_inscription
    }
    
    COMMANDE ||--|{ LIGNE_COMMANDE : contient
    COMMANDE ||--|| PAIEMENT : "a un"
    COMMANDE ||--o| LIVRAISON : "a une"
    COMMANDE {
        int id_commande PK
        int id_client FK
        int id_restaurant FK
        datetime date_commande
        decimal montant_total
        string statut
        datetime heure_livraison_souhaitee
    }
    
    LIGNE_COMMANDE ||--|| PLAT : référence
    LIGNE_COMMANDE {
        int id_ligne PK
        int id_commande FK
        int id_plat FK
        int quantite
        decimal prix_unitaire
    }
    
    PLAT ||--|| MENU : "appartient à"
    PLAT {
        int id_plat PK
        int id_menu FK
        string nom
        string description
        decimal prix
        string categorie
        boolean disponible
    }
    
    MENU ||--|| RESTAURANT : propose
    MENU {
        int id_menu PK
        int id_restaurant FK
        string nom_menu
        datetime date_debut
        datetime date_fin
    }
    
    RESTAURANT ||--o{ COMMANDE : reçoit
    RESTAURANT ||--o{ STOCK : gère
    RESTAURANT ||--|| FRANCHISÉ : "géré par"
    RESTAURANT {
        int id_restaurant PK
        int id_franchisé FK
        string nom
        string adresse
        string telephone
        string type
        boolean actif
    }
    
    FRANCHISÉ ||--o{ PROMOTION : crée
    FRANCHISÉ {
        int id_franchisé PK
        string raison_sociale
        string contact
        datetime date_adhesion
        string type_franchisé
    }
    
    PAIEMENT {
        int id_paiement PK
        int id_commande FK
        decimal montant
        string mode_paiement
        string statut
        datetime date_paiement
        string transaction_id
    }
    
    LIVRAISON ||--|| LIVREUR : "effectuée par"
    LIVRAISON {
        int id_livraison PK
        int id_commande FK
        int id_livreur FK
        datetime heure_depart
        datetime heure_arrivee
        string statut
        string adresse_livraison
    }
    
    LIVREUR {
        int id_livreur PK
        string nom
        string prenom
        string telephone
        boolean disponible
    }
    
    STOCK ||--|| PRODUIT : concerne
    STOCK {
        int id_stock PK
        int id_restaurant FK
        int id_produit FK
        int quantite
        datetime date_maj
    }
    
    PRODUIT ||--|| FOURNISSEUR : "fourni par"
    PRODUIT {
        int id_produit PK
        int id_fournisseur FK
        string nom
        string reference
        decimal prix_achat
    }
    
    FOURNISSEUR {
        int id_fournisseur PK
        string nom
        string contact
        string adresse
    }
    
    RECLAMATION {
        int id_reclamation PK
        int id_client FK
        int id_commande FK
        string type
        string description
        string statut
        datetime date_creation
    }
    
    PROMOTION {
        int id_promotion PK
        int id_franchisé FK
        string code_promo
        decimal reduction
        datetime date_debut
        datetime date_fin
    }
```

---

## 5. Architecture Technologique

### 5.1 Infrastructure Cible (TO-BE)

```mermaid
graph TB
    subgraph "Internet"
        USERS[👥 Utilisateurs<br/>Web & Mobile]
    end
    
    subgraph "DMZ - Zone Publique"
        WAF[🛡️ WAF<br/>Web Application Firewall]
        LB[⚖️ Load Balancer<br/>NGINX/HAProxy]
        CDN[🌍 CDN<br/>Cloudflare/CloudFront]
    end
    
    subgraph "Cloud Provider - Zone Application"
        subgraph "Cluster Kubernetes"
            subgraph "Frontend Pods"
                WEB1[Web App 1]
                WEB2[Web App 2]
                WEB3[Web App 3]
            end
            
            subgraph "API Pods"
                API1[API Gateway 1]
                API2[API Gateway 2]
            end
            
            subgraph "Microservices Pods"
                MS1[Microservice 1]
                MS2[Microservice 2]
                MS3[Microservice 3]
                MSN[Microservice N...]
            end
        end
        
        subgraph "Services Managés"
            REDIS[⚡ Redis Cluster<br/>Cache]
            MQ[📮 Message Queue<br/>RabbitMQ/Kafka]
        end
    end
    
    subgraph "Zone Données - Cloud"
        subgraph "Bases de Données"
            DBMASTER[(🗄️ DB Master<br/>PostgreSQL)]
            DBREPLICA1[(🗄️ DB Replica 1)]
            DBREPLICA2[(🗄️ DB Replica 2)]
        end
        
        DWH2[(📊 Data Warehouse<br/>BigQuery/Redshift)]
        BACKUP[(💾 Backups<br/>S3/Blob Storage)]
    end
    
    subgraph "Zone Monitoring"
        MONITOR[📊 Monitoring<br/>Prometheus/Grafana]
        LOGS[📝 Logs<br/>ELK Stack]
        APM[🔍 APM<br/>New Relic/Datadog]
    end
    
    subgraph "Systèmes On-Premise"
        ERP3[📊 Dynamics 365]
        SAGE3[💼 Sage]
        VPN[🔒 VPN Gateway]
    end
    
    subgraph "Services Externes"
        BANK3[🏦 BNB]
        TPE3[💳 TP System]
        EMAIL[📧 Service Email<br/>SendGrid/SES]
        SMS[📱 Service SMS<br/>Twilio]
    end
    
    USERS --> CDN
    CDN --> WAF
    WAF --> LB
    
    LB --> WEB1
    LB --> WEB2
    LB --> WEB3
    
    WEB1 --> API1
    WEB2 --> API1
    WEB3 --> API2
    
    API1 --> MS1
    API1 --> MS2
    API2 --> MS2
    API2 --> MS3
    
    MS1 --> REDIS
    MS2 --> REDIS
    MS1 --> MQ
    MS2 --> MQ
    MS3 --> MQ
    
    MS1 --> DBMASTER
    MS2 --> DBMASTER
    MS3 --> DBREPLICA1
    MSN --> DBREPLICA2
    
    DBMASTER --> DBREPLICA1
    DBMASTER --> DBREPLICA2
    DBMASTER --> BACKUP
    
    MS1 --> DWH2
    MS2 --> DWH2
    
    MS1 --> VPN
    VPN --> ERP3
    VPN --> SAGE3
    
    MS2 --> BANK3
    MS3 --> TPE3
    MS1 --> EMAIL
    MS2 --> SMS
    
    WEB1 --> MONITOR
    API1 --> MONITOR
    MS1 --> MONITOR
    
    WEB1 --> LOGS
    API1 --> LOGS
    MS1 --> LOGS
    
    style WAF fill:#FF6B6B
    style LB fill:#4ECDC4
    style DBMASTER fill:#95E1D3
    style REDIS fill:#FFD93D
```

### 5.2 Stack Technologique Recommandée

```mermaid
graph LR
    subgraph "Frontend"
        F1[React/Vue.js]
        F2[React Native<br/>Application Mobile]
        F3[TypeScript]
    end
    
    subgraph "Backend"
        B1[Node.js/Express<br/>ou<br/>Java Spring Boot<br/>ou<br/>Python FastAPI]
        B2[API REST/GraphQL]
    end
    
    subgraph "Base de Données"
        D1[PostgreSQL<br/>Base principale]
        D2[Redis<br/>Cache]
        D3[MongoDB<br/>Logs/Analytics]
    end
    
    subgraph "Infrastructure"
        I1[Docker]
        I2[Kubernetes]
        I3[AWS/Azure/GCP]
    end
    
    subgraph "DevOps"
        DO1[GitLab CI/CD<br/>ou GitHub Actions]
        DO2[Terraform]
        DO3[Ansible]
    end
    
    subgraph "Monitoring"
        M1[Prometheus]
        M2[Grafana]
        M3[ELK Stack]
    end
```

---

## 6. Flux de Données Principaux

### 6.1 Flux de Commande

```mermaid
sequenceDiagram
    participant C as Client
    participant W as Web/Mobile App
    participant G as API Gateway
    participant A as Service Auth
    participant M as Service Menu
    participant O as Service Commande
    participant P as Service Paiement
    participant D as Service Livraison
    participant N as Service Notification
    participant DB as Base de Données
    participant ERP as ERP Dynamics
    participant B as Banque BNB
    
    C->>W: Connexion
    W->>G: Requête authentification
    G->>A: Vérifier identité
    A->>DB: Valider credentials
    DB-->>A: Utilisateur validé
    A-->>G: Token JWT
    G-->>W: Token + Session
    
    C->>W: Consulter menus
    W->>G: GET /menus
    G->>M: Récupérer menus
    M->>DB: Query menus
    DB-->>M: Liste menus
    M-->>G: Menus disponibles
    G-->>W: Afficher menus
    
    C->>W: Ajouter au panier
    W->>G: POST /cart/add
    G->>O: Ajouter article
    O->>DB: Sauvegarder panier
    
    C->>W: Valider commande
    W->>G: POST /orders
    G->>O: Créer commande
    O->>DB: Enregistrer commande
    O->>P: Initier paiement
    P->>B: Demande autorisation
    B-->>P: Autorisation OK
    P->>DB: Enregistrer paiement
    P-->>O: Paiement confirmé
    O->>D: Créer livraison
    D->>DB: Planifier livraison
    O->>N: Déclencher notifications
    N->>C: Email confirmation
    N->>C: SMS suivi
    O->>ERP: Synchroniser commande
    ERP-->>O: ACK
    O-->>G: Commande créée
    G-->>W: Confirmation
    W-->>C: Afficher confirmation
```

### 6.2 Flux de Synchronisation avec l'ERP

```mermaid
sequenceDiagram
    participant APP as Application Good Food
    participant MQ as Message Queue
    participant INT as Service Intégration
    participant ERP as Dynamics 365
    participant SAGE as Sage Comptabilité
    
    Note over APP,SAGE: Synchronisation en temps réel (TO-BE)
    
    APP->>MQ: Publier événement<br/>(Nouvelle commande)
    MQ->>INT: Consommer événement
    INT->>ERP: Créer commande
    ERP-->>INT: Confirmation
    INT->>MQ: ACK
    
    APP->>MQ: Publier événement<br/>(Nouveau client)
    MQ->>INT: Consommer événement
    INT->>ERP: Créer client
    ERP-->>INT: Confirmation
    
    APP->>MQ: Publier événement<br/>(Paiement effectué)
    MQ->>INT: Consommer événement
    INT->>SAGE: Enregistrer transaction
    SAGE-->>INT: Confirmation
    INT->>ERP: Mettre à jour finance
    ERP-->>INT: Confirmation
```

---

## 7. Matrice de Comparaison des Styles d'Architecture

### 7.1 Évaluation des Styles Architecturaux

| Style d'Architecture | Performance | Scalabilité | Maintenabilité | Évolutivité | Complexité | Coût | Score Total |
|---------------------|-------------|-------------|----------------|-------------|------------|------|-------------|
| **Monolithique** | 4/5 | 2/5 | 2/5 | 2/5 | 2/5 | 5/5 | 17/30 ❌ |
| **Architecture en Couches** | 3/5 | 3/5 | 3/5 | 3/5 | 3/5 | 4/5 | 19/30 |
| **SOA (Service-Oriented)** | 3/5 | 4/5 | 4/5 | 4/5 | 3/5 | 3/5 | 21/30 |
| **Microservices** | 4/5 | 5/5 | 5/5 | 5/5 | 2/5 | 2/5 | 23/30 ✅ |
| **Architecture Hexagonale** | 4/5 | 4/5 | 5/5 | 5/5 | 3/5 | 3/5 | 24/30 ✅ |
| **Event-Driven** | 5/5 | 5/5 | 4/5 | 5/5 | 2/5 | 2/5 | 23/30 ✅ |

**Recommandation** : Architecture Microservices avec approche Hexagonale et patterns Event-Driven

---

## 8. Roadmap de Migration

```mermaid
gantt
    title Roadmap Migration Good Food 3.0
    dateFormat YYYY-MM-DD
    section Phase 1 - Analyse
    Audit SI existant           :a1, 2024-01-01, 15d
    Définition architecture     :a2, after a1, 20d
    
    section Phase 2 - Fondations
    Setup infrastructure cloud  :b1, after a2, 30d
    Développement API Gateway   :b2, after a2, 30d
    Migration base données      :b3, after b1, 45d
    
    section Phase 3 - Services Core
    Service Authentification    :c1, after b2, 20d
    Service Clients             :c2, after c1, 25d
    Service Menus               :c3, after c1, 25d
    Service Commandes           :c4, after c2, 30d
    
    section Phase 4 - Services Business
    Service Paiement            :d1, after c4, 30d
    Service Livraison           :d2, after c4, 30d
    Service Franchisés          :d3, after d1, 25d
    
    section Phase 5 - Intégrations
    Intégration ERP             :e1, after d3, 20d
    Intégration Sage            :e2, after d3, 20d
    Intégration Bancaire        :e3, after e1, 15d
    
    section Phase 6 - Applications
    Application Web             :f1, after c3, 60d
    Application Mobile          :f2, after c3, 60d
    
    section Phase 7 - Tests & Déploiement
    Tests d'intégration         :g1, after f2, 30d
    Tests de charge             :g2, after g1, 15d
    Migration données prod      :g3, after g2, 7d
    Mise en production          :crit, g4, after g3, 3d
```

---

*Document créé pour le projet Good Food 3.0*
*Framework: TOGAF*
*Version: 1.0*

