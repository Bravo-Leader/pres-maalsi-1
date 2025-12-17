# 📐 Architecture C4 - Good Food 3.0 (Simplified)

## ✅ Corrections appliquées

1. **BNB Bank** au lieu de Stripe
2. **REST API uniquement** (pas de GraphQL)
3. **Diagrammes simplifiés et découpés** pour meilleure lisibilité

---

## 📂 Structure des diagrammes

### Niveau 1 - Contexte (N1)
**Fichier:** `N1_Context_GoodFood.puml`

Vue d'ensemble: 4 personas + système Good Food + 6 systèmes externes

---

### Niveau 2 - Conteneurs (N2)
**Fichier:** `N2_Container_GoodFood.puml`

Architecture technique: Présentation → API Gateway → 4 Services → Event Bus → Data

---

### Niveau 3 - Composants (N3) - SIMPLIFIÉ ✨

Au lieu d'un gros diagramme par service, chaque service a **plusieurs petits diagrammes** focalisés:

---

## 📦 Service COMMANDE

### N3a - Cœur Domaine
**Fichier:** `N3a_Order_Core.puml`

**Focus:** Domain Model (DDD)
- Aggregate `Order` (orderId, customerId, items[], status)
- Entity `OrderItem`
- Value Objects: `Money`, `Address`, `OrderStatus`
- Domain Services: `PricingService`, `ValidationService`
- Domain Events: `OrderCreatedEvent`, `OrderCancelledEvent`

**Quand l'utiliser:**
- Comprendre le modèle métier
- Voir les règles business (montant min 10€, frais livraison gratuits si > 20€)
- Apprendre DDD (Aggregates, Value Objects)

---

### N3b - Flux Création
**Fichier:** `N3b_Order_CreateFlow.puml`

**Focus:** Flow complet REST API → Database → Events

**Étapes:**
1. Client → `POST /api/orders` (REST)
2. `OrderController` → `CreateOrderUseCase`
3. Use Case → Vérifie stock (Service Stock via REST)
4. Use Case → Calcule prix (`PricingService`)
5. Use Case → Crée `Order` aggregate
6. Use Case → Sauvegarde Postgres (via `IOrderRepository` port)
7. Use Case → Publie `OrderCreatedEvent` (RabbitMQ)
8. Response → `201 Created`

**Quand l'utiliser:**
- Comprendre le flux end-to-end
- Voir le pattern Hexagonal en action
- Comprendre Ports & Adapters

**Temps:** < 500ms

---

## 💳 Service FACTURATION

### N3a - Paiement BNB Bank
**Fichier:** `N3a_Payment_BNB.puml`

**Focus:** Intégration API bancaire BNB

**API BNB Bank:**
```http
POST https://api.bnb.com/api/v1/payments
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 45.00,
  "currency": "EUR",
  "cardToken": "tok_xxx",
  "merchant": "GOODFOOD"
}

Response:
{
  "transactionId": "BNB-123456",
  "status": "SUCCESS",
  "amount": 45.00
}
```

**Flux:**
1. Client → `POST /api/payments` (REST)
2. `ProcessPaymentUseCase` → `FraudDetector` (score risque)
3. Si score < 50 → OK, sinon BLOCK
4. Use Case → `BNBBankAdapter` → API BNB
5. **3D Secure** si montant > 30€ (redirect client)
6. Sauvegarde transaction Postgres
7. Response 201 Created

**Async (5-10s plus tard):**
- BNB Bank → `POST /webhooks/bnb` (payment.success)
- `ConfirmPaymentUseCase` → Met à jour statut
- Publie `PaymentConfirmedEvent`

**Quand l'utiliser:**
- Comprendre intégration BNB Bank
- Voir le flux 3D Secure
- Comprendre anti-fraude

**Temps:** < 3 secondes

---

## 📦 Service STOCK

### N3a - Inventaire Simple
**Fichier:** `N3a_Stock_Simple.puml`

**Focus:** Réservation avec Redis TTL

**Pattern Réservation:**
```
available = total - reserved

Exemple:
• Total: 100
• Reserved: 25
• Available: 75
```

**Redis TTL Auto-Expire:**
```bash
SETEX reservation:abc123 900 '{"orderId":"...", "items":[...]}'
# TTL = 900 secondes (15 minutes)
# Redis supprime automatiquement après 15 min
```

**Flux:**
1. Event Bus → `OrderCreatedEvent`
2. `ReserveStockUseCase` → Vérifie disponibilité
3. Postgres → `UPDATE inventory SET available = available - qty`
4. Redis → `SETEX reservation:id 900 {...}` (TTL 15 min)
5. Publie `StockReservedEvent`

**Si commande confirmée:**
- `DEL reservation:id` (Redis)
- Stock définitivement déduit

**Si 15 minutes écoulées:**
- Redis expire automatiquement
- Job cleanup libère le stock

**Quand l'utiliser:**
- Comprendre le pattern réservation
- Voir Redis TTL en action
- Éviter overselling

**Temps:** < 100ms

---

## 🚚 Service LOGISTIQUE

### N3a - Livraisons Simple
**Fichier:** `N3a_Logistics_Simple.puml`

**Focus:** Tracking GPS + Auto-Assignment

**Redis Geo Commands:**
```bash
# Enregistrer position livreur
GEOADD drivers 2.3522 48.8566 driver1

# Trouver livreurs à proximité
GEORADIUS drivers 2.35 48.85 5 km WITHDIST ASC

Returns:
1) driver1 (0.8 km)
2) driver2 (1.2 km)
```

**Flux Auto-Assignment:**
1. Event Bus → `OrderConfirmedEvent`
2. `AssignDriverUseCase` → Find available drivers
3. Redis → `GEORADIUS` (livreurs dans 5km)
4. Google Maps → Distance Matrix API
5. `AssignmentStrategy` → Choose best driver
   - Plus proche (distance)
   - Meilleur rating
   - Load balancing (max 3 deliveries)
6. Assign delivery
7. Firebase → Push notification client

**Flux GPS Tracking (toutes les 10 secondes):**
1. Driver App → `PATCH /api/drivers/location`
2. `UpdateLocationUseCase`
3. Redis → `GEOADD drivers lat lng driverId`
4. WebSocket → Broadcast to client/restaurant
5. ETA recalculé avec traffic

**Quand l'utiliser:**
- Comprendre Redis Geo
- Voir le tracking temps réel
- Comprendre assignment strategy

**Temps Assignment:** < 2s
**Temps GPS Update:** < 50ms

---

## 🏗️ Patterns utilisés

### 1. Hexagonal Architecture (Ports & Adapters)

```
┌─────────────────────────┐
│   PRIMARY ADAPTERS      │
│   REST API | Events     │
├─────────────────────────┤
│   APPLICATION LAYER     │
│   Use Cases             │
├─────────────────────────┤
│   DOMAIN LAYER          │
│   Aggregates | Services │
│   Ports (Interfaces)    │
├─────────────────────────┤
│   SECONDARY ADAPTERS    │
│   Postgres | BNB | Maps │
└─────────────────────────┘
```

**Benefits:**
- ✅ Domain indépendant
- ✅ Facilement testable
- ✅ Changement facile (Postgres → Mongo)

---

### 2. REST API Only (pas de GraphQL)

Toutes les APIs sont REST:

**Service Commande:**
```
POST   /api/orders          (créer commande)
GET    /api/orders/:id      (détails)
PATCH  /api/orders/:id      (mettre à jour)
DELETE /api/orders/:id      (annuler)
```

**Service Stock:**
```
GET    /api/stock/:productId       (consulter)
POST   /api/stock/reserve          (réserver)
DELETE /api/stock/reserve/:id      (libérer)
```

**Service Facturation:**
```
POST   /api/payments        (payer)
GET    /api/payments/:id    (statut)
POST   /api/refunds         (rembourser)
```

**Service Logistique:**
```
POST   /api/deliveries/:id/accept    (accepter livraison)
PATCH  /api/drivers/location         (update GPS)
POST   /api/deliveries/:id/complete  (terminer)
```

---

### 3. BNB Bank Payment Gateway

**Authentification:**
```http
Authorization: Bearer {oauth_token}
X-API-Key: {api_key}
```

**Endpoints:**
- `POST /api/v1/payments` (créer paiement)
- `GET /api/v1/payments/:id` (statut)
- `POST /api/v1/refunds` (rembourser)

**3D Secure:**
- Obligatoire si montant > 30€
- Redirect client vers BNB
- Callback URL: `https://goodfood.com/payment/callback`

**Webhook:**
```http
POST /webhooks/bnb
Content-Type: application/json

{
  "event": "payment.success",
  "transactionId": "BNB-123456",
  "amount": 45.00,
  "timestamp": "2025-01-19T10:30:00Z"
}
```

---

### 4. Event-Driven Architecture

**Event Bus:** RabbitMQ

**Exchange:** `orders`, `payments`, `stock`, `logistics`

**Events principaux:**
- `OrderCreatedEvent` → Stock, Facturation, Logistique
- `PaymentConfirmedEvent` → Commande
- `StockReservedEvent` → Commande
- `DriverAssignedEvent` → Commande, Client
- `DeliveryCompletedEvent` → Commande, Facturation

---

## 🛠️ Technologies

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **Backend** | Node.js + TypeScript | Async I/O, Event-driven |
| **API** | Express.js | REST API simple |
| **Write DB** | PostgreSQL | ACID, durabilité |
| **Read Cache** | Redis | < 10ms, Geo commands |
| **Event Bus** | RabbitMQ | Durable, retry |
| **Payment** | **BNB Bank API** | Banque partenaire |
| **Maps** | Google Maps API | Routes, distances, traffic |
| **Notifications** | Firebase FCM | Push iOS/Android |
| **WebSocket** | Socket.IO | Tracking temps réel |

---

## 📊 Générer les diagrammes

```bash
# Tous les diagrammes
plantuml *.puml -tpng -o exports/

# Diagramme spécifique
plantuml N3a_Order_Core.puml -tpng
```

---

## 🎯 Utilisation recommandée

### Pour présentation exécutive:
1. **N1 Context** (vue globale)
2. **N2 Container** (architecture technique)
3. Un ou deux **N3a** au choix (exemple concret)

### Pour développeurs:
1. **N2 Container** (comprendre l'ensemble)
2. **Tous les N3a/N3b** (détails implémentation)
3. Focus sur les flows (N3b_Order_CreateFlow)

### Pour architectes:
- Analyser les patterns (Hexagonal, DDD)
- Valider les choix techniques
- Vérifier cohérence inter-services

---

## 📝 Liste complète des diagrammes

### Niveau 1
- ✅ `N1_Context_GoodFood.puml`

### Niveau 2
- ✅ `N2_Container_GoodFood.puml`

### Niveau 3 - Simplifié
- ✅ `N3a_Order_Core.puml` (Domain Model)
- ✅ `N3b_Order_CreateFlow.puml` (Flux complet)
- ✅ `N3a_Payment_BNB.puml` (BNB Bank integration)
- ✅ `N3a_Stock_Simple.puml` (Réservation Redis TTL)
- ✅ `N3a_Logistics_Simple.puml` (Tracking GPS)

**Anciens (gros) diagrammes à supprimer:**
- ❌ `N3_Component_OrderService.puml` (trop gros)
- ❌ `N3_Component_PaymentService.puml` (remplacé par N3a_Payment_BNB)
- ❌ `N3_Component_InventoryService.puml` (remplacé par N3a_Stock_Simple)
- ❌ `N3_Component_LogisticsService.puml` (remplacé par N3a_Logistics_Simple)

---

## 👥 Auteurs

CESI - MAALSI - Projet Collaboratif 1

---

**Date:** Janvier 2025
