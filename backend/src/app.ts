import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import incidentRoutes from './routes/incidents';
import analyticsRoutes from './routes/analytics';
import knowledgeRoutes from './routes/knowledge';
import pool from './config/database';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', async (req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected'
    });
  }
});

// API Routes
app.use('/api/incidents', incidentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/knowledge', knowledgeRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║     PulseTriage Backend Server Running        ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log(`║  Port: ${PORT}                                  ║`);
  console.log(`║  Environment: ${process.env.NODE_ENV || 'development'}               ║`);
  console.log(`║  API: http://localhost:${PORT}/api               ║`);
  console.log('╚════════════════════════════════════════════════╝');
});

export default app;
