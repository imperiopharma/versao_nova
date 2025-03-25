
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const VipMembershipSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-3 sm:py-4">
      <div className="section-container">
        <Card className="bg-imperio-navy text-white overflow-hidden shadow-md">
          <CardContent className="p-3 sm:p-4">
            <motion.div
              initial={{ opacity:.0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mb-2" />
              <h2 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">Entre no Grupo VIP</h2>
              <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-white/90">Receba ofertas exclusivas, descontos e atualizações sobre novos produtos</p>
              <Link 
                to="/vip" 
                className="bg-white text-imperio-navy font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-colors"
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
