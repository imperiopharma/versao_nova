
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

interface CategoryCardsProps {
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } }
  };
  
  return (
    <section className="py-8">
      <div className="section-container">
        <h2 className="text-2xl font-bold text-imperio-navy mb-6 text-center">Categorias em Destaque</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              className="flex flex-col"
            >
              <Link 
                to={category.link} 
                className={`${category.color} rounded-xl p-4 h-full flex flex-col items-center text-center text-white`}
              >
                <div className="rounded-full bg-white/20 p-3 mb-3">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
