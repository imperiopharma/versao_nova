
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ items }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-3 sm:py-4">
      <div className="section-container">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-imperio-navy">Perguntas Frequentes</h2>
          <Link 
            to="/faq" 
            className="text-imperio-red hover:underline text-xs sm:text-sm font-medium flex items-center"
          >
            Ver todas
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden shadow-sm">
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold text-imperio-navy text-xs sm:text-sm mb-1">{item.question}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
