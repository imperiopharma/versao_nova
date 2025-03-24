
import React from 'react';

export const AppBanner: React.FC = () => {
  return (
    <section className="py-4 bg-imperio-navy text-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="md:mr-4 text-center md:text-left">
            <h2 className="text-base font-display font-bold mb-1">Império Pharma no seu bolso</h2>
            <p className="text-xs text-gray-200 mb-2 max-w-sm">
              Baixe nosso aplicativo para fazer pedidos de forma mais rápida, 
              acompanhar seus pedidos e receber ofertas exclusivas!
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <img 
                src="https://via.placeholder.com/120x40?text=App+Store" 
                alt="App Store" 
                className="h-7 cursor-pointer hover-lift"
              />
              <img 
                src="https://via.placeholder.com/120x40?text=Google+Play" 
                alt="Google Play" 
                className="h-7 cursor-pointer hover-lift"
              />
            </div>
          </div>
          <div className="w-28 md:w-36 flex-shrink-0">
            <img 
              src="https://via.placeholder.com/300x200?text=App+Screenshot" 
              alt="App Screenshot" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
