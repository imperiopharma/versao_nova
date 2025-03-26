
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const VipMembershipSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-2">
      <div className="section-container">
        <Card className="bg-imperio-navy text-white overflow-hidden shadow-md">
          <CardContent className="p-2 sm:p-3">
            <motion.div
              initial={{ opacity:.0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex items-center">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2" />
                <div className="text-left">
                  <h2 className="text-xs sm:text-sm font-bold">Entre no Grupo VIP</h2>
                  <p className="text-xs text-white/90 hidden sm:block">Receba ofertas exclusivas e novidades</p>
                </div>
              </div>
              <Link 
                to="/vip" 
                className="bg-white text-imperio-navy font-semibold py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-xs hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Entrar no Grupo
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
