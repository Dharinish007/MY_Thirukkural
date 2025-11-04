import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home = () => {
  const { user, isAuthenticated, API_URL } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchStats = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/users/stats`);
          setStats(response.data);
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      };
      fetchStats();
    }
  }, [isAuthenticated, API_URL]);

  const getProgressColor = (percent) => {
    if (percent < 33) return 'text-arathu-primary';
    if (percent < 67) return 'text-porut-primary';
    return 'text-kamathu-primary';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgLight via-harmony-teal/10 to-harmony-violet/10 transition-all">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {isAuthenticated ? (
            <>
              <h1 className="text-4xl font-bold text-textDark mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-xl text-textDark/80">
                Continue your journey through timeless Tamil wisdom
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-textDark mb-2">
                Welcome! Start learning Thirukkural 📚
              </h1>
              <p className="text-xl text-textDark/80">
                Discover timeless Tamil wisdom
              </p>
            </>
          )}
        </div>

        {/* Progress Section - Only for logged-in users */}
        {isAuthenticated && stats && (
          <div className="bg-surface/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-glow p-8 mb-12 hover:shadow-card transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Progress Circle */}
              <div className="relative">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke={
                      stats.progressPercent < 33
                        ? '#00C853'
                        : stats.progressPercent < 67
                        ? '#F6C90E'
                        : '#E4405F'
                    }
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 70 * (1 - stats.progressPercent / 100)
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${getProgressColor(
                        stats.progressPercent
                      )}`}
                    >
                      {stats.totalCompleted}
                    </div>
                    <div className="text-sm text-gray-500">/ 1330</div>
                  </div>
                </div>
              </div>

              {/* Progress Text */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-textDark mb-2">
                  You've completed {stats.totalCompleted} Kurals!
                </h2>
                <p className="text-textDark/70">
                  {stats.progressPercent.toFixed(1)}% of your journey complete
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lessons Card */}
          <Link
            to="/lessons"
            className="bg-gradient-to-br from-arathu-light to-harmony-teal/20 rounded-2xl shadow-card p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-textDark mb-2">
              Browse Lessons
            </h3> 
            <p className="text-textDark mb-4">133 Chapters • 1330 Kurals</p>
            <div className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg">
              Start Learning
            </div>
          </Link>

          {/* Completed Card - Only for logged-in users */}
          {isAuthenticated ? (
            <Link
              to="/completed"
              className="bg-gradient-to-br from-porut-light to-porut-primary/30 rounded-2xl shadow-card p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-textDark mb-2">
                Completed Kurals
              </h3>
              <p className="text-textDark mb-4">
                {stats?.totalCompleted || 0} Kurals learned
              </p>
              <div className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg">
                View All
              </div>
            </Link>
          ) : (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-card p-8 opacity-75">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-textDark mb-2">
                Completed Kurals
              </h3>
              <p className="text-textDark/80 mb-4">
                Login to track your progress
              </p>
              <Link
                to="/login"
                className="inline-block bg-harmony-violet text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg"
              >
                Login to Track
              </Link>
            </div>
          )}

          {/* Quiz Card - Placeholder */}
          <div className="bg-gradient-to-br from-harmony-violet/20 to-harmony-teal/10 rounded-2xl shadow-card p-8 opacity-80 hover:shadow-glow transition-all duration-300">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold text-textDark mb-2">
              Test Your Knowledge
            </h3>
            <p className="text-textDark/80 mb-4">Coming Soon!</p>
            <div className="inline-block bg-gray-400 text-white px-6 py-2 rounded-lg font-medium cursor-not-allowed">
              Start Quiz
            </div>
          </div>

          {/* Reels Card - Placeholder */}
          <div className="bg-gradient-to-br from-kamathu-light to-kamathu-primary/30 rounded-2xl shadow-card p-8 opacity-80 hover:shadow-glow transition-all duration-300">
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-textDark mb-2">
              Daily Reels
            </h3>
            <p className="text-textDark/80 mb-4">Coming Soon!</p>
            <div className="inline-block bg-gray-400 text-white px-6 py-2 rounded-lg font-medium cursor-not-allowed">
              Watch Reels
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
