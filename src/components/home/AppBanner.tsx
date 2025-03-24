
import React from 'react';

export const AppBanner: React.FC = () => {
  return (
    <section className="py-8 bg-imperio-navy text-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-2xl font-display font-bold mb-2">Império Pharma no seu bolso</h2>
            <p className="text-sm text-gray-200 mb-4">
              Baixe nosso aplicativo para fazer pedidos de forma mais rápida, 
              acompanhar seus pedidos e receber ofertas exclusivas!
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <img 
                src="https://via.placeholder.com/120x40?text=App+Store" 
                alt="App Store" 
                className="h-10 cursor-pointer hover-lift"
              />
              <img 
                src="https://via.placeholder.com/120x40?text=Google+Play" 
                alt="Google Play" 
                className="h-10 cursor-pointer hover-lift"
              />
            </div>
          </div>
          <div className="w-48 md:w-auto">
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
