
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Info, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const AboutSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-3 sm:py-4">
      <div className="section-container">
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-imperio-extra-light-navy flex items-center justify-center">
                  <Info className="text-imperio-navy w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-sm sm:text-lg font-bold text-imperio-navy mb-1 text-center sm:text-left">Sobre Nós</h2>
                <p className="text-xs text-gray-600 mb-2 text-center sm:text-left">
                  Somos uma empresa especializada na importação e distribuição de produtos farmacêuticos, suplementos e cosméticos de alta qualidade.
                </p>
                <div className="flex justify-center sm:justify-start">
                  <Link 
                    to="/sobre" 
                    className="text-imperio-red hover:underline text-xs font-medium flex items-center"
                  >
                    Saiba mais
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
