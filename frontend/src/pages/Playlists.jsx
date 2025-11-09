import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Play, Trash2, Edit, Lock, Globe, List, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Playlists() {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    isPublic: false
  });

  useEffect(() => {
    fetchPlaylists();
  }, [filterType]);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/playlists`, {
        params: { type: filterType },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setPlaylists(response.data.data.playlists);
      }
    } catch (error) {
      console.error('Fetch playlists error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async (e) => {
    e.preventDefault();
    
    if (!newPlaylist.name.trim()) {
      alert('Please enter a playlist name');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/playlists`,
        newPlaylist,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setShowCreateModal(false);
        setNewPlaylist({ name: '', description: '', isPublic: false });
        fetchPlaylists();
        alert('Playlist created successfully!');
      }
    } catch (error) {
      console.error('Create playlist error:', error);
      alert('Failed to create playlist');
    }
  };

  const deletePlaylist = async (playlistId) => {
    if (!confirm('Are you sure you want to delete this playlist?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPlaylists();
      alert('Playlist deleted successfully!');
    } catch (error) {
      console.error('Delete playlist error:', error);
      alert('Failed to delete playlist');
    }
  };

  const playPlaylist = async (playlistId) => {
    try {
      // Increment play count
      await axios.post(
        `${API_URL}/playlists/${playlistId}/play`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Navigate to Reels with playlist
      navigate(`/reels-enhanced?playlist=${playlistId}`);
    } catch (error) {
      console.error('Play playlist error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <List className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Playlists</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Playlist
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex border-b">
            {[
              { value: 'all', label: 'All Playlists' },
              { value: 'system', label: 'System' },
              { value: 'my', label: 'My Playlists' },
              { value: 'public', label: 'Public' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  filterType === filter.value
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Playlists Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : playlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Cover Image */}
                <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <List className="w-16 h-16 text-white/30" />
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    {playlist.is_system && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                        System
                      </span>
                    )}
                    {playlist.is_public ? (
                      <Globe className="w-5 h-5 text-white" />
                    ) : (
                      <Lock className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                    {playlist.name}
                  </h3>
                  {playlist.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {playlist.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{playlist.kural_count} Kurals</span>
                    <span>{playlist.play_count} plays</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => playPlaylist(playlist.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </button>
                    
                    {!playlist.is_system && (
                      <>
                        <button
                          onClick={() => navigate(`/playlists/${playlist.id}/edit`)}
                          className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePlaylist(playlist.id)}
                          className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No playlists found</h3>
            <p className="text-gray-500 mb-6">
              {filterType === 'my' 
                ? 'Create your first playlist to get started'
                : 'No playlists available in this category'}
            </p>
            {filterType === 'my' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Playlist
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Create Playlist</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={createPlaylist} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                  placeholder="e.g., Daily Wisdom"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                  placeholder="Describe your playlist..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newPlaylist.isPublic}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, isPublic: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700 cursor-pointer">
                  Make this playlist public
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
