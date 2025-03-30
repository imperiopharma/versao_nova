
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSlide } from '@/types/hero';

interface HeroBannerProps {
  slides: HeroSlide[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Verificar tamanho da tela para determinar se é desktop ou mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trocar slide automaticamente a cada 5 segundos
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Funções para navegação manual
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Variáveis de animação
  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Se não houver slides, não renderizar nada
  if (!slides || slides.length === 0) {
    return null;
  }

  const slide = slides[currentIndex];
  
  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-gray-900">
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={isDesktop ? slide.desktopImage : slide.mobileImage}
            alt={slide.title || "Banner promocional"}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
          
          {/* Conteúdo do slide */}
          {(slide.title || slide.subtitle || slide.buttonText) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 drop-shadow-md"
              >
                {slide.title}
              </motion.h2>
              
              {slide.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-sm md:text-xl mb-4 max-w-2xl drop-shadow-md"
                >
                  {slide.subtitle}
                </motion.p>
              )}
              
              {slide.buttonText && slide.buttonLink && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link
                    to={slide.buttonLink}
                    className="bg-imperio-navy hover:bg-imperio-light-navy text-white px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md font-medium transition-colors"
                  >
                    {slide.buttonText}
                  </Link>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Controles de navegação - apenas se houver mais de um slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 md:p-2 text-white backdrop-blur-sm transition-colors z-10"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </button>
          
          <button
            onClick={goToNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1 md:p-2 text-white backdrop-blur-sm transition-colors z-10"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </button>
          
          {/* Indicadores de slide */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-5' : 'bg-white/60 w-1.5'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
