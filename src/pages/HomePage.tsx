
import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryCards } from '@/components/home/CategoryCards';
import { BrandsSection } from '@/components/home/BrandsSection';
import { FlashSaleSection } from '@/components/home/FlashSaleSection';
import { GuaranteesSection } from '@/components/home/GuaranteesSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { AboutSection } from '@/components/home/AboutSection';
import { LocationSection } from '@/components/home/LocationSection';
import { FaqSection } from '@/components/home/FaqSection';
import { VipMembershipSection } from '@/components/home/VipMembershipSection';
import { PromoHeader } from '@/components/home/PromoHeader';
import { useHomeData } from '@/hooks/useHomeData';
import { VirtualAssistant } from '@/components/chatbot/VirtualAssistant';
import { AvailableCoupons } from '@/components/home/AvailableCoupons';
import { AppBanner } from '@/components/home/AppBanner';
import { PromoCardsSection } from '@/components/home/PromoCardsSection';

/**
 * Página inicial da loja
 * Composta por múltiplas seções que são renderizadas com base na configuração
 */
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
      {/* Cabeçalho promocional */}
      {homeData.showPromoHeader && (
        <PromoHeader text={homeData.promoHeaderText} />
      )}
      
      {/* Banner principal */}
      <HeroBanner slides={heroSlides} />
      
      {/* VIP section positioned right after the banner */}
      {homeData.showVipSection && <VipMembershipSection />}
      
      {/* Seção de categorias */}
      <CategoryCards categories={validCategories} />
      
      {/* Banner do aplicativo */}
      {homeData.showAppBanner && <AppBanner />}
      
      {/* Seções condicionais baseadas na configuração */}
      {homeData.showSections.flashSale && (
        <FlashSaleSection items={flashSaleItems} />
      )}
      
      {homeData.showSections.brands && <BrandsSection />}
      
      {homeData.showSections.guarantees && <GuaranteesSection />}
      
      {homeData.showSections.promoCards && serviceCards && (
        <PromoCardsSection cards={serviceCards} />
      )}
      
      {/* Available coupons section */}
      {homeData.showSections.coupons && <AvailableCoupons />}
      
      {homeData.showSections.about && <AboutSection />}
      
      {homeData.showSections.location && <LocationSection />}
      
      {homeData.showSections.faq && <FaqSection items={faqItems} />}
      
      {homeData.showSections.newsletter && <NewsletterSection />}
      
      {/* Assistente virtual sempre disponível */}
      <VirtualAssistant />
    </Layout>
  );
};
