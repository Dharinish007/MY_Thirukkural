import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getGuestWishlist } from "../utils/localStorage";
import { Search, Bell } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const { user, isAuthenticated, logout, API_URL } = useAuth();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [newItemsCount, setNewItemsCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch wishlist count and compute new items since last seen
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        let wishlist = [];

        if (isAuthenticated) {
          const response = await axios.get(`${API_URL}/api/users/me`);
          wishlist = response.data.wishlist || [];
        } else {
          wishlist = getGuestWishlist();
        }

        const count = wishlist.length;
        setWishlistCount(count);

        // Read the previously seen wishlist count
        const lastSeen = parseInt(localStorage.getItem("wishlist_seen_count") || "0", 10);

        // If there are new additions
        if (count > lastSeen) {
          setNewItemsCount(count - lastSeen);
        } else {
          setNewItemsCount(0);
        }
      } catch (err) {
        console.error("Error fetching wishlist count:", err);
      }
    };

    fetchWishlist();

    // Optional polling every 2 seconds to reflect real-time changes
    const interval = setInterval(fetchWishlist, 2000);
    return () => clearInterval(interval);
  }, [isAuthenticated, API_URL]);

  // Reset notification when user visits wishlist page
  useEffect(() => {
    if (location.pathname === "/wishlist") {
      localStorage.setItem("wishlist_seen_count", String(wishlistCount));
      setNewItemsCount(0);
    }
  }, [location.pathname, wishlistCount]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
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

  {/* Search Icon */}
  <button
    onClick={() => navigate("/search")}
    className="text-gray-600 hover:text-gray-900 transition"
  >
    <Search className="w-6 h-6" />
  </button>

  {/* Notification Icon */}
  <button
    onClick={() => navigate("/notifications")}
    className="relative text-gray-600 hover:text-gray-900 transition"
  >
    <Bell className="w-6 h-6" />

    {/* Notification badge */}
    {newItemsCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
        {newItemsCount}
      </span>
    )}
  </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative flex items-center space-x-1 text-pink-500 hover:text-pink-600"
            >
              <svg
                className="w-6 h-6"
                fill={wishlistCount > 0 ? "currentColor" : "none"}
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

              {/* Badge shows only newly added favorites */}
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
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-1xl font-bold">
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
  className="bg-[#1877F2] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#166FE5] active:bg-[#145DDC] shadow-md transition-all duration-200"
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
