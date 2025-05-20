import React from 'react';
import { motion } from 'framer-motion';

interface HeroPageProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const HeroPage: React.FC<HeroPageProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div className="relative bg-gray-900 text-white">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      <div className="container mx-auto px-4">
        <div className="py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-xl text-gray-300">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-white" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroPage; 