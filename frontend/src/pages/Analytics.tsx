import React, { useEffect, useState } from 'react';
import { analyticsAPI } from '../services/api';
import { Analytics as AnalyticsType, CategoryData, PriorityData, TeamData } from '../types';
import MetricsCard from '../components/analytics/MetricsCard';
import CategoryChart from '../components/analytics/CategoryChart';
import TrendChart from '../components/analytics/TrendChart';
import { Activity, Zap, Clock, AlertCircle as AlertIcon } from 'lucide-react';

const Analytics: React.FC = () => {
  const [summary, setSummary] = useState<AnalyticsType | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [priorityData, setPriorityData] = useState<PriorityData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [summaryRes, categoryRes, priorityRes, teamRes] = await Promise.all([
        analyticsAPI.getSummary(),
        analyticsAPI.getByCategory(),
        analyticsAPI.getByPriority(),
        analyticsAPI.getByTeam()
      ]);

      setSummary(summaryRes);
      setCategoryData(categoryRes);
      setPriorityData(priorityRes);
      setTeamData(teamRes);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch analytics');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertIcon className="mx-auto text-red-500" size={48} />
          <p className="mt-4 text-gray-900 font-semibold">Error loading analytics</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Key performance indicators and trends</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Incidents"
          value={summary.totalIncidents}
          subtitle="All time"
          icon={<Activity size={48} />}
          color="text-blue-600"
        />
        <MetricsCard
          title="Auto-Resolved"
          value={`${summary.autoResolvedPercentage}%`}
          subtitle="Automation rate"
          icon={<Zap size={48} />}
          color="text-green-600"
        />
        <MetricsCard
          title="Avg Resolution Time"
          value={`${summary.avgResolutionTimeHours}h`}
          subtitle="Mean time to resolve"
          icon={<Clock size={48} />}
          color="text-purple-600"
        />
        <MetricsCard
          title="Critical (P1) Incidents"
          value={summary.p1Count}
          subtitle="Requires immediate attention"
          icon={<AlertIcon size={48} />}
          color="text-red-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {categoryData.length > 0 && <CategoryChart data={categoryData} />}
        {priorityData.length > 0 && (
          <TrendChart
            data={priorityData}
            title="Incidents by Priority"
            dataKey="count"
            xAxisKey="priority"
          />
        )}
      </div>

      {/* Team Chart */}
      {teamData.length > 0 && (
        <div className="mb-8">
          <TrendChart
            data={teamData}
            title="Incidents by Team"
            dataKey="count"
            xAxisKey="team"
          />
        </div>
      )}
    </div>
  );
};

export default Analytics;
