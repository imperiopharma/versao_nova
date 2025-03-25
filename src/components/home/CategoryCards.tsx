
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
    <section className="py-4">
      <div className="section-container">
        <h2 className="text-xl font-bold text-imperio-navy mb-4">Categorias em Destaque</h2>
        
        <div className="grid grid-cols-1 gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ 
                y: -2,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              className="w-full"
            >
              <Link 
                to={category.link} 
                className={`${category.color} rounded-xl p-4 flex items-center w-full text-white shadow-sm`}
              >
                <div className="rounded-full bg-white/20 p-2 mr-3">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
