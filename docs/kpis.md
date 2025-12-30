# Key Performance Indicators (KPIs)

## Overview

This document defines the Key Performance Indicators (KPIs) used within the GrantReady Analytics system to measure grant performance, compliance, and outcomes. KPIs are organized by category and include calculation methods, targets, and reporting guidelines.

## KPI Categories

### 1. Financial KPIs

#### 1.1 Budget Utilization Rate
- **Description**: Percentage of total grant funds utilized against total awarded amount
- **Formula**: `(Total Expenditures / Total Awarded Amount) * 100`
- **Target**: 70-90% at project midpoint, 100% at completion
- **Reporting Frequency**: Monthly
- **Severity Thresholds**:
  - Green: 70-110%
  - Yellow: 50-69% or 111-130%
  - Red: <50% or >130%

#### 1.2 Cost Per Beneficiary
- **Description**: Average cost to serve one beneficiary
- **Formula**: `Total Expenditures / Number of Beneficiaries Served`
- **Target**: Varies by grant type (defined in grant agreement)
- **Reporting Frequency**: Quarterly
- **Data Sources**: Expenditure reports, beneficiary tracking

#### 1.3 Matching Funds Achievement
- **Description**: Percentage of required matching funds secured
- **Formula**: `(Actual Matching Funds / Required Matching Funds) * 100`
- **Target**: 100% by specified milestones
- **Reporting Frequency**: Semi-annual

### 2. Programmatic KPIs

#### 2.1 Beneficiary Reach
- **Description**: Number of unique beneficiaries served
- **Measurement**: Count of verified beneficiaries receiving services
- **Target**: As defined in grant proposal
- **Reporting Frequency**: Quarterly
- **Data Quality Requirements**: Unique identification, demographic verification

#### 2.2 Service Delivery Completion
- **Description**: Percentage of planned services delivered
- **Formula**: `(Services Delivered / Services Planned) * 100`
- **Target**: 100% by grant end date
- **Reporting Frequency**: Monthly
- **Verification**: Service delivery logs, participant sign-ins

#### 2.3 Quality Satisfaction Score
- **Description**: Average satisfaction rating from beneficiaries
- **Measurement**: 5-point Likert scale survey results
- **Target**: ≥4.0 average score
- **Reporting Frequency**: Quarterly
- **Sample Size**: Minimum 30% of beneficiaries or 100 participants

### 3. Compliance KPIs

#### 3.1 Reporting Timeliness
- **Description**: Percentage of reports submitted by deadline
- **Formula**: `(Reports Submitted On Time / Total Reports Due) * 100`
- **Target**: 100%
- **Reporting Frequency**: Quarterly
- **Grace Period**: 5 business days

#### 3.2 Document Compliance Rate
- **Description**: Percentage of required documents submitted and approved
- **Formula**: `(Approved Documents / Required Documents) * 100`
- **Target**: 100%
- **Reporting Frequency**: Monthly
- **Document Types**: Financial statements, progress reports, audit reports

#### 3.3 Regulatory Compliance Score
- **Description**: Composite score of regulatory requirements met
- **Calculation**: Weighted average of compliance check results
- **Target**: ≥95%
- **Reporting Frequency**: Quarterly
- **Components**: Federal regulations, state requirements, grant-specific terms

### 4. Outcome KPIs

#### 4.1 Program Impact Score
- **Description**: Measurable change in beneficiary outcomes
- **Measurement**: Pre- and post-program assessment comparison
- **Target**: Defined per program objectives
- **Reporting Frequency**: Annual
- **Assessment Tools**: Validated measurement instruments

#### 4.2 Sustainability Index
- **Description**: Likelihood of program continuation post-grant
- **Calculation**: Composite of funding diversification, community support, and capacity building
- **Target**: ≥0.7 (on 0-1 scale)
- **Reporting Frequency**: Annual
- **Factors**: Future funding secured, local partnerships, staff capacity

#### 4.3 Cost-Effectiveness Ratio
- **Description**: Outcomes achieved per dollar spent
- **Formula**: `(Total Outcomes Achieved / Total Expenditures)`
- **Target**: Program-specific benchmark
- **Reporting Frequency**: Annual
- **Outcome Units**: Standardized outcome measures

## KPI Calculation Framework

### Data Sources
Each KPI must specify:
1. Primary data source
2. Secondary verification source
3. Data collection method
4. Responsible party for data collection
5. Data quality controls

### Calculation Frequency
- **Real-time**: Updated continuously (e.g., budget utilization)
- **Daily**: Updated once per day
- **Weekly**: Updated weekly for management review
- **Monthly**: Formal calculation and reporting
- **Quarterly**: Comprehensive analysis and trend reporting
- **Annual**: Year-end assessment and benchmarking

### Validation Rules
1. **Data Integrity**: Source system validation, duplicate detection
2. **Calculation Verification**: Independent calculation verification
3. **Threshold Monitoring**: Automated alerting for threshold breaches
4. **Historical Comparison**: Trend analysis and anomaly detection
5. **Peer Benchmarking**: Comparison with similar grants/programs

## KPI Reporting Standards

### Dashboard Requirements
1. **Visual Hierarchy**: Most critical KPIs displayed prominently
2. **Trend Indicators**: Directional arrows showing improvement/decline
3. **Comparative Context**: Targets, previous periods, benchmarks
4. **Drill-down Capability**: Detailed view available with one click
5. **Mobile Optimization**: Readable on tablets and smartphones

### Report Formats
1. **Executive Summary**: One-page high-level KPI status
2. **Detailed Analysis**: Comprehensive KPI analysis with narratives
3. **Comparative Reports**: Benchmarking against similar grants
4. **Trend Analysis**: Historical performance tracking
5. **Predictive Reports**: Forecast based on current trends

### Data Governance
1. **Ownership**: Each KPI has a designated owner
2. **Stewardship**: Data stewards responsible for quality
3. **Access Control**: Role-based access to KPI data
4. **Audit Trail**: Complete history of KPI calculations
5. **Version Control**: KPI definition and formula versioning

## Implementation Guidelines

### KPI Definition Process
1. **Requirements Gathering**: Stakeholder interviews and needs assessment
2. **Feasibility Analysis**: Data availability and collection costs
3. **Prototype Development**: Sample calculations and visualizations
4. **Stakeholder Review**: Validation with grant managers and compliance officers
5. **Implementation**: Integration into systems and processes
6. **Training**: User training and documentation
7. **Continuous Improvement**: Regular review and refinement

### Quality Assurance
1. **Data Accuracy**: Regular data quality audits
2. **Calculation Verification**: Independent verification of formulas
3. **Timeliness**: Monitoring of data collection deadlines
4. **Completeness**: Verification of required data elements
5. **Consistency**: Standard application across all grants

### Performance Targets
1. **SMART Criteria**: Specific, Measurable, Achievable, Relevant, Time-bound
2. **Baseline Establishment**: Initial measurement before target setting
3. **Progressive Improvement**: Incremental target increases
4. **Contextual Adjustments**: Modifications based on external factors
5. **Stakeholder Agreement**: Consensus on targets and timelines

## Appendix A: KPI Definitions Template

```yaml
kpi:
  id: "unique-identifier"
  name: "Human-readable name"
  category: "financial|programmatic|compliance|outcome"
  description: "Clear description of what is measured"
  calculation:
    formula: "Mathematical formula"
    frequency: "daily|weekly|monthly|quarterly|annual"
    data_sources:
      - source: "System or process"
        field: "Specific data element"
        verification: "Method for verification"
  targets:
    primary: "Numerical target"
    threshold_green: "Minimum for green status"
    threshold_yellow: "Minimum for yellow status"
    threshold_red: "Minimum for red status"
  reporting:
    dashboard_position: "Coordinates or order"
    visualization: "chart|gauge|table|scorecard"
    drill_down: "Available detailed views"
  governance:
    owner: "Role or individual"
    steward: "Role or individual"
    review_frequency: "How often definition is reviewed"
  metadata:
    version: "1.0"
    effective_date: "YYYY-MM-DD"
    last_reviewed: "YYYY-MM-DD"
```

Appendix B: Common Grant KPIs by Sector

Education Grants

· Student enrollment and retention rates
· Academic achievement improvements
· Teacher training completion
· Facility utilization rates
· Parent engagement levels

Healthcare Grants

· Patient access improvements
· Health outcome measures
· Service delivery efficiency
· Preventive care rates
· Community health indicators

Community Development Grants

· Job creation numbers
· Business development metrics
· Infrastructure improvements
· Housing affordability
· Community satisfaction

Environmental Grants

· Emissions reduction
· Resource conservation
· Habitat restoration
· Community engagement
· Policy adoption

Revision History

Version Date Changes Author
1.0 2024-01-15 Initial KPI framework Analytics Team
1.1 2024-02-01 Added sector-specific KPIs Domain Experts
1.2 2024-02-15 Enhanced data governance section Compliance Team
