import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryData } from '../../types';
import Card from '../common/Card';

interface CategoryChartProps {
  data: CategoryData[];
}

const COLORS = ['#6366f1', '#06b6d4', '#a855f7', '#10b981', '#ef4444'];

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.count
  }));

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Incidents by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CategoryChart;
