import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Pill, Heart, Sparkles, TrendingUp, ShoppingBag, BarChart3, Zap, Smartphone, PhoneCall, Truck, Map, Calendar, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

// Import components
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandsSection } from '../components/home/BrandsSection';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';

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

  // Cards de serviços
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

  // FAQ items
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
      {/* Banner principal */}
      <div className="bg-imperio-navy text-white p-4 sm:text-center flex justify-center items-center">
        <div className="max-w-screen-xl flex flex-col sm:flex-row justify-center items-center gap-2">
          <Truck size={18} className="shrink-0" />
          <p className="text-sm">Frete grátis para compras acima de R$ 500,00</p>
          <div className="hidden sm:block">|</div>
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="shrink-0" />
            <p className="text-sm">Até 12x sem juros no cartão</p>
          </div>
        </div>
      </div>

      {/* Logo e Título */}
      <div className="section-container py-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-imperio-navy">
            <span className="text-imperio-navy">Império</span>
            <span className="text-imperio-red">Pharma</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">A sua farmácia online</p>
        </div>
      </div>
      
      {/* Categorias em cards coloridos */}
      <CategoryCards categories={categories} />
      
      {/* Service Cards */}
      <PromoCardsSection cards={serviceCards} />
      
      {/* Produtos em destaque */}
      <FeaturedProducts products={featuredProducts} />
      
      {/* VIP Membership */}
      <section className="py-4">
        <div className="section-container">
          <Card className="bg-imperio-navy text-white overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-lg font-bold mb-2">Entre no Grupo VIP</h2>
                <p className="text-sm mb-3">Receba ofertas exclusivas, descontos e atualizações sobre novos produtos</p>
                <Link 
                  to="/vip" 
                  className="bg-white text-imperio-navy font-semibold py-2 px-4 rounded-full text-sm hover:bg-gray-100 transition-colors"
                >
                  Entrar no Grupo VIP
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Sobre Nós */}
      <section className="py-4">
        <div className="section-container">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-imperio-navy mb-2">Sobre Nós</h2>
              <p className="text-sm text-gray-600 mb-3">
                Somos uma empresa especializada na importação e distribuição de produtos farmacêuticos, suplementos e cosméticos de alta qualidade. Com anos de experiência no mercado, garantimos produtos originais com preços acessíveis.
              </p>
              <Link 
                to="/sobre" 
                className="text-imperio-red hover:underline text-sm font-medium"
              >
                Saiba mais →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-4">
        <div className="section-container">
          <h2 className="text-xl font-bold text-imperio-navy mb-4">Perguntas Frequentes</h2>
          
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-imperio-navy text-sm mb-2">{item.question}</h3>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Link 
              to="/faq" 
              className="text-imperio-red hover:underline text-sm font-medium"
            >
              Ver todas as perguntas →
            </Link>
          </div>
        </div>
      </section>

      {/* Mapa e Localização */}
      <section className="py-4">
        <div className="section-container">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-imperio-navy mb-2">Estamos no Paraguai</h2>
              <p className="text-sm text-gray-600 mb-3">
                Visite nossa loja física em Ciudad del Este e confira nossos produtos
              </p>
              <div className="rounded-lg overflow-hidden h-48 bg-gray-200 mb-3">
                {/* Placeholder para o mapa */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <Map size={32} />
                </div>
              </div>
              <Link 
                to="/localizacao" 
                className="text-imperio-red hover:underline text-sm font-medium"
              >
                Ver no mapa →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </Layout>
  );
};
