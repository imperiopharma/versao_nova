
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
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
    <section className="py-3 sm:py-4 relative overflow-hidden">
      <div className="section-container">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">Serviços</h2>
          <Link 
            to="/servicos" 
            className="text-imperio-red hover:underline text-xs sm:text-sm font-medium flex items-center"
          >
            Ver todos
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="h-full"
            >
              <Link 
                to={card.link} 
                className={`relative p-3 sm:p-4 flex flex-col rounded-lg ${card.color} hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden h-full group`}
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-full p-1.5 sm:p-2 w-fit mb-1.5 sm:mb-2 text-imperio-navy">
                  {card.icon}
                </div>
                
                <h2 className="text-xs sm:text-sm font-bold text-imperio-navy mb-0.5 sm:mb-1 relative z-10">{card.title}</h2>
                <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 relative z-10">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
