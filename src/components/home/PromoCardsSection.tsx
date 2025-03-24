
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
    <section className="py-8 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Link 
              key={card.id} 
              to={card.link} 
              className={`imperio-card p-5 flex flex-col h-[200px] bg-gradient-to-br ${card.color} to-white relative overflow-hidden group`}
            >
              <div className="z-10">
                <div className="text-imperio-navy p-2 rounded-full bg-white w-12 h-12 flex items-center justify-center mb-3 shadow-subtle">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold text-imperio-navy mb-2">{card.title}</h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {card.description}
                </p>
                <div className="flex items-center text-imperio-navy font-medium mt-auto group-hover:underline">
                  <span className="text-sm">Conhecer</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-imperio-navy/5 rounded-full -mb-14 -mr-14 transition-transform group-hover:scale-125"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
