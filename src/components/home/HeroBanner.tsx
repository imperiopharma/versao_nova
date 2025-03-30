
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide } from '@/types/hero';
import { Link } from 'react-router-dom';

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

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#c9a44b",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section 
      className={`relative ${isMobile ? 'h-[45vh]' : 'h-[70vh]'} min-h-[250px] bg-imperio-navy overflow-hidden`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
                
                {/* Content overlay */}
                <div className="absolute inset-0 bg-imperio-navy/40 flex items-center justify-center">
                  <div className="text-center text-white max-w-lg px-4">
                    {slide.title && (
                      <motion.h2 
                        className="text-3xl md:text-5xl font-bold mb-2"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {slide.title}
                      </motion.h2>
                    )}
                    
                    {slide.subtitle && (
                      <motion.p 
                        className="text-lg md:text-xl mb-6 opacity-90"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {slide.subtitle}
                      </motion.p>
                    )}
                    
                    {slide.buttonText && slide.buttonLink && (
                      <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                      >
                        <Link 
                          to={slide.buttonLink} 
                          className="inline-block bg-imperio-navy text-white px-6 py-3 rounded-full font-medium hover:bg-imperio-gold transition-colors shadow-lg"
                        >
                          {slide.buttonText}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Carousel Controls - Indicadores */}
      <div className="absolute left-0 right-0 bottom-4 flex justify-center items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === index ? 'bg-imperio-gold w-8' : 'bg-white/40 hover:bg-white/60'
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
