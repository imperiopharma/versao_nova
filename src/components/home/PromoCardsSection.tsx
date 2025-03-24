
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
    <section className="py-6 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card) => (
            <Link 
              key={card.id} 
              to={card.link} 
              className={`imperio-card p-4 flex flex-col h-[180px] sm:h-[165px] bg-gradient-to-br ${card.color} to-white relative overflow-hidden group`}
            >
              <div className="z-10">
                <div className="text-imperio-navy p-2 rounded-full bg-white w-10 h-10 flex items-center justify-center mb-2 shadow-subtle">
                  {card.icon}
                </div>
                <h2 className="text-lg font-semibold text-imperio-navy mb-1">{card.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {card.description}
                </p>
                <div className="flex items-center text-imperio-navy font-medium mt-auto group-hover:underline">
                  <span className="text-sm">Conhecer</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-imperio-navy/5 rounded-full -mb-12 -mr-12 transition-transform group-hover:scale-125"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
