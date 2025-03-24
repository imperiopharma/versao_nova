
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { 
  Heart, 
  Pill, 
  ShoppingBag, 
  Tablet, 
  TrendingUp, 
  Award 
} from 'lucide-react';

// Import new components
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandsSection } from '../components/home/BrandsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { AppBanner } from '../components/home/AppBanner';
import { CategoriesQuickAccess } from '../components/home/CategoriesQuickAccess';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  // Brand data - would be fetched from API in a real app
  const brands = {
    premium: [
      { id: 'king-pharma', name: 'King Pharma', logo: 'https://via.placeholder.com/150x100?text=King+Pharma' },
      { id: 'cooper-pharma', name: 'Cooper Pharma', logo: 'https://via.placeholder.com/150x100?text=Cooper+Pharma' },
      { id: 'muscle-labs', name: 'Muscle Labs', logo: 'https://via.placeholder.com/150x100?text=Muscle+Labs' },
      { id: 'ultra-pharma', name: 'Ultra Pharma', logo: 'https://via.placeholder.com/150x100?text=Ultra+Pharma' },
      { id: 'prime-labs', name: 'Prime Labs', logo: 'https://via.placeholder.com/150x100?text=Prime+Labs' },
    ],
    national: [
      { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/150x100?text=Growth' },
      { id: 'r-pharm', name: 'R.Pharm', logo: 'https://via.placeholder.com/150x100?text=R.Pharm' },
      { id: 'bio-pharma', name: 'Bio Pharma', logo: 'https://via.placeholder.com/150x100?text=Bio+Pharma' },
      { id: 'life-pharma', name: 'Life Pharma', logo: 'https://via.placeholder.com/150x100?text=Life+Pharma' },
      { id: 'max-power', name: 'Max Power', logo: 'https://via.placeholder.com/150x100?text=Max+Power' },
    ],
    categories: [
      { id: 'cbd', name: 'CBD', icon: <Pill className="w-10 h-10 mb-3" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: <Heart className="w-10 h-10 mb-3" /> },
      { id: 'sarms', name: 'SARMs', icon: <Tablet className="w-10 h-10 mb-3" /> },
      { id: 'emagrecedores', name: 'Emagrecedores', icon: <Pill className="w-10 h-10 mb-3" /> },
      { id: 'anabolizantes', name: 'Anabolizantes', icon: <Tablet className="w-10 h-10 mb-3" /> },
    ],
  };

  // Hero banner slides for carousel
  const heroSlides = [
    {
      title: "Sua Saúde, Nossa Missão",
      subtitle: "Produtos farmacêuticos e suplementos de alta qualidade, entregues diretamente à sua porta.",
      image: "https://via.placeholder.com/1200x800?text=Slide+1",
      cta: {
        primary: { text: "Explorar Marcas", link: "/marcas" },
        secondary: { text: "Emagrecedores", link: "/categoria/emagrecedores" }
      }
    },
    {
      title: "Novos Produtos",
      subtitle: "Descubra os lançamentos mais recentes de nossas marcas Premium.",
      image: "https://via.placeholder.com/1200x800?text=Slide+2",
      cta: {
        primary: { text: "Ver Lançamentos", link: "/lancamentos" },
        secondary: { text: "Promoções", link: "/promocoes" }
      }
    },
    {
      title: "Descontos Exclusivos",
      subtitle: "Ofertas especiais por tempo limitado em produtos selecionados.",
      image: "https://via.placeholder.com/1200x800?text=Slide+3",
      cta: {
        primary: { text: "Ver Ofertas", link: "/ofertas" },
        secondary: { text: "Combos", link: "/combos" }
      }
    }
  ];

  // Promotional cards 
  const promoCards = [
    {
      id: 'emagrecedores',
      title: 'Emagrecedores',
      description: 'Soluções eficazes para auxiliar no seu processo de emagrecimento com qualidade e segurança.',
      icon: <Pill size={32} />,
      link: '/categoria/emagrecedores',
      color: 'from-imperio-extra-light-navy'
    },
    {
      id: 'farmacia',
      title: 'Farmácia',
      description: 'Produtos farmacêuticos essenciais para o seu bem-estar e saúde do dia a dia.',
      icon: <ShoppingBag size={32} />,
      link: '/categoria/farmacia',
      color: 'from-imperio-extra-light-navy'
    },
    {
      id: 'trend',
      title: 'Mais Vendidos',
      description: 'Conheça os produtos preferidos de nossos clientes. Qualidade comprovada.',
      icon: <TrendingUp size={32} />,
      link: '/mais-vendidos',
      color: 'from-blue-50'
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Produtos de altíssima qualidade e eficácia, com resultados comprovados.',
      icon: <Award size={32} />,
      link: '/premium',
      color: 'from-amber-50'
    }
  ];

  // Flash sale items
  const flashSaleItems = [
    {
      id: 'oxandrolona',
      name: 'Oxandrolona 15mg',
      brand: 'King Pharma',
      originalPrice: 299.90,
      salePrice: 249.90,
      image: 'https://via.placeholder.com/150x150?text=Oxandrolona'
    },
    {
      id: 'stanozolol',
      name: 'Stanozolol 50mg',
      brand: 'Cooper Pharma',
      originalPrice: 199.90,
      salePrice: 169.90,
      image: 'https://via.placeholder.com/150x150?text=Stanozolol'
    },
    {
      id: 'trembolona',
      name: 'Trembolona 100mg',
      brand: 'Growth',
      originalPrice: 349.90,
      salePrice: 299.90,
      image: 'https://via.placeholder.com/150x150?text=Trembolona'
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <HeroBanner slides={heroSlides} />
      
      {/* Brands Section - First important section */}
      <BrandsSection 
        premium={brands.premium}
        national={brands.national}
        categories={brands.categories}
      />
      
      {/* Flash Sale Section - Highlight products on sale */}
      <FlashSaleSection items={flashSaleItems} />

      {/* Promotional Cards - Features and category highlights */}
      <PromoCardsSection cards={promoCards} />
      
      {/* Mobile App Banner - Encourage app downloads */}
      <AppBanner />

      {/* Categories Quick Access - Optimized for mobile scrolling */}
      <CategoriesQuickAccess categories={brands.categories} />

      {/* Newsletter & Social Media - User engagement section */}
      <NewsletterSection />
    </Layout>
  );
};
