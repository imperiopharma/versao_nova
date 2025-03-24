
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        isScrolled ? 'glass-effect shadow-subtle py-3' : 'bg-transparent py-5'
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
              className="font-medium hover:text-imperio-navy transition-colors underline-animation"
            >
              Marcas
            </Link>
            <Link 
              to="/fretes" 
              className="font-medium hover:text-imperio-navy transition-colors underline-animation"
            >
              Fretes
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium hover:text-imperio-navy transition-colors underline-animation">
                <span>Categorias</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-elevation opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link 
                    to="/categoria/injetaveis" 
                    className="block px-4 py-2 hover:bg-imperio-extra-light-navy transition-colors"
                  >
                    Produtos Injetáveis
                  </Link>
                  <Link 
                    to="/categoria/orais" 
                    className="block px-4 py-2 hover:bg-imperio-extra-light-navy transition-colors"
                  >
                    Produtos Orais
                  </Link>
                  <Link 
                    to="/categoria/emagrecedores" 
                    className="block px-4 py-2 hover:bg-imperio-extra-light-navy transition-colors"
                  >
                    Emagrecedores
                  </Link>
                  <Link 
                    to="/categoria/cbd" 
                    className="block px-4 py-2 hover:bg-imperio-extra-light-navy transition-colors"
                  >
                    CBD
                  </Link>
                  <Link 
                    to="/categoria/farmacia" 
                    className="block px-4 py-2 hover:bg-imperio-extra-light-navy transition-colors"
                  >
                    Produtos de Farmácia
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-5">
            <button 
              className="hover:text-imperio-navy transition-colors" 
              aria-label="Pesquisar"
            >
              <Search size={20} />
            </button>
            
            <Link 
              to="/carrinho" 
              className="relative hover:text-imperio-navy transition-colors" 
              aria-label="Carrinho"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-imperio-red text-white text-xs rounded-full animate-scale-in">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/login" 
              className="hover:text-imperio-navy transition-colors"
              aria-label="Minha Conta"
            >
              <User size={20} />
            </Link>
            
            <button 
              className="md:hidden hover:text-imperio-navy transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-elevation animate-slide-down">
          <nav className="py-4 px-6 flex flex-col space-y-4">
            <Link 
              to="/marcas" 
              className="py-2 font-medium hover:text-imperio-navy transition-colors"
            >
              Marcas
            </Link>
            <Link 
              to="/fretes" 
              className="py-2 font-medium hover:text-imperio-navy transition-colors"
            >
              Fretes
            </Link>
            <div className="py-2 space-y-2">
              <p className="font-medium">Categorias</p>
              <div className="pl-4 space-y-2 text-sm">
                <Link 
                  to="/categoria/injetaveis" 
                  className="block py-1 hover:text-imperio-navy transition-colors"
                >
                  Produtos Injetáveis
                </Link>
                <Link 
                  to="/categoria/orais" 
                  className="block py-1 hover:text-imperio-navy transition-colors"
                >
                  Produtos Orais
                </Link>
                <Link 
                  to="/categoria/emagrecedores" 
                  className="block py-1 hover:text-imperio-navy transition-colors"
                >
                  Emagrecedores
                </Link>
                <Link 
                  to="/categoria/cbd" 
                  className="block py-1 hover:text-imperio-navy transition-colors"
                >
                  CBD
                </Link>
                <Link 
                  to="/categoria/farmacia" 
                  className="block py-1 hover:text-imperio-navy transition-colors"
                >
                  Produtos de Farmácia
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
