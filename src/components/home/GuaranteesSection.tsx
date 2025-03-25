
import React from 'react';
import { Truck, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const GuaranteesSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  const items = [
    {
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-imperio-navy" />,
      title: "Envio para todo o Brasil",
      description: "Entregamos em todo território nacional"
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8 text-imperio-navy" />,
      title: "Produtos de Qualidade",
      description: "Garantia de autenticidade"
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-imperio-navy" />,
      title: "Dados Pessoais Protegidos",
      description: "Sua privacidade é nossa prioridade"
    }
  ];

  return (
    <section className="py-4 sm:py-6 bg-gray-50">
      <div className="section-container">
        <h2 className="text-lg sm:text-xl font-bold text-imperio-navy mb-4 text-center">Garantias & Proteções</h2>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-2">
                {item.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-imperio-navy mb-0.5 sm:mb-1">{item.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
