
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
import { AppBanner } from '../components/home/AppBanner';
import { PromoHeader } from '../components/home/PromoHeader';
import { useHero } from '@/hooks/useHero';
import { useHomeData } from '@/hooks/useHomeData';
import { useProducts } from '@/hooks/useProducts';
import { useBrands } from '@/hooks/useBrands';
import { useFaq } from '@/hooks/useFaq';
import { mockCategories } from '@/data/mock/categories';
import { Category } from '@/types/category';

export const HomePage: React.FC = () => {
  const { heroData } = useHero();
  const { homeData } = useHomeData();
  const { featuredProducts, flashSaleItems } = useProducts();
  const { brands } = useBrands();
  const { faqItems } = useFaq();
  
  const categories: Category[] = mockCategories;

  return (
    <Layout>
      {homeData.showPromoHeader && (
        <PromoHeader 
          text={homeData.promoHeaderText || "Frete grátis em compras acima de R$ 200,00"}
        />
      )}
      
      <HeroBanner 
        title={heroData.title}
        subtitle={heroData.subtitle}
        ctaText={heroData.ctaText}
        ctaLink={heroData.ctaLink}
        backgroundImage={heroData.backgroundImage}
      />
      
      <CategoryCards categories={categories} />
      
      <FeaturedProducts 
        title="Produtos em Destaque"
        subtitle="Conheça nossos produtos mais vendidos"
        products={featuredProducts}
      />
      
      <FlashSaleSection 
        title="Ofertas Imperdíveis"
        subtitle="Por tempo limitado"
        items={flashSaleItems}
      />
      
      <BrandsSection 
        title="Nossas Marcas" 
        brands={brands}
      />
      
      <GuaranteesSection />
      
      <PromoCardsSection />
      
      {homeData.showVipSection && (
        <VipMembershipSection />
      )}
      
      <AboutSection />
      
      <LocationSection />
      
      <FaqSection 
        title="Perguntas Frequentes"
        items={faqItems}
      />
      
      <NewsletterSection />
      
      {homeData.showAppBanner && (
        <AppBanner />
      )}
    </Layout>
  );
};
