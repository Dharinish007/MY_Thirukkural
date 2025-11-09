import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Heart, Bookmark, Share2, ChevronUp, ChevronDown,
  Volume2, VolumeX, MoreVertical, Check, ArrowLeft, Shuffle
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ReelsEnhanced() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  
  const [kurals, setKurals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [sourceType, setSourceType] = useState('discovery');
  const [showSourceMenu, setShowSourceMenu] = useState(false);
  
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    initializeSession();
  }, [sourceType]);

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < kurals.length) {
      logInteraction('view');
      startTime.current = Date.now();
    }
  }, [currentIndex]);

  const initializeSession = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/reels/session`,
        { sourceType, count: 20 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSessionId(response.data.data.session_id);
        await fetchKurals(response.data.data.kural_numbers);
      }
    } catch (error) {
      console.error('Session error:', error);
      alert('Failed to initialize Reels session');
    } finally {
      setLoading(false);
    }
  };

  const fetchKurals = async (kuralNumbers) => {
    try {
      const kuralPromises = kuralNumbers.map(num =>
        axios.get(`${API_URL}/kurals/${num}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      const responses = await Promise.all(kuralPromises);
      const kuralData = responses.map(res => res.data.data);
      setKurals(kuralData);
    } catch (error) {
      console.error('Fetch Kurals error:', error);
    }
  };

  const logInteraction = async (type, data = {}) => {
    if (!sessionId || !kurals[currentIndex]) return;

    const duration = Math.floor((Date.now() - startTime.current) / 1000);

    try {
      await axios.post(
        `${API_URL}/reels/${sessionId}/interaction`,
        {
          kuralNumber: kurals[currentIndex].kural_number,
          duration,
          ...data
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Log interaction error:', error);
    }
  };

  const handleSwipe = (direction) => {
    if (direction === 'up' && currentIndex < kurals.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAudioPlaying(false);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAudioPlaying(false);
    }
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY.current - endY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleSwipe('up');
      } else {
        handleSwipe('down');
      }
    }
  };

  const handleLike = async () => {
    await logInteraction('like', { liked: true });
    // Update UI to show liked state
  };

  const handleBookmark = async () => {
    const kural = kurals[currentIndex];
    try {
      await axios.post(
        `${API_URL}/users/wishlist`,
        { kuralNumber: kural.kural_number },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await logInteraction('bookmark', { wishlisted: true });
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  const handleComplete = async () => {
    const kural = kurals[currentIndex];
    try {
      await axios.post(
        `${API_URL}/users/complete`,
        { kuralNumber: kural.kural_number },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await logInteraction('complete', { completed: true });
      alert('Marked as completed!');
    } catch (error) {
      console.error('Complete error:', error);
    }
  };

  const handleShare = async () => {
    const kural = kurals[currentIndex];
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Thirukkural #${kural.kural_number}`,
          text: `${kural.tamil_text}\n\n${kural.english_translation}`,
          url: window.location.origin + `/kural/${kural.kural_number}`
        });
        await logInteraction('share', { shared: true });
      } catch (error) {
        console.error('Share error:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Thirukkural #${kural.kural_number}\n${kural.tamil_text}\n${kural.english_translation}`
      );
      alert('Copied to clipboard!');
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const getPaalGradient = (paal) => {
    switch (paal) {
      case 'Arathupal':
        return 'from-green-400 to-emerald-600';
      case 'Porutpal':
        return 'from-yellow-400 to-orange-600';
      case 'Kamathupal':
        return 'from-pink-400 to-rose-600';
      default:
        return 'from-blue-400 to-indigo-600';
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (kurals.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <p className="text-xl mb-4">No Kurals available</p>
        <button
          onClick={() => navigate('/lessons')}
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Go to Lessons
        </button>
      </div>
    );
  }

  const currentKural = kurals[currentIndex];

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSourceMenu(!showSourceMenu)}
            className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/50 transition-colors"
          >
            {sourceType === 'discovery' && '✨ Discovery'}
            {sourceType === 'sequential' && '📚 Sequential'}
            {sourceType === 'random' && '🎲 Random'}
          </button>
          
          <button
            onClick={() => setMuted(!muted)}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Source Menu */}
      {showSourceMenu && (
        <div className="absolute top-16 right-4 z-30 bg-black/90 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
          {['discovery', 'sequential', 'random'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSourceType(type);
                setShowSourceMenu(false);
              }}
              className={`w-full px-6 py-3 text-left text-white hover:bg-white/10 transition-colors ${
                sourceType === type ? 'bg-white/20' : ''
              }`}
            >
              {type === 'discovery' && '✨ Discovery Mode'}
              {type === 'sequential' && '📚 Sequential Mode'}
              {type === 'random' && '🎲 Random Mode'}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="h-full flex items-center justify-center relative"
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getPaalGradient(currentKural.paal)} opacity-20`}></div>

        {/* Kural Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          {/* Kural Number & Paal */}
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-3">
              <span className="text-white/80 text-sm">Kural</span>
              <span className="text-white font-bold text-lg ml-2">#{currentKural.kural_number}</span>
            </div>
            <div className="text-white/60 text-sm">
              {currentKural.adhigaram?.english_name} • {currentKural.paal.name_english}
            </div>
          </div>

          {/* Tamil Text */}
          <div className="mb-8">
            <p className="text-white text-3xl md:text-4xl font-tamil leading-relaxed mb-4">
              {currentKural.tamil_text}
            </p>
          </div>

          {/* English Translation */}
          <div className="mb-8">
            <p className="text-white/90 text-xl md:text-2xl leading-relaxed">
              {currentKural.english_translation}
            </p>
          </div>

          {/* Explanation (Optional) */}
          {currentKural.explanation && (
            <div className="mb-6">
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                {currentKural.explanation}
              </p>
            </div>
          )}

          {/* Audio Player */}
          {currentKural.audio_url && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={toggleAudio}
                className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
              >
                {audioPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <audio
                ref={audioRef}
                src={currentKural.audio_url}
                muted={muted}
                onEnded={() => setAudioPlaying(false)}
              />
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
          <button
            onClick={() => handleSwipe('down')}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors disabled:opacity-30"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleSwipe('up')}
            disabled={currentIndex === kurals.length - 1}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors disabled:opacity-30"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-6 bottom-24 flex flex-col gap-6 z-20">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform"
          >
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xs">Like</span>
          </button>

          <button
            onClick={handleBookmark}
            className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform"
          >
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30">
              <Bookmark className="w-6 h-6" />
            </div>
            <span className="text-xs">Save</span>
          </button>

          <button
            onClick={handleComplete}
            className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform"
          >
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30">
              <Check className="w-6 h-6" />
            </div>
            <span className="text-xs">Done</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform"
          >
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xs">Share</span>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <span>{currentIndex + 1} / {kurals.length}</span>
          </div>
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / kurals.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Swipe Hint (show on first load) */}
      {currentIndex === 0 && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center text-white/50">
            <ChevronUp className="w-8 h-8 mb-1" />
            <span className="text-sm">Swipe up for next</span>
          </div>
        </div>
      )}
    </div>
  );
}
