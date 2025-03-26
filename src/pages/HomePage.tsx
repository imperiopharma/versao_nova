
import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryCards } from '../components/home/CategoryCards';
import { BrandsSection } from '../components/home/BrandsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { GuaranteesSection } from '../components/home/GuaranteesSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { AboutSection } from '../components/home/AboutSection';
import { LocationSection } from '../components/home/LocationSection';
import { FaqSection } from '../components/home/FaqSection';
import { VipMembershipSection } from '../components/home/VipMembershipSection';
import { PromoHeader } from '../components/home/PromoHeader';
import { useHomeData } from '@/hooks/useHomeData';
import { VirtualAssistant } from '@/components/chatbot/VirtualAssistant';
import { AvailableCoupons } from '@/components/home/AvailableCoupons';
import { AppBanner } from '@/components/home/AppBanner';

export const HomePage: React.FC = () => {
  const { 
    heroSlides, 
    flashSaleItems, 
    categories, 
    serviceCards, 
    faqItems, 
    homeData 
  } = useHomeData();
  
  console.log("HomePage rendering with categories:", categories);
  
  // Garantir que nenhuma categoria é undefined ou null
  const validCategories = categories.filter(cat => cat !== undefined && cat !== null);
  
  useEffect(() => {
    console.log("HomePage mounted with categories:", validCategories.length);
  }, [validCategories]);
  
  return (
    <Layout>
      {homeData.showPromoHeader && <PromoHeader text={homeData.promoHeaderText} />}
      <HeroBanner slides={heroSlides} />
      
      {/* VIP section positioned right after the banner */}
      {homeData.showVipSection && <VipMembershipSection />}
      
      {/* Explicitly rendering CategoryCards with forced visibility */}
      {validCategories.length > 0 && (
        <CategoryCards categories={validCategories} />
      )}
      
      {/* App banner for guarantees */}
      <AppBanner />
      
      {homeData.showSections.flashSale && <FlashSaleSection items={flashSaleItems} />}
      {homeData.showSections.brands && <BrandsSection />}
      
      {homeData.showSections.guarantees && <GuaranteesSection />}
      
      {/* Available coupons section */}
      {homeData.showSections.coupons && <AvailableCoupons />}
      
      {homeData.showSections.about && <AboutSection />}
      {homeData.showSections.location && <LocationSection />}
      {homeData.showSections.faq && <FaqSection items={faqItems} />}
      {homeData.showSections.newsletter && <NewsletterSection />}
      
      <VirtualAssistant />
    </Layout>
  );
};
