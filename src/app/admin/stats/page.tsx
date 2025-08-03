
// 'use client'

// import { useState, useEffect } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import { FiRefreshCw, FiExternalLink, FiEye, FiLink } from 'react-icons/fi';

// const supabase = createClient(
//   'https://htotfyduudyoephuixzu.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
// );

// export default function TrackingPage() {
//   const [stats, setStats] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [totalOpens, setTotalOpens] = useState(0);

//   const fetchStats = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const { data, error } = await supabase
//         .from('link_openings')
//         .select('*')
//         .order('last_opened', { ascending: false });

//       if (error) throw error;
      
//       setStats(data || []);
//       // Calcul du total des ouvertures
//       const total = data?.reduce((sum, item) => sum + (item.open_count || 1), 0) || 0;
//       setTotalOpens(total);
//     } catch (err) {
//     //   setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Statistiques de Tracking</h1>
//             <p className="text-gray-600">Suivi des ouvertures des liens d'invitation</p>
//           </div>
//           <button 
//             onClick={fetchStats}
//             disabled={loading}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//           >
//             <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
//             Actualiser
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-full text-blue-600">
//                 <FiLink size={24} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Liens uniques</p>
//                 <p className="text-2xl font-bold">{stats.length}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-green-100 rounded-full text-green-600">
//                 <FiEye size={24} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Total ouvertures</p>
//                 <p className="text-2xl font-bold">{totalOpens}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-purple-100 rounded-full text-purple-600">
//                 <FiExternalLink size={24} />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Moyenne par lien</p>
//                 <p className="text-2xl font-bold">
//                   {stats.length > 0 ? Math.round(totalOpens / stats.length) : 0}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tableau des données */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Lien
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Ouvertures
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Première ouverture
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Dernière ouverture
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Source
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-4 text-center">
//                       Chargement...
//                     </td>
//                   </tr>
//                 ) : stats.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
//                       Aucune donnée disponible
//                     </td>
//                   </tr>
//                 ) : (
//                   stats.map((item) => (
//                     <tr key={item.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
//                             {item.link_id}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           {item.open_count || 1}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(item.first_opened).toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(item.last_opened).toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
//                         {item.referrer || 'Direct'}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FiRefreshCw, FiExternalLink, FiEye, FiLink, FiCalendar } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const supabase = createClient(
  'https://htotfyduudyoephuixzu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function TrackingPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalOpens, setTotalOpens] = useState(0);
  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({ 
    start: null, 
    end: null 
  });

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      let query = supabase
        .from('link_openings')
        .select('*')
        .order('last_opened', { ascending: false });

      if (dateRange.start) {
        query = query.gte('last_opened', dateRange.start);
      }
      if (dateRange.end) {
        query = query.lte('last_opened', dateRange.end);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setStats(data || []);
      const total = data?.reduce((sum, item) => sum + (item.open_count || 1), 0) || 0;
      setTotalOpens(total);
    } catch (err) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [dateRange]);

  // Préparer les données pour les graphiques
  const prepareChartData = () => {
    // Top 5 des liens les plus ouverts
    const topLinks = [...stats]
      .sort((a, b) => (b.open_count || 1) - (a.open_count || 1))
      .slice(0, 5)
      .map(item => ({
        name: item.link_id.slice(0, 8) + '...',
        value: item.open_count || 1
      }));

    // Répartition par source
    const sources: Record<string, number> = {};
    stats.forEach(item => {
      const source = item.referrer || 'Direct';
      sources[source] = (sources[source] || 0) + (item.open_count || 1);
    });
    const sourceData = Object.entries(sources).map(([name, value]) => ({ name, value }));

    // Ouvertures par jour
    const dailyOpens: Record<string, number> = {};
    stats.forEach(item => {
      const date = new Date(item.last_opened).toISOString().split('T')[0];
      dailyOpens[date] = (dailyOpens[date] || 0) + (item.open_count || 1);
    });
    const dailyData = Object.entries(dailyOpens)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return { topLinks, sourceData, dailyData };
  };

  const { topLinks, sourceData, dailyData } = prepareChartData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Statistiques de Tracking</h1>
            <p className="text-gray-600">Suivi des ouvertures des liens d'invitation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
              <FiCalendar className="text-gray-500" />
              <input
                type="date"
                className="border-none bg-transparent text-sm"
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <span>à</span>
              <input
                type="date"
                className="border-none bg-transparent text-sm"
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
            <button 
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <FiLink size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Liens uniques</p>
                <p className="text-2xl font-bold">{stats.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <FiEye size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total ouvertures</p>
                <p className="text-2xl font-bold">{totalOpens}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <FiExternalLink size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Moyenne par lien</p>
                <p className="text-2xl font-bold">
                  {stats.length > 0 ? Math.round(totalOpens / stats.length) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         

       

         
        </div>

        {/* Tableau des données */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lien
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ouvertures
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Première ouverture
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière ouverture
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      Chargement...
                    </td>
                  </tr>
                ) : stats.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Aucune donnée disponible
                    </td>
                  </tr>
                ) : (
                  stats.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {item.link_id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.open_count || 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.first_opened).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.last_opened).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                        {item.referrer || 'Direct'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Ouvertures par jour</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" name="Ouvertures par jour" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
      </div>
    </div>
  );
}