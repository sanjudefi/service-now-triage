import pool from '../config/database';
import { Category } from '../config/constants';

export interface KnowledgeArticle {
  id?: number;
  title: string;
  category: Category;
  keywords: string[];
  description?: string;
  resolution_steps: string[];
  confidence: number;
  created_at?: Date;
}

export class KnowledgeArticleModel {
  static async findAll(): Promise<KnowledgeArticle[]> {
    const query = 'SELECT * FROM knowledge_articles ORDER BY confidence DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<KnowledgeArticle | null> {
    const query = 'SELECT * FROM knowledge_articles WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByCategory(category: Category): Promise<KnowledgeArticle[]> {
    const query = 'SELECT * FROM knowledge_articles WHERE category = $1 ORDER BY confidence DESC';
    const result = await pool.query(query, [category]);
    return result.rows;
  }

  static async search(keywords: string[]): Promise<KnowledgeArticle[]> {
    // PostgreSQL array overlap operator
    const query = `
      SELECT * FROM knowledge_articles
      WHERE keywords && $1
      ORDER BY confidence DESC
      LIMIT 10
    `;
    const result = await pool.query(query, [keywords]);
    return result.rows;
  }
}
