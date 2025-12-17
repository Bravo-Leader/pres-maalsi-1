/**
 * Matrix Data Configuration
 * Contains all the data for technology choices matrices
 */
export const matrixData = [
    {
        id: "cloud",
        title: "☁️ Cloud Provider",
        layout: "two-columns", // Special layout for the first slide
        description: "🇫🇷 Souverain • Conformité RGPD • Coût • Facilité",
        winnerId: "OVH",
        winnerLabel: "OVH Cloud",
        criteria: [
            { id: "conformite", label: "Conformité", weight: 0.20 },
            { id: "fonctionnalites", label: "Fonctionnalités", weight: 0.20 },
            { id: "performance", label: "Performance", weight: 0.15 },
            { id: "cout", label: "Coût", weight: 0.15 },
            { id: "maturite", label: "Maturité", weight: 0.10 },
            { id: "facilite", label: "Facilité", weight: 0.10 },
            { id: "evolutivite", label: "Évolutivité", weight: 0.05 },
            { id: "integration", label: "Intégration", weight: 0.05 }
        ],
        options: [
            { id: "AWS", label: "AWS", scores: { conformite: 3, fonctionnalites: 5, performance: 5, cout: 3, maturite: 5, facilite: 3, evolutivite: 5, integration: 5 } },
            { id: "Azure", label: "Azure", scores: { conformite: 3, fonctionnalites: 4, performance: 5, cout: 4, maturite: 4, facilite: 3, evolutivite: 5, integration: 4 } },
            { id: "GCP", label: "GCP", scores: { conformite: 3, fonctionnalites: 4, performance: 5, cout: 4, maturite: 4, facilite: 3, evolutivite: 5, integration: 4 } },
            { id: "OVH", label: "OVH", scores: { conformite: 5, fonctionnalites: 4, performance: 4, cout: 5, maturite: 4, facilite: 5, evolutivite: 4, integration: 4 } }
        ]
    },
    {
        id: "database",
        title: "💾 Base de Données",
        layout: "centered",
        description: "ACID complet • Support JSON • Performant • Open source",
        winnerId: "PostgreSQL",
        winnerLabel: "PostgreSQL",
        criteria: [
            { id: "fonctionnalites", label: "Fonctionnalités", weight: 0.15 },
            { id: "performance", label: "Performance", weight: 0.15 },
            { id: "cout", label: "Coût", weight: 0.15 },
            { id: "maturite", label: "Maturité", weight: 0.15 },
            { id: "facilite", label: "Facilité", weight: 0.10 },
            { id: "evolutivite", label: "Évolutivité", weight: 0.15 },
            { id: "integration", label: "Intégration", weight: 0.15 }
        ],
        options: [
            { id: "PostgreSQL", label: "PostgreSQL", scores: { fonctionnalites: 5, performance: 5, cout: 5, maturite: 5, facilite: 4, evolutivite: 5, integration: 5 } },
            { id: "MySQL", label: "MySQL", scores: { fonctionnalites: 4, performance: 4, cout: 5, maturite: 5, facilite: 5, evolutivite: 4, integration: 5 } },
            { id: "MongoDB", label: "MongoDB", scores: { fonctionnalites: 4, performance: 5, cout: 4, maturite: 4, facilite: 4, evolutivite: 5, integration: 4 } }
        ]
    },
    {
        id: "messageQueue",
        title: "📨 Message Queue",
        layout: "centered",
        description: "Simple • Fiable • Facile pour l'équipe • Patterns riches",
        winnerId: "RabbitMQ",
        winnerLabel: "RabbitMQ",
        criteria: [
            { id: "fonctionnalites", label: "Fonctionnalités", weight: 0.15 },
            { id: "performance", label: "Performance", weight: 0.15 },
            { id: "cout", label: "Coût", weight: 0.15 },
            { id: "maturite", label: "Maturité", weight: 0.15 },
            { id: "facilite", label: "Facilité", weight: 0.10 },
            { id: "evolutivite", label: "Évolutivité", weight: 0.15 },
            { id: "integration", label: "Intégration", weight: 0.15 }
        ],
        options: [
            { id: "RabbitMQ", label: "RabbitMQ", scores: { fonctionnalites: 4, performance: 4, cout: 5, maturite: 5, facilite: 5, evolutivite: 4, integration: 5 } },
            { id: "Kafka", label: "Kafka", scores: { fonctionnalites: 5, performance: 5, cout: 4, maturite: 5, facilite: 3, evolutivite: 5, integration: 4 } },
            { id: "Redis Streams", label: "Redis Streams", scores: { fonctionnalites: 3, performance: 5, cout: 5, maturite: 4, facilite: 5, evolutivite: 4, integration: 4 } }
        ]
    },
    {
        id: "backend",
        title: "⚙️ Backend Framework",
        layout: "centered",
        description: "Full-stack JS • Écosystème npm • Async natif • Facile équipe",
        winnerId: "Node.js",
        winnerLabel: "Node.js + Express",
        criteria: [
            { id: "fonctionnalites", label: "Fonctionnalités", weight: 0.15 },
            { id: "performance", label: "Performance", weight: 0.15 },
            { id: "cout", label: "Coût", weight: 0.15 },
            { id: "maturite", label: "Maturité", weight: 0.15 },
            { id: "facilite", label: "Facilité", weight: 0.10 },
            { id: "evolutivite", label: "Évolutivité", weight: 0.15 },
            { id: "integration", label: "Intégration", weight: 0.15 }
        ],
        options: [
            { id: "Node.js", label: "Node.js", scores: { fonctionnalites: 4, performance: 4, cout: 5, maturite: 5, facilite: 5, evolutivite: 4, integration: 5 } },
            { id: "Spring Boot", label: "Spring Boot", scores: { fonctionnalites: 5, performance: 5, cout: 5, maturite: 5, facilite: 3, evolutivite: 5, integration: 4 } },
            { id: "Django", label: "Django", scores: { fonctionnalites: 4, performance: 3, cout: 5, maturite: 5, facilite: 4, evolutivite: 4, integration: 3 } }
        ]
    },
    {
        id: "frontend",
        title: "🎨 Frontend Framework",
        layout: "centered",
        description: "Écosystème riche • React Native • TypeScript • Communauté",
        winnerId: "React",
        winnerLabel: "React + TypeScript",
        criteria: [
            { id: "fonctionnalites", label: "Fonctionnalités", weight: 0.15 },
            { id: "performance", label: "Performance", weight: 0.15 },
            { id: "cout", label: "Coût", weight: 0.15 },
            { id: "maturite", label: "Maturité", weight: 0.15 },
            { id: "facilite", label: "Facilité", weight: 0.10 },
            { id: "evolutivite", label: "Évolutivité", weight: 0.15 },
            { id: "integration", label: "Intégration", weight: 0.15 }
        ],
        options: [
            { id: "React", label: "React", scores: { fonctionnalites: 5, performance: 5, cout: 5, maturite: 5, facilite: 4, evolutivite: 5, integration: 5 } },
            { id: "Vue.js", label: "Vue.js", scores: { fonctionnalites: 4, performance: 5, cout: 5, maturite: 4, facilite: 5, evolutivite: 4, integration: 4 } },
            { id: "Angular", label: "Angular", scores: { fonctionnalites: 5, performance: 4, cout: 5, maturite: 5, facilite: 3, evolutivite: 5, integration: 4 } }
        ]
    },
    {
        id: "cicd",
        title: "🔄 CI/CD Pipeline",
        layout: "centered",
        description: "Complet • Facile équipe • Intégré Git • Auto DevOps",
        winnerId: "GitLab CI",
        winnerLabel: "GitLab CI/CD",
        criteria: [
            { id: "fonctionnalites", label: "Fonctionnalités", weight: 0.15 },
            { id: "performance", label: "Performance", weight: 0.15 },
            { id: "cout", label: "Coût", weight: 0.15 },
            { id: "maturite", label: "Maturité", weight: 0.15 },
            { id: "facilite", label: "Facilité", weight: 0.10 },
            { id: "evolutivite", label: "Évolutivité", weight: 0.15 },
            { id: "integration", label: "Intégration", weight: 0.15 }
        ],
        options: [
            { id: "GitLab CI", label: "GitLab CI", scores: { fonctionnalites: 5, performance: 5, cout: 5, maturite: 5, facilite: 5, evolutivite: 5, integration: 5 } },
            { id: "GitHub Actions", label: "GitHub Actions", scores: { fonctionnalites: 4, performance: 5, cout: 4, maturite: 4, facilite: 5, evolutivite: 4, integration: 4 } },
            { id: "Jenkins", label: "Jenkins", scores: { fonctionnalites: 4, performance: 4, cout: 5, maturite: 5, facilite: 3, evolutivite: 4, integration: 3 } }
        ]
    },
    {
        id: "monitoring",
        title: "📊 Monitoring & Observabilité",
        layout: "centered",
        description: "Open source • Scalable • Alerting puissant • Communauté",
        winnerId: "Prom+Grafana",
        winnerLabel: "Prometheus + Grafana",
        criteria: [
            { id: "fonctionnalites", label: "Fonctionnalités", weight: 0.15 },
            { id: "performance", label: "Performance", weight: 0.15 },
            { id: "cout", label: "Coût", weight: 0.15 },
            { id: "maturite", label: "Maturité", weight: 0.15 },
            { id: "facilite", label: "Facilité", weight: 0.10 },
            { id: "evolutivite", label: "Évolutivité", weight: 0.15 },
            { id: "integration", label: "Intégration", weight: 0.15 }
        ],
        options: [
            { id: "Prom+Grafana", label: "Prom+Grafana", scores: { fonctionnalites: 5, performance: 5, cout: 5, maturite: 5, facilite: 4, evolutivite: 5, integration: 5 } },
            { id: "Datadog", label: "Datadog", scores: { fonctionnalites: 5, performance: 5, cout: 2, maturite: 5, facilite: 5, evolutivite: 5, integration: 4 } },
            { id: "ELK Stack", label: "ELK Stack", scores: { fonctionnalites: 4, performance: 4, cout: 4, maturite: 5, facilite: 3, evolutivite: 4, integration: 4 } }
        ]
    }
];

