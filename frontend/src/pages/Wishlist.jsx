import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { getGuestWishlist, removeFromGuestWishlist } from '../utils/localStorage';
import Navbar from '../components/Navbar';

const Wishlist = () => {
  const { API_URL, isAuthenticated } = useAuth();
  const [wishlistKurals, setWishlistKurals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated, API_URL]);

  const fetchWishlist = async () => {
    try {
      if (isAuthenticated) {
        const response = await axios.get(`${API_URL}/api/users/wishlist`);
        setWishlistKurals(response.data);
      } else {
        const guestWishlist = getGuestWishlist();
        if (guestWishlist.length > 0) {
          // Fetch Kural details for guest wishlist
          const kuralPromises = guestWishlist.map(num =>
            axios.get(`${API_URL}/api/kurals/${num}`)
          );
          const responses = await Promise.all(kuralPromises);
          setWishlistKurals(responses.map(r => r.data));
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setLoading(false);
    }
  };

  const handleRemove = async (kuralNumber) => {
    try {
      if (isAuthenticated) {
        await axios.delete(`${API_URL}/api/users/wishlist/${kuralNumber}`);
      } else {
        removeFromGuestWishlist(kuralNumber);
      }
      setWishlistKurals(prev => prev.filter(k => k.number !== kuralNumber));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-bgGray">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbBlue mx-auto"></div>
            <p className="mt-4 text-textDark">Loading wishlist...</p>
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
            My Wishlist ❤️
          </h1>
          <p className="text-gray-600">{wishlistKurals.length} Kurals saved</p>
        </div>

        {/* Guest Banner */}
        {!isAuthenticated && wishlistKurals.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-center">
              💡 <strong>Login</strong> to save your wishlist permanently across devices
              <Link to="/login" className="ml-2 underline font-medium">
                Login Now
              </Link>
            </p>
          </div>
        )}

        {/* Empty State */}
        {wishlistKurals.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card p-12 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-textDark mb-2">
              No Kurals saved yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding Kurals to your wishlist to save them for later
            </p>
            <Link
              to="/lessons"
              className="inline-block bg-fbBlue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600"
            >
              Browse Lessons
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistKurals.map((kural) => (
              <div
                key={kural.number}
                className="bg-white rounded-xl shadow-soft hover:shadow-card transition-all overflow-hidden group relative"
              >
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(kural.number)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-danger hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="Remove from wishlist"
                >
                  ✕
                </button>

                <Link to={`/kural/${kural.number}`} className="block p-6">
                  {/* Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full ${getPaalColor(kural.paal)} text-white text-sm font-bold mb-3`}>
                    குறள் #{kural.number}
                  </div>

                  {/* Tamil Text */}
                  <div className="text-lg font-medium text-textDark tamil-text leading-relaxed mb-3">
                    {kural.tamilText.split('\n')[0]}
                  </div>

                  {/* View Details */}
                  <div className="text-fbBlue text-sm font-medium flex items-center gap-1">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
