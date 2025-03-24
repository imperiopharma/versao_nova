import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Pill, ShoppingBag, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HomePage: React.FC = () => {
  // Brand data - would be fetched from API in a real app
  const brands = {
    premium: [
      { id: 'king-pharma', name: 'King Pharma', logo: 'https://via.placeholder.com/150x100?text=King+Pharma' },
      { id: 'cooper-pharma', name: 'Cooper Pharma', logo: 'https://via.placeholder.com/150x100?text=Cooper+Pharma' },
      { id: 'muscle-labs', name: 'Muscle Labs', logo: 'https://via.placeholder.com/150x100?text=Muscle+Labs' },
    ],
    national: [
      { id: 'growth', name: 'Growth', logo: 'https://via.placeholder.com/150x100?text=Growth' },
      { id: 'r-pharm', name: 'R.Pharm', logo: 'https://via.placeholder.com/150x100?text=R.Pharm' },
      { id: 'bio-pharma', name: 'Bio Pharma', logo: 'https://via.placeholder.com/150x100?text=Bio+Pharma' },
      { id: 'life-pharma', name: 'Life Pharma', logo: 'https://via.placeholder.com/150x100?text=Life+Pharma' },
    ],
    categories: [
      { id: 'cbd', name: 'CBD', icon: <Pill className="w-10 h-10 mb-3" /> },
      { id: 'farmacia', name: 'Produtos de Farmácia', icon: <Heart className="w-10 h-10 mb-3" /> },
      { id: 'sarms', name: 'SARMs', icon: <Tablet className="w-10 h-10 mb-3" /> },
    ],
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[80vh] min-h-[600px] bg-imperio-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-imperio-navy to-imperio-navy/70"></div>
        <div className="relative h-full flex items-center">
          <div className="section-container">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-slide-up">
                Sua Saúde, Nossa Missão
              </h1>
              <p className="mt-6 text-lg text-gray-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Produtos farmacêuticos e suplementos de alta qualidade, entregues diretamente à sua porta com rapidez e segurança.
              </p>
              
              <div className="mt-8 space-x-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Button 
                  size="lg" 
                  className="bg-imperio-red hover:bg-imperio-red/90 text-white"
                  asChild
                >
                  <Link to="/marcas">
                    Explorar Marcas
                  </Link>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-imperio-navy"
                  asChild
                >
                  <Link to="/categoria/emagrecedores">
                    Emagrecedores
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              to="/categoria/emagrecedores" 
              className="imperio-card p-8 flex flex-col h-64 bg-gradient-to-br from-imperio-extra-light-navy to-white relative overflow-hidden group"
            >
              <div className="z-10">
                <div className="text-imperio-navy p-2 rounded-full bg-white w-16 h-16 flex items-center justify-center mb-4 shadow-subtle">
                  <Pill size={32} />
                </div>
                <h2 className="text-2xl font-semibold text-imperio-navy mb-2">Emagrecedores</h2>
                <p className="text-gray-600 mb-4">
                  Soluções eficazes para auxiliar no seu processo de emagrecimento com qualidade e segurança.
                </p>
                <div className="flex items-center text-imperio-navy font-medium mt-auto group-hover:underline">
                  <span>Conhecer</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-imperio-navy/5 rounded-full -mb-16 -mr-16 transition-transform group-hover:scale-125"></div>
            </Link>
            
            <Link 
              to="/categoria/farmacia" 
              className="imperio-card p-8 flex flex-col h-64 bg-gradient-to-br from-imperio-extra-light-navy to-white relative overflow-hidden group"
            >
              <div className="z-10">
                <div className="text-imperio-navy p-2 rounded-full bg-white w-16 h-16 flex items-center justify-center mb-4 shadow-subtle">
                  <ShoppingBag size={32} />
                </div>
                <h2 className="text-2xl font-semibold text-imperio-navy mb-2">Farmácia</h2>
                <p className="text-gray-600 mb-4">
                  Produtos farmacêuticos essenciais para o seu bem-estar e saúde do dia a dia.
                </p>
                <div className="flex items-center text-imperio-navy font-medium mt-auto group-hover:underline">
                  <span>Explorar</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-imperio-navy/5 rounded-full -mb-16 -mr-16 transition-transform group-hover:scale-125"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-imperio-gray">
        <div className="section-container">
          <h2 className="text-3xl font-semibold text-imperio-navy mb-12 text-center">Nossas Marcas</h2>
          
          {/* Premium Brands */}
          <div className="mb-16">
            <h3 className="text-xl font-medium text-imperio-navy mb-6 border-b pb-2">Marcas Premium</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {brands.premium.map((brand) => (
                <Link 
                  key={brand.id} 
                  to={`/marca/${brand.id}`}
                  className="imperio-card flex items-center justify-center h-28 hover-lift group"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-16 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
          
          {/* National Brands */}
          <div className="mb-16">
            <h3 className="text-xl font-medium text-imperio-navy mb-6 border-b pb-2">Marcas Nacionais</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {brands.national.map((brand) => (
                <Link 
                  key={brand.id} 
                  to={`/marca/${brand.id}`}
                  className="imperio-card flex items-center justify-center h-28 hover-lift group"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-16 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-medium text-imperio-navy mb-6 border-b pb-2">Diversos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brands.categories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/categoria/${category.id}`}
                  className="imperio-card flex flex-col items-center text-center p-6 hover-lift"
                >
                  <div className="text-imperio-navy">
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-medium">{category.name}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
