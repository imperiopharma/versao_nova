
import React from 'react';

export const ShippingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-1 h-1 bg-blue-500 rounded-full floating-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}
    </div>
  );
};
