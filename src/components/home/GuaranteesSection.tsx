import React from 'react';
import { Truck, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
export const GuaranteesSection: React.FC = () => {
  const isMobile = useIsMobile();
  const items = [{
    icon: <Truck className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />,
    title: "Entrega Expressa",
    description: "Entrega em até 24h para capitais"
  }, {
    icon: <Award className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />,
    title: "Atendimento 24h",
    description: "Suporte disponível a qualquer hora"
  }, {
    icon: <Shield className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />,
    title: "Qualidade Garantida",
    description: "Produtos com certificação de qualidade"
  }];
  return <section className="py-8 md:py-8 bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-gray-800">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex justify-center">
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.5
        }} className="w-full max-w-6xl">
            <div className="flex flex-row items-center justify-between gap-1 md:gap-8">
              {items.map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 15
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.2,
              duration: 0.5
            }} className="flex flex-col items-center text-center relative">
                  <div className={`relative z-10 bg-imperio-navy p-2 md:p-6 rounded-lg border-2 border-white/20 
                                shadow-[0_0_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]
                                transition-all duration-300 ${isMobile ? 'w-auto' : 'w-64 md:w-72'}`}>
                    <div className="flex flex-col items-center">
                      <div className={`bg-imperio-light-navy ${isMobile ? 'p-2' : 'p-4'} rounded-full mb-2 md:mb-4 border-2 border-white/30 
                                    shadow-lg flex items-center justify-center`}>
                        {item.icon}
                      </div>
                      <h3 className={`${isMobile ? 'text-xs' : 'text-lg'} font-bold text-white mb-1 md:mb-2`}>{item.title}</h3>
                      <p className={`${isMobile ? 'text-[9px] hidden md:block' : 'text-sm'} text-gray-200`}>{item.description}</p>
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};