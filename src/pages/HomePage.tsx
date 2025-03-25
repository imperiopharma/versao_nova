import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Pill, Heart, BarChart3, ShoppingBag, Zap, PhoneCall, Truck, Map, Calendar, CreditCard } from 'lucide-react';
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
  
  const flashSaleItems = [
    {
      id: 'combo1',
      name: 'Kit Emagrecedor - 3 produtos',
      brand: 'Império Pharma',
      price: 199.90,
      originalPrice: 299.90,
      image: 'https://via.placeholder.com/300x300?text=Kit+1'
    },
    {
      id: 'combo2',
      name: 'Kit Imunidade - Vitaminas Essenciais',
      brand: 'Império Pharma',
      price: 149.90,
      originalPrice: 199.90,
      image: 'https://via.placeholder.com/300x300?text=Kit+2'
    }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: brandsData, error: brandsError } = await supabase
          .from('brands')
          .select('*')
          .eq('status', 'active');
        
        if (brandsError) throw brandsError;
        
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

  const serviceCards = [
    {
      id: 'atendimento',
      title: 'Atendimento',
      description: 'Suporte disponível 24h',
      icon: <PhoneCall size={20} />,
      link: '/atendimento',
      color: 'bg-blue-100'
    },
    {
      id: 'entrega',
      title: 'Entrega Rápida',
      description: 'Para todo o Brasil',
      icon: <Truck size={20} />,
      link: '/entregas',
      color: 'bg-green-100'
    },
    {
      id: 'localizacao',
      title: 'Localização',
      description: 'Estamos no Paraguai',
      icon: <Map size={20} />,
      link: '/onde-estamos',
      color: 'bg-yellow-100'
    },
    {
      id: 'pagamento',
      title: 'Pagamento',
      description: 'Várias formas disponíveis',
      icon: <CreditCard size={20} />,
      link: '/pagamentos',
      color: 'bg-red-100'
    }
  ];

  const faqItems = [
    {
      question: 'Como fazer um pedido no site?',
      answer: 'Navegue pelo catálogo, adicione produtos ao carrinho e siga o processo de checkout para finalizar sua compra.'
    },
    {
      question: 'Quais são as formas de pagamento?',
      answer: 'Aceitamos cartões de crédito, PIX, boleto bancário e transferência bancária.'
    },
    {
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo de entrega varia conforme sua localização, geralmente entre 7 a 15 dias úteis.'
    }
  ];

  return (
    <Layout>
      <PromoHeader />
      
      <HeroBanner slides={heroSlides} />
      
      <CategoryCards categories={categories} />
      
      <PromoCardsSection cards={serviceCards} />
      
      <FeaturedProducts products={featuredProducts} />
      
      <FlashSaleSection items={flashSaleItems} />
      
      <BrandsSection 
        premium={brands.premium}
        national={brands.national}
        imported={brands.imported}
        various={brands.various}
        categories={brands.categories}
      />
      
      <VipMembershipSection />
      
      <AboutSection />
      
      <FaqSection items={faqItems} />
      
      <LocationSection />
      
      <NewsletterSection />
    </Layout>
  );
};
