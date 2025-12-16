import { Incident } from '../models';
import { Status } from '../config/constants';
import { ClassifierService } from './classifierService';
import { PriorityService } from './priorityService';
import { RoutingService } from './routingService';
import { ResolutionService } from './resolutionService';

/**
 * Smart Triage Engine - Orchestrates the entire triage process
 *
 * Process flow:
 * 1. Classify incident into category
 * 2. Calculate priority (impact + urgency)
 * 3. Route to appropriate team
 * 4. Suggest resolution from knowledge base
 */
export class TriageEngine {
  static async processIncident(incident: Incident): Promise<Incident> {
    // Step 1: Classify incident
    const category = ClassifierService.classify(
      `${incident.short_description} ${incident.detailed_description}`
    );
    incident.classified_category = category;

    // Step 2: Calculate priority
    const { impact, urgency, priority } = PriorityService.calculate(incident);
    incident.impact = impact;
    incident.urgency = urgency;
    incident.priority = priority;

    // Step 3: Route to team
    incident.assigned_team = RoutingService.assignTeam(category);

    // Step 4: Suggest resolution
    const keywords = ClassifierService.extractKeywords(
      `${incident.short_description} ${incident.detailed_description}`
    );

    const resolution = await ResolutionService.suggestResolution(category, keywords);

    if (resolution.autoResolvable && resolution.suggestedArticle) {
      incident.auto_resolvable = true;
      incident.suggested_article_id = resolution.suggestedArticle.id;
      incident.resolution_steps = resolution.resolutionSteps;
      incident.status = Status.AUTO_RESOLVED;
    } else {
      incident.auto_resolvable = false;
      incident.status = Status.NEW;

      // Still attach suggested article for manual review
      if (resolution.suggestedArticle) {
        incident.suggested_article_id = resolution.suggestedArticle.id;
        incident.resolution_steps = resolution.resolutionSteps;
      }
    }

    return incident;
  }

  /**
   * Get triage summary for reporting
   */
  static getTriageSummary(incident: Incident) {
    return {
      classification: {
        category: incident.classified_category,
        confidence: 'High' // Could be calculated based on keyword match strength
      },
      priority: {
        impact: incident.impact,
        urgency: incident.urgency,
        priority: incident.priority
      },
      routing: {
        assignedTeam: incident.assigned_team
      },
      resolution: {
        autoResolvable: incident.auto_resolvable,
        suggestedArticleId: incident.suggested_article_id,
        hasResolutionSteps: !!incident.resolution_steps
      }
    };
  }
}
