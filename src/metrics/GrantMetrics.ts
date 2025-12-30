import { BaseMetric } from './BaseMetric';
import { Grant, GrantStatus, Milestone } from '../models/Grant';
import { KPI } from '../models/KPI';

export interface GrantProgressMetrics {
  grantId: string;
  totalFunding: number;
  fundsUtilized: number;
  utilizationRate: number;
  milestonesCompleted: number;
  totalMilestones: number;
  milestoneCompletionRate: number;
  daysElapsed: number;
  totalDays: number;
  timelineProgress: number;
  status: GrantStatus;
  riskLevel: 'low' | 'medium' | 'high';
  kpiAchievement: Record<string, number>;
  lastUpdated: Date;
}

export class GrantMetrics extends BaseMetric {
  async calculateProgress(grant: Grant): Promise<GrantProgressMetrics> {
    const now = new Date();
    const startDate = new Date(grant.startDate);
    const endDate = new Date(grant.endDate);
    
    // Calculate timeline progress
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const timelineProgress = Math.min(Math.max(daysElapsed / totalDays, 0), 1);
    
    // Calculate financial metrics
    const totalFunding = grant.totalFunding;
    const fundsUtilized = grant.expenditures.reduce((sum, exp) => sum + exp.amount, 0);
    const utilizationRate = totalFunding > 0 ? fundsUtilized / totalFunding : 0;
    
    // Calculate milestone completion
    const totalMilestones = grant.milestones.length;
    const milestonesCompleted = grant.milestones.filter(m => m.status === 'completed').length;
    const milestoneCompletionRate = totalMilestones > 0 ? milestonesCompleted / totalMilestones : 0;
    
    // Calculate risk level
    const riskLevel = this.calculateRiskLevel(
      timelineProgress,
      utilizationRate,
      milestoneCompletionRate
    );
    
    // Calculate KPI achievement
    const kpiAchievement = this.calculateKPIAchievement(grant.kpis);
    
    return {
      grantId: grant.id,
      totalFunding,
      fundsUtilized,
      utilizationRate,
      milestonesCompleted,
      totalMilestones,
      milestoneCompletionRate,
      daysElapsed,
      totalDays,
      timelineProgress,
      status: grant.status,
      riskLevel,
      kpiAchievement,
      lastUpdated: now,
    };
  }
  
  private calculateRiskLevel(
    timelineProgress: number,
    utilizationRate: number,
    milestoneCompletionRate: number
  ): 'low' | 'medium' | 'high' {
    // Risk calculation based on progress alignment
    const timelineVsMilestoneDiff = Math.abs(timelineProgress - milestoneCompletionRate);
    const timelineVsFinancialDiff = Math.abs(timelineProgress - utilizationRate);
    
    const riskScore = (timelineVsMilestoneDiff + timelineVsFinancialDiff) / 2;
    
    if (riskScore < 0.2) return 'low';
    if (riskScore < 0.4) return 'medium';
    return 'high';
  }
  
  private calculateKPIAchievement(kpis: KPI[]): Record<string, number> {
    const achievement: Record<string, number> = {};
    
    for (const kpi of kpis) {
      if (kpi.targetValue !== 0) {
        achievement[kpi.name] = kpi.currentValue / kpi.targetValue;
      } else {
        achievement[kpi.name] = kpi.currentValue;
      }
    }
    
    return achievement;
  }
  
  async generateProgressReport(grantId: string): Promise<{
    metrics: GrantProgressMetrics;
    recommendations: string[];
    nextSteps: string[];
  }> {
    // This would typically fetch grant data from database
    // For now, return a structured response
    return {
      metrics: {} as GrantProgressMetrics,
      recommendations: [
        'Review milestone completion against timeline',
        'Monitor expenditure rate relative to progress',
        'Schedule compliance check for next quarter',
      ],
      nextSteps: [
        'Submit Q3 progress report by deadline',
        'Schedule site visit with program officer',
        'Update risk mitigation plan',
      ],
    };
  }
  }
