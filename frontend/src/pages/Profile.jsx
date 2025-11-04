import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';

const Profile = () => {
  const { user, logout, API_URL } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [API_URL]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/stats`);
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgGray">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbBlue mx-auto"></div>
            <p className="mt-4 text-textDark">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgGray">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-card p-8 mb-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-fbBlue text-white flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold text-textDark mb-1">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Completed */}
          <div className="bg-arathu-light rounded-xl p-6">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold text-textDark mb-1">
              {stats?.totalCompleted || 0}
            </div>
            <div className="text-gray-700 font-medium">Kurals Completed</div>
          </div>

          {/* Wishlist Count */}
          <div className="bg-kamathu-light rounded-xl p-6">
            <div className="text-4xl mb-2">❤️</div>
            <div className="text-3xl font-bold text-textDark mb-1">
              {stats?.wishlistCount || 0}
            </div>
            <div className="text-gray-700 font-medium">Saved Kurals</div>
          </div>

          {/* Progress % */}
          <div className="bg-blue-100 rounded-xl p-6">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold text-textDark mb-1">
              {stats?.progressPercent?.toFixed(1) || 0}%
            </div>
            <div className="text-gray-700 font-medium">Progress</div>
          </div>
        </div>

        {/* Progress Breakdown */}
        <div className="bg-white rounded-xl shadow-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-textDark mb-6">Progress by Category</h2>

          <div className="space-y-6">
            {/* Arathupal */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌱</span>
                  <span className="font-medium text-textDark">Arathupal (Virtue)</span>
                </div>
                <span className="text-sm text-gray-600">
                  {stats?.byPaal?.arathupal?.completed || 0} / {stats?.byPaal?.arathupal?.total || 380}
                </span>
              </div>
              <ProgressBar
                completed={stats?.byPaal?.arathupal?.completed || 0}
                total={stats?.byPaal?.arathupal?.total || 380}
                color="arathu"
              />
            </div>

            {/* Porutpal */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <span className="font-medium text-textDark">Porutpal (Wealth)</span>
                </div>
                <span className="text-sm text-gray-600">
                  {stats?.byPaal?.porutpal?.completed || 0} / {stats?.byPaal?.porutpal?.total || 700}
                </span>
              </div>
              <ProgressBar
                completed={stats?.byPaal?.porutpal?.completed || 0}
                total={stats?.byPaal?.porutpal?.total || 700}
                color="porut"
              />
            </div>

            {/* Kamathupal */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💕</span>
                  <span className="font-medium text-textDark">Kamathupal (Love)</span>
                </div>
                <span className="text-sm text-gray-600">
                  {stats?.byPaal?.kamathupal?.completed || 0} / {stats?.byPaal?.kamathupal?.total || 250}
                </span>
              </div>
              <ProgressBar
                completed={stats?.byPaal?.kamathupal?.completed || 0}
                total={stats?.byPaal?.kamathupal?.total || 250}
                color="kamathu"
              />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 border-2 border-danger text-danger rounded-lg font-medium hover:bg-danger hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
