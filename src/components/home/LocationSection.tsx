
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Map, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const LocationSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-3 sm:py-4">
      <div className="section-container">
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-t-lg overflow-hidden h-28 sm:h-48 bg-gray-200 relative">
                {/* Placeholder para o mapa */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <Map size={32} />
                </div>
                
                {/* Overlay de gradiente para melhor contraste */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                
                {/* Informação sobre a localização */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h2 className="text-sm sm:text-lg font-bold mb-0.5">Estamos no Paraguai</h2>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-1">Visite nossa loja física em Ciudad del Este</p>
                </div>
              </div>
              
              <div className="p-3 sm:p-4 flex justify-end">
                <Link 
                  to="/localizacao" 
                  className="text-imperio-red hover:underline text-xs font-medium flex items-center"
                >
                  Ver no mapa
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
