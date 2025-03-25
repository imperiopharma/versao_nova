
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Map } from 'lucide-react';
import { motion } from 'framer-motion';

export const LocationSection: React.FC = () => {
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
              <h2 className="text-xl font-bold text-imperio-navy mb-2">Estamos no Paraguai</h2>
              <p className="text-sm text-gray-600 mb-3">
                Visite nossa loja física em Ciudad del Este e confira nossos produtos
              </p>
              <div className="rounded-lg overflow-hidden h-48 bg-gray-200 mb-3">
                {/* Placeholder para o mapa */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <Map size={32} />
                </div>
              </div>
              <Link 
                to="/localizacao" 
                className="text-imperio-red hover:underline text-sm font-medium"
              >
                Ver no mapa →
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
