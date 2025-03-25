
import React from 'react';
import { Shield } from 'lucide-react';

export const SecurityBadge: React.FC = () => {
  return (
    <div className="absolute top-6 right-6 bg-gradient-to-r from-imperio-extra-light-navy/80 to-imperio-extra-light-navy/30 backdrop-blur-sm rounded-full px-3 py-1 inline-flex items-center gap-1 border border-white/30 shadow-md relative overflow-hidden group z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] animate-[shimmer_2s_infinite] pointer-events-none"></div>
      <Shield size={14} className="text-imperio-navy" />
      <span className="text-xs text-imperio-navy font-medium">Dados protegidos</span>
      
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
    </div>
  );
};
