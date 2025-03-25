
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { Instagram, Facebook, Twitter, Mail, Phone, Shield, MapPin, Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemAnimation = {
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
  
  // Links rápidos para o footer
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/marcas', label: 'Marcas' },
    { path: '/fretes', label: 'Informações de Frete' },
    { path: '/carrinho', label: 'Carrinho' },
    { path: '/login', label: 'Minha Conta' }
  ];
  
  // Informações de contato
  const contactInfo = [
    { 
      icon: <Phone size={18} className="mt-1 mr-3 text-imperio-light-navy" />,
      title: 'WhatsApp:',
      content: <a href="tel:+5511999999999" className="hover:text-white transition-colors">(11) 99999-9999</a>
    },
    { 
      icon: <Mail size={18} className="mt-1 mr-3 text-imperio-light-navy" />,
      title: 'Email:',
      content: <a href="mailto:contato@imperiopharma.com.br" className="hover:text-white transition-colors">contato@imperiopharma.com.br</a>
    },
    { 
      icon: <MapPin size={18} className="mt-1 mr-3 text-imperio-light-navy" />,
      title: 'Horário de Atendimento:',
      content: <span>Segunda a Sexta: 9h às 18h</span>
    }
  ];
  
  // Vantagens/diferenciais
  const benefits = [
    { icon: <CheckCircle2 size={16} />, text: 'Produtos originais garantidos' },
    { icon: <CheckCircle2 size={16} />, text: 'Entrega expressa para todo o Brasil' },
    { icon: <CheckCircle2 size={16} />, text: 'Atendimento personalizado' },
    { icon: <CheckCircle2 size={16} />, text: 'Pagamento seguro' }
  ];
  
  return (
    <footer className="bg-gradient-to-br from-imperio-navy to-imperio-dark-navy text-white py-16 mt-12 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 opacity-50"></div>
      
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      
      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="section-container relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div variants={itemAnimation} className="md:col-span-5 space-y-6">
            <Logo className="text-white" />
            <p className="text-gray-300 mt-4 max-w-md leading-relaxed">
              Sua fonte confiável para suplementos e produtos farmacêuticos de alta qualidade, com entrega rápida e garantia de originalidade em todo o Brasil.
            </p>
            
            {/* Diferenciais em lista */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="text-imperio-light-navy mr-2">{benefit.icon}</span>
                  <span className="text-sm">{benefit.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110 duration-200"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110 duration-200"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110 duration-200"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemAnimation} className="md:col-span-3 md:ml-auto">
            <h3 className="font-medium text-lg mb-6 flex items-center">
              <Heart size={18} className="mr-2 text-imperio-red opacity-80" />
              Links Rápidos
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-all flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 transition-all group-hover:scale-150 group-hover:bg-blue-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemAnimation} className="md:col-span-4">
            <h3 className="font-medium text-lg mb-6 flex items-center">
              <Mail size={18} className="mr-2 text-imperio-red opacity-80" />
              Contato
            </h3>
            <ul className="space-y-6">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start text-gray-300 group">
                  {info.icon}
                  <div>
                    <span className="block text-white font-medium mb-1 group-hover:text-imperio-light-navy transition-colors">{info.title}</span>
                    {info.content}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemAnimation}
          className="border-t border-gray-700 mt-12 pt-8 text-sm text-gray-400"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center">
              <Shield size={16} className="mr-2" />
              <p>
                &copy; {new Date().getFullYear()} Império Pharma. Todos os direitos reservados.
              </p>
            </div>
            <p className="max-w-md">
              Os produtos vendidos no site são destinados exclusivamente para maiores de 18 anos. 
              Consulte seu médico antes de utilizar qualquer suplemento.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
