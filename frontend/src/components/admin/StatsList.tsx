import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Stat {
  _id: string;
  title: string;
  value: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
}

const API_URL = 'http://localhost:3000/api';

// Funzione per formattare la data

const StatsList: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Errore nel caricamento delle statistiche');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    if (!window.confirm('Sei sicuro di voler eliminare questa statistica?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/stats/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStats(stats.filter(item => item._id !== id));
      } else {
        throw new Error('Failed to delete stat');
      }
    } catch (error) {
      console.error('Error deleting stat:', error);
      alert('Errore durante l\'eliminazione della statistica');
    }
  };

  if (loading) {
    return <div className="p-4">Caricamento...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestione Statistiche</h1>
        <Link
          to="/admin/stats/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nuova Statistica
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titolo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrizione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valore
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stats.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {item.description.substring(0, 100)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.value}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/stats/${item._id}/edit`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Modifica
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsList; 