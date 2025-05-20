import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import Projects from './components/sections/Projects';
import Support from './components/sections/Support';
import News from './components/sections/News';
import Footer from './components/layout/Footer';
import Transparency from './components/sections/Transparency';
import Contact from './components/sections/Contact';
import ProjectsPage from './components/pages/ProjectsPage';
import NewsPage from './components/pages/NewsPage';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './components/admin/LoginPage';
import Dashboard from './components/admin/Dashboard';
import NewsList from './components/admin/NewsList';
import NewsForm from './components/admin/NewsForm';
import ProjectsList from './components/admin/ProjectsList';
import ProjectForm from './components/admin/ProjectForm';
import StatsList from './components/admin/StatsList';
import StatsForm from './components/admin/StatsForm';
import { AuthProvider } from './contexts/AuthContext';
import DocumentsList from './components/admin/DocumentsList';
import ContactList from './components/admin/ContactList';
import ContactDetail from './components/admin/ContactDetail';
import PrenotaServizio from './components/sections/PrenotaServizio';
import Attivita from './components/sections/Attivita';
import AnimatedRoutes from './AnimatedRoutes';

const App: React.FC = () => {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.slice(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          const navbarHeight = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/news" element={<AdminLayout><NewsList /></AdminLayout>} />
          <Route path="/admin/news/new" element={<AdminLayout><NewsForm /></AdminLayout>} />
          <Route path="/admin/news/:id/edit" element={<AdminLayout><NewsForm /></AdminLayout>} />
          <Route path="/admin/projects" element={<AdminLayout><ProjectsList /></AdminLayout>} />
          <Route path="/admin/projects/new" element={<AdminLayout><ProjectForm /></AdminLayout>} />
          <Route path="/admin/projects/:id/edit" element={<AdminLayout><ProjectForm /></AdminLayout>} />
          <Route path="/admin/stats" element={<AdminLayout><StatsList /></AdminLayout>} />
          <Route path="/admin/stats/new" element={<AdminLayout><StatsForm /></AdminLayout>} />
          <Route path="/admin/stats/:id/edit" element={<AdminLayout><StatsForm /></AdminLayout>} />
          <Route path="/admin/documents" element={<AdminLayout><DocumentsList /></AdminLayout>} />
          <Route path="/admin/contacts" element={<AdminLayout><ContactList /></AdminLayout>} />
          <Route path="/admin/contacts/:id" element={<AdminLayout><ContactDetail /></AdminLayout>} />

          {/* Public Routes con animazione */}
          <Route path="/*" element={<AnimatedRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;