import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search as SearchIcon, X, Filter, Clock, Sparkles, 
  BookMarked, CheckCircle, Play
} from 'lucide-react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Search() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ Optional login

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [filters, setFilters] = useState({
    paal: '',
    completed: null,
    difficulty: ''
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [searchStats, setSearchStats] = useState(null);

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

 useEffect(() => {
  if (token) fetchSearchHistory(); // ✅ Only logged-in users
}, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) fetchAutocomplete();
      else setSuggestions([]);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!suggestionsRef.current?.contains(e.target) &&
          !searchInputRef.current?.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAutocomplete = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/search/autocomplete`, {
        params: { q: query }
      });
      setSuggestions(res.data.data.suggestions);
      setShowSuggestions(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSearchHistory = async () => {
  if (!token) return; // guest => skip

  try {
    const res = await axios.get(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // if backend stores history different, adjust here:
    setSearchHistory(res.data.searchHistory || []);
  } catch (err) {
    console.log("No history or user data.");
  }
};


  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setShowSuggestions(false);

    try {
      const res = await axios.post(`${API_URL}/api/search`, {
        query: query.trim(),
        filters,
        sort: sortBy,
        page: 1,
        limit: 20
      });

      setResults(res.data.data.results);
      setSearchStats({
        total: res.data.data.total,
        took_ms: res.data.data.took_ms
      });

      if (token) fetchSearchHistory();
    } catch (err) {
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRandomKural = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/search/random`);
      navigate(`/kural/${res.data.data.kural_number}`);
    } catch {
      alert("Failed to get random Kural");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ paal: '', completed: null, difficulty: '' });
    setQuery('');
    setResults([]);
    setSearchStats(null);
  };

  const selectSuggestion = (s) => {
    if (s.type === 'kural') navigate(`/kural/${s.value}`);
    else {
      setQuery(s.text);
      setShowSuggestions(false);
      handleSearch();
    }
  };

  const getPaalColor = (p) =>
    p === 'Arathupal' ? 'bg-green-100 text-green-800' :
    p === 'Porutpal' ? 'bg-yellow-100 text-yellow-800' :
    'bg-pink-100 text-pink-800';


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800 font-bold" />
          </button>
            <h1 className="text-2xl font-bold text-gray-900">Search Thirukkural</h1>
            <button
              onClick={handleRandomKural}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              Random Kural
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Search by Kural number, text, or Adhigaram..."
                className="w-full pl-12 pr-24 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSuggestions([]);
                  }}
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                  showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{suggestion.text}</div>
                        <div className="text-sm text-gray-500 truncate">{suggestion.preview}</div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {suggestion.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Paal Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paal</label>
                  <select
                    value={filters.paal}
                    onChange={(e) => setFilters({ ...filters, paal: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Paals</option>
                    <option value="Arathupal">Arathupal (Virtue)</option>
                    <option value="Porutpal">Porutpal (Wealth)</option>
                    <option value="Kamathupal">Kamathupal (Love)</option>
                  </select>
                </div>

                {/* Completion Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.completed === null ? '' : filters.completed}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      completed: e.target.value === '' ? null : e.target.value === 'true'
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Kurals</option>
                    <option value="false">Not Completed</option>
                    <option value="true">Completed</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="number">Kural Number</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Apply Filters'}
                </button>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search History */}
        {!results.length && searchHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(item.query);
                    handleSearch();
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
                >
                  {item.query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Stats */}
        {searchStats && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                Found <span className="font-bold text-blue-600">{searchStats.total}</span> results
              </span>
              <span className="text-gray-500">
                in {searchStats.took_ms}ms
              </span>
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.kural_number}
                onClick={() => navigate(`/kural/${result.kural_number}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-blue-600">
                          #{result.kural_number}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaalColor(result.paal.name_tamil)}`}>
                          {result.paal.name_english}
                        </span>
                        {result.user_progress.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {result.user_progress.bookmarked && (
                          <BookMarked className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xl text-gray-900 mb-2 font-tamil leading-relaxed">
                        {result.tamil_text}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {result.english_translation}
                      </p>
                    </div>
                    {result.audio_url && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Play audio
                        }}
                        className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {result.adhigaram && (
                    <div className="text-sm text-gray-500">
                      <span className="font-bold text-black">Adhigaram:</span> {result.adhigaram.english_name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : query || filters.paal || filters.completed !== null ? (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
