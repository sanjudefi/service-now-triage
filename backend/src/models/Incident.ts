import pool from '../config/database';
import { Category, Impact, Urgency, Priority, Status, Environment, UserRole } from '../config/constants';

export interface Incident {
  id?: number;
  short_description: string;
  detailed_description: string;
  category?: string;
  affected_users: number;
  environment: Environment;
  user_role: UserRole;

  // Triage outputs
  classified_category?: Category;
  impact?: Impact;
  urgency?: Urgency;
  priority?: Priority;
  assigned_team?: string;

  // Resolution
  status?: Status;
  auto_resolvable?: boolean;
  suggested_article_id?: number;
  resolution_steps?: string[];

  created_at?: Date;
  updated_at?: Date;
}

export class IncidentModel {
  static async create(incident: Incident): Promise<Incident> {
    const query = `
      INSERT INTO incidents (
        short_description, detailed_description, category, affected_users,
        environment, user_role, classified_category, impact, urgency,
        priority, assigned_team, status, auto_resolvable,
        suggested_article_id, resolution_steps
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;

    const values = [
      incident.short_description,
      incident.detailed_description,
      incident.category,
      incident.affected_users,
      incident.environment,
      incident.user_role,
      incident.classified_category,
      incident.impact,
      incident.urgency,
      incident.priority,
      incident.assigned_team,
      incident.status || Status.NEW,
      incident.auto_resolvable || false,
      incident.suggested_article_id,
      incident.resolution_steps
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(filters?: {
    status?: string;
    priority?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<Incident[]> {
    let query = 'SELECT * FROM incidents WHERE 1=1';
    const values: any[] = [];
    let paramCount = 1;

    if (filters?.status) {
      query += ` AND status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }

    if (filters?.priority) {
      query += ` AND priority = $${paramCount}`;
      values.push(filters.priority);
      paramCount++;
    }

    if (filters?.category) {
      query += ` AND classified_category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      query += ` LIMIT $${paramCount}`;
      values.push(filters.limit);
      paramCount++;
    }

    if (filters?.offset) {
      query += ` OFFSET $${paramCount}`;
      values.push(filters.offset);
    }

    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id: number): Promise<Incident | null> {
    const query = 'SELECT * FROM incidents WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, updates: Partial<Incident>): Promise<Incident | null> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) return null;

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const query = `UPDATE incidents SET ${setClause} WHERE id = $1 RETURNING *`;

    const result = await pool.query(query, [id, ...values]);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM incidents WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async getAnalytics() {
    const queries = {
      total: 'SELECT COUNT(*) as count FROM incidents',
      byStatus: 'SELECT status, COUNT(*) as count FROM incidents GROUP BY status',
      byPriority: 'SELECT priority, COUNT(*) as count FROM incidents GROUP BY priority ORDER BY priority',
      byCategory: 'SELECT classified_category, COUNT(*) as count FROM incidents GROUP BY classified_category',
      byTeam: 'SELECT assigned_team, COUNT(*) as count FROM incidents GROUP BY assigned_team',
      autoResolved: 'SELECT COUNT(*) as count FROM incidents WHERE auto_resolvable = true',
      avgResolutionTime: `
        SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/3600) as avg_hours
        FROM incidents
        WHERE status IN ('Resolved', 'Closed', 'Auto-Resolved')
      `
    };

    const [total, byStatus, byPriority, byCategory, byTeam, autoResolved, avgResolution] = await Promise.all([
      pool.query(queries.total),
      pool.query(queries.byStatus),
      pool.query(queries.byPriority),
      pool.query(queries.byCategory),
      pool.query(queries.byTeam),
      pool.query(queries.autoResolved),
      pool.query(queries.avgResolutionTime)
    ]);

    const totalCount = parseInt(total.rows[0].count);
    const autoResolvedCount = parseInt(autoResolved.rows[0].count);

    return {
      total: totalCount,
      autoResolvedPercentage: totalCount > 0 ? ((autoResolvedCount / totalCount) * 100).toFixed(1) : '0.0',
      avgResolutionTime: parseFloat(avgResolution.rows[0].avg_hours || '0').toFixed(1),
      byStatus: byStatus.rows,
      byPriority: byPriority.rows,
      byCategory: byCategory.rows,
      byTeam: byTeam.rows
    };
  }
}
