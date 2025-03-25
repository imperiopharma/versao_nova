
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Pill, Heart, Sparkles, TrendingUp, ShoppingBag, BarChart3, Zap, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import components
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandsSection } from '../components/home/BrandsSection';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  const [brands, setBrands] = useState<any>({
    imported: [],
    premium: [],
    national: [],
    various: [],
    categories: [
      { id: 'emagrecedores', name: 'Emagrecedores', icon: <Pill className="w-8 h-8 mb-2 text-white" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: <Heart className="w-8 h-8 mb-2 text-white" /> },
    ],
  });
  
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 'prod1',
      name: 'Suplemento Emagrecedor',
      brand: 'HealthMax',
      price: 89.90,
      image: 'https://via.placeholder.com/300x300?text=Produto+1',
      category: 'emagrecedores',
      discount: 15
    },
    {
      id: 'prod2',
      name: 'Vitamina C 1000mg',
      brand: 'VitaForce',
      price: 49.90,
      image: 'https://via.placeholder.com/300x300?text=Produto+2',
      category: 'vitaminas',
      discount: 10
    },
    {
      id: 'prod3',
      name: 'Proteína Isolada',
      brand: 'PowerNutrition',
      price: 129.90,
      image: 'https://via.placeholder.com/300x300?text=Produto+3',
      category: 'suplementos',
      discount: 20
    },
    {
      id: 'prod4',
      name: 'Colágeno Hidrolisado',
      brand: 'BeautyHealth',
      price: 79.90,
      image: 'https://via.placeholder.com/300x300?text=Produto+4',
      category: 'beleza',
      discount: 5
    }
  ]);
  
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

  // Categorias com cores vibrantes
  const categories = [
    {
      id: 'emagrecedores',
      title: 'Emagrecedores',
      description: 'Produtos para perda de peso',
      icon: <Zap size={24} />,
      link: '/categoria/emagrecedores',
      color: 'bg-red-500'
    },
    {
      id: 'farmacia',
      title: 'Farmácia',
      description: 'Medicamentos e produtos de saúde',
      icon: <Heart size={24} />,
      link: '/categoria/farmacia',
      color: 'bg-blue-500'
    },
    {
      id: 'suplementos',
      title: 'Suplementos',
      description: 'Vitaminas e suplementos',
      icon: <BarChart3 size={24} />,
      link: '/categoria/suplementos',
      color: 'bg-green-500'
    },
    {
      id: 'ofertas',
      title: 'Ofertas',
      description: 'Promoções especiais',
      icon: <ShoppingBag size={24} />,
      link: '/ofertas',
      color: 'bg-purple-500'
    }
  ];

  // App banner
  const appPromo = {
    title: 'Baixe nosso Aplicativo',
    description: 'Compre mais rápido e tenha acesso a promoções exclusivas',
    icon: <Smartphone size={48} className="text-white mb-4" />,
    buttonText: 'Baixar Agora',
    buttonLink: '#',
    color: 'bg-gradient-to-r from-blue-600 to-blue-800'
  };

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
      
      {/* Categorias em cards coloridos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-6"
      >
        <CategoryCards categories={categories} />
      </motion.div>
      
      {/* Brands Section com animação suave */}
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
      
      {/* Produtos em destaque */}
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FeaturedProducts products={featuredProducts} />
      </motion.div>
      
      {/* App Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-6"
      >
        <div className="section-container">
          <div className={`rounded-xl p-6 md:p-8 ${appPromo.color} text-white text-center`}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {appPromo.icon}
            </motion.div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">{appPromo.title}</h2>
            <p className="mb-4 opacity-90">{appPromo.description}</p>
            <Link 
              to={appPromo.buttonLink} 
              className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-50 transition-colors"
            >
              {appPromo.buttonText}
            </Link>
          </div>
        </div>
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
