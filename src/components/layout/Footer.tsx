
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { Instagram, Facebook, Twitter, Mail, Phone, Shield, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <footer className="bg-gradient-to-r from-imperio-navy to-imperio-dark-navy text-white py-16 mt-12 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 opacity-50"></div>
      
      <div className="absolute -right-32 -top-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <motion.div variants={fadeIn} className="space-y-6">
            <Logo className="text-white" />
            <p className="text-gray-300 mt-4 max-w-xs leading-relaxed">
              Sua fonte confiável para suplementos e produtos farmacêuticos de alta qualidade, com entrega rápida e garantia de originalidade.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="md:ml-auto">
            <h3 className="font-medium text-lg mb-6 flex items-center">
              <Heart size={18} className="mr-2 text-imperio-red opacity-80" />
              Links Rápidos
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marcas" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Marcas
                </Link>
              </li>
              <li>
                <Link to="/fretes" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Informações de Frete
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Carrinho
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Minha Conta
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <h3 className="font-medium text-lg mb-6 flex items-center">
              <Mail size={18} className="mr-2 text-imperio-red opacity-80" />
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <Phone size={18} className="mt-1 mr-3 text-gray-400" />
                <div>
                  <span className="block text-white font-medium mb-1">WhatsApp:</span>
                  <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                    (11) 99999-9999
                  </a>
                </div>
              </li>
              <li className="flex items-start text-gray-300">
                <Mail size={18} className="mt-1 mr-3 text-gray-400" />
                <div>
                  <span className="block text-white font-medium mb-1">Email:</span>
                  <a href="mailto:contato@imperiopharma.com.br" className="hover:text-white transition-colors">
                    contato@imperiopharma.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start text-gray-300">
                <MapPin size={18} className="mt-1 mr-3 text-gray-400" />
                <div>
                  <span className="block text-white font-medium mb-1">Horário de Atendimento:</span>
                  <span>Segunda a Sexta: 9h às 18h</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-8 text-sm text-gray-400"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center">
              <Shield size={16} className="mr-2" />
              <p>
                &copy; {new Date().getFullYear()} Império Pharma. Todos os direitos reservados.
              </p>
            </div>
            <p>
              Os produtos vendidos no site são destinados exclusivamente para maiores de 18 anos.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
