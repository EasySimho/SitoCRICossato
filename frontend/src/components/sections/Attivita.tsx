import { useState } from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
const mockAttivita = [
  {
    id: 1,
    title: "Servizio di Primo Soccorso",
    description: "Servizi di primo soccorso, trasporto sanitario e promozione di stili di vita sani.",
    image: "/attivita-1.jpg",
    category: "Salute",
    location: "Sede Centrale",
  },
  {
    id: 2,
    title: "Supporto Sociale",
    description: "Supporto alle fasce vulnerabili, distribuzione generi alimentari e assistenza domiciliare.",
    image: "/attivita-2.jpg",
    category: "Sociale",
    location: "Sede Centrale",
  },
  {
    id: 3,
    title: "Gruppo Giovani",
    description: "Gruppo Giovani, promozione di stili di vita sani e progetti sociali.",
    image: "/attivita-3.jpg",
    category: "Giovani",
    location: "Sede Giovani",
  }
];

const Attivita = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  return (
    <section id="attivita" className="py-20 bg-gray-50 overflow-hidden relative">
      {/* Elementi decorativi di sfondo */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header con design migliorato */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded-full opacity-20"></div>
          
          <span className="inline-block px-6 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-full mb-4 tracking-wider transform hover:scale-105 transition-transform duration-300">
            LE NOSTRE ATTIVITÀ
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center relative">
            Partecipa alle nostre 
            <span className="relative inline-block ml-3">
              attività
              <svg className="absolute -bottom-3 left-0 w-full" height="10" viewBox="0 0 200 8">
                <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="#dc2626" strokeWidth="3" />
              </svg>
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center leading-relaxed">
            Scopri le attività che organizziamo per la comunità e unisciti a noi per fare la differenza insieme.
          </p>
        </div>
        
        {/* Attività Grid con layout completamente riprogettato */}
        <div className="grid grid-cols-1 gap-16 max-w-5xl mx-auto">
          {mockAttivita.map((attivita, index) => (
            <div
              key={attivita.id}
              className={`group relative flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-white overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500`}
              onMouseEnter={() => setHoveredCard(attivita.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Accento laterale colorato */}
              <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} h-full w-1 bg-red-600`}></div>
              
              {/* Immagine */}
              <div className="relative md:w-2/5 h-60 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent z-10"></div>
                <img
                  src={attivita.image}
                  alt={attivita.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                />
                
                {/* Indicatore posti visuale */}
                
              </div>
              
              {/* Contenuto card con layout migliorato */}
              <div className="relative p-8 md:w-3/5 flex flex-col justify-between">
                {/* Decorazione angolo */}
                <div className={`absolute ${index % 2 === 0 ? 'top-0 right-0' : 'top-0 left-0'} w-12 h-12 border-t-2 border-r-2 ${index % 2 === 0 ? '' : 'rotate-90'} border-red-200 opacity-70`}></div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    {attivita.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {attivita.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  {/* Dettagli attività con layout orizzontale */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                      <MapPin size={14} className="mr-2 text-red-500" />
                      <span className="text-sm font-medium">{attivita.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                      <Clock size={14} className="mr-2 text-red-500" />
                      <span className="text-sm font-medium">Prossimamente</span>
                    </div>
                  </div>
                  
                  {/* Pulsante CTA con design migliorato */}
                  <button className="inline-flex items-center px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg font-bold transition-all group-hover:bg-red-600 group-hover:text-white">
                    Iscriviti all' attività
                    <ArrowRight size={16} className="ml-2 transition-all group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Attivita;