
import React from 'react';

export const AppBanner: React.FC = () => {
  return (
    <section className="py-5 bg-imperio-navy text-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-lg font-display font-bold mb-1.5">Império Pharma no seu bolso</h2>
            <p className="text-xs text-gray-200 mb-3 max-w-md">
              Baixe nosso aplicativo para fazer pedidos de forma mais rápida, 
              acompanhar seus pedidos e receber ofertas exclusivas!
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <img 
                src="https://via.placeholder.com/120x40?text=App+Store" 
                alt="App Store" 
                className="h-8 cursor-pointer hover-lift"
              />
              <img 
                src="https://via.placeholder.com/120x40?text=Google+Play" 
                alt="Google Play" 
                className="h-8 cursor-pointer hover-lift"
              />
            </div>
          </div>
          <div className="w-32 md:w-auto">
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
