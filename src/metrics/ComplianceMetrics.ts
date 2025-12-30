import { BaseMetric } from './BaseMetric';
import { Grant, ComplianceRequirement } from '../models/Grant';

export interface ComplianceStatus {
  requirementId: string;
  requirementName: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'not-applicable';
  evidence: string[];
  lastChecked: Date;
  dueDate?: Date;
  severity: 'high' | 'medium' | 'low';
}

export interface ComplianceSummary {
  grantId: string;
  totalRequirements: number;
  compliantRequirements: number;
  nonCompliantRequirements: number;
  pendingRequirements: number;
  complianceRate: number;
  highPriorityIssues: number;
  mediumPriorityIssues: number;
  lowPriorityIssues: number;
  status: 'compliant' | 'at-risk' | 'non-compliant';
  lastAssessment: Date;
  requirements: ComplianceStatus[];
}

export class ComplianceMetrics extends BaseMetric {
  async assessCompliance(
    grant: Grant,
    requirements: ComplianceRequirement[]
  ): Promise<ComplianceSummary> {
    const now = new Date();
    const complianceStatuses: ComplianceStatus[] = [];
    
    let compliantCount = 0;
    let nonCompliantCount = 0;
    let pendingCount = 0;
    let highPriority = 0;
    let mediumPriority = 0;
    let lowPriority = 0;
    
    for (const requirement of requirements) {
      const status = this.evaluateRequirement(requirement, grant);
      complianceStatuses.push(status);
      
      switch (status.status) {
        case 'compliant':
          compliantCount++;
          break;
        case 'non-compliant':
          nonCompliantCount++;
          if (status.severity === 'high') highPriority++;
          if (status.severity === 'medium') mediumPriority++;
          if (status.severity === 'low') lowPriority++;
          break;
        case 'pending':
          pendingCount++;
          break;
      }
    }
    
    const totalRequirements = requirements.length;
    const complianceRate = totalRequirements > 0 ? compliantCount / totalRequirements : 1;
    
    // Determine overall status
    let overallStatus: 'compliant' | 'at-risk' | 'non-compliant' = 'compliant';
    if (nonCompliantCount > 0) {
      overallStatus = highPriority > 0 ? 'non-compliant' : 'at-risk';
    } else if (pendingCount > totalRequirements * 0.3) {
      overallStatus = 'at-risk';
    }
    
    return {
      grantId: grant.id,
      totalRequirements,
      compliantRequirements: compliantCount,
      nonCompliantRequirements: nonCompliantCount,
      pendingRequirements: pendingCount,
      complianceRate,
      highPriorityIssues: highPriority,
      mediumPriorityIssues: mediumPriority,
      lowPriorityIssues: lowPriority,
      status: overallStatus,
      lastAssessment: now,
      requirements: complianceStatuses,
    };
  }
  
  private evaluateRequirement(
    requirement: ComplianceRequirement,
    grant: Grant
  ): ComplianceStatus {
    const now = new Date();
    let status: 'compliant' | 'non-compliant' | 'pending' | 'not-applicable' = 'pending';
    const evidence: string[] = [];
    
    // Check if requirement is applicable
    if (requirement.applicableFrom && new Date(requirement.applicableFrom) > now) {
      return {
        requirementId: requirement.id,
        requirementName: requirement.name,
        description: requirement.description,
        status: 'not-applicable',
        evidence: [],
        lastChecked: now,
        dueDate: requirement.dueDate,
        severity: requirement.severity,
      };
    }
    
    // Evaluate based on requirement type
    switch (requirement.type) {
      case 'documentation':
        status = this.checkDocumentation(requirement, grant, evidence);
        break;
      case 'financial':
        status = this.checkFinancial(requirement, grant, evidence);
        break;
      case 'reporting':
        status = this.checkReporting(requirement, grant, evidence);
        break;
      case 'performance':
        status = this.checkPerformance(requirement, grant, evidence);
        break;
      default:
        status = 'pending';
    }
    
    return {
      requirementId: requirement.id,
      requirementName: requirement.name,
      description: requirement.description,
      status,
      evidence,
      lastChecked: now,
      dueDate: requirement.dueDate,
      severity: requirement.severity,
    };
  }
  
  private checkDocumentation(
    requirement: ComplianceRequirement,
    grant: Grant,
    evidence: string[]
  ): 'compliant' | 'non-compliant' | 'pending' {
    // Check if required documents are submitted
    const requiredDocs = requirement.parameters?.requiredDocuments || [];
    const submittedDocs = grant.documents || [];
    
    for (const doc of requiredDocs) {
      const found = submittedDocs.find(d => d.type === doc && d.status === 'approved');
      if (found) {
        evidence.push(`Document "${doc}" submitted and approved`);
      } else {
        evidence.push(`Missing or unapproved document: ${doc}`);
        return 'non-compliant';
      }
    }
    
    return 'compliant';
  }
  
  private checkFinancial(
    requirement: ComplianceRequirement,
    grant: Grant,
    evidence: string[]
  ): 'compliant' | 'non-compliant' | 'pending' {
    // Check financial compliance rules
    const maxUtilization = requirement.parameters?.maxUtilizationRate || 1.0;
    const actualUtilization = grant.expenditures.reduce((sum, exp) => sum + exp.amount, 0) / grant.totalFunding;
    
    if (actualUtilization > maxUtilization) {
      evidence.push(`Utilization rate (${actualUtilization.toFixed(2)}) exceeds maximum (${maxUtilization})`);
      return 'non-compliant';
    }
    
    evidence.push(`Utilization rate (${actualUtilization.toFixed(2)}) within acceptable range`);
    return 'compliant';
  }
  
  private checkReporting(
    requirement: ComplianceRequirement,
    grant: Grant,
    evidence: string[]
  ): 'compliant' | 'non-compliant' | 'pending' {
    // Check reporting deadlines
    const now = new Date();
    const dueDate = requirement.dueDate ? new Date(requirement.dueDate) : null;
    
    if (dueDate && dueDate < now) {
      const reports = grant.reports || [];
      const requiredReport = reports.find(r => 
        r.type === requirement.parameters?.reportType && 
        r.submissionDate <= dueDate
      );
      
      if (!requiredReport) {
        evidence.push(`Missing required report: ${requirement.parameters?.reportType}`);
        return 'non-compliant';
      }
      
      evidence.push(`Report "${requiredReport.type}" submitted on ${requiredReport.submissionDate}`);
    }
    
    return 'compliant';
  }
  
  private checkPerformance(
    requirement: ComplianceRequirement,
    grant: Grant,
    evidence: string[]
  ): 'compliant' | 'non-compliant' | 'pending' {
    // Check performance KPIs
    const minAchievement = requirement.parameters?.minAchievementRate || 0.8;
    
    for (const kpi of grant.kpis) {
      if (kpi.targetValue !== 0) {
        const achievement = kpi.currentValue / kpi.targetValue;
        if (achievement < minAchievement) {
          evidence.push(`KPI "${kpi.name}" achievement (${achievement.toFixed(2)}) below minimum (${minAchievement})`);
          return 'non-compliant';
        }
        evidence.push(`KPI "${kpi.name}" achievement: ${achievement.toFixed(2)}`);
      }
    }
    
    return 'compliant';
  }
  
  async generateComplianceReport(grantId: string): Promise<{
    summary: ComplianceSummary;
    correctiveActions: string[];
    timeline: { action: string; deadline: Date; responsibleParty: string }[];
  }> {
    // This would fetch actual data from database
    return {
      summary: {} as ComplianceSummary,
      correctiveActions: [
        'Submit missing quarterly financial report',
        'Provide documentation for expenditure #2023-045',
        'Update risk management plan with mitigation strategies',
      ],
      timeline: [
        {
          action: 'Submit corrective action plan',
          deadline: new Date('2024-03-15'),
          responsibleParty: 'Program Manager',
        },
        {
          action: 'Schedule compliance review meeting',
          deadline: new Date('2024-03-22'),
          responsibleParty: 'Compliance Officer',
        },
      ],
    };
  }
      }
