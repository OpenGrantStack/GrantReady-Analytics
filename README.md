# GrantReady Analytics

Mobile-friendly analytics dashboards for grant progress, compliance, and outcomes tracking.

## Overview

GrantReady Analytics provides government agencies, non-profits, and compliance-driven organizations with a comprehensive solution for monitoring grant performance, ensuring regulatory compliance, and measuring program outcomes. The system offers API-driven dashboards optimized for mobile and desktop access.

## Features

- **Real-time Grant Progress Tracking**: Monitor grant milestones, expenditures, and deliverables
- **Compliance Monitoring**: Automated compliance checks against grant requirements
- **Outcomes Measurement**: Track program outcomes and impact metrics
- **Mobile-Optimized Dashboards**: Responsive design for field staff and stakeholders
- **API-First Architecture**: Extensible RESTful API for integration with existing systems
- **Audit-Ready Reporting**: Comprehensive reporting with full audit trails

## Technology Stack

- **Language**: TypeScript 5.x
- **Runtime**: Node.js 18+
- **Database**: PostgreSQL 14+ (with JSONB support)
- **API Framework**: Express.js
- **Authentication**: JWT with role-based access control
- **Testing**: Jest with Supertest
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/grantready-analytics.git
cd grantready-analytics

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

Project Structure

```
grantready-analytics/
├── src/                    # Source code
│   ├── metrics/           # Metrics calculation and aggregation
│   ├── dashboards/        # Dashboard components and logic
│   ├── reports/           # Report generation and templates
│   ├── models/            # Data models and interfaces
│   ├── api/               # API routes and middleware
│   └── utils/             # Utility functions
├── docs/                  # Documentation
├── sample-data/           # Example data for testing
└── tests/                 # Test suites
```

API Documentation

The API follows RESTful principles and returns JSON responses. All endpoints require authentication unless otherwise noted.

Base URL

https://api.your-domain.com/v1

Key Endpoints

· GET /api/v1/metrics/grants/:id - Get metrics for a specific grant
· GET /api/v1/dashboards/progress/:grantId - Get progress dashboard data
· POST /api/v1/reports/generate - Generate a new report
· GET /api/v1/compliance/status/:grantId - Check compliance status

For complete API documentation, see docs/api-reference.md.

Data Models

Grant

Represents a grant with associated metadata, requirements, and timelines.

Report

Contains generated reports with versioning and audit information.

KPI

Key Performance Indicators for measuring grant success and compliance.

Security & Compliance

· Data Encryption: All sensitive data encrypted at rest and in transit
· Access Controls: Role-based access control (RBAC) with granular permissions
· Audit Logging: Comprehensive logging of all data access and modifications
· GDPR Ready: Built-in data privacy controls and consent management
· SOC 2 Alignment: Security controls aligned with SOC 2 requirements

Development

Setting Up Development Environment

```bash
# Install dependencies
npm install

# Set up pre-commit hooks
npm run prepare

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

Code Style

This project uses ESLint and Prettier for code consistency. Configuration files are included in the repository.

```bash
# Format code
npm run format

# Lint code
npm run lint
```

Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open a Pull Request

Please read CONTRIBUTING.md for detailed contribution guidelines.

License

Licensed under the Apache License 2.0. See LICENSE for full text.

Support

· Documentation: docs/
· Issues: GitHub Issues
· Security Concerns: security@your-org.com

Acknowledgments

This project was developed with support from the open-source community and is maintained by a team of dedicated developers focused on improving grant management and transparency.
