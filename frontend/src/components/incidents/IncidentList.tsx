import React, { useState } from 'react';
import { Incident, Status, Priority, Category } from '../../types';
import IncidentCard from './IncidentCard';
import IncidentDetails from './IncidentDetails';
import Select from '../common/Select';

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  const filteredIncidents = incidents.filter((incident) => {
    if (filters.status !== 'all' && incident.status !== filters.status) return false;
    if (filters.priority !== 'all' && incident.priority !== filters.priority) return false;
    if (filters.category !== 'all' && incident.classified_category !== filters.category) return false;
    return true;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: Status.NEW, label: 'New' },
            { value: Status.IN_PROGRESS, label: 'In Progress' },
            { value: Status.AUTO_RESOLVED, label: 'Auto-Resolved' },
            { value: Status.RESOLVED, label: 'Resolved' },
            { value: Status.CLOSED, label: 'Closed' }
          ]}
        />

        <Select
          label="Priority"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          options={[
            { value: 'all', label: 'All Priorities' },
            { value: Priority.P1, label: 'P1 - Critical' },
            { value: Priority.P2, label: 'P2 - High' },
            { value: Priority.P3, label: 'P3 - Medium' },
            { value: Priority.P4, label: 'P4 - Low' }
          ]}
        />

        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          options={[
            { value: 'all', label: 'All Categories' },
            { value: Category.ACCESS, label: 'Access' },
            { value: Category.NETWORK, label: 'Network' },
            { value: Category.APPLICATION, label: 'Application' },
            { value: Category.DATABASE, label: 'Database' },
            { value: Category.SECURITY, label: 'Security' }
          ]}
        />
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredIncidents.length} of {incidents.length} incidents
      </div>

      {/* Incident Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIncidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            onClick={() => setSelectedIncident(incident)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredIncidents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No incidents found matching the current filters.</p>
        </div>
      )}

      {/* Details Modal */}
      {selectedIncident && (
        <IncidentDetails
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  );
};

export default IncidentList;
