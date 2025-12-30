grantready-analytics/
├── README.md
├── LICENSE
├── package.json
├── tsconfig.json
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── src/
│   ├── index.ts
│   ├── metrics/
│   │   ├── index.ts
│   │   ├── GrantMetrics.ts
│   │   ├── ComplianceMetrics.ts
│   │   ├── OutcomeMetrics.ts
│   │   └── FinancialMetrics.ts
│   ├── dashboards/
│   │   ├── index.ts
│   │   ├── BaseDashboard.ts
│   │   ├── GrantProgressDashboard.ts
│   │   └── ComplianceDashboard.ts
│   ├── reports/
│   │   ├── index.ts
│   │   ├── ReportGenerator.ts
│   │   └── templates/
│   │       └── StandardReportTemplate.ts
│   ├── models/
│   │   ├── index.ts
│   │   ├── Grant.ts
│   │   ├── Report.ts
│   │   └── KPI.ts
│   ├── api/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── metrics.ts
│   │   │   ├── dashboards.ts
│   │   │   └── reports.ts
│   │   └── middleware/
│   │       └── validation.ts
│   ├── database/
│   │   ├── index.ts
│   │   └── schemas.tsFILE TREE.md
│   └── utils/
│       ├── validation.ts
│       ├── formatting.ts
│       └── security.ts
├── docs/
│   ├── kpis.md
│   ├── reporting-model.md
│   ├── api-reference.md
│   └── deployment.md
├── sample-data/
│   ├── grants.json
│   ├── reports.json
│   └── README.md
├── tests/
│   ├── metrics.test.ts
│   ├── dashboards.test.ts
│   └── reports.test.ts
└── config/
    ├── default.json
    └── production.json
