
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNavBar } from './MobileNavBar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, withPadding = true }) => {
  const location = useLocation();
  
  // Skip mobile navbar on checkout pages
  const isCheckoutPage = 
    location.pathname.includes('/checkout') || 
    location.pathname.includes('/dados') || 
    location.pathname.includes('/resumo') || 
    location.pathname.includes('/pagamento');
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      
      <main className={`flex-grow w-full pt-16 sm:pt-20 ${withPadding ? 'pb-8' : ''} overflow-x-hidden`}>
        {children}
      </main>
      
      <Footer />
      
      {!isCheckoutPage && <MobileNavBar />}
    </div>
  );
};
