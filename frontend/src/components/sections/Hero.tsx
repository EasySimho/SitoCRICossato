import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta?: {
    text: string;
    link: string;
  };
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Benvenuto in CRI Cossato",
    subtitle: "Al servizio della comunità dal 1985",
    description: "Scopri la nostra missione e i valori che ci guidano ogni giorno per aiutare chi ha più bisogno.",
    image: "/slider-1.jpg",
    cta: {
      text: "Scopri di più",
      link: "#chi-siamo"
    }
  },
  {
    id: 2,
    title: "Diventa Volontario",
    subtitle: "Unisciti alla nostra famiglia",
    description: "Dona il tuo tempo e le tue competenze per fare la differenza nella vita di chi ha bisogno di aiuto.",
    image: "/slider-2.jpg",
    cta: {
      text: "Unisciti a noi",
      link: "#volontari"
    }
  },
  {
    id: 3,
    title: "Trasporti Sanitari",
    subtitle: "Sempre pronti a intervenire",
    description: "Garantiamo un servizio di trasporto sicuro ed efficiente per chi ha bisogno di assistenza medica.",
    image: "/api/placeholder/1800/1200",
    cta: {
      text: "I nostri servizi",
      link: "#servizi"
    }
  },
  {
    id: 4,
    title: "Corsi BLSD",
    subtitle: "Impara a salvare vite",
    description: "Partecipa ai nostri corsi di primo soccorso e impara le manovre salvavita di base.",
    image: "/api/placeholder/1800/1200",
    cta: {
      text: "Scopri i corsi",
      link: "#corsi"
    }
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const slideIntervalRef = useRef<number | null>(null);
  const slidesContainerRef = useRef(null);
  
  const startSlideTimer = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    
    slideIntervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, []);
  
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('next');
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    startSlideTimer();
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('prev');
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    startSlideTimer();
  };
  
  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    startSlideTimer();
  };

  // Rimuoviamo la gestione dello scroll con rotella che interferisce con lo scroll naturale della pagina
  // Manteniamo solo la funzionalità di swipe per dispositivi touch che è meno invasiva

  // Swipe handling for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      // Swipe left
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 100) {
      // Swipe right
      prevSlide();
    }
  };

  return (
    <div 
      ref={slidesContainerRef}
      className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-gray-800">
        <div 
          className="h-full bg-red-600 transition-all duration-[8000ms] ease-linear"
          style={{ 
            width: isAnimating ? '0%' : '100%', 
            transitionDuration: isAnimating ? '0ms' : '7000ms' 
          }}
        />
      </div>
      
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => {
          // Calculate if this slide is active, prev or next
          const isActive = index === currentSlide;
          const isPrev = index === (currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
          const isNext = index === (currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
          
          let stateClass = 'opacity-0 scale-105';
          
          if (isActive) {
            stateClass = 'opacity-100 scale-100 z-20';
          } else if ((direction === 'next' && isPrev) || (direction === 'prev' && isNext)) {
            stateClass = 'opacity-0 scale-110 z-10';
          }
          
          return (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${stateClass}`}
            >
              {/* Background image with parallax effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[8000ms] ease-out"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)'
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-black opacity-60" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className={`max-w-2xl transition-all duration-1000 delay-300 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    {/* Red decorative element */}
                    <div className="w-20 h-1 bg-red-600 mb-6"></div>
                    
                    <h2 className="font-bold text-4xl lg:text-6xl text-white mb-3">
                      {slide.title}
                    </h2>
                    
                    <h3 className="text-xl lg:text-3xl text-red-300 font-medium mb-6">
                      {slide.subtitle}
                    </h3>
                    
                    <p className="text-white/90 text-lg mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    
                    {slide.cta && (
                      <a 
                        href={slide.cta.link} 
                        className="group relative inline-flex items-center overflow-hidden rounded-lg bg-red-600 px-8 py-3 text-white transition-all duration-300"
                      >
                        <span className="relative z-10">{slide.cta.text}</span>
                        <span className="absolute inset-0 -translate-y-full bg-red-700 transition-transform duration-300 group-hover:translate-y-0"></span>
                        <span className="absolute inset-0 translate-y-full bg-red-700 transition-transform duration-300 group-hover:translate-y-0"></span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Slide number */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                <div className="flex items-center text-white/80">
                  <span className="text-3xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mx-2">/</span>
                  <span className="text-lg opacity-70">{String(slides.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex items-center space-x-4">
        <button 
          onClick={prevSlide}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-black"
          aria-label="Slide precedente"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white hover:text-black"
          aria-label="Slide successiva"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Side navigation dots */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 hidden md:flex flex-col items-center space-y-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 focus:outline-none ${
              index === currentSlide 
                ? 'w-3 h-12 rounded-full bg-red-600' 
                : 'w-2 h-2 rounded-full bg-white opacity-50 hover:opacity-100'
            }`}
            aria-label={`Vai alla slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;