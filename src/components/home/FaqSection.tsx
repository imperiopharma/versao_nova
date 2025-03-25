
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ items }) => {
  return (
    <section className="py-4">
      <div className="section-container">
        <h2 className="text-xl font-bold text-imperio-navy mb-4">Perguntas Frequentes</h2>
        
        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-imperio-navy text-sm mb-2">{item.question}</h3>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to="/faq" 
            className="text-imperio-red hover:underline text-sm font-medium"
          >
            Ver todas as perguntas →
          </Link>
        </div>
      </div>
    </section>
  );
};
