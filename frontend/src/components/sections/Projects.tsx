import { useState, useEffect } from 'react';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import DiscoverButton from '../ui/DiscoverButton';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tutti');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(null);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const mockProjects = [
    {
      id: 1,
      title: "Centro Ascolto Famiglie",
      description: "Supporto psicologico e consulenza per famiglie in difficoltà con percorsi personalizzati e sostegno continuo.",
      image: "/api/placeholder/400/300",
      category: "Sociale"
    },
    {
      id: 2,
      title: "Banco Alimentare",
      description: "Raccolta e distribuzione di generi alimentari per le persone più bisognose della comunità locale.",
      image: "/api/placeholder/400/300",
      category: "Alimentare"
    },
    {
      id: 3,
      title: "Doposcuola Educativo",
      description: "Attività di supporto scolastico e ricreative per bambini e ragazzi delle scuole primarie e secondarie.",
      image: "/api/placeholder/400/300",
      category: "Educazione"
    }
  ];

  // Use mock data if no projects are loaded
  const displayProjects = projects.length > 0 ? projects : mockProjects;

  const categories = ['Tutti', ...new Set(displayProjects.map(project => project.category))];

  const filteredProjects = activeCategory === 'Tutti'
    ? displayProjects
    : displayProjects.filter(project => project.category === activeCategory);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="text-center mt-4 text-gray-600 font-medium">Caricamento progetti...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto">
            <div className="text-red-600 font-medium mb-2">Oops! Qualcosa è andato storto</div>
            <div className="text-gray-700">{error}</div>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              onClick={() => window.location.reload()}
            >
              Riprova
            </button>
          </div>
        </div>
      </section>
    );
  }
  // Funzione che simula il comportamento di Link
  const handleNavigate = (path: string): void => {
    console.log(`Navigazione a: ${path}`);
    // In un'app reale, qui si utilizzerebbe la navigazione
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header with creative design */}
        <div className="relative mb-16">
          <div className="absolute top-0 left-1/6 w-24 h-24 rounded-full bg-red-600 opacity-5"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full bg-red-600 opacity-5"></div>

          <div className="text-center relative">
            <div className="inline-block">
              <span className="inline-block px-4 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full mb-3">
                I NOSTRI CORSI
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Impara e cresci con noi
              </h2>
              <div className="flex justify-center mb-6">
                <div className="h-1 w-10 bg-gray-300 rounded"></div>
                <div className="h-1 w-16 bg-red-600 mx-2 rounded"></div>
                <div className="h-1 w-10 bg-gray-300 rounded"></div>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Scopri i corsi che offre la nostra associazione,
                con impegno e dedizione ogni giorno.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid with improved cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-red-600 opacity-10 w-24 h-6 -right-6 top-8"></div>
              </div>

              {/* Project Image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-white/90 text-red-600 backdrop-blur-sm rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content with improved layout */}
              <div className="p-6 relative">
                {/* Project title with hover effect */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Project stats */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>12 partecipanti</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>In corso</span>
                  </div>
                </div>

                {/* Link styled as button */}
                <button
                  onClick={() => handleNavigate(`/progetti/${project.id}`)}
                  className="inline-flex items-center justify-between w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-800 font-medium group-hover:bg-red-50 group-hover:text-red-600 transition-colors duration-300"
                >
                  <span>Scopri di più</span>
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform duration-300">
                    <ChevronRight size={14} />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button with enhanced styling */}
        <DiscoverButton to="/progetti">Scopri tutti i corsi</DiscoverButton>
      </div>
    </section>
  );
};

export default Projects;