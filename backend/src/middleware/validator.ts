import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import { Environment, UserRole } from '../config/constants';

export const validateIncidentCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { short_description, detailed_description, affected_users, environment, user_role } = req.body;

  if (!short_description || short_description.trim().length === 0) {
    throw new AppError('Short description is required', 400);
  }

  if (!detailed_description || detailed_description.trim().length === 0) {
    throw new AppError('Detailed description is required', 400);
  }

  if (affected_users !== undefined && (typeof affected_users !== 'number' || affected_users < 1)) {
    throw new AppError('Affected users must be a positive number', 400);
  }

  if (!environment || !Object.values(Environment).includes(environment)) {
    throw new AppError('Valid environment is required (Production or Non-Production)', 400);
  }

  if (!user_role || !Object.values(UserRole).includes(user_role)) {
    throw new AppError('Valid user role is required (Employee, Manager, Finance, or Ops)', 400);
  }

  next();
};
