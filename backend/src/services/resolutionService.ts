import { Category } from '../config/constants';
import { KnowledgeArticle, KnowledgeArticleModel } from '../models';

export interface ResolutionSuggestion {
  autoResolvable: boolean;
  suggestedArticle?: KnowledgeArticle;
  resolutionSteps?: string[];
  confidence?: number;
}

/**
 * Suggests resolutions by matching incidents with knowledge base articles
 * Uses category matching and keyword overlap scoring
 */
export class ResolutionService {
  private static readonly AUTO_RESOLVE_THRESHOLD = 0.85;
  private static readonly MIN_KEYWORD_OVERLAP = 0.5;

  static async suggestResolution(
    category: Category,
    keywords: string[]
  ): Promise<ResolutionSuggestion> {
    // Get knowledge articles for this category
    const articles = await KnowledgeArticleModel.findByCategory(category);

    if (articles.length === 0) {
      return { autoResolvable: false };
    }

    // Score each article based on keyword overlap
    const scoredArticles = articles.map(article => ({
      article,
      score: this.calculateMatchScore(keywords, article.keywords)
    }));

    // Sort by score (descending)
    scoredArticles.sort((a, b) => b.score - a.score);

    const bestMatch = scoredArticles[0];

    // Check if the match is strong enough for auto-resolution
    if (
      bestMatch &&
      bestMatch.article.confidence >= this.AUTO_RESOLVE_THRESHOLD &&
      bestMatch.score >= this.MIN_KEYWORD_OVERLAP
    ) {
      return {
        autoResolvable: true,
        suggestedArticle: bestMatch.article,
        resolutionSteps: bestMatch.article.resolution_steps,
        confidence: bestMatch.article.confidence
      };
    }

    // Return best match even if not auto-resolvable (for manual review)
    if (bestMatch && bestMatch.score > 0) {
      return {
        autoResolvable: false,
        suggestedArticle: bestMatch.article,
        resolutionSteps: bestMatch.article.resolution_steps,
        confidence: bestMatch.article.confidence
      };
    }

    return { autoResolvable: false };
  }

  /**
   * Calculate keyword overlap score (Jaccard similarity)
   * Returns value between 0 and 1
   */
  private static calculateMatchScore(
    incidentKeywords: string[],
    articleKeywords: string[]
  ): number {
    if (incidentKeywords.length === 0 || articleKeywords.length === 0) {
      return 0;
    }

    const incidentSet = new Set(incidentKeywords.map(k => k.toLowerCase()));
    const articleSet = new Set(articleKeywords.map(k => k.toLowerCase()));

    // Calculate intersection
    const intersection = new Set(
      [...incidentSet].filter(k => articleSet.has(k))
    );

    // Calculate union
    const union = new Set([...incidentSet, ...articleSet]);

    // Jaccard similarity: |intersection| / |union|
    return intersection.size / union.size;
  }

  /**
   * Search knowledge base by keywords
   */
  static async searchKnowledgeBase(keywords: string[]): Promise<KnowledgeArticle[]> {
    return await KnowledgeArticleModel.search(keywords);
  }
}
