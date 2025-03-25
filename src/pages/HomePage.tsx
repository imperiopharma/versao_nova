import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { 
  Heart, 
  Pill, 
  ShoppingBag, 
  Tablet, 
  TrendingUp, 
  Award 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '../components/product/ProductCard';

// Import components
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandsSection } from '../components/home/BrandsSection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { PromoCardsSection } from '../components/home/PromoCardsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  const [brands, setBrands] = useState<any>({
    imported: [],
    premium: [],
    national: [],
    various: [],
    categories: [
      { id: 'cbd', name: 'CBD', icon: <Pill className="w-8 h-8 mb-2" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: <Heart className="w-8 h-8 mb-2" /> },
      { id: 'sarms', name: 'SARMs', icon: <Tablet className="w-8 h-8 mb-2" /> },
      { id: 'emagrecedores', name: 'Emagrecedores', icon: <Pill className="w-8 h-8 mb-2" /> },
      { id: 'anabolizantes', name: 'Anabolizantes', icon: <Tablet className="w-8 h-8 mb-2" /> },
    ],
  });
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar dados do Supabase ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Buscar produtos
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(8);
        
        if (productsError) throw productsError;
        
        const formattedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.original_price,
          image: product.image || 'https://via.placeholder.com/300x300?text=Produto',
          url: `/produto/${product.id}`
        }));
        
        setProducts(formattedProducts);
        
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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

  return (
    <Layout>
      {/* Hero Banner */}
      <HeroBanner slides={heroSlides} />
      
      {/* Promotional Cards - Right after banner */}
      <PromoCardsSection cards={promoCards} />
      
      {/* Produtos Recentes */}
      <div className="section-container py-12">
        <h2 className="text-2xl font-semibold text-imperio-navy mb-6">Produtos Recentes</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-56 rounded-md mb-3"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 w-1/2 rounded mb-2"></div>
                <div className="bg-gray-200 h-5 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum produto disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                url={product.url}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Brands Section */}
      <BrandsSection 
        imported={brands.imported}
        premium={brands.premium}
        national={brands.national}
        various={brands.various}
        categories={brands.categories}
      />
      
      {/* FlashSaleSection com verificação para garantir que temos produtos */}
      {products.length > 0 && (
        <FlashSaleSection items={products.slice(0, 4).map(product => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image
        }))} />
      )}
      
      {/* Newsletter & Social Media */}
      <NewsletterSection />
    </Layout>
  );
};
