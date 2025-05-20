import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const API_URL = 'http://localhost:3000/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!privacyAccepted) {
      setErrorMessage('Devi accettare l\'informativa sulla privacy.');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Errore nell\'invio del messaggio');
      }

      const data = await response.json();
      console.log('Success:', data);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Si è verificato un errore nell\'invio del messaggio. Riprova più tardi.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contatti" className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Contattaci</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Siamo qui per aiutarti. Contattaci per qualsiasi informazione o richiesta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Parliamo</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-600 transition-colors duration-300">
                    <MapPin className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Indirizzo</h4>
                    <p className="text-gray-600 text-lg">
                      Via Roma 123<br />
                      00100 Roma (RM)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-600 transition-colors duration-300">
                    <Phone className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Telefono</h4>
                    <p className="text-gray-600 text-lg">
                      +39 06 1234567<br />
                      +39 333 1234567
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-600 transition-colors duration-300">
                    <Mail className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-600 text-lg">
                      info@crocerossa.it<br />
                      corsi@crocerossa.it
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-600 transition-colors duration-300">
                    <Clock className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Orari di Apertura</h4>
                    <p className="text-gray-600 text-lg">
                      Lun - Ven: 9:00 - 18:00<br />
                      Sab: 9:00 - 13:00<br />
                      Dom: Chiuso
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Dove Siamo</h3>
              <div className="rounded-2xl overflow-hidden h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.6554904831647!2d12.4922309!3d41.8902102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDUzJzI0LjciTiAxMsKwMjknMzIuMCJF!5e0!3m2!1sit!2sit!4v1635000000000!5m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Scrivici</h3>
              
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl">
                  Messaggio inviato con successo! Ti risponderemo al più presto.
                </div>
              )}
              
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                      Nome e Cognome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Mario Rossi"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="mario.rossi@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
                    Oggetto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="Informazioni sui corsi"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Scrivi il tuo messaggio..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAccepted}
                    onChange={e => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 mr-3"
                    required
                  />
                  <label htmlFor="privacy" className="text-gray-700 text-sm">
                    Accetto l'<a href="https://gdpr.eu/tag/gdpr/" target="_blank" className="underline text-red-600">informativa sulla privacy</a>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-full py-4 px-8 bg-red-600 text-white text-lg font-bold rounded-xl hover:bg-red-700 transition-all duration-300"
                    disabled={!privacyAccepted || status === 'loading'}
                  >
                    Invia Messaggio
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 