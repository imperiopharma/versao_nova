
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryCards } from '../components/home/CategoryCards';
import { BrandsSection } from '../components/home/BrandsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { GuaranteesSection } from '../components/home/GuaranteesSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { AboutSection } from '../components/home/AboutSection';
import { LocationSection } from '../components/home/LocationSection';
import { FaqSection } from '../components/home/FaqSection';
import { VipMembershipSection } from '../components/home/VipMembershipSection';
import { PromoHeader } from '../components/home/PromoHeader';
import { useHomeData } from '@/hooks/useHomeData';
import { VirtualAssistant } from '@/components/chatbot/VirtualAssistant';

export const HomePage: React.FC = () => {
  const { 
    heroSlides, 
    flashSaleItems, 
    categories, 
    serviceCards, 
    faqItems, 
    homeData 
  } = useHomeData();
  
  return (
    <Layout>
      {homeData.showPromoHeader && <PromoHeader text={homeData.promoHeaderText} />}
      <HeroBanner slides={heroSlides} />
      
      {homeData.showSections.categories && <CategoryCards categories={categories} />}
      
      {/* Posicionando a seção de garantias ENTRE categorias e produtos em destaque */}
      {homeData.showSections.guarantees && <GuaranteesSection />}
      
      {homeData.showSections.flashSale && <FlashSaleSection items={flashSaleItems} />}
      {homeData.showSections.brands && <BrandsSection />}
      
      {homeData.showVipSection && <VipMembershipSection />}
      {homeData.showSections.about && <AboutSection />}
      {homeData.showSections.location && <LocationSection />}
      {homeData.showSections.faq && <FaqSection items={faqItems} />}
      {homeData.showSections.newsletter && <NewsletterSection />}
      
      <VirtualAssistant />
    </Layout>
  );
};
