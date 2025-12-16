import axios from 'axios';
import { Incident, Analytics, CategoryData, PriorityData, TeamData, KnowledgeArticle } from '../types';
import {
  mockIncidents,
  mockKnowledgeArticles,
  mockAnalytics,
  mockCategoryData,
  mockPriorityData,
  mockTeamData
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Demo mode flag - uses mock data instead of real API
const DEMO_MODE = true;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Incident API
export const incidentAPI = {
  create: async (incident: Incident) => {
    if (DEMO_MODE) {
      await delay(800);
      const newIncident = {
        ...incident,
        id: Math.max(...mockIncidents.map(i => i.id || 0)) + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockIncidents.unshift(newIncident);
      return {
        success: true,
        data: newIncident,
        triage: {
          classification: { category: newIncident.classified_category },
          priority: { priority: newIncident.priority },
          routing: { assignedTeam: newIncident.assigned_team }
        }
      };
    }
    const response = await api.post('/incidents', incident);
    return response.data;
  },

  getAll: async (filters?: {
    status?: string;
    priority?: string;
    category?: string;
  }) => {
    if (DEMO_MODE) {
      await delay(500);
      let filtered = [...mockIncidents];

      if (filters?.status && filters.status !== 'all') {
        filtered = filtered.filter(i => i.status === filters.status);
      }
      if (filters?.priority && filters.priority !== 'all') {
        filtered = filtered.filter(i => i.priority === filters.priority);
      }
      if (filters?.category && filters.category !== 'all') {
        filtered = filtered.filter(i => i.classified_category === filters.category);
      }

      return {
        success: true,
        count: filtered.length,
        data: filtered
      };
    }
    const response = await api.get('/incidents', { params: filters });
    return response.data;
  },

  getById: async (id: number) => {
    if (DEMO_MODE) {
      await delay(300);
      const incident = mockIncidents.find(i => i.id === id);
      return {
        success: true,
        data: incident
      };
    }
    const response = await api.get(`/incidents/${id}`);
    return response.data;
  },

  update: async (id: number, updates: Partial<Incident>) => {
    if (DEMO_MODE) {
      await delay(500);
      const index = mockIncidents.findIndex(i => i.id === id);
      if (index !== -1) {
        mockIncidents[index] = { ...mockIncidents[index], ...updates };
        return {
          success: true,
          data: mockIncidents[index]
        };
      }
      return { success: false };
    }
    const response = await api.patch(`/incidents/${id}`, updates);
    return response.data;
  },

  delete: async (id: number) => {
    if (DEMO_MODE) {
      await delay(400);
      const index = mockIncidents.findIndex(i => i.id === id);
      if (index !== -1) {
        mockIncidents.splice(index, 1);
        return {
          success: true,
          message: 'Incident deleted successfully'
        };
      }
      return { success: false };
    }
    const response = await api.delete(`/incidents/${id}`);
    return response.data;
  }
};

// Analytics API
export const analyticsAPI = {
  getSummary: async (): Promise<Analytics> => {
    if (DEMO_MODE) {
      await delay(600);
      return mockAnalytics;
    }
    const response = await api.get('/analytics/summary');
    return response.data.data;
  },

  getByCategory: async (): Promise<CategoryData[]> => {
    if (DEMO_MODE) {
      await delay(500);
      return mockCategoryData;
    }
    const response = await api.get('/analytics/by-category');
    return response.data.data;
  },

  getByPriority: async (): Promise<PriorityData[]> => {
    if (DEMO_MODE) {
      await delay(500);
      return mockPriorityData;
    }
    const response = await api.get('/analytics/by-priority');
    return response.data.data;
  },

  getByTeam: async (): Promise<TeamData[]> => {
    if (DEMO_MODE) {
      await delay(500);
      return mockTeamData;
    }
    const response = await api.get('/analytics/by-team');
    return response.data.data;
  }
};

// Knowledge Base API
export const knowledgeAPI = {
  getAll: async (): Promise<KnowledgeArticle[]> => {
    if (DEMO_MODE) {
      await delay(400);
      return mockKnowledgeArticles;
    }
    const response = await api.get('/knowledge');
    return response.data.data;
  },

  getById: async (id: number): Promise<KnowledgeArticle> => {
    if (DEMO_MODE) {
      await delay(300);
      const article = mockKnowledgeArticles.find(a => a.id === id);
      return article!;
    }
    const response = await api.get(`/knowledge/${id}`);
    return response.data.data;
  },

  search: async (keywords: string[]): Promise<KnowledgeArticle[]> => {
    if (DEMO_MODE) {
      await delay(400);
      return mockKnowledgeArticles.filter(article =>
        keywords.some(keyword => article.keywords.includes(keyword))
      );
    }
    const response = await api.post('/knowledge/search', { keywords });
    return response.data.data;
  }
};

export default api;
