export enum Category {
  ACCESS = 'ACCESS',
  NETWORK = 'NETWORK',
  APPLICATION = 'APPLICATION',
  DATABASE = 'DATABASE',
  SECURITY = 'SECURITY'
}

export enum Impact {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum Urgency {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum Priority {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4'
}

export enum Status {
  NEW = 'New',
  IN_PROGRESS = 'In Progress',
  AUTO_RESOLVED = 'Auto-Resolved',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed'
}

export enum Environment {
  PRODUCTION = 'Production',
  NON_PRODUCTION = 'Non-Production'
}

export enum UserRole {
  EMPLOYEE = 'Employee',
  MANAGER = 'Manager',
  FINANCE = 'Finance',
  OPS = 'Ops'
}

export interface Incident {
  id?: number;
  short_description: string;
  detailed_description: string;
  category?: string;
  affected_users: number;
  environment: Environment;
  user_role: UserRole;

  classified_category?: Category;
  impact?: Impact;
  urgency?: Urgency;
  priority?: Priority;
  assigned_team?: string;

  status?: Status;
  auto_resolvable?: boolean;
  suggested_article_id?: number;
  resolution_steps?: string[];

  created_at?: string;
  updated_at?: string;
}

export interface KnowledgeArticle {
  id?: number;
  title: string;
  category: Category;
  keywords: string[];
  description?: string;
  resolution_steps: string[];
  confidence: number;
  created_at?: string;
}

export interface Analytics {
  totalIncidents: number;
  autoResolvedPercentage: number;
  avgResolutionTimeHours: number;
  p1Count: number;
}

export interface CategoryData {
  category: string;
  count: number;
}

export interface PriorityData {
  priority: string;
  count: number;
}

export interface TeamData {
  team: string;
  count: number;
}
