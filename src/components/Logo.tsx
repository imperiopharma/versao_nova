
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-12',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`text-imperio-navy font-display font-bold ${sizeClasses[size]}`}>
        <span className="text-imperio-navy">Império</span>
        <span className="text-imperio-red">Pharma</span>
      </div>
    </div>
  );
};
