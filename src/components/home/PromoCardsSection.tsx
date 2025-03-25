
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ServiceCard } from '@/types/category';

interface PromoCardsSectionProps {
  cards: ServiceCard[];
}

export const PromoCardsSection: React.FC<PromoCardsSectionProps> = ({ cards }) => {
  // Função auxiliar para renderizar o ícone
  const renderIcon = (icon: React.ReactNode | (() => React.ReactNode)) => {
    return typeof icon === 'function' ? icon() : icon;
  };
  
  return (
    <section className="py-1 sm:py-2">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {cards.map((card) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -2,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Link 
                to={card.link} 
                className={`${card.color} rounded-lg p-3 flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-md transition-all h-full`}
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-white p-2 mr-3 text-imperio-navy">
                    {renderIcon(card.icon)}
                  </div>
                  <div>
                    <h3 className="font-medium text-imperio-navy text-sm sm:text-base">{card.title}</h3>
                    <p className="text-xs text-gray-600">{card.description}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
