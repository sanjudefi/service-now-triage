import { Category, CLASSIFICATION_KEYWORDS } from '../config/constants';

/**
 * Classifies incidents based on keyword matching
 * Returns the category with the highest keyword match score
 */
export class ClassifierService {
  static classify(description: string): Category {
    const lowerDescription = description.toLowerCase();
    const scores: Record<Category, number> = {
      [Category.ACCESS]: 0,
      [Category.NETWORK]: 0,
      [Category.APPLICATION]: 0,
      [Category.DATABASE]: 0,
      [Category.SECURITY]: 0
    };

    // Score each category based on keyword matches
    for (const [category, keywords] of Object.entries(CLASSIFICATION_KEYWORDS)) {
      for (const keyword of keywords) {
        if (lowerDescription.includes(keyword.toLowerCase())) {
          scores[category as Category]++;
        }
      }
    }

    // Find category with highest score
    let maxScore = 0;
    let bestCategory = Category.APPLICATION; // Default fallback

    for (const [category, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        bestCategory = category as Category;
      }
    }

    // If no matches found, default to APPLICATION
    return maxScore > 0 ? bestCategory : Category.APPLICATION;
  }

  /**
   * Extract keywords from description for knowledge base matching
   */
  static extractKeywords(description: string): string[] {
    const lowerDescription = description.toLowerCase();
    const allKeywords = Object.values(CLASSIFICATION_KEYWORDS).flat();

    return allKeywords.filter(keyword =>
      lowerDescription.includes(keyword.toLowerCase())
    );
  }
}
