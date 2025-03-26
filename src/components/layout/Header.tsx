
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { useCart } from '../../contexts/CartContext';
import { DesktopNav } from './header/DesktopNav';
import { MobileMenu } from './header/MobileMenu';
import { HeaderActions } from './header/HeaderActions';

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-md bg-white/95 shadow-md' : 'bg-white py-5'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="animate-fade-in">
              <Logo />
            </Link>
          </div>

          <DesktopNav 
            categoryMenuOpen={categoryMenuOpen}
            setCategoryMenuOpen={setCategoryMenuOpen}
          />

          <HeaderActions 
            itemCount={itemCount}
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
          />
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};
