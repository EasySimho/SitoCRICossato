import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

interface BackendProject {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  participants: number;
  image: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  participants: number;
  image: string;
}

const categories = ["Tutti", "Formazione", "Salute", "Emergenza", "Sociale"];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutti");

  // Funzione per caricare i progetti
  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data: BackendProject[] = await response.json();
      
      const mappedProjects: Project[] = data.map(item => {
        let dateFormatted = item.date;
        try {
          const dateObj = new Date(item.date);
          if (!isNaN(dateObj.getTime())) {
            dateFormatted = dateObj.toISOString();
          }
        } catch (e) {
          console.warn(`Data non valida per il progetto ${item.id}: ${item.date}`);
        }
        
        return {
          id: parseInt(item.id),
          title: item.title,
          description: item.description,
          category: item.category,
          date: dateFormatted,
          location: item.location,
          participants: item.participants,
          image: item.image
        };
      });

      setProjects(mappedProjects);
      setError(null);
    } catch (err) {
      setError('Errore nel caricamento dei progetti');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per aggiungere un nuovo progetto
  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      // Ricarica i progetti dopo l'aggiunta
      await fetchProjects();
    } catch (err) {
      console.error('Error adding project:', err);
      throw err;
    }
  };

  // Funzione per aggiornare un progetto esistente
  const updateProject = async (id: number, project: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      // Ricarica i progetti dopo l'aggiornamento
      await fetchProjects();
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  // Funzione per eliminare un progetto
  const deleteProject = async (id: number) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      // Ricarica i progetti dopo l'eliminazione
      await fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tutti" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Caricamento progetti...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="py-32 md:py-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
                <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">I Nostri Progetti</h1>
              <p className="text-xl text-gray-300">
                Scopri tutte le iniziative e i progetti della Croce Rossa Italiana
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca progetti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border-b border-gray-200 focus:border-red-600 focus:outline-none transition-colors duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-red-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
                <Link to={`/progetti/${project.id}`}>
                  <div className="relative aspect-[4/3] mb-4 rounded-xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                      <span className="bg-white text-red-600 px-3 py-1 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                        <span>{
                          (() => {
                            try {
                              const dateObj = new Date(project.date);
                              if (!isNaN(dateObj.getTime())) {
                                return dateObj.toLocaleDateString('it-IT', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                });
                              }
                              return project.date;
                            } catch (e) {
                              return project.date;
                            }
                          })()
                        }</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{project.location}</span>
                  </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{project.participants} partecipanti</span>
                      </div>
                </div>
                    <div className="inline-flex items-center text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-300">
                  Scopri di più
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
              </div>
                </Link>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Nessun progetto trovato con i criteri di ricerca selezionati.
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProjectsPage; 