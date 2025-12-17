# 🏗️ Architecture Hexagonale Complète - Good Food 3.0

## 📊 Diagrammes Créés

### 1. **N2_Architecture_Hexagonale_Complete.puml**
Vue d'ensemble montrant tous les domaines et leur interaction.

**Composants:**
- 🔌 **Primary Ports** (Adaptateurs d'Entrée)
  - REST API
  - GraphQL API
  - Webhook Handler
  - gRPC Server

- 📨 **Bus de Communication**
  - Command Bus (CQRS)
  - Event Bus (Event-Driven)
  - Query Bus (Lecture optimisée)

- 🏢 **6 Domaines Métier**
  - Domaine COMMANDE
  - Domaine STOCK
  - Domaine LOGISTIQUE
  - Domaine FACTURATION
  - Domaine CLIENT
  - Domaine RESTAURANT

- 🔌 **Secondary Ports** (Adaptateurs de Sortie)
  - Repository Ports
  - External API Ports
  - Notification Ports
  - Payment Ports

- ⚙️ **Infrastructure Layer**
  - PostgreSQL, MongoDB, Redis Adapters
  - ERP, Payment, POS Adapters
  - SMS, Email, Push Adapters

---

### 2. **N3_Domain_Commande.puml**
Détail complet du domaine COMMANDE avec CQRS + Event Sourcing.

**Patterns Implémentés:**
- ✍️ **CQRS** (Command Query Responsibility Segregation)
  - Command Side (Write) avec Event Sourcing
  - Query Side (Read) avec projections optimisées

- 📡 **Event-Driven Architecture**
  - Domain Events: OrderCreated, OrderConfirmed, OrderCancelled
  - Event Bus: RabbitMQ/Kafka
  - Event Handlers: Notifications, Analytics, ERP Sync

- 🏢 **DDD Tactical Patterns**
  - Aggregate Root: Order
  - Entities: OrderItem
  - Value Objects: DeliveryInfo, PaymentInfo
  - Domain Services: PricingService, ValidationService

**Flux Complets:**
1. Create Order → Validate → Calculate → Reserve Stock → Persist → Publish Event
2. Payment Webhook → Confirm → Update Status → Notify Customer
3. Query Order → Read from Cached Projection (Fast!)

---

### 3. **N3_Domain_Stock.puml**
Gestion des stocks avec réservations et alertes automatiques.

**Fonctionnalités:**
- 📦 **Gestion Stock**
  - Stock disponible = Total - Réservé
  - Réservations avec TTL (15 min)
  - Prévention overselling

- 🔔 **Alertes Automatiques**
  - Low stock: < seuil minimum
  - Out of stock: = 0
  - Overstocked: > capacité max
  - Auto-reorder auprès fournisseurs

- 📊 **Audit Trail Complet**
  - Tous les mouvements tracés
  - Historique complet
  - WHO changed WHAT WHEN

**Événements:**
- StockReserved (quand commande créée)
- StockReleased (quand commande annulée)
- StockDepleted (rupture de stock)
- LowStockAlert (alerte approvisionnement)

**Intégrations:**
- Sync avec POS System (polling 5-15 min)
- Auto-reorder via Supplier API
- Notifications franchisé

---

### 4. **N3_Domain_Logistique.puml**
Gestion livraisons, livreurs et optimisation tournées.

**Fonctionnalités Avancées:**
- 🚚 **Assignment Strategy**
  - Nearest Available Driver
  - Load Balancing
  - Rating-Based
  - Manual Assignment

- 🗺️ **Route Optimization**
  - Algorithms: TSP, Dijkstra, A*
  - Traffic-aware routing
  - Multi-delivery routes
  - 30% réduction temps livraison

- 📍 **Real-time Tracking**
  - GPS updates (every 10s)
  - WebSocket pour suivi temps réel
  - ETA recalculation dynamique
  - Geo-fencing validation

- 🚨 **Incident Management**
  - Accident detection (IoT sensors)
  - Auto-reassignment
  - Emergency alerts
  - Customer notifications

**Technologies:**
- Google Maps API (routes, traffic)
- Twilio VoIP (communication entreprise)
- Firebase Cloud Messaging (push notifications)
- IoT Sensors (accident detection)

---

### 5. **N3_Domain_Facturation.puml**
Paiements, factures et remboursements (PCI-DSS compliant).

**Composants:**
- 💳 **Payment Processing**
  - 3D Secure (obligatoire > 30€)
  - Tokenization (pas de stockage carte)
  - Fraud Detection (Sift Science)
  - PCI-DSS compliance

- 📄 **Invoice Generation**
  - Auto-génération PDF
  - Envoi email automatique
  - TVA 20% (nourriture) / 5.5% (boissons)
  - Double-entry bookkeeping

- 💸 **Refund Policy**
  - < 5 min: 100% remboursement
  - < 30 min: 90% remboursement
  - Picked up: 50% remboursement
  - Delivered: Pas de remboursement

- 📊 **Reconciliation**
  - Daily reconciliation (2 AM)
  - Match transactions
  - Detect discrepancies
  - Export to Sage

**Ledger (Immutable Audit Trail):**
```
Payment Received:
  DEBIT: Bank Account (+45€)
  CREDIT: Revenue (-45€)

Refund Issued:
  DEBIT: Revenue (+45€)
  CREDIT: Bank Account (-45€)

Commission (15%):
  DEBIT: Commission Expense (+6.75€)
  CREDIT: Bank Account (-6.75€)
```

---

## 🔄 Flux Complets Inter-Domaines

### **Flux 1: Création Commande Complète**

```
1. CLIENT → GraphQL API → Command Bus
   ↓
2. DOMAINE COMMANDE
   ↓ CreateOrderCommand
   ├─► Validate (ValidationService)
   ├─► Calculate Price (PricingService)
   ├─► Create Order Aggregate
   ├─► Persist (PostgreSQL)
   └─► Publish: OrderCreatedEvent
       ↓
3. EVENT BUS distribue à:
   ↓
   ├─► DOMAINE STOCK
   │   ├─► Consumes: OrderCreatedEvent
   │   ├─► ReserveStockCommand
   │   ├─► Reserve items (15 min TTL)
   │   └─► Publish: StockReservedEvent
   │
   ├─► DOMAINE FACTURATION
   │   ├─► Consumes: OrderCreatedEvent
   │   ├─► GenerateInvoiceCommand
   │   ├─► Calculate taxes
   │   ├─► Create ledger entries
   │   ├─► Generate PDF
   │   └─► Publish: InvoiceGeneratedEvent
   │
   └─► NOTIFICATION SERVICE
       └─► Send confirmation email/SMS
```

### **Flux 2: Paiement Confirmé → Assignment Livreur**

```
1. PAYMENT PROVIDER (BNB Bank)
   ↓ Webhook: payment.succeeded
   ↓
2. DOMAINE FACTURATION
   ├─► ConfirmPaymentCommand
   ├─► Update payment status
   ├─► Create ledger entry
   └─► Publish: PaymentConfirmedEvent
       ↓
3. EVENT BUS distribue à:
   ↓
   ├─► DOMAINE COMMANDE
   │   ├─► Update order status: PENDING → CONFIRMED
   │   └─► Publish: OrderConfirmedEvent
   │       ↓
   │       └─► DOMAINE LOGISTIQUE
   │           ├─► Consumes: OrderConfirmedEvent
   │           ├─► AssignDriverCommand
   │           ├─► DriverAssignmentStrategy
   │           │   ├─► Find nearest driver
   │           │   ├─► Calculate distances (Google Maps)
   │           │   └─► Assign driver
   │           ├─► Update delivery status
   │           └─► Publish: DriverAssignedEvent
   │               ↓
   │               └─► NOTIFICATION SERVICE
   │                   ├─► Notify customer (push)
   │                   └─► Notify driver (push)
   │
   └─► DOMAINE STOCK
       └─► Confirm reservation (no longer TTL)
```

### **Flux 3: Livraison Complétée**

```
1. DRIVER APP → GraphQL API
   ↓ CompleteDeliveryCommand
   ↓
2. DOMAINE LOGISTIQUE
   ├─► Validate delivery proof
   ├─► Update delivery status
   ├─► Release driver (AVAILABLE)
   ├─► Calculate performance metrics
   └─► Publish: DeliveryCompletedEvent
       ↓
3. EVENT BUS distribue à:
   ↓
   ├─► DOMAINE COMMANDE
   │   └─► Update order status: DELIVERED
   │
   ├─► DOMAINE STOCK
   │   └─► Confirm stock consumed (audit)
   │
   ├─► DOMAINE FACTURATION
   │   └─► Finalize invoice (no refund possible)
   │
   └─► ANALYTICS SERVICE
       └─► Track delivery metrics
```

### **Flux 4: Annulation Commande**

```
1. CLIENT → GraphQL API
   ↓ CancelOrderCommand
   ↓
2. DOMAINE COMMANDE
   ├─► Check cancellation policy
   ├─► Calculate refund amount
   ├─► Update status: CANCELLED
   └─► Publish: OrderCancelledEvent
       ↓
3. EVENT BUS distribue à:
   ↓
   ├─► DOMAINE STOCK
   │   ├─► ReleaseStockCommand
   │   └─► Unreserve items
   │
   ├─► DOMAINE LOGISTIQUE
   │   ├─► Release driver (if assigned)
   │   └─► Update status: CANCELLED
   │
   ├─► DOMAINE FACTURATION
   │   ├─► IssueRefundCommand
   │   ├─► Calculate refund (policy-based)
   │   ├─► Process refund (Stripe)
   │   └─► Create credit note
   │
   └─► NOTIFICATION SERVICE
       ├─► Notify customer (refund confirmation)
       └─► Notify driver (if assigned)
```

---

## 🎯 Avantages Architecture Hexagonale

### ✅ **Séparation des Préoccupations**
- **Domaine** = Logique métier pure
- **Ports** = Contrats (interfaces)
- **Adapters** = Implémentations techniques

### ✅ **Testabilité**
```java
// Test unitaire du domaine (pas de dépendances externes)
@Test
void shouldCreateOrderWhenStockAvailable() {
    // Arrange
    var order = new Order(...);
    var mockInventory = mock(IInventoryService.class);
    when(mockInventory.checkStock(...)).thenReturn(true);

    // Act
    var result = createOrderHandler.handle(command, mockInventory);

    // Assert
    assertTrue(result.isSuccess());
}
```

### ✅ **Évolutivité**
- Changer PostgreSQL → MongoDB: Créer nouveau adapter
- Changer Stripe → PayPal: Créer nouveau adapter
- **Le domaine ne change pas!**

### ✅ **Scalabilité**
- Chaque domaine peut scaler indépendamment
- Event Bus permet découplage total
- Microservices-ready

### ✅ **Maintenabilité**
- Code métier isolé et clair
- Pas de couplage technique
- Tests unitaires faciles

---

## 📚 Technologies Utilisées

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| **Primary Ports** | GraphQL (Apollo), REST (Spring Boot) | Flexibilité clients |
| **Command Bus** | MediatR (CQRS) | Pattern CQRS |
| **Event Bus** | RabbitMQ / Kafka | Event-Driven Architecture |
| **Domain** | DDD + Event Sourcing | Logique métier pure |
| **Persistence** | PostgreSQL (write), Redis (read) | CQRS read/write separation |
| **Event Store** | EventStoreDB | Audit trail, replay |
| **External APIs** | Stripe, Google Maps, Twilio | Best-in-class services |

---

## 🚀 Prochaines Étapes

1. **Générer les diagrammes PNG** (voir [GUIDE_GENERATION_DIAGRAMMES.md](../../GUIDE_GENERATION_DIAGRAMMES.md))
2. **Intégrer dans présentation** ([presentation_slides.html](../../presentation_slides.html))
3. **Présenter au DSI/CTO**

---

**Architecture Hexagonale Complète | Good Food 3.0**
*CQRS + Event Sourcing + DDD + Microservices*
