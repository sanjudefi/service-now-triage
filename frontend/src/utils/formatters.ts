import { Priority, Status } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case Priority.P1:
      return 'bg-red-100 text-red-800 border-red-300';
    case Priority.P2:
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case Priority.P3:
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case Priority.P4:
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case Status.NEW:
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case Status.IN_PROGRESS:
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case Status.AUTO_RESOLVED:
      return 'bg-green-100 text-green-800 border-green-300';
    case Status.RESOLVED:
      return 'bg-teal-100 text-teal-800 border-teal-300';
    case Status.CLOSED:
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    ACCESS: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    NETWORK: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    APPLICATION: 'bg-purple-100 text-purple-800 border-purple-300',
    DATABASE: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    SECURITY: 'bg-red-100 text-red-800 border-red-300'
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-300';
};
