
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Pill, Heart, Phone, Truck, CalendarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Import components
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandsSection } from '../components/home/BrandsSection';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { PromoHeader } from '../components/home/PromoHeader';
import { VipMembershipSection } from '../components/home/VipMembershipSection';
import { AboutSection } from '../components/home/AboutSection';
import { LocationSection } from '../components/home/LocationSection';
import { FaqSection } from '../components/home/FaqSection';
import { GuaranteesSection } from '../components/home/GuaranteesSection';
import { useHomeData } from '@/hooks/useHomeData';

export const HomePage: React.FC = () => {
  const { 
    brands, 
    featuredProducts, 
    flashSaleItems, 
    heroSlides, 
    categories, 
    serviceCards, 
    faqItems 
  } = useHomeData();
  
  return (
    <Layout>
      <PromoHeader />
      
      <HeroBanner slides={heroSlides} />
      
      {/* Parte 1: Categorias e Serviços */}
      <div className="py-2">
        <CategoryCards categories={categories} />
        <PromoCardsSection cards={serviceCards} />
      </div>
      
      {/* Parte 2: Marcas */}
      <BrandsSection 
        premium={brands.premium}
        national={brands.national}
        imported={brands.imported}
        various={brands.various}
        categories={brands.categories}
      />
      
      {/* Parte 3: Produtos */}
      <div className="py-2">
        <FeaturedProducts products={featuredProducts} />
        <FlashSaleSection items={flashSaleItems} />
      </div>
      
      {/* Parte 4: Garantias */}
      <GuaranteesSection />
      
      {/* Parte 5: Informações Adicionais */}
      <div className="py-2">
        <VipMembershipSection />
        <div className="py-2"></div>
        <AboutSection />
        <div className="py-2"></div>
        <LocationSection />
        <div className="py-2"></div>
        <FaqSection items={faqItems} />
      </div>
      
      {/* Parte 6: Newsletter */}
      <NewsletterSection />
    </Layout>
  );
};
