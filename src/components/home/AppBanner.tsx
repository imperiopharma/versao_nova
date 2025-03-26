
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck } from 'lucide-react';

export const AppBanner: React.FC = () => {
  const guarantees = [
    {
      icon: <Truck size={24} />,
      title: "Entrega Expressa",
      description: "Entrega em até 24h para capitais"
    },
    {
      icon: <Award size={24} />,
      title: "Atendimento 24h",
      description: "Suporte disponível a qualquer hora"
    },
    {
      icon: <Shield size={24} />,
      title: "Qualidade Garantida",
      description: "Produtos com certificação de qualidade"
    }
  ];

  return (
    <div className="bg-imperio-navy py-3 text-white">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          {guarantees.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-2 bg-imperio-light-navy p-2 rounded-full border border-white/20 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold">{item.title}</h3>
              <p className="text-xs opacity-80 hidden sm:block">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
