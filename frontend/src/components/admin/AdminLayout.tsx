
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, FolderOpen, BarChart2, LogOut, Home, File, Users } from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Pannello Principale', path: '/admin' },
    
    { icon: File, label: 'Documenti', path: '/admin/documents' },
    { icon: Users, label: 'Contatti', path: '/admin/contacts' },
    { icon: Newspaper, label: 'News', path: '/admin/news' },
    { icon: FolderOpen, label: 'Corsi', path: '/admin/projects' },
    { icon: BarChart2, label: 'Statistiche', path: '/admin/stats' },
    { icon: Home, label: 'Visione Utente', path: '/' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          
          <div className="p-6">
          <img src="/LogoCri.svg" alt="logo" className="w-full h-10" />
            <h1 className="text-lg text-center font-bold text-red-600">Pannello di Controllo</h1>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;