import { Impact, Urgency, Priority, Category, Environment, UserRole } from '../config/constants';
import { Incident } from '../models';

/**
 * Calculates incident priority using a multi-factor matrix
 * Factors: affected users, environment, user role, category
 */
export class PriorityService {
  static calculate(incident: Incident): { impact: Impact; urgency: Urgency; priority: Priority } {
    const impact = this.calculateImpact(incident);
    const urgency = this.calculateUrgency(incident);
    const priority = this.calculatePriority(impact, urgency);

    return { impact, urgency, priority };
  }

  private static calculateImpact(incident: Incident): Impact {
    let impactScore = 0;

    // Factor 1: Number of affected users
    if (incident.affected_users > 50) {
      impactScore += 3; // High impact
    } else if (incident.affected_users > 10) {
      impactScore += 2; // Medium impact
    } else {
      impactScore += 1; // Low impact
    }

    // Factor 2: Environment
    if (incident.environment === Environment.PRODUCTION) {
      impactScore += 1; // Production issues have higher impact
    }

    // Factor 3: Category severity
    if (incident.classified_category === Category.SECURITY ||
        incident.classified_category === Category.DATABASE) {
      impactScore += 1; // Critical categories
    }

    // Map score to impact level
    if (impactScore >= 4) return Impact.HIGH;
    if (impactScore >= 2) return Impact.MEDIUM;
    return Impact.LOW;
  }

  private static calculateUrgency(incident: Incident): Urgency {
    let urgencyScore = 0;

    // Factor 1: User role (business criticality)
    switch (incident.user_role) {
      case UserRole.FINANCE:
      case UserRole.OPS:
        urgencyScore += 3; // Critical business functions
        break;
      case UserRole.MANAGER:
        urgencyScore += 2; // Management priority
        break;
      case UserRole.EMPLOYEE:
        urgencyScore += 1; // Standard priority
        break;
    }

    // Factor 2: Category urgency
    if (incident.classified_category === Category.SECURITY) {
      urgencyScore += 2; // Security incidents need immediate attention
    }

    if (incident.classified_category === Category.ACCESS) {
      urgencyScore += 1; // Access issues block work
    }

    // Map score to urgency level
    if (urgencyScore >= 4) return Urgency.HIGH;
    if (urgencyScore >= 2) return Urgency.MEDIUM;
    return Urgency.LOW;
  }

  /**
   * Priority matrix based on impact and urgency
   *
   *             URGENCY
   *           L    M    H
   *       L | P4   P4   P3
   * IMPACT M | P4   P3   P2
   *       H | P3   P2   P1
   */
  private static calculatePriority(impact: Impact, urgency: Urgency): Priority {
    const impactValue = this.getImpactValue(impact);
    const urgencyValue = this.getUrgencyValue(urgency);

    // P1: Critical - High impact AND High urgency
    if (impactValue === 3 && urgencyValue === 3) {
      return Priority.P1;
    }

    // P2: High - High impact OR High urgency (but not both)
    if (impactValue === 3 && urgencyValue >= 2) {
      return Priority.P2;
    }
    if (urgencyValue === 3 && impactValue >= 2) {
      return Priority.P2;
    }

    // P3: Medium
    if (impactValue >= 2 || urgencyValue >= 2) {
      return Priority.P3;
    }

    // P4: Low
    return Priority.P4;
  }

  private static getImpactValue(impact: Impact): number {
    switch (impact) {
      case Impact.HIGH: return 3;
      case Impact.MEDIUM: return 2;
      case Impact.LOW: return 1;
    }
  }

  private static getUrgencyValue(urgency: Urgency): number {
    switch (urgency) {
      case Urgency.HIGH: return 3;
      case Urgency.MEDIUM: return 2;
      case Urgency.LOW: return 1;
    }
  }
}
