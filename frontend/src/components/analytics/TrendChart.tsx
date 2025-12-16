import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../common/Card';

interface TrendChartProps {
  data: any[];
  title: string;
  dataKey: string;
  xAxisKey: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, title, dataKey, xAxisKey }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TrendChart;
