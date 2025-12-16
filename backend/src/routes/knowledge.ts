import { Router, Request, Response } from 'express';
import { KnowledgeArticleModel } from '../models';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

/**
 * GET /api/knowledge
 * Get all knowledge articles
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const articles = await KnowledgeArticleModel.findAll();

  res.json({
    success: true,
    count: articles.length,
    data: articles
  });
}));

/**
 * GET /api/knowledge/:id
 * Get a specific knowledge article by ID
 */
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const article = await KnowledgeArticleModel.findById(parseInt(id));

  if (!article) {
    throw new AppError('Knowledge article not found', 404);
  }

  res.json({
    success: true,
    data: article
  });
}));

/**
 * POST /api/knowledge/search
 * Search knowledge articles by keywords
 */
router.post('/search', asyncHandler(async (req: Request, res: Response) => {
  const { keywords } = req.body;

  if (!keywords || !Array.isArray(keywords)) {
    throw new AppError('Keywords array is required', 400);
  }

  const articles = await KnowledgeArticleModel.search(keywords);

  res.json({
    success: true,
    count: articles.length,
    data: articles
  });
}));

export default router;
