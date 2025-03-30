
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryCards } from '@/components/home/CategoryCards';
import { BrandsSection } from '@/components/home/BrandsSection';
import { FlashSaleSection } from '@/components/home/FlashSaleSection';
import { VirtualAssistant } from '@/components/chatbot/VirtualAssistant';
import { useHomeData } from '@/hooks/useHomeData';

/**
 * Página inicial da loja
 * Composta por múltiplas seções que são renderizadas com base na configuração
 */
export const HomePage: React.FC = () => {
  const { 
    heroSlides, 
    flashSaleItems, 
    categories, 
    homeData 
  } = useHomeData();
  
  console.log("HomePage rendering with categories:", categories);
  
  // Garantir que nenhuma categoria é undefined ou null
  const validCategories = categories.filter(cat => cat !== undefined && cat !== null);
  
  return (
    <Layout>
      {/* Banner principal */}
      <HeroBanner slides={heroSlides} />
      
      {/* Seção de categorias */}
      <CategoryCards categories={validCategories} />
      
      {/* Seção de combos */}
      {homeData.showSections.flashSale && (
        <FlashSaleSection items={flashSaleItems} />
      )}
      
      {/* Seção de marcas - sempre visível */}
      <BrandsSection />
      
      {/* Assistente virtual sempre disponível */}
      <VirtualAssistant />
    </Layout>
  );
};
