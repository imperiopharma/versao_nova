
import React from 'react';

interface CartPageBackgroundProps {
  children: React.ReactNode;
}

export const CartPageBackground: React.FC<CartPageBackgroundProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Elementos decorativos - efeitos de luz e gradientes */}
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-white/5 to-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-gradient-to-tl from-blue-500/5 via-white/5 to-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
      
      {/* Grid de pontos decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>
      
      {children}
    </div>
  );
};
