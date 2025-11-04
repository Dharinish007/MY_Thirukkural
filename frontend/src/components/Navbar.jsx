import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getGuestWishlist } from '../utils/localStorage';
import axios from 'axios';

const Navbar = () => {
  const { user, isAuthenticated, logout, API_URL } = useAuth();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [newItemsCount, setNewItemsCount] = useState(0); // how many new items since last view
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper: read last seen count from localStorage (0 if missing or invalid)
  const readLastSeen = () => {
    const v = localStorage.getItem('lastSeenWishlistCount');
    const n = parseInt(v ?? '0', 10);
    return Number.isNaN(n) ? 0 : n;
  };

  // Helper: write last seen count to localStorage
  const writeLastSeen = (count) => {
    localStorage.setItem('lastSeenWishlistCount', String(count));
  };

  // Fetch wishlist count and compute new items
  useEffect(() => {
    let mounted = true;
    const fetchWishlist = async () => {
      try {
        let count = 0;
        if (isAuthenticated) {
          const response = await axios.get(`${API_URL}/api/users/me`);
          count = response.data.wishlist?.length || 0;
        } else {
          const guestWishlist = getGuestWishlist();
          count = guestWishlist.length;
        }

        if (!mounted) return;
        setWishlistCount(count);

        const lastSeen = readLastSeen();
        if (count > lastSeen) {
          setNewItemsCount(count - lastSeen);
        } else {
          setNewItemsCount(0);
        }
      } catch (err) {
        console.error('Error fetching wishlist count:', err);
      }
    };

    // initial fetch
    fetchWishlist();

    // poll every 3s (optional). If you don't want polling, remove interval.
    const interval = setInterval(fetchWishlist, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [isAuthenticated, API_URL]);

  // When user opens /wishlist, mark current count as seen (so badge disappears)
  useEffect(() => {
    if (location.pathname === '/wishlist') {
      writeLastSeen(wishlistCount);
      setNewItemsCount(0);
    }
    // we intentionally depend on location.pathname and wishlistCount
  }, [location.pathname, wishlistCount]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-textDark">ThirukkuralApp</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative flex items-center space-x-1 text-pink-500 hover:text-pink-600"
            >
              <svg
                className="w-6 h-6"
                fill={wishlistCount > 0 ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>

              {/* Badge: show only the number of NEW items (added after last seen) */}
              {newItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-kamathu-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {newItemsCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 hover:opacity-80"
                >
                  <div className="w-8 h-8 rounded-full bg-fbBlue text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-textDark font-medium hidden sm:block">
                    {user?.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-textDark"
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
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-card py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-textDark hover:bg-bgGray"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-danger hover:bg-bgGray"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-fbBlue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
