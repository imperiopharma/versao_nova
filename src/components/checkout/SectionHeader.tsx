
import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="flex items-center gap-3 mb-6 relative z-10">
      <div className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy p-3 rounded-xl shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        {React.cloneElement(icon as React.ReactElement, { size: 22, className: "text-white relative z-10" })}
      </div>
      <div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-xs text-imperio-navy/60 mt-1">{description}</p>
      </div>
    </div>
  );
};
