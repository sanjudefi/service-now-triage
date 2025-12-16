import { Router, Request, Response } from 'express';
import { IncidentModel } from '../models';
import { TriageEngine } from '../services/triageEngine';
import { validateIncidentCreate } from '../middleware/validator';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

/**
 * POST /api/incidents
 * Create a new incident (triggers automatic triage)
 */
router.post('/', validateIncidentCreate, asyncHandler(async (req: Request, res: Response) => {
  let incident = req.body;

  // Process through triage engine
  incident = await TriageEngine.processIncident(incident);

  // Save to database
  const savedIncident = await IncidentModel.create(incident);

  // Get triage summary
  const triageSummary = TriageEngine.getTriageSummary(savedIncident);

  res.status(201).json({
    success: true,
    data: savedIncident,
    triage: triageSummary
  });
}));

/**
 * GET /api/incidents
 * Get all incidents with optional filters
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { status, priority, category, limit, offset } = req.query;

  const incidents = await IncidentModel.findAll({
    status: status as string,
    priority: priority as string,
    category: category as string,
    limit: limit ? parseInt(limit as string) : undefined,
    offset: offset ? parseInt(offset as string) : undefined
  });

  res.json({
    success: true,
    count: incidents.length,
    data: incidents
  });
}));

/**
 * GET /api/incidents/:id
 * Get a specific incident by ID
 */
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const incident = await IncidentModel.findById(parseInt(id));

  if (!incident) {
    throw new AppError('Incident not found', 404);
  }

  res.json({
    success: true,
    data: incident
  });
}));

/**
 * PATCH /api/incidents/:id
 * Update an incident
 */
router.patch('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const incident = await IncidentModel.update(parseInt(id), updates);

  if (!incident) {
    throw new AppError('Incident not found', 404);
  }

  res.json({
    success: true,
    data: incident
  });
}));

/**
 * DELETE /api/incidents/:id
 * Delete an incident
 */
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await IncidentModel.delete(parseInt(id));

  if (!deleted) {
    throw new AppError('Incident not found', 404);
  }

  res.json({
    success: true,
    message: 'Incident deleted successfully'
  });
}));

export default router;
