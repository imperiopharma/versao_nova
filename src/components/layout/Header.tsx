
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-md bg-white/80 shadow-md' : 'bg-white py-5'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="animate-fade-in">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/marcas" 
              className="font-medium hover:text-imperio-navy transition-colors relative group"
            >
              <span>Marcas</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/fretes" 
              className="font-medium hover:text-imperio-navy transition-colors relative group"
            >
              <span>Fretes</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => setCategoryMenuOpen(true)}
              onMouseLeave={() => setCategoryMenuOpen(false)}
            >
              <button className="flex items-center space-x-1 font-medium hover:text-imperio-navy transition-colors">
                <span>Categorias</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${categoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {categoryMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-elevation z-50 overflow-hidden border border-gray-100"
                  >
                    <div className="py-3">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-imperio-navy via-blue-500 to-imperio-light-navy"></div>
                      
                      <Link 
                        to="/categoria/injetaveis" 
                        className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                        Produtos Injetáveis
                      </Link>
                      <Link 
                        to="/categoria/orais" 
                        className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                        Produtos Orais
                      </Link>
                      <Link 
                        to="/categoria/emagrecedores" 
                        className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                        Emagrecedores
                      </Link>
                      <Link 
                        to="/categoria/cbd" 
                        className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                        CBD
                      </Link>
                      <Link 
                        to="/categoria/farmacia" 
                        className="flex items-center px-4 py-2.5 hover:bg-imperio-extra-light-navy transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                        Produtos de Farmácia
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center space-x-5">
            <button 
              className="hover:text-imperio-navy transition-colors relative group" 
              aria-label="Pesquisar"
            >
              <Search size={20} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <Link 
              to="/carrinho" 
              className="relative hover:text-imperio-navy transition-colors group" 
              aria-label="Carrinho"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-imperio-red text-white text-xs rounded-full animate-pulse-subtle">
                  {itemCount}
                </span>
              )}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/login" 
              className="hover:text-imperio-navy transition-colors group relative"
              aria-label="Minha Conta"
            >
              <User size={20} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-imperio-navy group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <button 
              className="md:hidden hover:text-imperio-navy transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-elevation z-50 overflow-hidden"
          >
            <nav className="py-6 px-6 flex flex-col space-y-5">
              <Link 
                to="/marcas" 
                className="py-2 font-medium hover:text-imperio-navy transition-colors flex items-center"
              >
                <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                Marcas
              </Link>
              <Link 
                to="/fretes" 
                className="py-2 font-medium hover:text-imperio-navy transition-colors flex items-center"
              >
                <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                Fretes
              </Link>
              <div className="py-2 space-y-3">
                <p className="font-medium flex items-center text-imperio-navy">
                  <span className="w-1.5 h-1.5 bg-imperio-navy rounded-full mr-2.5"></span>
                  Categorias
                </p>
                <div className="pl-4 space-y-3 text-sm border-l-2 border-imperio-extra-light-navy ml-1">
                  <Link 
                    to="/categoria/injetaveis" 
                    className="block py-1 hover:text-imperio-navy transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Produtos Injetáveis
                  </Link>
                  <Link 
                    to="/categoria/orais" 
                    className="block py-1 hover:text-imperio-navy transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Produtos Orais
                  </Link>
                  <Link 
                    to="/categoria/emagrecedores" 
                    className="block py-1 hover:text-imperio-navy transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Emagrecedores
                  </Link>
                  <Link 
                    to="/categoria/cbd" 
                    className="block py-1 hover:text-imperio-navy transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    CBD
                  </Link>
                  <Link 
                    to="/categoria/farmacia" 
                    className="block py-1 hover:text-imperio-navy transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Produtos de Farmácia
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
