
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

export const VipMembershipSection: React.FC = () => {
  return (
    <section className="py-4">
      <div className="section-container">
        <Card className="bg-imperio-navy text-white overflow-hidden">
          <CardContent className="p-4">
            <motion.div
              initial={{ opacity:.0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="text-lg font-bold mb-2">Entre no Grupo VIP</h2>
              <p className="text-sm mb-3">Receba ofertas exclusivas, descontos e atualizações sobre novos produtos</p>
              <Link 
                to="/vip" 
                className="bg-white text-imperio-navy font-semibold py-2 px-4 rounded-full text-sm hover:bg-gray-100 transition-colors"
              >
                Entrar no Grupo VIP
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
