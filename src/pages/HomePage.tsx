
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BrandsSection } from '../components/home/BrandsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { GuaranteesSection } from '../components/home/GuaranteesSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { AboutSection } from '../components/home/AboutSection';
import { LocationSection } from '../components/home/LocationSection';
import { FaqSection } from '../components/home/FaqSection';
import { VipMembershipSection } from '../components/home/VipMembershipSection';
import { AvailableCoupons } from '../components/home/AvailableCoupons';
import { PromoHeader } from '../components/home/PromoHeader';
import { useHomeData } from '@/hooks/useHomeData';
import { VirtualAssistant } from '@/components/chatbot/VirtualAssistant';

export const HomePage: React.FC = () => {
  const { 
    heroSlides, 
    featuredProducts, 
    flashSaleItems, 
    categories, 
    serviceCards, 
    faqItems, 
    homeData 
  } = useHomeData();
  
  // Mapeamento de componentes de seção para renderização dinâmica
  const sectionComponents: Record<string, React.ReactNode> = {
    categories: homeData.showSections.categories && <CategoryCards categories={categories} />,
    featuredProducts: homeData.showSections.featuredProducts && <FeaturedProducts products={featuredProducts} />,
    coupons: homeData.showSections.coupons && <AvailableCoupons />,
    flashSale: homeData.showSections.flashSale && <FlashSaleSection items={flashSaleItems} />,
    brands: homeData.showSections.brands && <BrandsSection />,
    guarantees: homeData.showSections.guarantees && <GuaranteesSection />,
    promoCards: homeData.showSections.promoCards && <PromoCardsSection cards={serviceCards} />,
    vip: homeData.showVipSection && <VipMembershipSection />,
    about: homeData.showSections.about && <AboutSection />,
    location: homeData.showSections.location && <LocationSection />,
    faq: homeData.showSections.faq && <FaqSection items={faqItems} />,
    newsletter: homeData.showSections.newsletter && <NewsletterSection />
  };

  return (
    <Layout>
      {homeData.showPromoHeader && <PromoHeader text={homeData.promoHeaderText} />}
      
      <HeroBanner slides={heroSlides} />
      
      {/* Renderização dinâmica das seções baseada na ordem configurada */}
      {homeData.sectionsOrder.map((sectionKey, index) => (
        <React.Fragment key={`section-${sectionKey}-${index}`}>
          {sectionComponents[sectionKey]}
        </React.Fragment>
      ))}
      
      {/* Assistente Virtual */}
      <VirtualAssistant />
    </Layout>
  );
};
