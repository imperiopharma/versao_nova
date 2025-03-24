
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

// Import components
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandsSection } from '../components/home/BrandsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  // Brand data - would be fetched from API in a real app
  const brands = {
    imported: [
      { id: 'dragon-pharma', name: 'Dragon Pharma', logo: 'https://via.placeholder.com/150x100?text=Dragon+Pharma' },
      { id: 'universal-nutrition', name: 'Universal Nutrition', logo: 'https://via.placeholder.com/150x100?text=Universal+Nutrition' },
      { id: 'dymatize', name: 'Dymatize', logo: 'https://via.placeholder.com/150x100?text=Dymatize' },
      { id: 'optimum', name: 'Optimum Nutrition', logo: 'https://via.placeholder.com/150x100?text=Optimum' },
      { id: 'muscletech', name: 'MuscleTech', logo: 'https://via.placeholder.com/150x100?text=MuscleTech' },
    ],
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
    various: [
      { id: 'vitafor', name: 'Vitafor', logo: 'https://via.placeholder.com/150x100?text=Vitafor' },
      { id: 'integral-medica', name: 'Integral Médica', logo: 'https://via.placeholder.com/150x100?text=Integral+Medica' },
      { id: 'midway', name: 'Midway', logo: 'https://via.placeholder.com/150x100?text=Midway' },
      { id: 'probiotica', name: 'Probiótica', logo: 'https://via.placeholder.com/150x100?text=Probiotica' },
      { id: 'max-titanium', name: 'Max Titanium', logo: 'https://via.placeholder.com/150x100?text=Max+Titanium' },
    ],
    categories: [
      { id: 'cbd', name: 'CBD', icon: <Pill className="w-8 h-8 mb-2" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: <Heart className="w-8 h-8 mb-2" /> },
      { id: 'sarms', name: 'SARMs', icon: <Tablet className="w-8 h-8 mb-2" /> },
      { id: 'emagrecedores', name: 'Emagrecedores', icon: <Pill className="w-8 h-8 mb-2" /> },
      { id: 'anabolizantes', name: 'Anabolizantes', icon: <Tablet className="w-8 h-8 mb-2" /> },
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

  // Promotional cards - updated to match the reference image
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
      icon: <ShoppingBag size={20} />,
      link: '/categoria/farmacia',
      color: 'bg-blue-50'
    },
    {
      id: 'mais-vendidos',
      title: 'Mais Vendidos',
      description: 'Conheça os produtos preferidos de nossos clientes.',
      icon: <TrendingUp size={20} />,
      link: '/mais-vendidos',
      color: 'bg-blue-50'
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Produtos de altíssima qualidade e eficácia comprovada.',
      icon: <Award size={20} />,
      link: '/premium',
      color: 'bg-amber-50'
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
    },
    {
      id: 'testosterona',
      name: 'Testosterona 200mg',
      brand: 'Prime Labs',
      originalPrice: 259.90,
      salePrice: 219.90,
      image: 'https://via.placeholder.com/150x150?text=Testosterona'
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <HeroBanner slides={heroSlides} />
      
      {/* Promotional Cards - Right after banner */}
      <PromoCardsSection cards={promoCards} />
      
      {/* Brands Section */}
      <BrandsSection 
        imported={brands.imported}
        premium={brands.premium}
        national={brands.national}
        various={brands.various}
        categories={brands.categories}
      />
      
      {/* Flash Sale Section */}
      <FlashSaleSection items={flashSaleItems} />
      
      {/* Newsletter & Social Media */}
      <NewsletterSection />
    </Layout>
  );
};
