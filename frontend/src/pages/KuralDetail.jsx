import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { addToGuestWishlist, removeFromGuestWishlist, isInGuestWishlist } from '../utils/localStorage';
import Navbar from '../components/Navbar';
import { Volume2, RefreshCw } from "lucide-react"; // Refresh icon

const KuralDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_URL, isAuthenticated } = useAuth();

  const [kural, setKural] = useState(null);
  const [adhigaram, setAdhigaram] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ State for cycling purul
  const [currentPurul, setCurrentPurul] = useState("mv"); // MB default

  useEffect(() => {
    const fetchKural = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/kurals/${id}`);
        setKural(response.data);

        const adhigaramResponse = await axios.get(`${API_URL}/api/adhigarams`);
        const adhigaramData = adhigaramResponse.data.find(
          a => a.number === response.data.adhigaramNumber
        );
        setAdhigaram(adhigaramData);

        if (isAuthenticated) {
          const userResponse = await axios.get(`${API_URL}/api/users/me`);
          setIsCompleted(
            userResponse.data.completedKurals.some(k => k.kuralNumber === parseInt(id))
          );
          setIsWishlisted(userResponse.data.wishlist.includes(parseInt(id)));
        } else {
          setIsWishlisted(isInGuestWishlist(parseInt(id)));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching kural:', error);
        setLoading(false);
      }
    };

    fetchKural();
  }, [id, API_URL, isAuthenticated]);

  // ✅ Get the correct purul dynamically
 const getCurrentPurulText = () => {
  if (!kural) return "";

  switch (currentPurul) {
    case "mv":
      return kural.mv || "No MB meaning available";
    case "sp":
      return kural.sp || "No SP meaning available";
    case "mk":
      return kural.mk || "No MK meaning available";
    default:
      return kural.mv || "No MB meaning available";
  }
};



  // ✅ Speech function
  const speakKural = () => {
    if (!kural) return;

    const tamilText = kural.tamilText;
    const meaning = getCurrentPurulText();
    const combinedText = `${tamilText}. பொருள்: ${meaning}`;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(combinedText);
    utterance.lang = "ta-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find(v => v.lang.startsWith("ta"));
    if (tamilVoice) utterance.voice = tamilVoice;

    window.speechSynthesis.speak(utterance);
  };

  // ✅ Cycle purul MB -> SP -> MK
  const handleCyclePurul = () => {
    if (currentPurul === 'mv') setCurrentPurul('sp');
    else if (currentPurul === 'sp') setCurrentPurul('mk');
    else setCurrentPurul('mv');
  };

  // Toggle complete
  const handleToggleComplete = async () => {
    if (!isAuthenticated) {
      alert('Please login to track your progress');
      return;
    }

    try {
      if (isCompleted) {
        await axios.delete(`${API_URL}/api/users/complete/${id}`);
        setIsCompleted(false);
      } else {
        await axios.post(`${API_URL}/api/users/complete/${id}`);
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error toggling complete:', error);
      alert(error.response?.data?.message || 'Error updating completion status');
    }
  };

  // Toggle wishlist
  const handleToggleWishlist = async () => {
    try {
      if (isAuthenticated) {
        if (isWishlisted) {
          await axios.delete(`${API_URL}/api/users/wishlist/${id}`);
          setIsWishlisted(false);
        } else {
          await axios.post(`${API_URL}/api/users/wishlist/${id}`);
          setIsWishlisted(true);
        }
      } else {
        if (isWishlisted) {
          removeFromGuestWishlist(parseInt(id));
          setIsWishlisted(false);
        } else {
          addToGuestWishlist(parseInt(id));
          setIsWishlisted(true);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert(error.response?.data?.message || 'Error updating wishlist');
    }
  };

  const getPaalBgColor = (paal) => {
    switch (paal) {
      case 'Arathupal':
        return 'bg-arathu-light/30';
      case 'Porutpal':
        return 'bg-porut-light/30';
      case 'Kamathupal':
        return 'bg-kamathu-light/30';
      default:
        return 'bg-gray-50';
    }
  };

  const getPaalColor = (paal) => {
    switch (paal) {
      case 'Arathupal':
        return 'arathu-primary';
      case 'Porutpal':
        return 'porut-primary';
      case 'Kamathupal':
        return 'kamathu-primary';
      default:
        return 'gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgGray">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbBlue mx-auto"></div>
            <p className="mt-4 text-textDark">Loading Kural...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!kural) {
    return (
      <div className="min-h-screen bg-bgGray">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-textDark mb-4">Kural not found</h2>
          <button
            onClick={() => navigate('/lessons')}
            className="bg-fbBlue text-white px-6 py-2 rounded-lg"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getPaalBgColor(kural.paal)}`}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/lessons')}
            className="flex items-center gap-2 text-textDark hover:text-fbBlue"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Lessons
          </button>
          {adhigaram && (
            <div className="text-sm text-gray-600">
              {adhigaram.nameTamil} • Chapter {adhigaram.number}
            </div>
          )}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-card p-8 md:p-12">
          {/* Kural Number + Speaker */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`inline-block px-4 py-2 rounded-full bg-${getPaalColor(kural.paal)} text-white font-bold`}>
              குறள் #{kural.number}
            </div>
            <button
              onClick={speakKural}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition"
              title="Listen to Kural"
            >
              <Volume2 className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Kural Text */}
          <div className="mb-8">
            <div className="text-3xl md:text-4xl font-bold text-textDark text-center leading-relaxed tamil-text whitespace-pre-line">
              {kural.tamilText}
            </div>
          </div>

          {/* Meaning / Purul */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-textDark mb-3 tamil-text flex items-center justify-between">
              <span>பொருள்:</span>
              <button
                onClick={handleCyclePurul}
                className="p-1 bg-fbBlue text-white rounded-full hover:bg-blue-600 transition"
                title={`Show next Purul (currently ${currentPurul})`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </h3>
            <div className="bg-bgGray rounded-lg p-6">
              <p className="text-lg text-textDark leading-relaxed tamil-text">
                {getCurrentPurulText()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleToggleComplete}
              className={`py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isCompleted
                  ? 'bg-success/20 text-success border-2 border-success'
                  : 'bg-success text-white hover:bg-green-600'
              }`}
              disabled={!isAuthenticated && true}
            >
              <span className="text-xl">{isCompleted ? '✓' : '✅'}</span>
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>

            <button
              onClick={handleToggleWishlist}
              className={`py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isWishlisted
                  ? 'bg-kamathu-primary/20 text-kamathu-primary border-2 border-kamathu-primary'
                  : 'bg-kamathu-primary text-white hover:bg-kamathu-dark'
              }`}
            >
              <span className="text-xl">{isWishlisted ? '❤️' : '🤍'}</span>
              {isWishlisted ? 'Saved' : 'Save to Wishlist'}
            </button>
          </div>

          {!isAuthenticated && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-sm text-blue-800">
                💡 <strong>Login</strong> to track your progress and sync wishlist across devices
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KuralDetail;
