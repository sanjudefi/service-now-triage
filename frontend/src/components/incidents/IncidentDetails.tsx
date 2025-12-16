import React from 'react';
import { X, Zap, Calendar, User, Users, Server } from 'lucide-react';
import { Incident } from '../../types';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatDate, getPriorityColor, getStatusColor, getCategoryColor } from '../../utils/formatters';

interface IncidentDetailsProps {
  incident: Incident;
  onClose: () => void;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ incident, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              Incident #{incident.id}
            </h2>
            {incident.auto_resolvable && (
              <Badge color="bg-green-100 text-green-800">
                <Zap size={12} className="inline mr-1" />
                Auto-Resolvable
              </Badge>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge color={getPriorityColor(incident.priority || '')}>
              Priority: {incident.priority}
            </Badge>
            <Badge color={getStatusColor(incident.status || '')}>
              {incident.status}
            </Badge>
            <Badge color={getCategoryColor(incident.classified_category || '')}>
              {incident.classified_category}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {incident.short_description}
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {incident.detailed_description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">{incident.created_at && formatDate(incident.created_at)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <User size={16} className="text-gray-400" />
              <span className="text-gray-600">User Role:</span>
              <span className="font-medium">{incident.user_role}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-gray-400" />
              <span className="text-gray-600">Affected Users:</span>
              <span className="font-medium">{incident.affected_users}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Server size={16} className="text-gray-400" />
              <span className="text-gray-600">Environment:</span>
              <span className="font-medium">{incident.environment}</span>
            </div>
          </div>

          {/* Triage Information */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Triage Analysis</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-blue-700">Impact:</span>
                <span className="ml-2 font-medium text-blue-900">{incident.impact}</span>
              </div>
              <div>
                <span className="text-blue-700">Urgency:</span>
                <span className="ml-2 font-medium text-blue-900">{incident.urgency}</span>
              </div>
              <div className="col-span-2">
                <span className="text-blue-700">Assigned Team:</span>
                <span className="ml-2 font-medium text-blue-900">{incident.assigned_team}</span>
              </div>
            </div>
          </div>

          {/* Resolution Steps */}
          {incident.resolution_steps && incident.resolution_steps.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">
                {incident.auto_resolvable ? 'Auto-Resolution Steps' : 'Suggested Resolution'}
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-green-800">
                {incident.resolution_steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
