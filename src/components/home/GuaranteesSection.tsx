
import React from 'react';
import { Truck, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const GuaranteesSection: React.FC = () => {
  const items = [
    {
      icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-imperio-navy" />,
      title: "Entrega Expressa",
      description: "Entrega em até 24h para capitais"
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 text-imperio-navy" />,
      title: "Atendimento 24h",
      description: "Suporte disponível a qualquer hora"
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-imperio-navy" />,
      title: "Qualidade Garantida",
      description: "Produtos com certificação de qualidade"
    }
  ];

  return (
    <section className="py-2 bg-gray-50 border-b border-gray-100">
      <div className="section-container">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-1 sm:mb-2">
                {item.icon}
              </div>
              <h3 className="text-xs font-semibold text-imperio-navy mb-0.5">{item.title}</h3>
              <p className="text-[10px] text-gray-600 hidden sm:block">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
