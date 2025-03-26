
import React from 'react';
import { Bot } from 'lucide-react';

interface AvatarProps {
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center bg-imperio-navy text-white rounded-full ${className}`}>
      <Bot size={16} />
    </div>
  );
};
