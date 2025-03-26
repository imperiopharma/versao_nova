
import React from 'react';
import { Truck, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const GuaranteesSection: React.FC = () => {
  const items = [
    {
      icon: <Truck className="w-6 h-6 text-white" />,
      title: "Entrega Expressa",
      description: "Entrega em até 24h para capitais"
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Atendimento 24h",
      description: "Suporte disponível a qualquer hora"
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Qualidade Garantida",
      description: "Produtos com certificação de qualidade"
    }
  ];

  return (
    <section className="py-1 bg-imperio-navy shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <div className="flex items-center justify-between">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex flex-col items-center text-center px-2 relative"
                >
                  <div className="relative z-10">
                    <div className="bg-imperio-navy p-2 rounded-full mb-2 border-2 border-white/20 
                                   shadow-[0_0_15px_rgba(255,255,255,0.25)] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xs font-bold text-white mb-0.5">{item.title}</h3>
                    <p className="text-[10px] text-gray-200 hidden sm:block">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
