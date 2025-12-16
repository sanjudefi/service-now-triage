import { Incident, KnowledgeArticle, Analytics, CategoryData, PriorityData, TeamData } from '../types';
import { Category, Priority, Status, Environment, UserRole, Impact, Urgency } from '../types';

// Mock Incidents Data
export const mockIncidents: Incident[] = [
  {
    id: 1,
    short_description: "Cannot access email system",
    detailed_description: "My password is not working and my account appears to be locked. I've tried resetting it multiple times but still cannot login to Outlook.",
    category: "ACCESS",
    affected_users: 1,
    environment: Environment.PRODUCTION,
    user_role: UserRole.EMPLOYEE,
    classified_category: Category.ACCESS,
    impact: Impact.LOW,
    urgency: Urgency.MEDIUM,
    priority: Priority.P3,
    assigned_team: "IAM Team",
    status: Status.AUTO_RESOLVED,
    auto_resolvable: true,
    suggested_article_id: 1,
    resolution_steps: [
      "Navigate to account portal",
      "Click 'Forgot Password'",
      "Verify identity via email/SMS",
      "Set new password"
    ],
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    short_description: "VPN connection keeps timing out",
    detailed_description: "Unable to connect to corporate VPN. The connection times out after a few seconds. This is blocking my ability to access internal resources from home.",
    category: "NETWORK",
    affected_users: 15,
    environment: Environment.PRODUCTION,
    user_role: UserRole.MANAGER,
    classified_category: Category.NETWORK,
    impact: Impact.MEDIUM,
    urgency: Urgency.HIGH,
    priority: Priority.P2,
    assigned_team: "Network Team",
    status: Status.IN_PROGRESS,
    auto_resolvable: false,
    suggested_article_id: 2,
    resolution_steps: [
      "Check internet connection",
      "Restart VPN client",
      "Clear VPN cache",
      "Verify credentials",
      "Contact network team if issue persists"
    ],
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    short_description: "Payroll application crashed during processing",
    detailed_description: "The payroll application crashed while processing end-of-month payroll. Error message: 'Runtime Error 500'. This is affecting 200+ employees. URGENT!",
    category: "APPLICATION",
    affected_users: 200,
    environment: Environment.PRODUCTION,
    user_role: UserRole.FINANCE,
    classified_category: Category.APPLICATION,
    impact: Impact.HIGH,
    urgency: Urgency.HIGH,
    priority: Priority.P1,
    assigned_team: "App Support",
    status: Status.IN_PROGRESS,
    auto_resolvable: false,
    resolution_steps: [
      "Close the application completely",
      "Clear application cache",
      "Restart the application",
      "Check for updates",
      "Reinstall if problem continues"
    ],
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    short_description: "Database connection timeout on reporting server",
    detailed_description: "Getting timeout errors when trying to run monthly reports. Error: 'Connection timeout after 30 seconds'. Database queries are not completing.",
    category: "DATABASE",
    affected_users: 8,
    environment: Environment.PRODUCTION,
    user_role: UserRole.OPS,
    classified_category: Category.DATABASE,
    impact: Impact.MEDIUM,
    urgency: Urgency.HIGH,
    priority: Priority.P2,
    assigned_team: "Database Team",
    status: Status.NEW,
    auto_resolvable: false,
    suggested_article_id: 4,
    resolution_steps: [
      "Check database server status",
      "Verify connection string",
      "Review query performance",
      "Increase timeout settings",
      "Contact DBA team"
    ],
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    short_description: "Suspicious phishing email received",
    detailed_description: "Received an email claiming to be from IT asking me to verify my credentials. The link looks suspicious. Subject: 'Urgent: Account Verification Required'",
    category: "SECURITY",
    affected_users: 1,
    environment: Environment.PRODUCTION,
    user_role: UserRole.EMPLOYEE,
    classified_category: Category.SECURITY,
    impact: Impact.HIGH,
    urgency: Urgency.HIGH,
    priority: Priority.P1,
    assigned_team: "SecOps",
    status: Status.AUTO_RESOLVED,
    auto_resolvable: true,
    suggested_article_id: 5,
    resolution_steps: [
      "Do NOT click any links",
      "Do NOT download attachments",
      "Forward to security@company.com",
      "Delete the email",
      "Change password if clicked"
    ],
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    short_description: "Need access to SharePoint Finance folder",
    detailed_description: "I need read access to the 'Finance Q4 Reports' folder on SharePoint. My manager approved this request verbally.",
    category: "ACCESS",
    affected_users: 1,
    environment: Environment.PRODUCTION,
    user_role: UserRole.EMPLOYEE,
    classified_category: Category.ACCESS,
    impact: Impact.LOW,
    urgency: Urgency.LOW,
    priority: Priority.P4,
    assigned_team: "IAM Team",
    status: Status.NEW,
    auto_resolvable: false,
    suggested_article_id: 6,
    resolution_steps: [
      "Identify required access level",
      "Submit access request form",
      "Get manager approval",
      "Wait for IAM team processing"
    ],
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 7,
    short_description: "Network performance extremely slow",
    detailed_description: "Internet speed has been very slow for the past hour. Speed test shows 2 Mbps instead of usual 100 Mbps. Affecting productivity.",
    category: "NETWORK",
    affected_users: 25,
    environment: Environment.PRODUCTION,
    user_role: UserRole.MANAGER,
    classified_category: Category.NETWORK,
    impact: Impact.MEDIUM,
    urgency: Urgency.MEDIUM,
    priority: Priority.P3,
    assigned_team: "Network Team",
    status: Status.RESOLVED,
    auto_resolvable: false,
    resolution_steps: [
      "Run speed test",
      "Check for bandwidth-heavy applications",
      "Restart router/modem",
      "Contact network team with test results"
    ],
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 8,
    short_description: "Microsoft Teams keeps crashing",
    detailed_description: "Teams crashes every time I try to join a video call. Error message: 'Teams has stopped working'. Already tried restarting.",
    category: "APPLICATION",
    affected_users: 3,
    environment: Environment.PRODUCTION,
    user_role: UserRole.EMPLOYEE,
    classified_category: Category.APPLICATION,
    impact: Impact.MEDIUM,
    urgency: Urgency.MEDIUM,
    priority: Priority.P3,
    assigned_team: "App Support",
    status: Status.AUTO_RESOLVED,
    auto_resolvable: true,
    suggested_article_id: 3,
    resolution_steps: [
      "Close the application completely",
      "Clear application cache",
      "Restart the application",
      "Check for updates",
      "Reinstall if problem continues"
    ],
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 9,
    short_description: "Cannot install Adobe Acrobat Pro",
    detailed_description: "Need Adobe Acrobat Pro installed for document signing. Getting error: 'You do not have permission to install software'.",
    category: "APPLICATION",
    affected_users: 1,
    environment: Environment.PRODUCTION,
    user_role: UserRole.MANAGER,
    classified_category: Category.APPLICATION,
    impact: Impact.LOW,
    urgency: Urgency.MEDIUM,
    priority: Priority.P3,
    assigned_team: "App Support",
    status: Status.IN_PROGRESS,
    auto_resolvable: false,
    suggested_article_id: 8,
    resolution_steps: [
      "Verify software is approved",
      "Submit IT request ticket",
      "Provide business justification",
      "Wait for approval and installation"
    ],
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 10,
    short_description: "Production database server unresponsive",
    detailed_description: "The main production database server is not responding. Multiple applications are affected. Operations team needs immediate assistance.",
    category: "DATABASE",
    affected_users: 150,
    environment: Environment.PRODUCTION,
    user_role: UserRole.OPS,
    classified_category: Category.DATABASE,
    impact: Impact.HIGH,
    urgency: Urgency.HIGH,
    priority: Priority.P1,
    assigned_team: "Database Team",
    status: Status.IN_PROGRESS,
    auto_resolvable: false,
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 11,
    short_description: "Laptop stolen from vehicle - security breach",
    detailed_description: "Company laptop was stolen from my car last night. Contains sensitive customer data. Device was password protected but not encrypted.",
    category: "SECURITY",
    affected_users: 1,
    environment: Environment.PRODUCTION,
    user_role: UserRole.EMPLOYEE,
    classified_category: Category.SECURITY,
    impact: Impact.HIGH,
    urgency: Urgency.HIGH,
    priority: Priority.P1,
    assigned_team: "SecOps",
    status: Status.IN_PROGRESS,
    auto_resolvable: false,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 12,
    short_description: "Printer not working on 3rd floor",
    detailed_description: "The main printer on the 3rd floor is showing error 'Paper Jam' but there is no paper jam visible. Multiple people affected.",
    category: "APPLICATION",
    affected_users: 20,
    environment: Environment.NON_PRODUCTION,
    user_role: UserRole.EMPLOYEE,
    classified_category: Category.APPLICATION,
    impact: Impact.LOW,
    urgency: Urgency.LOW,
    priority: Priority.P4,
    assigned_team: "App Support",
    status: Status.NEW,
    auto_resolvable: false,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  }
];

// Mock Knowledge Articles
export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: 1,
    title: "Password Reset Procedure",
    category: Category.ACCESS,
    keywords: ["password", "reset", "locked", "login"],
    description: "Standard password reset procedure for locked accounts",
    resolution_steps: [
      "Navigate to account portal",
      "Click 'Forgot Password'",
      "Verify identity via email/SMS",
      "Set new password"
    ],
    confidence: 0.92,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "VPN Connection Issues",
    category: Category.NETWORK,
    keywords: ["vpn", "connection", "timeout", "network"],
    description: "Troubleshooting VPN connectivity problems",
    resolution_steps: [
      "Check internet connection",
      "Restart VPN client",
      "Clear VPN cache",
      "Verify credentials",
      "Contact network team if issue persists"
    ],
    confidence: 0.88,
    created_at: new Date().toISOString()
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalIncidents: 12,
  autoResolvedPercentage: 33.3,
  avgResolutionTimeHours: 4.2,
  p1Count: 4
};

export const mockCategoryData: CategoryData[] = [
  { category: "ACCESS", count: 2 },
  { category: "NETWORK", count: 2 },
  { category: "APPLICATION", count: 4 },
  { category: "DATABASE", count: 2 },
  { category: "SECURITY", count: 2 }
];

export const mockPriorityData: PriorityData[] = [
  { priority: "P1", count: 4 },
  { priority: "P2", count: 2 },
  { priority: "P3", count: 4 },
  { priority: "P4", count: 2 }
];

export const mockTeamData: TeamData[] = [
  { team: "IAM Team", count: 2 },
  { team: "Network Team", count: 2 },
  { team: "App Support", count: 4 },
  { team: "Database Team", count: 2 },
  { team: "SecOps", count: 2 }
];
