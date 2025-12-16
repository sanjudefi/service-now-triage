import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-lg cursor-pointer transition-shadow' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
