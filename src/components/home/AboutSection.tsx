
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="section-container">
        <Card>
          <CardContent className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold text-imperio-navy mb-2">Sobre Nós</h2>
              <p className="text-sm text-gray-600 mb-3">
                Somos uma empresa especializada na importação e distribuição de produtos farmacêuticos, suplementos e cosméticos de alta qualidade. Com anos de experiência no mercado, garantimos produtos originais com preços acessíveis.
              </p>
              <Link 
                to="/sobre" 
                className="text-imperio-red hover:underline text-sm font-medium"
              >
                Saiba mais →
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
