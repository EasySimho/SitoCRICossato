import React from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Banknote, Gift } from 'lucide-react';

interface SupportOption {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  buttonText: string;
}

const supportOptions: SupportOption[] = [
  {
    id: 1,
    title: "Donazione Singola",
    description: "Sostieni i nostri progetti con una donazione una tantum. Ogni contributo fa la differenza.",
    icon: <Heart className="w-8 h-8" />,
    link: "#donate-once",
    buttonText: "Dona Ora"
  },
  {
    id: 2,
    title: "Donazione Mensile",
    description: "Un piccolo contributo mensile per garantire continuità ai nostri servizi.",
    icon: <CreditCard className="w-8 h-8" />,
    link: "#donate-monthly",
    buttonText: "Dona Mensilmente"
  },
  {
    id: 3,
    title: "5x1000",
    description: "Destina il tuo 5x1000 alla nostra associazione. Non costa nulla ma vale molto.",
    icon: <Banknote className="w-8 h-8" />,
    link: "#5x1000",
    buttonText: "Scopri Come"
  },
  {
    id: 4,
    title: "Regalo Solidale",
    description: "Fai un regalo speciale ai tuoi cari sostenendo i nostri progetti.",
    icon: <Gift className="w-8 h-8" />,
    link: "#gift",
    buttonText: "Regala Ora"
  }
];

const Support = () => {
  return (
    <section id="support" className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/support.jpg"
          alt="Support Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sostieni la Nostra Missione
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Il tuo supporto ci permette di continuare a servire la comunità
            e aiutare chi ha più bisogno.
          </p>
        </motion.div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-red-500/50 transition-all duration-300 h-full flex flex-col">
                <div className="text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {option.title}
                </h3>
                <p className="text-gray-300 mb-6 flex-grow">
                  {option.description}
                </p>
                <a
                  href={option.link}
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
                >
                  {option.buttonText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 mb-8">
            Per maggiori informazioni sulle modalità di donazione,<br />
            contattaci al numero <a href="tel:+390000000000" className="text-red-500 hover:text-red-400">+39 000 000 0000</a>
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
            >
              Contattaci
            </a>
            <a
              href="#faq"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
            >
              Domande Frequenti
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Support;