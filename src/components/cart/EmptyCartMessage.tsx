
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const EmptyCartMessage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-imperio-extra-light-navy flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:10px_10px] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-imperio-navy/5 to-imperio-light-navy/20"></div>
          <ShoppingBag size={40} className="text-imperio-navy relative z-10" />
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-imperio-navy to-imperio-light-navy bg-clip-text text-transparent mb-4">
        Seu carrinho está vazio
      </h1>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Navegue pelos nossos produtos e adicione-os ao seu carrinho para começar sua jornada de compras.
      </p>
      
      <Button asChild className="bg-gradient-to-r from-imperio-navy to-imperio-light-navy hover:brightness-110 text-white px-6 py-6 h-auto rounded-xl relative overflow-hidden group">
        <Link to="/">
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0 -translate-x-full animate-shimmer"></span>
          <span className="flex items-center relative z-10">
            <span>Explorar Produtos</span>
            <ArrowRight size={18} className="ml-2" />
          </span>
        </Link>
      </Button>
    </motion.div>
  );
};
