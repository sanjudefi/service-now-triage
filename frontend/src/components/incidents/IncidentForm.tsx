import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { incidentAPI } from '../../services/api';
import { Environment, UserRole } from '../../types';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Card from '../common/Card';

const IncidentForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    short_description: '',
    detailed_description: '',
    category: '',
    affected_users: 1,
    environment: Environment.NON_PRODUCTION,
    user_role: UserRole.EMPLOYEE
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await incidentAPI.create(formData);
      console.log('Incident created:', response);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create incident');
      console.error('Error creating incident:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Incident</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Short Description"
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            placeholder="Brief summary of the issue"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.detailed_description}
              onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
              placeholder="Provide detailed information about the incident"
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <Input
            label="Number of Affected Users"
            type="number"
            value={formData.affected_users}
            onChange={(e) => setFormData({ ...formData, affected_users: parseInt(e.target.value) })}
            min={1}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Environment <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={Environment.PRODUCTION}
                    checked={formData.environment === Environment.PRODUCTION}
                    onChange={(e) => setFormData({ ...formData, environment: e.target.value as Environment })}
                    className="mr-2"
                  />
                  <span className="text-sm">Production</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={Environment.NON_PRODUCTION}
                    checked={formData.environment === Environment.NON_PRODUCTION}
                    onChange={(e) => setFormData({ ...formData, environment: e.target.value as Environment })}
                    className="mr-2"
                  />
                  <span className="text-sm">Non-Production</span>
                </label>
              </div>
            </div>

            <Select
              label="User Role"
              value={formData.user_role}
              onChange={(e) => setFormData({ ...formData, user_role: e.target.value as UserRole })}
              options={[
                { value: UserRole.EMPLOYEE, label: 'Employee' },
                { value: UserRole.MANAGER, label: 'Manager' },
                { value: UserRole.FINANCE, label: 'Finance' },
                { value: UserRole.OPS, label: 'Operations' }
              ]}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Incident'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default IncidentForm;
