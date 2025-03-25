
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Pill, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Import components
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandsSection } from '../components/home/BrandsSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  const [brands, setBrands] = useState<any>({
    imported: [],
    premium: [],
    national: [],
    various: [],
    categories: [
      { id: 'emagrecedores', name: 'Emagrecedores', icon: <Pill className="w-8 h-8 mb-2" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: <Heart className="w-8 h-8 mb-2" /> },
    ],
  });
  
  // Buscar dados do Supabase ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar marcas
        const { data: brandsData, error: brandsError } = await supabase
          .from('brands')
          .select('*')
          .eq('status', 'active');
        
        if (brandsError) throw brandsError;
        
        // Organizar marcas por categoria
        const importedBrands = brandsData
          .filter(brand => brand.category === 'imported')
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        const premiumBrands = brandsData
          .filter(brand => brand.category === 'premium')
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        const nationalBrands = brandsData
          .filter(brand => brand.category === 'national')
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        const variousBrands = brandsData
          .filter(brand => brand.category === 'various' || !brand.category)
          .map(brand => ({
            id: brand.id,
            name: brand.name,
            logo: brand.logo_url || `https://via.placeholder.com/150x100?text=${brand.name}`
          }));
        
        setBrands({
          ...brands,
          imported: importedBrands,
          premium: premiumBrands,
          national: nationalBrands,
          various: variousBrands
        });
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    
    fetchData();
  }, []);

  // Hero banner slides for carousel - apenas imagens
  const heroSlides = [
    {
      image: "https://via.placeholder.com/1200x800?text=Slide+1",
    },
    {
      image: "https://via.placeholder.com/1200x800?text=Slide+2",
    },
    {
      image: "https://via.placeholder.com/1200x800?text=Slide+3",
    }
  ];

  // Apenas 2 cards promocionais: Emagrecedores e Farmácia
  const promoCards = [
    {
      id: 'emagrecedores',
      title: 'Emagrecedores',
      description: 'Soluções eficazes para auxiliar no seu processo de emagrecimento.',
      icon: <Pill size={20} />,
      link: '/categoria/emagrecedores',
      color: 'bg-blue-50'
    },
    {
      id: 'farmacia',
      title: 'Farmácia',
      description: 'Produtos farmacêuticos essenciais para o seu bem-estar e saúde.',
      icon: <Heart size={20} />,
      link: '/categoria/farmacia',
      color: 'bg-blue-50'
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <HeroBanner slides={heroSlides} />
      
      {/* Promotional Cards - Apenas 2 cards */}
      <PromoCardsSection cards={promoCards} />
      
      {/* Brands Section - Mostrando todas as marcas */}
      <BrandsSection 
        imported={brands.imported}
        premium={brands.premium}
        national={brands.national}
        various={brands.various}
        categories={brands.categories}
      />
      
      {/* Newsletter & Social Media */}
      <NewsletterSection />
    </Layout>
  );
};
