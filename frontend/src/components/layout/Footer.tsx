import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div>
            <img src="/LogoCri.svg" alt="Logo" className="w-56 *:h-24 mb-6" />
            <p className="text-gray-400 mb-6">
              Un'associazione dedicata al supporto e all'aiuto della comunità,
              promuovendo valori di solidarietà e inclusione.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Phone size={20} className="mr-3" />
                <a href="tel:+390000000000" className="hover:text-white transition-colors">
                  +39 000 000 0000
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={20} className="mr-3" />
                <a href="mailto:info@cricossato.it" className="hover:text-white transition-colors">
                  info@cricossato.it
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin size={20} className="mr-3" />
                <span>Via Example, 123 - Città</span>
              </li>
            </ul>
          </div>

          {/* Link Rapidi */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Link Rapidi</h4>
            <ul className="space-y-4">
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Progetti
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-400 hover:text-white transition-colors">
                  Notizie
                </a>
              </li>
              <li>
                <a href="#transparency" className="text-gray-400 hover:text-white transition-colors">
                  Trasparenza
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-400 hover:text-white transition-colors">
                  Supporto
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>Sito Costruito con sforzo si prega di non copiare</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;