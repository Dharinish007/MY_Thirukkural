import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';

const Completed = () => {
  const { API_URL } = useAuth();
  const [completedKurals, setCompletedKurals] = useState([]);
  const [filteredKurals, setFilteredKurals] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompleted();
  }, [API_URL]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredKurals(completedKurals);
    } else {
      setFilteredKurals(completedKurals.filter(k => k.paal === activeFilter));
    }
  }, [activeFilter, completedKurals]);

  const fetchCompleted = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/completed`);
      setCompletedKurals(response.data);
      setFilteredKurals(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching completed:', error);
      setLoading(false);
    }
  };

  const getPaalColor = (paal) => {
    switch (paal) {
      case 'Arathupal':
        return 'bg-arathu-primary';
      case 'Porutpal':
        return 'bg-porut-primary';
      case 'Kamathupal':
        return 'bg-kamathu-primary';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgGray">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbBlue mx-auto"></div>
            <p className="mt-4 text-textDark">Loading completed Kurals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgGray">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2 flex items-center gap-3">
            Completed Kurals ✅
          </h1>
          <p className="text-gray-600">{completedKurals.length} out of 1330 Kurals completed</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <ProgressBar
            completed={completedKurals.length}
            total={1330}
            color="gradient"
          />
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-soft mb-6">
          <div className="flex flex-wrap border-b border-border">
            <button
              onClick={() => setActiveFilter('All')}
              className={`py-4 px-6 font-medium transition-all ${
                activeFilter === 'All'
                  ? 'text-fbBlue border-b-3 border-fbBlue'
                  : 'text-gray-600 hover:text-textDark'
              }`}
            >
              All ({completedKurals.length})
            </button>
            <button
              onClick={() => setActiveFilter('Arathupal')}
              className={`py-4 px-6 font-medium transition-all ${
                activeFilter === 'Arathupal'
                  ? 'text-arathu-primary border-b-3 border-arathu-primary'
                  : 'text-gray-600 hover:text-textDark'
              }`}
            >
              🌱 Arathupal ({completedKurals.filter(k => k.paal === 'Arathupal').length})
            </button>
            <button
              onClick={() => setActiveFilter('Porutpal')}
              className={`py-4 px-6 font-medium transition-all ${
                activeFilter === 'Porutpal'
                  ? 'text-porut-primary border-b-3 border-porut-primary'
                  : 'text-gray-600 hover:text-textDark'
              }`}
            >
              💰 Porutpal ({completedKurals.filter(k => k.paal === 'Porutpal').length})
            </button>
            <button
              onClick={() => setActiveFilter('Kamathupal')}
              className={`py-4 px-6 font-medium transition-all ${
                activeFilter === 'Kamathupal'
                  ? 'text-kamathu-primary border-b-3 border-kamathu-primary'
                  : 'text-gray-600 hover:text-textDark'
              }`}
            >
              💕 Kamathupal ({completedKurals.filter(k => k.paal === 'Kamathupal').length})
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredKurals.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-textDark mb-2">
              {activeFilter === 'All' ? 'No Kurals completed yet' : `No ${activeFilter} Kurals completed`}
            </h2>
            <p className="text-gray-600 mb-6">
              Start learning and mark Kurals as complete to track your progress
            </p>
            <Link
              to="/lessons"
              className="inline-block bg-fbBlue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600"
            >
              Browse Lessons
            </Link>
          </div>
        ) : (
          /* Completed List */
          <div className="space-y-4">
            {filteredKurals.map((kural) => (
              <Link
                key={kural.number}
                to={`/kural/${kural.number}`}
                className="block bg-white rounded-xl shadow-soft hover:shadow-card transition-all p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Check Icon */}
                  <div className="text-3xl flex-shrink-0">✅</div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Badge */}
                    <div className={`inline-block px-3 py-1 rounded-full ${getPaalColor(kural.paal)} text-white text-sm font-bold mb-2`}>
                      குறள் #{kural.number}
                    </div>

                    {/* Tamil Text */}
                    <div className="text-lg font-medium text-textDark tamil-text leading-relaxed mb-2">
                      {kural.tamilText.split('\n')[0]}
                    </div>

                    {/* Completion Date */}
                    <div className="text-sm text-gray-500">
                      Completed on {formatDate(kural.completedAt)}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-6 h-6 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed;
