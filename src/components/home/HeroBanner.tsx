
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

interface HeroBannerProps {
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

  return (
    <section 
      className="relative h-[80vh] min-h-[500px] bg-imperio-navy overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-imperio-navy/90 to-imperio-navy/70 z-10"></div>
      
      {/* Carousel Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
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
                  {/* Text content with improved contrast */}
                  <div className="bg-imperio-navy/70 p-4 rounded-lg backdrop-blur-sm shadow-lg">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight animate-slide-up text-white">
                      {slide.title}
                    </h1>
                    <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-100 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                      {slide.subtitle}
                    </p>
                    
                    <div className="mt-6 md:mt-8 space-x-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                      <Button 
                        size={isMobile ? "default" : "lg"} 
                        className="bg-imperio-red hover:bg-imperio-red/90 text-white font-semibold"
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
          </div>
        ))}
      </div>
      
      {/* Carousel Controls */}
      <div className="absolute left-0 right-0 bottom-4 flex justify-center items-center gap-2 z-20">
        {slides.map((_, index) => (
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
  );
};
