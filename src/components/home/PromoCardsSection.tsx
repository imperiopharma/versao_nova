
import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <section className="py-3 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {cards.map((card) => (
            <Link 
              key={card.id} 
              to={card.link} 
              className={`imperio-card p-2.5 flex flex-col h-[120px] sm:h-[140px] bg-gradient-to-br ${card.color} to-white relative overflow-hidden group`}
            >
              <div className="z-10">
                <div className="text-imperio-navy p-1 rounded-full bg-white w-7 h-7 flex items-center justify-center mb-1 shadow-subtle">
                  {card.icon}
                </div>
                <h2 className="text-xs font-semibold text-imperio-navy mb-0.5">{card.title}</h2>
                <p className="text-xs text-gray-600 line-clamp-2 text-[10px]">
                  {card.description}
                </p>
                <div className="flex items-center mt-auto text-imperio-navy font-medium text-xs group-hover:underline">
                  <span>Conhecer</span>
                  <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-imperio-navy/5 rounded-full -mb-6 -mr-6 transition-transform group-hover:scale-125"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
