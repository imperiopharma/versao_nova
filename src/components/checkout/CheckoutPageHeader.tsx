
import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface CheckoutPageHeaderProps {
  title: string;
  subtitle: string;
}

export const CheckoutPageHeader: React.FC<CheckoutPageHeaderProps> = ({ 
  title, 
  subtitle 
}) => {
  return (
    <div className="mb-8 text-center relative">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy via-blue-600 to-imperio-light-navy bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-sm text-imperio-navy/60 mt-2 max-w-md mx-auto">
        {subtitle}
      </p>
      
      {/* Elemento decorativo - linha horizontal com gradiente */}
      <div className="w-32 h-1 bg-gradient-to-r from-imperio-navy to-imperio-light-navy mx-auto mt-4 rounded-full"></div>
      
      {/* Badge de segurança com efeito de brilho */}
      <div className="mx-auto mt-4 bg-gradient-to-r from-imperio-extra-light-navy/80 to-imperio-extra-light-navy/30 backdrop-blur-sm rounded-full px-4 py-1 inline-flex items-center gap-1 border border-white/30 shadow-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[200%] animate-[shimmer_2s_infinite] pointer-events-none"></div>
        <ShieldCheck size={14} className="text-imperio-navy" />
        <span className="text-xs text-imperio-navy font-medium">Dados protegidos</span>
        
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      </div>
      
      {/* Badge de IA Assistente */}
      <div className="mx-auto mt-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-4 py-1 inline-flex items-center gap-1 border border-white/30 shadow-md">
        <Sparkles size={14} className="text-purple-600" />
        <span className="text-xs text-imperio-navy font-medium">Assistido por IA</span>
      </div>
    </div>
  );
};
