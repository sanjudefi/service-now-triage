import { Router, Request, Response } from 'express';
import { IncidentModel } from '../models';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

/**
 * GET /api/analytics/summary
 * Get overall analytics summary
 */
router.get('/summary', asyncHandler(async (req: Request, res: Response) => {
  const analytics = await IncidentModel.getAnalytics();

  res.json({
    success: true,
    data: {
      totalIncidents: analytics.total,
      autoResolvedPercentage: parseFloat(analytics.autoResolvedPercentage),
      avgResolutionTimeHours: parseFloat(analytics.avgResolutionTime),
      p1Count: analytics.byPriority.find((p: any) => p.priority === 'P1')?.count || 0
    }
  });
}));

/**
 * GET /api/analytics/by-category
 * Get incidents grouped by category
 */
router.get('/by-category', asyncHandler(async (req: Request, res: Response) => {
  const analytics = await IncidentModel.getAnalytics();

  res.json({
    success: true,
    data: analytics.byCategory.map((item: any) => ({
      category: item.classified_category,
      count: parseInt(item.count)
    }))
  });
}));

/**
 * GET /api/analytics/by-priority
 * Get incidents grouped by priority
 */
router.get('/by-priority', asyncHandler(async (req: Request, res: Response) => {
  const analytics = await IncidentModel.getAnalytics();

  res.json({
    success: true,
    data: analytics.byPriority.map((item: any) => ({
      priority: item.priority,
      count: parseInt(item.count)
    }))
  });
}));

/**
 * GET /api/analytics/by-team
 * Get incidents grouped by assigned team
 */
router.get('/by-team', asyncHandler(async (req: Request, res: Response) => {
  const analytics = await IncidentModel.getAnalytics();

  res.json({
    success: true,
    data: analytics.byTeam.map((item: any) => ({
      team: item.assigned_team,
      count: parseInt(item.count)
    }))
  });
}));

/**
 * GET /api/analytics/by-status
 * Get incidents grouped by status
 */
router.get('/by-status', asyncHandler(async (req: Request, res: Response) => {
  const analytics = await IncidentModel.getAnalytics();

  res.json({
    success: true,
    data: analytics.byStatus.map((item: any) => ({
      status: item.status,
      count: parseInt(item.count)
    }))
  });
}));

export default router;
