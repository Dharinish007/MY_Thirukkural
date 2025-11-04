import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Reels = () => {
  return (
    <div className="min-h-screen bg-bgGray">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl shadow-card p-12">
          <div className="text-8xl mb-6">🎬</div>
          <h1 className="text-4xl font-bold text-textDark mb-4">
            Reels Feature Coming Soon!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Swipe through daily Kurals in an engaging reel format
          </p>
          <Link
            to="/"
            className="inline-block bg-kamathu-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-kamathu-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reels;
