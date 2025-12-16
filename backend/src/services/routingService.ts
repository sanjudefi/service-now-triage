import { Category, TEAM_MAPPING } from '../config/constants';

/**
 * Routes incidents to appropriate support teams based on category
 */
export class RoutingService {
  static assignTeam(category: Category): string {
    return TEAM_MAPPING[category];
  }

  /**
   * Get all available teams
   */
  static getAllTeams(): string[] {
    return Object.values(TEAM_MAPPING);
  }

  /**
   * Get team by category
   */
  static getTeamByCategory(category: Category): string {
    return TEAM_MAPPING[category];
  }
}
