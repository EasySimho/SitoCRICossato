import { useState, useEffect } from 'react';
import { Newspaper, FolderOpen, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

interface BaseItem {
  _id: string;
  title: string;
  createdAt: string;
  type: 'news' | 'project';
}

interface NewsItem extends BaseItem {
  type: 'news';
}

interface ProjectItem extends BaseItem {
  type: 'project';
}

const Dashboard = () => {
  const [counts, setCounts] = useState({
    news: 0,
    projects: 0,
    stats: 0
  });
  const [recentActivity, setRecentActivity] = useState<BaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, projectsRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/news`),
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/stats`)
        ]);

        const [newsData, projectsData, statsData] = await Promise.all([
          newsRes.json(),
          projectsRes.json(),
          statsRes.json()
        ]);

        setCounts({
          news: newsData.length,
          projects: projectsData.length,
          stats: statsData.length
        });

        // Combine and sort recent activities
        const activities = [
          ...newsData.map((item: Omit<NewsItem, 'type'>) => ({ ...item, type: 'news' as const })),
          ...projectsData.map((item: Omit<ProjectItem, 'type'>) => ({ ...item, type: 'project' as const }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
         .slice(0, 5); // Get only the 5 most recent items

        setRecentActivity(activities);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { icon: Newspaper, label: 'Notizie', value: counts.news.toString(), link: '/admin/news' },
    { icon: FolderOpen, label: 'Progetti', value: counts.projects.toString(), link: '/admin/projects' },
    { icon: BarChart2, label: 'Statistiche', value: counts.stats.toString(), link: '/admin/stats' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h fa`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d fa`;
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <stat.icon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? '...' : stat.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attività Recenti</h2>
          <div className="space-y-4">
            {loading ? (
              <div className="text-gray-500">Caricamento...</div>
            ) : recentActivity.length > 0 ? (
              recentActivity.map((item) => (
                <div key={item._id} className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <p className="ml-3 text-gray-600">
                    {item.type === 'news' ? 'Nuova notizia: ' : 'Nuovo progetto: '}
                    {item.title}
                  </p>
                  <span className="ml-auto text-sm text-gray-400">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">Nessuna attività recente</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/news/new"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Newspaper className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-gray-700">Aggiungi Notizia</span>
            </Link>
            <Link
              to="/admin/projects/new"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FolderOpen className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-gray-700">Aggiungi Progetto</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
