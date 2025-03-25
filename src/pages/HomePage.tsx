
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Pill, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

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
      { id: 'emagrecedores', name: 'Emagrecedores', icon: <Pill className="w-8 h-8 mb-2 text-imperio-navy" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: <Heart className="w-8 h-8 mb-2 text-imperio-navy" /> },
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

  // Hero banner slides para o carrossel
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

  // Cards promocionais: Emagrecedores e Farmácia com ícones modernos
  const promoCards = [
    {
      id: 'emagrecedores',
      title: 'Emagrecedores',
      description: 'Soluções eficazes para auxiliar no seu processo de emagrecimento.',
      icon: <Pill size={20} />,
      link: '/categoria/emagrecedores',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    {
      id: 'farmacia',
      title: 'Farmácia',
      description: 'Produtos farmacêuticos essenciais para o seu bem-estar e saúde.',
      icon: <Heart size={20} />,
      link: '/categoria/farmacia',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    {
      id: 'novidades',
      title: 'Novidades',
      description: 'Conheça os últimos lançamentos e produtos mais recentes.',
      icon: <Sparkles size={20} />,
      link: '/categoria/novidades',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    {
      id: 'ofertas',
      title: 'Ofertas',
      description: 'Aproveite as melhores promoções e descontos especiais.',
      icon: <TrendingUp size={20} />,
      link: '/ofertas',
      color: 'bg-gradient-to-br from-blue-50 to-blue-100'
    }
  ];

  // Container animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <Layout>
      {/* Hero Banner com animação de entrada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroBanner slides={heroSlides} />
      </motion.div>
      
      {/* Brands Section com animação suave - Movida para cima */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BrandsSection 
          imported={brands.imported}
          premium={brands.premium}
          national={brands.national}
          various={brands.various}
          categories={brands.categories}
        />
      </motion.div>
      
      {/* Promotional Cards com efeito de stagger */}
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <PromoCardsSection cards={promoCards} />
      </motion.div>
      
      {/* Newsletter Section com animação de fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <NewsletterSection />
      </motion.div>
      
      {/* Elementos decorativos */}
      <div className="fixed top-40 left-10 w-40 h-40 bg-imperio-navy/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-40 right-10 w-60 h-60 bg-imperio-light-navy/5 rounded-full blur-3xl -z-10"></div>
    </Layout>
  );
};
