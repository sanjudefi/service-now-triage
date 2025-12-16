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

export const TEAM_MAPPING: Record<Category, string> = {
  [Category.ACCESS]: 'IAM Team',
  [Category.NETWORK]: 'Network Team',
  [Category.APPLICATION]: 'App Support',
  [Category.DATABASE]: 'Database Team',
  [Category.SECURITY]: 'SecOps'
};

export const CLASSIFICATION_KEYWORDS: Record<Category, string[]> = {
  [Category.ACCESS]: ['password', 'login', 'locked', 'access denied', 'permission', 'unlock', 'account', 'authenticate', 'credentials'],
  [Category.NETWORK]: ['network', 'vpn', 'connection', 'wifi', 'internet', 'connectivity', 'router', 'bandwidth', 'timeout'],
  [Category.APPLICATION]: ['app', 'software', 'crash', 'error', 'freeze', 'slow', 'application', 'program', 'install'],
  [Category.DATABASE]: ['database', 'db', 'query', 'data', 'sql', 'table', 'connection string', 'timeout'],
  [Category.SECURITY]: ['security', 'virus', 'malware', 'breach', 'phishing', 'hack', 'suspicious', 'threat']
};
