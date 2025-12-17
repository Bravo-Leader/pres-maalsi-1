# 📐 Architecture C4 - Good Food 3.0

## 📋 Vue d'ensemble

Ce dossier contient l'ensemble des **diagrammes C4** (Context, Container, Component, Code) décrivant l'architecture hexagonale de la plateforme **Good Food 3.0**.

L'architecture utilise les **patterns modernes** suivants:
- **Hexagonal Architecture** (Ports & Adapters)
- **CQRS** (Command Query Responsibility Segregation)
- **Event Sourcing** & **Event-Driven Architecture**
- **Domain-Driven Design** (DDD)
- **Microservices**

---

## 📂 Structure des diagrammes

### Niveau 1 - Contexte (N1)
**Fichier:** [`N1_Context_GoodFood.puml`](./N1_Context_GoodFood.puml)

**Objectif:** Vue d'ensemble du système et de son écosystème

**Contenu:**
- 4 personas (Client, Livreur, Restaurant, Admin)
- Système principal Good Food 3.0
- 6 systèmes externes:
  - ERP Dynamics 365
  - BNB Bank (paiements)
  - Email Service
  - SMS Service
  - Google Maps API
  - POS Systems (caisses restaurants)

**Quand l'utiliser:**
- Présentation exécutive
- Comprendre le contexte métier
- Identifier les acteurs et systèmes externes

---

### Niveau 2 - Conteneurs (N2)
**Fichier:** [`N2_Container_GoodFood.puml`](./N2_Container_GoodFood.puml)

**Objectif:** Décomposition en conteneurs (applications, services, bases de données)

**Contenu:**
- **Presentation Layer:**
  - Web Application (React)
  - Mobile Apps (React Native)
  - Driver App
  - Admin Dashboard

- **API Gateway:** Point d'entrée unique (Kong/NGINX)

- **Core Services (Hexagonal):** 4 microservices
  - **Service Commande** (Node.js)
  - **Service Stock** (Node.js)
  - **Service Logistique** (Node.js)
  - **Service Facturation** (Node.js)

- **Event Bus:** RabbitMQ/Kafka

- **Data Layer:**
  - PostgreSQL (écriture)
  - Redis (cache lecture)
  - MongoDB (événements)

**Pattern Hexagonal:**
```
┌──────────────────────────────────┐
│   PRIMARY ADAPTERS (Entrée)     │
│   GraphQL | REST | Webhooks     │
├──────────────────────────────────┤
│   APPLICATION LAYER              │
│   Use Cases (orchestration)      │
├──────────────────────────────────┤
│   DOMAIN LAYER (Cœur Métier)    │
│   Aggregates | Entities | VOs   │
│   Domain Services | Events       │
│   Ports (Interfaces)             │
├──────────────────────────────────┤
│   SECONDARY ADAPTERS (Sortie)   │
│   Repositories | APIs | Email   │
└──────────────────────────────────┘
```

**Quand l'utiliser:**
- Architecture technique globale
- Choix des technologies
- Communication inter-services

---

### Niveau 3 - Composants (N3)
Détaille chaque service avec son architecture hexagonale complète.

#### N3.1 - Service Commande
**Fichier:** [`N3_Component_OrderService.puml`](./N3_Component_OrderService.puml)

**Objectif:** Gestion des commandes avec CQRS + Event Sourcing

**Composants clés:**

**Primary Adapters (Entrée):**
- GraphQL Resolver (mutations, queries, subscriptions)
- REST Controller (HTTP endpoints)
- Event Listener (RabbitMQ consumer)

**Application Layer:**
- `CreateOrderUseCase`: Orchestration création commande
- `CancelOrderUseCase`: Gestion annulation et remboursement
- `UpdateOrderUseCase`: Mise à jour statut

**Domain Layer:**
- **Aggregates:**
  - `Order` (Aggregate Root): orderId, customerId, items[], totalAmount, status
  - `OrderItem` (Entity): productId, quantity, unitPrice

- **Value Objects:**
  - `Money`: amount, currency, format()
  - `Address`: street, city, zipCode

- **Domain Services:**
  - `PricingService`: Calcul prix total, promotions, taxes
  - `ValidationService`: Validation montant min, zone livraison, stock

- **Domain Events:**
  - `OrderCreatedEvent`
  - `OrderCancelledEvent`

- **Ports (Interfaces):**
  - `IOrderRepository`: save(), findById()
  - `IInventoryService`: checkStock(), reserve()
  - `IPaymentService`: charge(), refund()

**Secondary Adapters (Sortie):**
- `PostgresOrderRepository`: Implémentation IOrderRepository
- `InventoryServiceAdapter`: Appels HTTP vers Service Stock
- `PaymentServiceAdapter`: Appels HTTP vers Service Facturation
- `RabbitMQPublisher`: Publication événements

**Flux complet - Créer Commande:**
1. Client envoie mutation GraphQL
2. Resolver délègue à `CreateOrderUseCase`
3. Use Case orchestre:
   - Valide données (`ValidationService`)
   - Vérifie stock (via `IInventoryService` port)
   - Calcule prix (`PricingService`)
   - Crée aggregate `Order`
   - Persiste (via `IOrderRepository` port)
   - Publie `OrderCreatedEvent`
4. Adapters implémentent les ports
5. Event Bus distribue l'événement
6. Autres services réagissent

⏱️ **Temps total:** < 500ms

---

#### N3.2 - Service Inventaire
**Fichier:** [`N3_Component_InventoryService.puml`](./N3_Component_InventoryService.puml)

**Objectif:** Gestion des stocks avec pattern Réservation

**Composants clés:**

**Primary Adapters:**
- Stock Controller (REST API)
- Order Event Listener (consomme `OrderCreated`, `OrderCancelled`)
- POS Sync (synchronisation caisse toutes les 5 min)

**Application Layer:**
- `ReserveStockUseCase`: Réserve stock pour commande (TTL 15 min)
- `ReleaseStockUseCase`: Libère stock si annulation
- `UpdateStockUseCase`: Met à jour stock manuellement

**Domain Layer:**
- **Aggregates:**
  - `Inventory`: productId, restaurantId, available, reserved, minThreshold
  - `Reservation`: reservationId, orderId, items[], expiresAt (15 min)

- **Value Objects:**
  - `Quantity`: value, unit, validate()
  - `Threshold`: min, max, reorderPoint

- **Domain Services:**
  - `AvailabilityChecker`: available = total - reserved
  - `AlertService`: Alerte si stock < minThreshold

- **Domain Events:**
  - `StockReservedEvent`
  - `StockReleasedEvent`
  - `LowStockAlertEvent`

- **Ports:**
  - `IInventoryRepository`: save(), findByProduct()
  - `IReservationRepository`: save(), findExpired()
  - `IPOSSystem`: getCurrentStock(), syncStock()
  - `INotificationService`: alertLowStock()

**Secondary Adapters:**
- `PostgresInventoryRepository`: Stockage durable
- `RedisReservationRepository`: **SETEX 15 min TTL** (auto-expire)
- `EmailAdapter`: Alertes low stock
- `POSSystemAdapter`: Sync avec caisse restaurant

**Business Rules:**
```
available = total - reserved
Réservation TTL: 15 minutes (auto-expire Redis)
Alert si stock < minThreshold
Prevent overselling
```

**Flux - Réserver Stock:**
1. Event Bus → `OrderCreatedEvent`
2. Listener consomme événement
3. `ReserveStockUseCase` orchestre:
   - Vérifie disponibilité (`AvailabilityChecker`)
   - Crée réservation (Aggregate)
   - Sauve dans Postgres (stock)
   - Sauve dans Redis avec TTL 15 min (réservation)
   - Publie `StockReservedEvent`

⏱️ **Temps total:** < 100ms

**Gestion TTL:**
- Si commande confirmée: Réservation validée
- Si 15 min écoulées: Redis expire automatiquement
- Job cleanup libère le stock

---

#### N3.3 - Service Logistique
**Fichier:** [`N3_Component_LogisticsService.puml`](./N3_Component_LogisticsService.puml)

**Objectif:** Gestion livraisons et livreurs avec tracking temps réel

**Composants clés:**

**Primary Adapters:**
- Driver API (GraphQL): acceptDelivery, updateLocation, completeDelivery
- Order Event Listener (consomme `OrderConfirmed`)
- Tracking WebSocket (Socket.IO): Suivi temps réel client/restaurant

**Application Layer:**
- `AssignDriverUseCase`: Auto-assignation livreur optimal
- `UpdateLocationUseCase`: Mise à jour GPS temps réel (toutes les 10s)
- `CompleteDeliveryUseCase`: Finalisation livraison avec preuve

**Domain Layer:**
- **Aggregates:**
  - `Delivery`: deliveryId, orderId, driverId, status, pickupLocation, deliveryLocation, estimatedTime
  - `Driver`: driverId, status (AVAILABLE/BUSY), currentLocation, rating, activeDeliveries[]

- **Value Objects:**
  - `Location`: latitude, longitude, address
  - `EstimatedTime`: estimated, actual, variance
  - `DeliveryProof`: photo, signature, timestamp

- **Domain Services:**
  - `DriverAssignmentStrategy`:
    1. Plus proche (distance)
    2. Meilleur noté (rating)
    3. Load balancing
  - `RouteOptimizer`: Dijkstra + Traffic temps réel
  - `PerformanceCalculator`: Métriques on-time delivery

- **Domain Events:**
  - `DriverAssignedEvent`
  - `LocationUpdatedEvent`
  - `DeliveryCompletedEvent`

- **Ports:**
  - `IDeliveryRepository`: save(), findActive()
  - `IDriverRepository`: findAvailable(), findByLocation()
  - `IMapsService`: calculateRoute(), getDistance(), getTraffic()
  - `INotificationService`: notifyCustomer(), sendPush()

**Secondary Adapters:**
- `PostgresDeliveryRepository`: Stockage livraisons
- `RedisLocationAdapter`: **GEOADD/GEORADIUS** pour positions GPS (TTL 30s)
- `GoogleMapsAdapter`: Routes, distances, trafic temps réel
- `FirebaseNotificationAdapter`: Push notifications mobiles

**Business Rules:**
```
Assignment:
  • Distance < 5km prioritaire
  • Rating > 4.0 minimum
  • Max 3 livraisons simultanées

Tracking:
  • Update GPS toutes les 10 secondes
  • Cache Redis Geo (TTL 30s)

ETA:
  • Trafic temps réel
  • Historique livreur
  • Ajusté dynamiquement
```

**Flux - Auto-Assign Driver:**
1. Event Bus → `OrderConfirmedEvent`
2. `AssignDriverUseCase` orchestre:
   - Trouve livreurs disponibles (Redis GEORADIUS)
   - Calcule distances (Google Maps Distance Matrix)
   - Applique stratégie assignment (Domain Service)
   - Choisit meilleur livreur
   - Assigne livraison (Aggregate)
   - Sauve Postgres
   - Publie `DriverAssignedEvent`
   - Notifie client (Firebase Push)

⏱️ **Temps total:** < 2 secondes

**Tracking temps réel:**
- Livreur update GPS toutes les 10s (GraphQL)
- Redis cache position (GEOADD)
- WebSocket broadcast au client
- ETA recalculé avec trafic

---

#### N3.4 - Service Facturation
**Fichier:** [`N3_Component_PaymentService.puml`](./N3_Component_PaymentService.puml)

**Objectif:** Paiements sécurisés (PCI-DSS) et factures

**Composants clés:**

**Primary Adapters:**
- Payment Controller (REST): POST /payments, POST /refunds
- Stripe Webhook Handler: payment.succeeded, payment.failed (signature vérifiée)
- Order Event Listener (consomme `OrderCreated` → génère facture)

**Application Layer:**
- `ProcessPaymentUseCase`: Traitement paiement avec anti-fraude
- `ConfirmPaymentUseCase`: Confirmation async via webhook
- `IssueRefundUseCase`: Remboursement avec politique
- `GenerateInvoiceUseCase`: Génération facture PDF + email

**Domain Layer:**
- **Aggregates:**
  - `Payment`: paymentId, orderId, amount, status, method, transactionId
  - `Invoice`: invoiceId, invoiceNumber, orderId, items[], subtotal, taxAmount (TVA 20%), totalAmount
  - `Refund`: refundId, paymentId, amount, reason, status

- **Value Objects:**
  - `Money`: amount, currency (EUR), format()
  - `TaxAmount`: rate (20%), amount, calculate()
  - `PaymentMethod`: type (CARD/CASH), last4, brand

- **Domain Services:**
  - `PricingCalculator`: Sous-total, frais livraison, service charge (2€), commission (15%)
  - `TaxCalculator`: TVA 20% nourriture, 5.5% boissons
  - `FraudDetector`: Score risque < 50 → OK, ≥ 50 → BLOCK
  - `RefundCalculator`:
    - < 5 min: 100%
    - < 30 min: 90%
    - Livré: 0%

- **Domain Events:**
  - `PaymentInitiatedEvent`
  - `PaymentConfirmedEvent`
  - `PaymentFailedEvent`
  - `InvoiceGeneratedEvent`
  - `RefundProcessedEvent`

- **Ports:**
  - `IPaymentRepository`: save(), findByOrder()
  - `IInvoiceRepository`: save(), findById()
  - `IPaymentGateway`: charge(), refund(), getStatus()
  - `IFraudDetection`: analyzeTransaction(), scoreRisk()
  - `IInvoiceGenerator`: generatePDF(), sendEmail()

**Secondary Adapters:**
- `PostgresPaymentRepository`: Transactions ACID
- `StripePaymentAdapter`: PaymentIntents API, 3D Secure (SCA), PCI-DSS Level 1
- `SiftFraudAdapter`: Machine learning scoring, real-time analysis
- `PDFGeneratorAdapter`: PDFKit, SendGrid email, S3 storage

**Business Rules:**
```
Paiement:
  • 3D Secure > 30€ obligatoire
  • PCI-DSS compliant
  • Pas de stockage carte (tokenization)
  • Score fraude < 50

Remboursement:
  • < 5 min: 100%
  • < 30 min: 90%
  • Livré: 0%

TVA:
  • 20% nourriture
  • 5.5% boissons
```

**Flux - Traiter Paiement:**
1. Client envoie paiement (REST API)
2. Fraud Detection analyse (Sift Science)
   - Score risque < 50 → OK
   - Score risque ≥ 50 → BLOCK
3. `ProcessPaymentUseCase` orchestre:
   - Initie paiement (Aggregate)
   - Charge carte (Stripe PaymentIntent)
   - Sauve transaction (Postgres)
4. Stripe traite avec 3D Secure
5. Webhook confirme async (`payment.succeeded`)
6. Event Bus notifie Order Service

⏱️ **Temps total:** < 3 secondes

**Génération facture:**
- `OrderCreatedEvent` → Generate invoice
- Calcul TVA 20%
- PDF généré (PDFKit)
- Upload S3
- Email SendGrid

---

## 🔄 Workflows inter-domaines complets

### Workflow 1: Créer une commande complète
```
1. Client Web App
   ↓ GraphQL mutation createOrder
2. API Gateway → Service Commande
   ↓ CreateOrderUseCase
3. Domain Layer:
   • ValidationService.validate()
   • PricingService.calculateTotal()
   • Order Aggregate.create()
   • Raises OrderCreatedEvent
   ↓ Persiste Postgres + Publie Event Bus

4. Event Bus broadcast:
   ├─→ Service Stock (réserve stock)
   ├─→ Service Facturation (génère facture + traite paiement)
   └─→ Service Logistique (assigne livreur)

5. Service Stock:
   • OrderCreatedEvent → ReserveStockUseCase
   • AvailabilityChecker.check()
   • Inventory.reserve()
   • Sauve Postgres + Redis (TTL 15 min)
   • Publie StockReservedEvent

6. Service Facturation:
   • OrderCreatedEvent → GenerateInvoiceUseCase
   • TaxCalculator.calculateVAT()
   • Invoice.generate()
   • PDFGeneratorAdapter.generatePDF()
   • Upload S3 + Email SendGrid
   • Publie InvoiceGeneratedEvent

   • ProcessPaymentUseCase
   • FraudDetector.analyze() → Sift Science
   • Payment.initiate()
   • StripeAdapter.charge() → 3D Secure
   • Webhook confirmation → PaymentConfirmedEvent

7. Service Logistique:
   • OrderConfirmedEvent → AssignDriverUseCase
   • DriverAssignmentStrategy.findBest()
   • Redis GEORADIUS (livreurs proximité)
   • Google Maps Distance Matrix
   • Delivery.assign(driver)
   • Firebase Push notification client
   • Publie DriverAssignedEvent

8. Résultat final:
   ✅ Commande créée
   ✅ Stock réservé (15 min TTL)
   ✅ Facture générée (PDF + email)
   ✅ Paiement traité (3D Secure)
   ✅ Livreur assigné
   ✅ Client notifié (push + WebSocket)
```

⏱️ **Temps total end-to-end:** < 5 secondes

---

### Workflow 2: Livraison temps réel
```
1. Livreur accepte livraison (Driver App)
   ↓ GraphQL mutation acceptDelivery
2. Service Logistique:
   • AcceptDeliveryUseCase
   • Delivery.start()
   • Publie DeliveryStartedEvent

3. Tracking GPS temps réel (toutes les 10 secondes):
   Driver App → updateLocation mutation
   ↓
   UpdateLocationUseCase
   • Driver.updateLocation()
   • Redis GEOADD (cache position GPS)
   • RouteOptimizer.calculateETA() + Traffic
   • Raises LocationUpdatedEvent
   ↓
   WebSocket broadcast → Client Web/Mobile App
   (Map update en temps réel)

4. Livreur arrive au restaurant:
   • Notification push restaurant
   • Update statut "PICKED_UP"
   • ETA recalculé

5. En route vers client:
   • GPS update toutes les 10s
   • ETA ajusté dynamiquement
   • WebSocket push client

6. Livraison complétée:
   Driver App → completeDelivery(proof: photo)
   ↓
   CompleteDeliveryUseCase
   • Delivery.complete(proof)
   • PerformanceCalculator.updateMetrics()
   • Publie DeliveryCompletedEvent
   ↓
   Event Bus broadcast:
   ├─→ Service Stock (confirme réservation)
   ├─→ Service Facturation (confirme paiement final)
   └─→ Service Commande (update statut DELIVERED)
```

⏱️ **Temps de livraison moyen:** 25-30 minutes

---

### Workflow 3: Annulation commande avec remboursement
```
1. Client annule commande (Web/Mobile App)
   ↓ GraphQL mutation cancelOrder
2. Service Commande:
   • CancelOrderUseCase
   • Order.cancel()
   • Publie OrderCancelledEvent

3. Event Bus broadcast:
   ├─→ Service Stock (libère stock)
   ├─→ Service Facturation (traite remboursement)
   └─→ Service Logistique (annule livraison si assignée)

4. Service Stock:
   • OrderCancelledEvent → ReleaseStockUseCase
   • Reservation.cancel()
   • Inventory.release()
   • Stock available += reserved
   • Publie StockReleasedEvent

5. Service Facturation:
   • OrderCancelledEvent → IssueRefundUseCase
   • RefundCalculator.calculate():
     - Si < 5 min depuis commande → 100%
     - Si < 30 min → 90%
     - Si livré → 0%
   • Refund.process()
   • StripeAdapter.refund()
   • Publie RefundProcessedEvent
   • Email confirmation client

6. Service Logistique (si livreur assigné):
   • Delivery.cancel()
   • Driver.free()
   • Notification livreur
   • Publie DeliveryCancelledEvent
```

⏱️ **Temps total:** < 2 secondes
💸 **Remboursement:** 3-5 jours ouvrés (Stripe)

---

## 🏗️ Patterns architecturaux utilisés

### 1. Hexagonal Architecture (Ports & Adapters)

**Objectif:** Isoler la logique métier des détails techniques

**Structure:**
```
┌─────────────────────────────────────────┐
│      PRIMARY ADAPTERS (Entrée)          │
│  GraphQL | REST | Webhooks | Events     │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│      APPLICATION LAYER                   │
│  Use Cases (orchestration)               │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│      DOMAIN LAYER (Cœur Métier)         │
│  ┌─────────────────────────────────┐    │
│  │ Aggregates (Order, Inventory)   │    │
│  │ Entities (OrderItem, Delivery)  │    │
│  │ Value Objects (Money, Location) │    │
│  │ Domain Services (Pricing, Tax)  │    │
│  │ Domain Events                    │    │
│  │ Ports (Interfaces)               │    │
│  └─────────────────────────────────┘    │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│      SECONDARY ADAPTERS (Sortie)        │
│  Repositories | APIs | Email | SMS      │
└─────────────────────────────────────────┘
```

**Benefits:**
- ✅ **Testabilité:** Domain testable sans infra (100% test coverage possible)
- ✅ **Flexibilité:** Change DB (Postgres → Mongo) sans toucher Domain
- ✅ **Indépendance:** Domain ne connaît pas les frameworks
- ✅ **Évolutivité:** Ajouter adapters sans risque

**Exemple concret:**
```typescript
// Port (Interface dans Domain Layer)
interface IOrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order>;
}

// Adapter (Implémentation dans Infrastructure Layer)
class PostgresOrderRepository implements IOrderRepository {
  async save(order: Order): Promise<void> {
    await this.db.query('INSERT INTO orders ...');
  }

  async findById(id: string): Promise<Order> {
    const row = await this.db.query('SELECT * FROM orders WHERE id = $1', [id]);
    return Order.fromDatabase(row);
  }
}

// Facilement remplaçable par:
class MongoOrderRepository implements IOrderRepository { ... }
class InMemoryOrderRepository implements IOrderRepository { ... } // Tests
```

---

### 2. CQRS (Command Query Responsibility Segregation)

**Objectif:** Séparer lecture (Query) et écriture (Command)

**Write Side (Commands):**
```
Command → Handler → Aggregate → Events → Event Store
```
- **Strong consistency**
- **Transactional**
- **Event-sourced**
- **PostgreSQL** (ACID)

**Read Side (Queries):**
```
Query → Handler → Read Repository → Cached Projections
```
- **Eventually consistent**
- **Optimized for queries**
- **Denormalized**
- **Redis** cache (< 10ms)

**Exemple Service Commande:**
```typescript
// WRITE SIDE
class CreateOrderCommand {
  customerId: string;
  items: OrderItem[];
}

class CreateOrderHandler {
  async handle(cmd: CreateOrderCommand): Promise<void> {
    // 1. Validate
    // 2. Create aggregate
    const order = Order.create(cmd);

    // 3. Save to write store
    await this.orderRepo.save(order);

    // 4. Publish events
    await this.eventBus.publish(new OrderCreatedEvent(order));
  }
}

// READ SIDE
class GetOrderQuery {
  orderId: string;
}

class GetOrderHandler {
  async handle(query: GetOrderQuery): Promise<OrderView> {
    // Read from optimized cache (Redis)
    return await this.readRepo.getOrder(query.orderId);
  }
}

// Event Handler updates Read Model
class OrderProjectionUpdater {
  async handle(event: OrderCreatedEvent): Promise<void> {
    const view = OrderView.fromEvent(event);
    await this.redisCache.set(`order:${event.orderId}`, view);
  }
}
```

**Benefits:**
- ✅ **Performance:** Lecture ultra-rapide (Redis cache)
- ✅ **Scalability:** Read/Write indépendants (scale séparément)
- ✅ **Optimization:** Read models optimisés pour UI
- ✅ **Audit trail:** Event sourcing complet

---

### 3. Event-Driven Architecture

**Objectif:** Communication asynchrone entre services via événements

**Event Bus:** RabbitMQ / Kafka

**Pattern Publish/Subscribe:**
```
Service Commande
  ↓ Publie OrderCreatedEvent
Event Bus (RabbitMQ)
  ├─→ Service Stock (subscribe)
  ├─→ Service Facturation (subscribe)
  ├─→ Service Logistique (subscribe)
  └─→ Analytics Service (subscribe)
```

**Exemple d'événement:**
```typescript
class OrderCreatedEvent {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: Money;
  timestamp: Date;
}

// Publisher (Service Commande)
class CreateOrderHandler {
  async handle(cmd: CreateOrderCommand) {
    const order = Order.create(cmd);
    await this.repo.save(order);

    // Publish event
    await this.eventBus.publish(new OrderCreatedEvent(order));
  }
}

// Subscriber (Service Stock)
class OrderCreatedSubscriber {
  @Subscribe('OrderCreatedEvent')
  async handle(event: OrderCreatedEvent) {
    // Reserve stock
    await this.reserveStockUseCase.execute({
      orderId: event.orderId,
      items: event.items
    });
  }
}
```

**Benefits:**
- ✅ **Loose coupling:** Services indépendants
- ✅ **Scalability:** Async processing
- ✅ **Resilience:** Retry automatique (RabbitMQ)
- ✅ **Audit:** Événements = historique immuable
- ✅ **Extensibility:** Ajouter subscribers sans modifier publisher

---

### 4. Domain-Driven Design (DDD)

**Tactical Patterns:**

**Aggregate Root:**
```typescript
class Order {
  private orderId: string;
  private customerId: string;
  private items: OrderItem[] = [];
  private status: OrderStatus;
  private totalAmount: Money;

  // Factory method
  static create(cmd: CreateOrderCommand): Order {
    const order = new Order();
    order.orderId = UUID.generate();
    order.customerId = cmd.customerId;

    // Business logic
    cmd.items.forEach(item => order.addItem(item));
    order.calculateTotal();

    // Raise domain event
    order.raise(new OrderCreatedEvent(order));

    return order;
  }

  // Invariant protection
  addItem(item: OrderItem): void {
    if (this.status !== OrderStatus.DRAFT) {
      throw new Error('Cannot modify confirmed order');
    }
    this.items.push(item);
  }

  // Business method
  cancel(reason: string): void {
    if (!this.canBeCancelled()) {
      throw new Error('Order cannot be cancelled');
    }

    this.status = OrderStatus.CANCELLED;
    this.raise(new OrderCancelledEvent(this.orderId, reason));
  }

  private canBeCancelled(): boolean {
    return this.status === OrderStatus.PENDING ||
           this.status === OrderStatus.CONFIRMED;
  }
}
```

**Value Objects (immutable):**
```typescript
class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'EUR'
  ) {
    if (amount < 0) throw new Error('Amount cannot be negative');
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  format(): string {
    return `${this.amount.toFixed(2)} ${this.currency}`;
  }
}
```

**Domain Services:**
```typescript
class PricingService {
  calculateTotal(items: OrderItem[]): Money {
    let subtotal = new Money(0);

    items.forEach(item => {
      subtotal = subtotal.add(item.subtotal);
    });

    const deliveryFee = this.calculateDeliveryFee(subtotal);
    const serviceCharge = new Money(2.00); // Platform fee

    return subtotal.add(deliveryFee).add(serviceCharge);
  }

  private calculateDeliveryFee(subtotal: Money): Money {
    if (subtotal.amount >= 20) {
      return new Money(0); // Free delivery
    }
    return new Money(3.50);
  }
}
```

**Benefits DDD:**
- ✅ **Ubiquitous Language:** Code = Business language
- ✅ **Invariants:** Business rules always enforced
- ✅ **Encapsulation:** Domain logic protected
- ✅ **Testability:** Pure domain functions

---

## 🛠️ Technologies utilisées

### Backend Services
| Service | Framework | Justification |
|---------|-----------|---------------|
| Commande | **Node.js + TypeScript** | Async I/O, Event-driven, GraphQL native |
| Stock | **Node.js + TypeScript** | Performance cache Redis |
| Logistique | **Node.js + TypeScript** | WebSocket temps réel, Socket.IO |
| Facturation | **Node.js + TypeScript** | Stripe SDK natif |

### Databases
| Type | Technologie | Usage |
|------|-------------|-------|
| **Write Store** | PostgreSQL | Transactions ACID, durabilité |
| **Read Store** | Redis | Cache ultra-rapide (< 10ms) |
| **Event Store** | MongoDB | Événements immuables, audit trail |
| **Search** | Elasticsearch | Full-text search restaurants/products |

### Infrastructure
| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **API Gateway** | Kong / NGINX | Rate limiting, auth, routing |
| **Event Bus** | RabbitMQ / Kafka | Publish/Subscribe, durable, retry |
| **Cache** | Redis | GEOADD (GPS), SETEX (TTL), < 10ms |
| **File Storage** | AWS S3 | PDF invoices, delivery proofs |
| **CDN** | CloudFront | Images produits, static assets |

### External Services
| Service | Provider | Usage |
|---------|----------|-------|
| **Payments** | Stripe | 3D Secure, PCI-DSS Level 1 |
| **Fraud Detection** | Sift Science | Machine learning, real-time scoring |
| **Maps** | Google Maps API | Routes, distances, traffic |
| **Notifications** | Firebase FCM | Push notifications iOS/Android |
| **Email** | SendGrid | Transactional emails, invoices |
| **SMS** | Twilio | Order confirmations, OTP |
| **ERP** | Dynamics 365 | Inventory sync, accounting |

---

## 📊 Génération des diagrammes

### Prérequis
```bash
npm install -g @plantuml/cli
# ou
brew install plantuml  # macOS
```

### Générer les PNG
```bash
# Tous les diagrammes
plantuml *.puml -tpng -o exports/

# Diagramme spécifique
plantuml N1_Context_GoodFood.puml -tpng
```

### Visualisation en ligne
[PlantUML Online Editor](http://www.plantuml.com/plantuml/uml/)

1. Copier le contenu du fichier `.puml`
2. Coller dans l'éditeur
3. Visualiser le rendu en temps réel
4. Exporter en PNG/SVG

---

## 📖 Documentation complémentaire

- **C4 Model:** [c4model.com](https://c4model.com/)
- **Hexagonal Architecture:** [Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- **DDD:** [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/ddd/)
- **CQRS:** [Martin Fowler](https://martinfowler.com/bliki/CQRS.html)
- **Event Sourcing:** [Martin Fowler](https://martinfowler.com/eaaDev/EventSourcing.html)

---

## 🎯 Utilisation recommandée

### Pour présentation exécutive:
1. Commencer par **N1 Context** (vue d'ensemble)
2. Montrer **N2 Container** (architecture technique)
3. Approfondir avec **1-2 N3** spécifiques si questions

### Pour développeurs:
1. Lire **N2 Container** (architecture globale)
2. Étudier **tous les N3** (détails implémentation)
3. Comprendre les workflows inter-domaines
4. Référencer les patterns (Hexagonal, CQRS, DDD)

### Pour architectes:
- Analyser la cohérence architecturale
- Valider les choix techniques
- Évaluer la scalabilité
- Vérifier la conformité (PCI-DSS, RGPD)

---

## 👥 Auteurs

**Équipe Architecture Good Food 3.0**
CESI - MAALSI - Projet Collaboratif 1

---

## 📝 Licence

Document interne CESI - Tous droits réservés
