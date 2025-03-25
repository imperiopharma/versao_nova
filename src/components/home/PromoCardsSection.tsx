
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
    <section className="py-4 relative overflow-hidden">
      <div className="section-container">
        <h2 className="text-xl font-bold text-imperio-navy mb-4">Serviços</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Link 
                to={card.link} 
                className={`relative p-4 flex flex-col rounded-xl ${card.color} hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden h-full group`}
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-full p-2 w-fit mb-2 text-imperio-navy">
                  {card.icon}
                </div>
                
                <h2 className="text-sm font-bold text-imperio-navy mb-1 relative z-10">{card.title}</h2>
                <p className="text-xs text-gray-600 line-clamp-2 relative z-10">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
