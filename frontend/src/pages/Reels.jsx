import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Heart, Bookmark, Share2, ChevronUp, ChevronDown,
  Volume2, VolumeX, Check, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Toast notification component
const Toast = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/95 backdrop-blur-lg rounded-full shadow-xl flex items-center gap-2"
  >
    <Check className="w-5 h-5 text-green-500" />
    <span className="text-gray-800 font-medium">{message}</span>
  </motion.div>
);

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
      />
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-white/80 text-lg"
      >
        Finding perfect kurals for you...
      </motion.p>
    </div>
  </div>
);

// Audio player component with auto-play
const AudioPlayer = ({ audioUrl, tamilMeaning, englishMeaning, muted, onMutedChange, autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('kural'); // kural, tamil, english
  const audioRef = useRef(null);
  const speechRef = useRef(null);

  useEffect(() => {
    if (autoPlay && !muted) {
      playSequence();
    }
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [audioUrl, autoPlay]);

  useEffect(() => {
    if (muted) {
      stopAll();
    }
  }, [muted]);

  const stopAll = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const playSequence = async () => {
    if (muted) return;
    setIsPlaying(true);
    
    try {
      // Play Tamil audio
      if (audioUrl) {
        setCurrentPhase('kural');
        await playAudio(audioUrl);
        await delay(500);
      }
      
      // Speak Tamil meaning
      if (tamilMeaning) {
        setCurrentPhase('tamil');
        await speak(tamilMeaning, 'ta-IN');
        await delay(500);
      }
      
      // Speak English meaning
      if (englishMeaning) {
        setCurrentPhase('english');
        await speak(englishMeaning, 'en-US');
      }
      
      setIsPlaying(false);
      setCurrentPhase('kural');
    } catch (err) {
      console.error('Playback error:', err);
      setIsPlaying(false);
    }
  };

  const playAudio = (url) => {
    return new Promise((resolve, reject) => {
      const audio = audioRef.current;
      if (!audio) {
        resolve();
        return;
      }
      
      audio.src = url;
      audio.onended = () => resolve();
      audio.onerror = () => reject();
      audio.play().catch(reject);
    });
  };

  const speak = (text, lang) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }
      
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    });
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const togglePlayback = () => {
    if (isPlaying) {
      stopAll();
    } else {
      playSequence();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlayback}
        className="relative p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all shadow-lg"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Pause className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Play className="w-6 h-6 ml-1" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-white/30"
          />
        )}
      </motion.button>

      <div className="text-white/70 text-sm">
        {isPlaying && currentPhase === 'kural' && 'Playing Kural...'}
        {isPlaying && currentPhase === 'tamil' && 'Tamil Meaning...'}
        {isPlaying && currentPhase === 'english' && 'English Meaning...'}
        {!isPlaying && 'Tap to play'}
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onMutedChange(!muted)}
        className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      <audio ref={audioRef} muted={muted} />
    </div>
  );
};

export default function ReelsEnhanced() {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [kurals, setKurals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [muted, setMuted] = useState(false);
  const [sourceType, setSourceType] = useState('discovery');
  const [showSourceMenu, setShowSourceMenu] = useState(false);
  const [toast, setToast] = useState(null);
  const [likedKurals, setLikedKurals] = useState(new Set());
  const [bookmarkedKurals, setBookmarkedKurals] = useState(new Set());
  const [completedKurals, setCompletedKurals] = useState(new Set());
  const [direction, setDirection] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const startY = useRef(0);
  const startTime = useRef(Date.now());
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    initializeSession();
  }, [sourceType]);

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < kurals.length) {
      logInteraction('view');
      startTime.current = Date.now();
    }
    
    // Load more when near the end
    if (currentIndex >= kurals.length - 3 && hasMore && !isLoadingMore) {
      loadMoreKurals();
    }
  }, [currentIndex]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const initializeSession = async () => {
    setLoading(true);
    setKurals([]);
    setCurrentIndex(0);
    setCurrentPage(1);
    setHasMore(true);
    
    try {
      const res = await axios.post(
        `${API_URL}/api/reels/session`,
        { sourceType, count: 50 },
        authHeader
      );
      if (res.data?.success) {
        const id = res.data.data.session_id;
        setSessionId(id);
        await fetchKuralsForSession(id, 1, 50);
      }
    } catch (err) {
      showToast('Failed to load kurals');
    } finally {
      setLoading(false);
    }
  };

  const fetchKuralsForSession = async (id, page, limit) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/reels/${id}`,
        { ...authHeader, params: { page, limit } }
      );
      if (res.data?.success) {
        const newKurals = res.data.data.kurals || [];
        setKurals(prev => page === 1 ? newKurals : [...prev, ...newKurals]);
        setHasMore(res.data.data.has_more);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const loadMoreKurals = async () => {
    if (!hasMore || isLoadingMore || !sessionId) return;
    
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    await fetchKuralsForSession(sessionId, nextPage, 50);
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };

  const logInteraction = async (_type, data = {}) => {
    if (!sessionId || !kurals[currentIndex]) return;
    const duration = Math.floor((Date.now() - startTime.current) / 1000);
    try {
      await axios.post(
        `${API_URL}/api/reels/${sessionId}/interaction`,
        {
          kuralNumber: kurals[currentIndex].kural_number,
          duration,
          ...data
        },
        authHeader
      );
    } catch (err) {
      console.error('Log error:', err);
    }
  };

  const handleSwipe = (dir) => {
    if (dir === 'up' && currentIndex < kurals.length - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
    } else if (dir === 'down' && currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    }
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diff = startY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) handleSwipe(diff > 0 ? 'up' : 'down');
  };

  const handleLike = async () => {
    const k = kurals[currentIndex];
    const num = k.kural_number;
    
    try {
      await axios.post(`${API_URL}/api/users/wishlist`,
        { kuralNumber: num },
        authHeader
      );
      setLikedKurals(prev => {
        const newSet = new Set(prev);
        if (newSet.has(num)) {
          newSet.delete(num);
        } else {
          newSet.add(num);
        }
        return newSet;
      });
      await logInteraction('like', { liked: true });
      showToast('Added to wishlist! ❤️');
    } catch (err) {
      showToast('Already in wishlist');
    }
  };

  const handleBookmark = async () => {
    const k = kurals[currentIndex];
    try {
      await axios.post(`${API_URL}/api/users/wishlist`,
        { kuralNumber: k.kural_number },
        authHeader
      );
      setBookmarkedKurals(prev => new Set(prev).add(k.kural_number));
      await logInteraction('bookmark', { wishlisted: true });
      showToast('Saved to wishlist! 📚');
    } catch (err) {
      showToast('Already in wishlist');
    }
  };

  const handleComplete = async () => {
    const k = kurals[currentIndex];
    try {
      await axios.post(`${API_URL}/api/users/complete`,
        { kuralNumber: k.kural_number },
        authHeader
      );
      setCompletedKurals(prev => new Set(prev).add(k.kural_number));
      await logInteraction('complete', { completed: true });
      showToast('Marked as completed! ✨');
    } catch (err) {
      showToast('Already completed');
    }
  };

  const handleShare = async () => {
    const k = kurals[currentIndex];
    if (navigator.share) {
      await navigator.share({
        title: `Thirukkural #${k.kural_number}`,
        text: `${k.tamil_text}\n\n${k.english_translation}`,
        url: `${window.location.origin}/kural/${k.kural_number}`
      });
      await logInteraction('share', { shared: true });
    } else {
      navigator.clipboard.writeText(
        `Thirukkural #${k.kural_number}\n${k.tamil_text}\n${k.english_translation}`
      );
      showToast('Copied to clipboard! 📋');
    }
  };

  const getPaalGradient = (paal) => {
    switch (paal) {
      case 'Arathupal': return 'from-emerald-500 via-green-600 to-teal-700';
      case 'Porutpal': return 'from-amber-500 via-orange-600 to-red-600';
      case 'Kamathupal': return 'from-pink-500 via-rose-600 to-purple-700';
      default: return 'from-blue-500 via-indigo-600 to-purple-700';
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (!kurals.length) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center text-white px-4"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            📚
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">No Kurals Available</h2>
          <p className="text-white/70 mb-8">Let's start your learning journey!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/lessons')}
            className="px-8 py-3 bg-white text-indigo-900 rounded-full font-semibold shadow-xl"
          >
            Go to Lessons
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentKural = kurals[currentIndex];
  const isLiked = likedKurals.has(currentKural.kural_number);
  const isCompleted = completedKurals.has(currentKural.kural_number);

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Animated Background */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className={`absolute inset-0 bg-gradient-to-br ${getPaalGradient(currentKural.paal.name_tamil)}`}
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </motion.div>

      {/* Glass Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSourceMenu(s => !s)}
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all font-medium"
        >
          {sourceType === 'discovery' && '✨ Discovery'}
          {sourceType === 'sequential' && '📚 Sequential'}
          {sourceType === 'random' && '🎲 Random'}
        </motion.button>
      </motion.div>

      {/* Source Menu */}
      <AnimatePresence>
        {showSourceMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSourceMenu(false)}
              className="absolute inset-0 z-25 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-20 right-4 z-30 bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              {[
                { type: 'discovery', icon: '✨', label: 'Discovery Mode', desc: 'AI picks for you' },
                { type: 'sequential', icon: '📚', label: 'Sequential Mode', desc: 'Learn in order' },
                { type: 'random', icon: '🎲', label: 'Random Mode', desc: 'Surprise me!' }
              ].map((option) => (
                <motion.button
                  key={option.type}
                  whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                  onClick={() => { setSourceType(option.type); setShowSourceMenu(false); }}
                  className={`w-full px-6 py-4 text-left transition-colors ${
                    sourceType === option.type ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="h-full flex items-center justify-center relative px-4 pb-20"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, y: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -100 : 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 max-w-4xl w-full"
          >
            {/* Header Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6 flex-wrap"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                <span className="text-white/70 text-sm font-medium">Kural</span>
                <span className="text-white font-bold text-xl">#{currentKural.kural_number}</span>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                <span className="text-white/90 text-sm">{currentKural.paal.name_english}</span>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                <span className="text-white/70 text-xs">{currentKural.adhigaram?.english_name}</span>
              </div>
            </motion.div>

            {/* Tamil Kural Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 mb-4 shadow-2xl border border-white/20"
            >
              <div className="text-white/60 text-sm mb-3 text-center font-medium">திருக்குறள்</div>
              <p
                className="text-white text-2xl md:text-3xl leading-relaxed text-center font-bold tracking-wide"
                style={{ fontFamily: '"Noto Serif Tamil", serif' }}
              >
                {currentKural.tamil_text}
              </p>
            </motion.div>

            {/* Tamil Meaning Box */}
            {currentKural.tamil_meaning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-2xl rounded-3xl p-6 mb-4 shadow-2xl border border-amber-300/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🇮🇳</span>
                  <div className="text-amber-200 text-sm font-semibold">தமிழ் பொருள்</div>
                </div>
                <p
                  className="text-white/95 text-lg leading-relaxed"
                  style={{ fontFamily: '"Noto Serif Tamil", serif' }}
                >
                  {currentKural.tamil_meaning}
                </p>
              </motion.div>
            )}

            {/* English Meaning Box */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-2xl rounded-3xl p-6 mb-6 shadow-2xl border border-blue-300/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌍</span>
                <div className="text-blue-200 text-sm font-semibold">English Translation</div>
              </div>
              <p className="text-white/95 text-lg leading-relaxed">
                {currentKural.english_meaning}
              </p>
            </motion.div> */}

            {/* Audio Player */}
            {currentKural.audio_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white/20"
              >
                <AudioPlayer
                  audioUrl={currentKural.audio_url}
                  tamilMeaning={currentKural.tamil_meaning}
                  englishMeaning={currentKural.english_translation}
                  muted={muted}
                  onMutedChange={setMuted}
                  autoPlay={true}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Right Side Action Buttons */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('down')}
            disabled={currentIndex === 0}
            className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
          
          <div className="text-white/60 text-xs text-center font-medium bg-white/10 backdrop-blur-md rounded-full px-3 py-2">
            {currentIndex + 1}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('up')}
            disabled={currentIndex === kurals.length - 1 && !hasMore}
            className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-3 rounded-full backdrop-blur-md transition-all shadow-lg ${
              isLiked ? 'bg-red-500/40' : 'bg-white/20 hover:bg-white/30'
            }`}>
              <Heart className={`w-7 h-7 ${isLiked ? 'text-red-300' : 'text-white'}`} fill={isLiked ? 'currentColor' : 'none'} />
            </div>
            <span className="text-white text-xs font-medium">Like</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleComplete}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-3 rounded-full backdrop-blur-md transition-all shadow-lg ${
              isCompleted ? 'bg-green-500/40' : 'bg-white/20 hover:bg-white/30'
            }`}>
              <Check className={`w-7 h-7 ${isCompleted ? 'text-green-300' : 'text-white'}`} />
            </div>
            <span className="text-white text-xs font-medium">Done</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleShare}
            className="flex flex-col items-center gap-1"
          >
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all shadow-lg">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-xs font-medium">Share</span>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-6 left-6 right-6 z-20"
        >
          <div className="flex items-center justify-between text-white/70 text-sm mb-3 px-2">
            <span className="font-medium">{currentIndex + 1} of {kurals.length}{hasMore ? '+' : ''}</span>
            {isLoadingMore && <span className="text-white/50 text-xs">Loading more...</span>}
          </div>
          <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-white to-white/80 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / kurals.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </div>
        </motion.div>

        {/* Swipe Hint */}
        <AnimatePresence>
          {currentIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 1 }}
              className="absolute bottom-40 left-1/2 -translate-x-1/2 z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center text-white/60 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full"
              >
                <ChevronUp className="w-8 h-8 mb-1" />
                <span className="text-sm font-medium">Swipe up for next</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}