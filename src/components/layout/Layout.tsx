
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
  
  // Skip mobile navbar on admin pages
  const isAdminPage = location.pathname.includes('/admin');
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-50">
      {!isAdminPage && <Header />}
      
      <main className={`flex-grow w-full ${!isAdminPage ? 'pt-14 sm:pt-16' : ''} ${withPadding && !isAdminPage ? 'pb-16 md:pb-8' : ''} overflow-x-hidden`}>
        {children}
      </main>
      
      {!isAdminPage && <Footer />}
      
      {!isCheckoutPage && !isAdminPage && <MobileNavBar />}
    </div>
  );
};
