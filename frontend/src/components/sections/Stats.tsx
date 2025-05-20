import React, { useEffect, useState, useRef } from 'react';

interface Stat {
  id: number;
  value: number;
  label: string;
  suffix?: string;
  description: string;
}

interface BackendStat {
  id: string;
  title: string;
  value: number;
  description: string;
}

const Stats = () => {
  const [animate, setAnimate] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data: BackendStat[] = await response.json();
        
        // Mappa i dati dal backend al formato richiesto
        const mappedStats: Stat[] = data.map((item, index) => ({
          id: index + 1,
          value: item.value,
          label: item.title,
          suffix: item.description.includes('+') ? '+' : undefined,
          description: item.description
        }));
        
        setStats(mappedStats);
      } catch (err) {
        setError('Errore nel caricamento delle statistiche');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleScroll = () => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        setAnimate(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (animate && stats.length > 0) {
      const intervals = stats.map((stat, index) => {
        const duration = 2500; // 2.5 seconds for animation
        const steps = 60; // 60 steps (smooth at 60fps)
        const increment = stat.value / steps;
        let currentCount = 0;

        return setInterval(() => {
          currentCount = Math.min(currentCount + increment, stat.value);
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(currentCount);
            return newCounts;
          });

          if (currentCount >= stat.value) {
            clearInterval(intervals[index]);
          }
        }, duration / steps);
      });

      return () => intervals.forEach(interval => clearInterval(interval));
    }
  }, [animate, stats]);

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center">Caricamento statistiche...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white">
      {/* Background decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-96 -right-40 w-96 h-96 rounded-full bg-red-50 opacity-30"></div>
        <div className="absolute -bottom-60 -left-20 w-96 h-96 rounded-full bg-red-50 opacity-30"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-red-50 opacity-20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="w-16 h-1 bg-red-600 mx-auto mb-4"></div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">La Quantità fa la Differenza</h2>
          <p className="text-gray-600 text-lg">
            Dietro ogni numero c'è una storia di impegno, dedizione e passione al servizio della comunità
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="bg-white rounded-xl overflow-hidden p-8 border border-gray-100 h-full transition-all duration-300 transform hover:shadow-lg hover:shadow-red-100">
                {/* Background colorato che appare all'hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-700/90 z-0 transition-all duration-500 ease-in-out"
                  style={{
                    clipPath: isHovered === index ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)'
                  }}
                ></div>

                {/* Counter con scia al passaggio mouse */}
                <div className="relative z-10 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-colors duration-300 mb-2 flex items-center justify-center gap-x-1"
                      style={{ color: isHovered === index ? 'white' : '#1f2937' }}>
                      {/* Digit animation */}
                      <div className="relative inline-flex items-center justify-center">
                        <span className="inline-block min-w-[1ch] text-center">
                          {counts[index].toLocaleString()}
                        </span>

                        {/* Colorful trail effect */}
                        {isHovered === index && (
                          <div className="absolute -inset-1 opacity-50 blur-lg bg-white/30 rounded-full"></div>
                        )}
                      </div>

                      {/* Suffix */}
                      {stat.suffix && (
                        <span>{stat.suffix}</span>
                      )}
                    </div>
                  </div>

                  <div className="relative min-h-[3rem] overflow-hidden">
                    <div
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        isHovered === index ? '-translate-y-full' : 'translate-y-0'
                      }`}
                    >
                      <div className={`text-lg font-medium transition-colors duration-300 ${
                        isHovered === index ? 'text-white/90' : 'text-gray-600'
                    }`}>
                    {stat.label}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        isHovered === index ? 'translate-y-0' : 'translate-y-full'
                      }`}
                    >
                      <div className="text-base font-medium text-white/90 leading-relaxed">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Line */}
        <div className="mt-16 relative">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Stats;