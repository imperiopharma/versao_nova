
import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, ShoppingBag, TrendingUp, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  return (
    <section className="py-4 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map((card) => (
            <Link 
              key={card.id} 
              to={card.link} 
              className={`p-4 flex flex-col rounded-xl ${card.color} hover:shadow-md transition-shadow border border-gray-100`}
            >
              <div className="text-imperio-navy mb-2">
                {card.icon}
              </div>
              <h2 className="text-sm font-bold text-imperio-navy mb-1">{card.title}</h2>
              <p className="text-xs text-gray-600 line-clamp-2">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
