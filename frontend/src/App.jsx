import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Lessons from './pages/Lessons';
import KuralDetail from './pages/KuralDetail';
import Wishlist from './pages/Wishlist';
import Completed from './pages/Completed';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Reels from './pages/Reels';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import ReelsEnhanced from './pages/ReelsEnhanced';
import Playlists from './pages/Playlists';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/kural/:id" element={<KuralDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/search" element={<Search />} />
          <Route path="/reels-enhanced" element={<ReelsEnhanced />} />
          <Route path="/playlists" element={<Playlists />} />

          {/* Protected Routes */}
          <Route
            path="/completed"
            element={
              <ProtectedRoute>
                <Completed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
