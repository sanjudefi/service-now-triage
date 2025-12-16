import React, { useEffect, useState } from 'react';
import { incidentAPI } from '../services/api';
import { Incident } from '../types';
import IncidentList from '../components/incidents/IncidentList';
import { AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await incidentAPI.getAll();
      setIncidents(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch incidents');
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading incidents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <p className="mt-4 text-gray-900 font-semibold">Error loading incidents</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Incident Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all incidents in real-time</p>
      </div>

      <IncidentList incidents={incidents} />
    </div>
  );
};

export default Dashboard;
