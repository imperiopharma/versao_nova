
import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Heart, 
  Pill, 
  ShoppingBag, 
  Tablet, 
  TrendingUp, 
  Award, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  // Handle carousel navigation
  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNextSlide();
    }
    
    if (touchEnd - touchStart > 75) {
      // Swipe right
      handlePrevSlide();
    }
  };

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeSlide]);

  // Format price as Brazilian Real
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Calculate discount percentage
  const calculateDiscount = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <Layout>
      {/* Hero Banner Carousel */}
      <section 
        className="relative h-[80vh] min-h-[500px] bg-imperio-navy overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-imperio-navy/80 to-imperio-navy/50 z-10"></div>
        
        {/* Carousel Slides */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              
              <div className="relative h-full flex items-center z-20">
                <div className="section-container">
                  <div className="max-w-lg text-white px-2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight animate-slide-up">
                      {slide.title}
                    </h1>
                    <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                      {slide.subtitle}
                    </p>
                    
                    <div className="mt-6 md:mt-8 space-x-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                      <Button 
                        size={isMobile ? "default" : "lg"} 
                        className="bg-imperio-red hover:bg-imperio-red/90 text-white"
                        asChild
                      >
                        <Link to={slide.cta.primary.link}>
                          {slide.cta.primary.text}
                        </Link>
                      </Button>
                      <Button 
                        variant="outline"
                        size={isMobile ? "default" : "lg"}
                        className="text-white border-white hover:bg-white hover:text-imperio-navy"
                        asChild
                      >
                        <Link to={slide.cta.secondary.link}>
                          {slide.cta.secondary.text}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Controls */}
        <div className="absolute left-0 right-0 bottom-4 flex justify-center items-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSlide === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation buttons - only show on desktop */}
        <div className="hidden md:block">
          <button 
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Brands Section - Moved higher in the layout */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-imperio-navy">Nossas Marcas</h2>
            <Link 
              to="/marcas" 
              className="text-sm font-medium text-imperio-navy flex items-center underline-animation"
            >
              Ver Todas
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {/* Premium Brands */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-imperio-navy mb-3 border-b pb-1">Marcas Premium</h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
              {brands.premium.map((brand) => (
                <Link 
                  key={brand.id} 
                  to={`/marca/${brand.id}`}
                  className="imperio-card flex items-center justify-center h-20 sm:h-24 hover-lift group"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-12 sm:max-h-16 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
          
          {/* National Brands */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-imperio-navy mb-3 border-b pb-1">Marcas Nacionais</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {brands.national.map((brand) => (
                <Link 
                  key={brand.id} 
                  to={`/marca/${brand.id}`}
                  className="imperio-card flex items-center justify-center h-20 sm:h-24 hover-lift group"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-12 sm:max-h-16 transition-transform group-hover:scale-105" 
                  />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-md font-medium text-imperio-navy mb-3 border-b pb-1">Categorias</h3>
            <div className="grid grid-cols-3 gap-3">
              {brands.categories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/categoria/${category.id}`}
                  className="imperio-card flex flex-col items-center text-center p-3 sm:p-5 hover-lift h-24 sm:h-28"
                >
                  <div className="text-imperio-navy">
                    {category.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium">{category.name}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section - Mobile Optimized */}
      <section className="py-6 bg-imperio-gray">
        <div className="section-container">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Sparkles className="text-imperio-red mr-2" size={20} />
              <h2 className="text-lg font-bold text-imperio-navy">Ofertas Flash</h2>
            </div>
            <Link 
              to="/ofertas" 
              className="text-sm font-medium text-imperio-navy flex items-center underline-animation"
            >
              Ver tudo
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex space-x-4" style={{ minWidth: 'fit-content' }}>
              {flashSaleItems.map((item) => (
                <Link 
                  key={item.id}
                  to={`/produto/${item.id}`}
                  className="flex-shrink-0 w-[160px] sm:w-[180px] imperio-card hover-lift overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-[160px] object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-imperio-red text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{calculateDiscount(item.originalPrice, item.salePrice)}%
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500">{item.brand}</p>
                    <h3 className="font-medium text-sm line-clamp-2 h-10">{item.name}</h3>
                    <div className="mt-2">
                      <span className="text-xs line-through text-gray-500">
                        {formatPrice(item.originalPrice)}
                      </span>
                      <p className="text-imperio-red font-bold">
                        {formatPrice(item.salePrice)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Cards - Responsive Grid */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promoCards.map((card) => (
              <Link 
                key={card.id} 
                to={card.link} 
                className="imperio-card p-5 flex flex-col h-[200px] bg-gradient-to-br ${card.color} to-white relative overflow-hidden group"
              >
                <div className="z-10">
                  <div className="text-imperio-navy p-2 rounded-full bg-white w-12 h-12 flex items-center justify-center mb-3 shadow-subtle">
                    {card.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-imperio-navy mb-2">{card.title}</h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {card.description}
                  </p>
                  <div className="flex items-center text-imperio-navy font-medium mt-auto group-hover:underline">
                    <span className="text-sm">Conhecer</span>
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-28 h-28 bg-imperio-navy/5 rounded-full -mb-14 -mr-14 transition-transform group-hover:scale-125"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mobile App Banner */}
      <section className="py-8 bg-imperio-navy text-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-2xl font-display font-bold mb-2">Império Pharma no seu bolso</h2>
              <p className="text-sm text-gray-200 mb-4">
                Baixe nosso aplicativo para fazer pedidos de forma mais rápida, 
                acompanhar seus pedidos e receber ofertas exclusivas!
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <img 
                  src="https://via.placeholder.com/120x40?text=App+Store" 
                  alt="App Store" 
                  className="h-10 cursor-pointer hover-lift"
                />
                <img 
                  src="https://via.placeholder.com/120x40?text=Google+Play" 
                  alt="Google Play" 
                  className="h-10 cursor-pointer hover-lift"
                />
              </div>
            </div>
            <div className="w-48 md:w-auto">
              <img 
                src="https://via.placeholder.com/300x200?text=App+Screenshot" 
                alt="App Screenshot" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Access - Mobile-optimized scrollable section */}
      <section className="py-8 bg-imperio-gray">
        <div className="section-container">
          <h2 className="text-xl font-semibold text-imperio-navy mb-4">Categorias Populares</h2>
          
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex space-x-4" style={{ minWidth: 'fit-content' }}>
              {brands.categories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/categoria/${category.id}`}
                  className="imperio-card flex flex-col items-center text-center p-5 hover-lift w-[140px] h-[140px]"
                >
                  <div className="text-imperio-navy">
                    {category.icon}
                  </div>
                  <h4 className="text-sm font-medium">{category.name}</h4>
                </Link>
              ))}
              <Link 
                to="/categorias" 
                className="imperio-card flex flex-col items-center justify-center text-center p-5 hover-lift w-[140px] h-[140px]"
              >
                <div className="text-imperio-navy">
                  <ArrowRight className="w-10 h-10 mb-3" />
                </div>
                <h4 className="text-sm font-medium">Ver Todas</h4>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Social Media */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-xl font-semibold text-imperio-navy mb-2">Receba Novidades e Promoções</h2>
              <p className="text-sm text-gray-600 mb-4">
                Inscreva-se para receber ofertas exclusivas e novidades sobre produtos.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-imperio-navy/20"
                />
                <Button className="bg-imperio-navy hover:bg-imperio-navy/90">
                  Inscrever-se
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
              <h2 className="text-xl font-semibold text-imperio-navy mb-2">Siga-nos</h2>
              <p className="text-sm text-gray-600 mb-4 text-center md:text-right">
                Acompanhe nosso conteúdo nas redes sociais
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-imperio-navy rounded-full flex items-center justify-center text-white hover:bg-imperio-light-navy transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-imperio-navy rounded-full flex items-center justify-center text-white hover:bg-imperio-light-navy transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-imperio-navy rounded-full flex items-center justify-center text-white hover:bg-imperio-light-navy transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-imperio-navy rounded-full flex items-center justify-center text-white hover:bg-imperio-light-navy transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
