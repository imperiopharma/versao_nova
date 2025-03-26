
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide } from '@/types/hero';

export interface HeroBannerProps {
  slides: HeroSlide[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ slides }) => {
  const isMobile = useIsMobile();
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle carousel navigation
  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
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

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <section 
      className={`relative ${isMobile ? 'h-[60vh]' : 'h-[80vh]'} min-h-[300px] bg-imperio-navy overflow-hidden`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Padrão decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-imperio-light-navy/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-imperio-light-navy/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '8s' }}></div>
      
      {/* Dark overlay para melhor visibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-imperio-navy/70 to-imperio-navy/50 z-10"></div>
      
      {/* Carousel Slides */}
      <div className="relative h-full">
        <AnimatePresence initial={false} custom={1}>
          {slides.map((slide, index) => (
            activeSlide === index && (
              <motion.div 
                key={index}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out transform scale-105"
                  style={{ 
                    backgroundImage: `url(${isMobile ? slide.mobileImage : slide.desktopImage})` 
                  }}
                ></div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Conteúdo centralizado */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-shadow">
              Qualidade e Confiança para sua Saúde
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 max-w-xl mx-auto text-shadow">
              Produtos farmacêuticos e suplementos de alta qualidade com entrega segura e rápida para todo o Brasil.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              className="bg-white text-imperio-navy hover:bg-white/90 font-medium"
              onClick={() => window.location.href = '/marcas'}
            >
              <ShoppingBag size={18} className="mr-2" />
              Comprar Agora
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Carousel Controls - Indicadores */}
      <div className="absolute left-0 right-0 bottom-8 flex justify-center items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === index ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation buttons - only show on desktop */}
      <div className="hidden md:block">
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/10"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/10"
          aria-label="Próximo slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};
