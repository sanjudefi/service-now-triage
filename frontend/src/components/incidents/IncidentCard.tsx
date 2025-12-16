import React from 'react';
import { Zap } from 'lucide-react';
import { Incident } from '../../types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatDate, getPriorityColor, getStatusColor, getCategoryColor } from '../../utils/formatters';

interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onClick }) => {
  return (
    <Card hover onClick={onClick}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-500">#{incident.id}</span>
              {incident.auto_resolvable && (
                <span className="text-green-600" title="Auto-resolvable">
                  <Zap size={16} fill="currentColor" />
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {incident.short_description}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {incident.detailed_description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge color={getPriorityColor(incident.priority || '')}>
            {incident.priority}
          </Badge>
          <Badge color={getStatusColor(incident.status || '')}>
            {incident.status}
          </Badge>
          <Badge color={getCategoryColor(incident.classified_category || '')}>
            {incident.classified_category}
          </Badge>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
          <span className="font-medium">{incident.assigned_team}</span>
          <span>{incident.created_at && formatDate(incident.created_at)}</span>
        </div>
      </div>
    </Card>
  );
};

export default IncidentCard;
