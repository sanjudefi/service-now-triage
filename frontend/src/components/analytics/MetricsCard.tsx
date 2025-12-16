import React from 'react';
import Card from '../common/Card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, subtitle, icon, color = 'text-primary-600' }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className={`${color} opacity-20`}>{icon}</div>}
      </div>
    </Card>
  );
};

export default MetricsCard;
