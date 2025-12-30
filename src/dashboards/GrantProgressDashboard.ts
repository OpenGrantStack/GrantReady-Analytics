import { BaseDashboard } from './BaseDashboard';
import { GrantMetrics, GrantProgressMetrics } from '../metrics/GrantMetrics';
import { KPI } from '../models/KPI';

export interface DashboardWidget {
  id: string;
  type: 'progress' | 'metric' | 'chart' | 'table' | 'alert';
  title: string;
  data: any;
  size: 'small' | 'medium' | 'large' | 'full';
  priority: number;
  refreshInterval?: number;
}

export interface DashboardConfig {
  grantId: string;
  widgets: DashboardWidget[];
  layout: 'grid' | 'single' | 'mobile';
  lastUpdated: Date;
  autoRefresh: boolean;
}

export class GrantProgressDashboard extends BaseDashboard {
  private metricsCalculator: GrantMetrics;
  
  constructor() {
    super();
    this.metricsCalculator = new GrantMetrics();
  }
  
  async generateDashboard(grantId: string, userId: string): Promise<DashboardConfig> {
    // In a real implementation, this would fetch grant data
    // For now, generate sample dashboard widgets
    
    const widgets: DashboardWidget[] = [
      this.createProgressWidget(grantId),
      this.createFinancialWidget(grantId),
      this.createMilestoneWidget(grantId),
      this.createRiskWidget(grantId),
      this.createKPIWidget(grantId),
      this.createTimelineWidget(grantId),
      this.createAlertsWidget(grantId),
    ];
    
    // Sort widgets by priority
    widgets.sort((a, b) => a.priority - b.priority);
    
    return {
      grantId,
      widgets,
      layout: 'grid',
      lastUpdated: new Date(),
      autoRefresh: true,
    };
  }
  
  private createProgressWidget(grantId: string): DashboardWidget {
    return {
      id: `progress-${grantId}`,
      type: 'progress',
      title: 'Overall Grant Progress',
      data: {
        progress: 0.65,
        label: '65% Complete',
        subLabel: 'Ahead of schedule',
        trend: 'up',
        trendValue: 0.1,
      },
      size: 'medium',
      priority: 1,
      refreshInterval: 300000, // 5 minutes
    };
  }
  
  private createFinancialWidget(grantId: string): DashboardWidget {
    return {
      id: `financial-${grantId}`,
      type: 'metric',
      title: 'Financial Utilization',
      data: {
        total: 500000,
        utilized: 325000,
        remaining: 175000,
        rate: 0.65,
        burnRate: 12500, // per month
        forecastCompletion: new Date('2024-12-31'),
      },
      size: 'medium',
      priority: 2,
    };
  }
  
  private createMilestoneWidget(grantId: string): DashboardWidget {
    return {
      id: `milestones-${grantId}`,
      type: 'chart',
      title: 'Milestone Completion',
      data: {
        type: 'bar',
        datasets: [
          {
            label: 'Completed',
            data: [5, 3, 2, 4],
            backgroundColor: '#4CAF50',
          },
          {
            label: 'Pending',
            data: [2, 4, 3, 1],
            backgroundColor: '#FFC107',
          },
          {
            label: 'Delayed',
            data: [0, 1, 0, 0],
            backgroundColor: '#F44336',
          },
        ],
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
      },
      size: 'large',
      priority: 3,
    };
  }
  
  private createRiskWidget(grantId: string): DashboardWidget {
    return {
      id: `risk-${grantId}`,
      type: 'metric',
      title: 'Risk Assessment',
      data: {
        level: 'medium',
        score: 0.42,
        factors: [
          { name: 'Timeline Variance', value: 0.15, weight: 0.3 },
          { name: 'Budget Variance', value: 0.08, weight: 0.4 },
          { name: 'Compliance Issues', value: 0.02, weight: 0.2 },
          { name: 'KPI Achievement', value: 0.17, weight: 0.1 },
        ],
        recommendations: [
          'Accelerate milestone completion',
          'Review expenditure approvals',
        ],
      },
      size: 'small',
      priority: 4,
    };
  }
  
  private createKPIWidget(grantId: string): DashboardWidget {
    return {
      id: `kpis-${grantId}`,
      type: 'table',
      title: 'Key Performance Indicators',
      data: {
        columns: ['KPI', 'Target', 'Current', 'Achievement', 'Status'],
        rows: [
          ['Beneficiaries Served', 1000, 850, '85%', 'On Track'],
          ['Training Completed', 50, 42, '84%', 'On Track'],
          ['Jobs Created', 200, 175, '88%', 'On Track'],
          ['Community Impact Score', 4.5, 4.2, '93%', 'Exceeding'],
        ],
      },
      size: 'large',
      priority: 5,
    };
  }
  
  private createTimelineWidget(grantId: string): DashboardWidget {
    return {
      id: `timeline-${grantId}`,
      type: 'chart',
      title: 'Project Timeline',
      data: {
        type: 'gantt',
        tasks: [
          {
            id: 'phase1',
            name: 'Planning Phase',
            start: '2023-01-01',
            end: '2023-03-31',
            progress: 1,
            status: 'completed',
          },
          {
            id: 'phase2',
            name: 'Implementation',
            start: '2023-04-01',
            end: '2024-02-29',
            progress: 0.7,
            status: 'in-progress',
          },
          {
            id: 'phase3',
            name: 'Evaluation',
            start: '2024-03-01',
            end: '2024-06-30',
            progress: 0,
            status: 'pending',
          },
        ],
      },
      size: 'full',
      priority: 6,
    };
  }
  
  private createAlertsWidget(grantId: string): DashboardWidget {
    return {
      id: `alerts-${grantId}`,
      type: 'alert',
      title: 'Active Alerts',
      data: {
        alerts: [
          {
            id: 'alert1',
            type: 'warning',
            title: 'Quarterly Report Due',
            message: 'Q4 2023 report submission deadline in 7 days',
            date: new Date('2024-01-15'),
            priority: 'high',
            action: { label: 'Submit Report', url: '/reports/submit' },
          },
          {
            id: 'alert2',
            type: 'info',
            title: 'Site Visit Scheduled',
            message: 'Program officer site visit scheduled for Feb 15, 2024',
            date: new Date('2024-02-01'),
            priority: 'medium',
            action: { label: 'View Details', url: '/visits/2024-02-15' },
          },
          {
            id: 'alert3',
            type: 'success',
            title: 'Milestone Completed',
            message: 'Community center construction completed ahead of schedule',
            date: new Date('2024-01-10'),
            priority: 'low',
            action: { label: 'View Photos', url: '/milestones/cc-construction' },
          },
        ],
      },
      size: 'medium',
      priority: 7,
      refreshInterval: 60000, // 1 minute
    };
  }
  
  async exportDashboard(
    grantId: string,
    format: 'pdf' | 'excel' | 'json'
  ): Promise<Buffer | string> {
    const dashboard = await this.generateDashboard(grantId, 'system');
    
    switch (format) {
      case 'pdf':
        return this.exportToPDF(dashboard);
      case 'excel':
        return this.exportToExcel(dashboard);
      case 'json':
        return JSON.stringify(dashboard, null, 2);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
  
  private exportToPDF(dashboard: DashboardConfig): Buffer {
    // PDF generation logic would go here
    return Buffer.from('PDF export placeholder');
  }
  
  private exportToExcel(dashboard: DashboardConfig): Buffer {
    // Excel generation logic would go here
    return Buffer.from('Excel export placeholder');
  }
      }
