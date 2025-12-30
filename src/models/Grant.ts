export type GrantStatus = 
  | 'draft'
  | 'submitted'
  | 'under-review'
  | 'approved'
  | 'active'
  | 'suspended'
  | 'completed'
  | 'terminated'
  | 'closed';

export type GrantType = 
  | 'federal'
  | 'state'
  | 'local'
  | 'foundation'
  | 'corporate'
  | 'international';

export interface Organization {
  id: string;
  name: string;
  type: 'non-profit' | 'government' | 'academic' | 'private';
  taxId?: string;
  address: Address;
  contact: Contact;
  registrationDate: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  completionDate?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  deliverables: string[];
  dependencies?: string[]; // IDs of dependent milestones
}

export interface Expenditure {
  id: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
  receiptUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedDate?: Date;
}

export interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  uploadDate: Date;
  uploadedBy: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  reviewNotes?: string;
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  type: 'documentation' | 'financial' | 'reporting' | 'performance';
  severity: 'high' | 'medium' | 'low';
  applicableFrom?: Date;
  dueDate?: Date;
  parameters?: Record<string, any>;
}

export interface ReportSubmission {
  id: string;
  type: string;
  period: string;
  submissionDate: Date;
  submittedBy: string;
  status: 'draft' | 'submitted' | 'reviewed';
  url?: string;
  notes?: string;
}

export class Grant {
  id: string;
  grantNumber: string;
  title: string;
  description: string;
  type: GrantType;
  status: GrantStatus;
  
  // Funding information
  totalFunding: number;
  awardedAmount: number;
  matchingRequirement?: number;
  fundingSource: string;
  grantManager: string;
  
  // Timeline
  applicationDate: Date;
  awardDate: Date;
  startDate: Date;
  endDate: Date;
  reportingFrequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  
  // Organization
  recipient: Organization;
  grantor: Organization;
  
  // Project details
  objectives: string[];
  targetBeneficiaries: string;
  geographicScope: string;
  
  // Progress tracking
  milestones: Milestone[];
  expenditures: Expenditure[];
  kpis: KPI[];
  documents: Document[];
  reports: ReportSubmission[];
  complianceRequirements: ComplianceRequirement[];
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  version: number;
  tags: string[];
  
  // Audit trail
  history: {
    date: Date;
    action: string;
    user: string;
    changes: Record<string, any>;
  }[];
  
  constructor(data: Partial<Grant> = {}) {
    this.id = data.id || '';
    this.grantNumber = data.grantNumber || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.type = data.type || 'federal';
    this.status = data.status || 'draft';
    
    this.totalFunding = data.totalFunding || 0;
    this.awardedAmount = data.awardedAmount || 0;
    this.matchingRequirement = data.matchingRequirement;
    this.fundingSource = data.fundingSource || '';
    this.grantManager = data.grantManager || '';
    
    this.applicationDate = data.applicationDate || new Date();
    this.awardDate = data.awardDate || new Date();
    this.startDate = data.startDate || new Date();
    this.endDate = data.endDate || new Date();
    this.reportingFrequency = data.reportingFrequency || 'quarterly';
    
    this.recipient = data.recipient || {} as Organization;
    this.grantor = data.grantor || {} as Organization;
    
    this.objectives = data.objectives || [];
    this.targetBeneficiaries = data.targetBeneficiaries || '';
    this.geographicScope = data.geographicScope || '';
    
    this.milestones = data.milestones || [];
    this.expenditures = data.expenditures || [];
    this.kpis = data.kpis || [];
    this.documents = data.documents || [];
    this.reports = data.reports || [];
    this.complianceRequirements = data.complianceRequirements || [];
    
    this.createdBy = data.createdBy || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedBy = data.updatedBy || '';
    this.updatedAt = data.updatedAt || new Date();
    this.version = data.version || 1;
    this.tags = data.tags || [];
    
    this.history = data.history || [];
  }
  
  addMilestone(milestone: Milestone): void {
    this.milestones.push(milestone);
    this.updatedAt = new Date();
    this.version++;
  }
  
  addExpenditure(expenditure: Expenditure): void {
    this.expenditures.push(expenditure);
    this.updatedAt = new Date();
    this.version++;
  }
  
  updateStatus(newStatus: GrantStatus, user: string): void {
    const oldStatus = this.status;
    this.status = newStatus;
    this.updatedBy = user;
    this.updatedAt = new Date();
    this.version++;
    
    this.history.push({
      date: new Date(),
      action: 'STATUS_CHANGE',
      user,
      changes: { status: { from: oldStatus, to: newStatus } },
    });
  }
  
  getProgress(): number {
    if (this.milestones.length === 0) return 0;
    const completed = this.milestones.filter(m => m.status === 'completed').length;
    return completed / this.milestones.length;
  }
  
  getFinancialUtilization(): number {
    if (this.totalFunding === 0) return 0;
    const spent = this.expenditures
      .filter(e => e.status === 'approved')
      .reduce((sum, exp) => sum + exp.amount, 0);
    return spent / this.totalFunding;
  }
  
  getDaysRemaining(): number {
    const now = new Date();
    const end = new Date(this.endDate);
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  
  isAtRisk(): boolean {
    const progress = this.getProgress();
    const utilization = this.getFinancialUtilization();
    const daysRemaining = this.getDaysRemaining();
    const totalDays = Math.ceil(
      (new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    const timelineProgress = 1 - (daysRemaining / totalDays);
    
    // Risk if progress lags significantly behind timeline or financial utilization
    return Math.abs(progress - timelineProgress) > 0.3 || 
           Math.abs(utilization - timelineProgress) > 0.3;
  }
      }
