import axios from 'axios';
import { Incident, Analytics, CategoryData, PriorityData, TeamData, KnowledgeArticle } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Incident API
export const incidentAPI = {
  create: async (incident: Incident) => {
    const response = await api.post('/incidents', incident);
    return response.data;
  },

  getAll: async (filters?: {
    status?: string;
    priority?: string;
    category?: string;
  }) => {
    const response = await api.get('/incidents', { params: filters });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/incidents/${id}`);
    return response.data;
  },

  update: async (id: number, updates: Partial<Incident>) => {
    const response = await api.patch(`/incidents/${id}`, updates);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/incidents/${id}`);
    return response.data;
  }
};

// Analytics API
export const analyticsAPI = {
  getSummary: async (): Promise<Analytics> => {
    const response = await api.get('/analytics/summary');
    return response.data.data;
  },

  getByCategory: async (): Promise<CategoryData[]> => {
    const response = await api.get('/analytics/by-category');
    return response.data.data;
  },

  getByPriority: async (): Promise<PriorityData[]> => {
    const response = await api.get('/analytics/by-priority');
    return response.data.data;
  },

  getByTeam: async (): Promise<TeamData[]> => {
    const response = await api.get('/analytics/by-team');
    return response.data.data;
  }
};

// Knowledge Base API
export const knowledgeAPI = {
  getAll: async (): Promise<KnowledgeArticle[]> => {
    const response = await api.get('/knowledge');
    return response.data.data;
  },

  getById: async (id: number): Promise<KnowledgeArticle> => {
    const response = await api.get(`/knowledge/${id}`);
    return response.data.data;
  },

  search: async (keywords: string[]): Promise<KnowledgeArticle[]> => {
    const response = await api.post('/knowledge/search', { keywords });
    return response.data.data;
  }
};

export default api;
