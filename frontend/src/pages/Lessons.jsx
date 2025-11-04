import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';

const Lessons = () => {
  const { API_URL, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('Arathupal');
  const [adhigarams, setAdhigarams] = useState([]);
  const [expandedAdhigaram, setExpandedAdhigaram] = useState(null);
  const [kuralsCache, setKuralsCache] = useState({});
  const [completedKurals, setCompletedKurals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all Adhigarams on mount
  useEffect(() => {
    const fetchAdhigarams = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/adhigarams`);
        setAdhigarams(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching adhigarams:', error);
        setLoading(false);
      }
    };

    fetchAdhigarams();
  }, [API_URL]);

  // Fetch completed Kurals if logged in
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCompleted = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/users/me`);
          setCompletedKurals(response.data.completedKurals.map(k => k.kuralNumber));
        } catch (error) {
          console.error('Error fetching completed:', error);
        }
      };
      fetchCompleted();
    }
  }, [isAuthenticated, API_URL]);

  // Lazy load Kurals when Adhigaram is expanded
  const handleExpandAdhigaram = async (adhigaramNumber) => {
    if (expandedAdhigaram === adhigaramNumber) {
      setExpandedAdhigaram(null);
      return;
    }

    setExpandedAdhigaram(adhigaramNumber);

    // Check cache first
    if (kuralsCache[adhigaramNumber]) {
      return;
    }

    // Fetch Kurals for this Adhigaram
    try {
      const response = await axios.get(`${API_URL}/api/adhigarams/${adhigaramNumber}/kurals`);
      setKuralsCache(prev => ({
        ...prev,
        [adhigaramNumber]: response.data
      }));
    } catch (error) {
      console.error('Error fetching kurals:', error);
    }
  };

  const filteredAdhigarams = adhigarams.filter(a => a.paal === activeTab);

  const getPaalColor = (paal) => {
    switch (paal) {
      case 'Arathupal':
        return { primary: 'arathu-primary', light: 'arathu-light', dark: 'arathu-dark' };
      case 'Porutpal':
        return { primary: 'porut-primary', light: 'porut-light', dark: 'porut-dark' };
      case 'Kamathupal':
        return { primary: 'kamathu-primary', light: 'kamathu-light', dark: 'kamathu-dark' };
      default:
        return { primary: 'gray-500', light: 'gray-100', dark: 'gray-700' };
    }
  };

  const getCompletedCount = (adhigaramNumber) => {
    const kurals = kuralsCache[adhigaramNumber] || [];
    return kurals.filter(k => completedKurals.includes(k.number)).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgGray">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbBlue mx-auto"></div>
            <p className="mt-4 text-textDark">Loading lessons...</p>
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
          <h1 className="text-4xl font-bold text-textDark mb-2">Lessons</h1>
          <p className="text-gray-600">Explore 133 chapters of timeless wisdom</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-soft mb-6 sticky top-16 z-40">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('Arathupal')}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                activeTab === 'Arathupal'
                  ? 'text-arathu-primary border-b-3 border-arathu-primary'
                  : 'text-gray-600 hover:text-textDark'
              }`}
            >
              <span className="text-xl mr-2">🌱</span>
              Arathupal (Virtue)
            </button>
            <button
              onClick={() => setActiveTab('Porutpal')}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                activeTab === 'Porutpal'
                  ? 'text-porut-primary border-b-3 border-porut-primary'
                  : 'text-gray-600 hover:text-textDark'
              }`}
            >
              <span className="text-xl mr-2">💰</span>
              Porutpal (Wealth)
            </button>
            <button
              onClick={() => setActiveTab('Kamathupal')}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                activeTab === 'Kamathupal'
                  ? 'text-kamathu-primary border-b-3 border-kamathu-primary'
                  : 'text-gray-600 hover:text-textDark'
              }`}
            >
              <span className="text-xl mr-2">💕</span>
              Kamathupal (Love)
            </button>
          </div>
        </div>

        {/* Adhigaram Cards */}
        <div className="space-y-4">
          {filteredAdhigarams.map((adhigaram) => {
            const colors = getPaalColor(adhigaram.paal);
            const isExpanded = expandedAdhigaram === adhigaram.number;
            const kurals = kuralsCache[adhigaram.number] || [];
            const completedCount = getCompletedCount(adhigaram.number);

            return (
              <div
                key={adhigaram.number}
                className="bg-white rounded-xl shadow-soft hover:shadow-card transition-all overflow-hidden"
              >
                {/* Card Header */}
                <button
                  onClick={() => handleExpandAdhigaram(adhigaram.number)}
                  className="w-full p-6 flex items-center gap-4 hover:bg-gray-50 transition-all"
                >
                  {/* Number Badge */}
                  <div className={`w-12 h-12 rounded-full bg-${colors.primary} text-white flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                    {adhigaram.number}
                  </div>

                  {/* Names */}
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-textDark tamil-text">
                      {adhigaram.nameTamil}
                    </h3>
                    <p className="text-gray-600">{adhigaram.nameEnglish}</p>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-4">
                    {isAuthenticated && (
                      <div className="text-right">
                        <div className={`text-sm font-medium text-${colors.primary}`}>
                          {completedCount}/10
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className={`bg-${colors.primary} h-1.5 rounded-full transition-all`}
                            style={{ width: `${(completedCount / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Expanded Kurals List */}
                {isExpanded && (
                  <div className={`bg-${colors.light} p-6 border-t border-border`}>
                    {kurals.length === 0 ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fbBlue mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading Kurals...</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {kurals.map((kural) => (
                          <Link
                            key={kural.number}
                            to={`/kural/${kural.number}`}
                            className="block p-4 bg-white rounded-lg hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-3">
                              {isAuthenticated && completedKurals.includes(kural.number) && (
                                <span className="text-success text-xl">✅</span>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-gray-700 mb-1">
                                  குறள் #{kural.number}
                                </div>
                                <div className="text-sm text-gray-600 tamil-text truncate">
                                  {kural.tamilText.split('\n')[0]}
                                </div>
                              </div>
                              <svg
                                className="w-5 h-5 text-gray-400"
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
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
