
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface PromoCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

interface PromoCardsSectionProps {
  cards: PromoCard[];
}

export const PromoCardsSection: React.FC<PromoCardsSectionProps> = ({ cards }) => {
  const isMobile = useIsMobile();
  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section className="py-6 relative overflow-hidden">
      {/* Efeito de fundo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-imperio-navy via-white to-imperio-navy opacity-30"></div>
      
      <div className="section-container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={card.link} 
                className={`relative p-4 flex flex-col rounded-xl ${card.color} hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden h-full group`}
              >
                {/* Efeito de hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-imperio-navy/5 to-imperio-navy/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="bg-white/50 backdrop-blur-sm rounded-full p-2 w-fit mb-3 text-imperio-navy">
                  {card.icon}
                </div>
                
                <h2 className="text-sm font-bold text-imperio-navy mb-1 relative z-10">{card.title}</h2>
                <p className="text-xs text-gray-600 line-clamp-2 relative z-10">
                  {card.description}
                </p>
                
                {/* Elemento decorativo */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-imperio-navy/5 rounded-full -mb-10 -mr-10 opacity-30"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
