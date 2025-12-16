import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Plus } from 'lucide-react';
import Button from '../common/Button';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Demo Mode Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2 text-sm">
        <span className="font-semibold">🎯 DEMO MODE</span> - Viewing sample data. Deploy backend to use real data.
      </div>

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <Activity className="text-primary-600" size={32} />
            <span className="text-xl font-bold text-gray-900">PulseTriage</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className={`font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className={`font-medium transition-colors ${
                isActive('/analytics')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </Link>
            <Link to="/create">
              <Button>
                <Plus size={16} className="inline mr-1" />
                New Incident
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
