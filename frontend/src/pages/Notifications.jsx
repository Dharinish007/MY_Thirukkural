import { useState, useEffect } from 'react';
import { 
  Bell, Settings, Clock, Calendar, Zap, Trophy, 
  Flame, Star, CheckCircle, TrendingUp, Plus, X
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Notifications() {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('settings');
  const [schedule, setSchedule] = useState(null);
  const [streak, setStreak] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddTime, setShowAddTime] = useState(false);
  const [newTime, setNewTime] = useState({ hour: 9, minute: 0 });
  

  useEffect(() => {
    fetchSchedule();
    fetchStreak();
    fetchAchievements();
    fetchHistory();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications/schedule`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setSchedule(response.data.data.schedule);
      }
    } catch (error) {
      console.error('Fetch schedule error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStreak = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications/streak`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setStreak(response.data.data.streak);
      }
    } catch (error) {
      console.error('Fetch streak error:', error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications/achievements`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setAchievements(response.data.data.achievements);
      }
    } catch (error) {
      console.error('Fetch achievements error:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications/history`, {
        params: { limit: 20 },
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setHistory(response.data.data.history);
      }
    } catch (error) {
      console.error('Fetch history error:', error);
    }
  };

  const updateSchedule = async (updates) => {
    setSaving(true);
    try {
      const response = await axios.put(
        `${API_URL}/api/notifications/schedule`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setSchedule(response.data.data.schedule);
        alert('Schedule updated successfully!');
      }
    } catch (error) {
      console.error('Update schedule error:', error);
      alert('Failed to update schedule');
    } finally {
      setSaving(false);
    }
  };

  const sendTestNotification = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/notifications/test`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        alert(`Test notification sent! Kural #${response.data.data.kural_number}`);
      }
    } catch (error) {
      console.error('Test notification error:', error);
      alert('Failed to send test notification');
    }
  };

  const addNotificationTime = () => {
    if (schedule) {
      const updatedTimes = [...(schedule.times || []), newTime];
      updateSchedule({ times: updatedTimes });
      setShowAddTime(false);
      setNewTime({ hour: 9, minute: 0 });
    }
  };

  const removeNotificationTime = (index) => {
    if (schedule) {
      const updatedTimes = schedule.times.filter((_, i) => i !== index);
      updateSchedule({ times: updatedTimes });
    }
  };

  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const getDayName = (dayNum) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNum];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-6 h-6 text-gray-800 font-bold" />
              </button>

              <Bell className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            </div>
            <button
              onClick={sendTestNotification}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Test
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Streak Card */}
        {streak && (
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Current Streak</h2>
                </div>
                <div className="text-5xl font-bold mb-2">{streak.currentStreak} Days</div>
                <p className="text-orange-100">
                  Longest: {streak.longestStreak} days • Total: {streak.totalDaysActive} days active
                </p>
              </div>
              <div className="text-right">
                <Trophy className="w-16 h-16 opacity-50 mb-2" />
                <div className="text-sm text-orange-100">
                  {streak.currentStreak >= 7 ? '🔥 On Fire!' : 'Keep going!'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </div>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'achievements'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                History
              </div>
            </button>
          </div>

          <div className="p-6">
            {/* Settings Tab */}
            {activeTab === 'settings' && schedule && (
              <div className="space-y-6">
                {/* Enable/Disable */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Enable Notifications</h3>
                    <p className="text-sm text-gray-600">Receive daily Kural reminders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schedule.enabled}
                      onChange={(e) => updateSchedule({ enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select
                    value={schedule.frequency}
                    onChange={(e) => updateSchedule({ frequency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {/* Notification Times */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Notification Times
                    </label>
                    <button
                      onClick={() => setShowAddTime(true)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add Time
                    </button>
                  </div>

                  <div className="space-y-2">
                    {schedule.times?.map((time, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-900">
                            {formatTime(time.hour, time.minute)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeNotificationTime(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {showAddTime && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          max="23"
                          value={newTime.hour}
                          onChange={(e) => setNewTime({ ...newTime, hour: parseInt(e.target.value) })}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Hour"
                        />
                        <span>:</span>
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={newTime.minute}
                          onChange={(e) => setNewTime({ ...newTime, minute: parseInt(e.target.value) })}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Min"
                        />
                        <button
                          onClick={addNotificationTime}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddTime(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Days of Week (for weekly) */}
                {schedule.frequency === 'weekly' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days of Week
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                        <button
                          key={day}
                          onClick={() => {
                            const days = schedule.daysOfWeek || [];
                            const updated = days.includes(day)
                              ? days.filter(d => d !== day)
                              : [...days, day];
                            updateSchedule({ daysOfWeek: updated });
                          }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            schedule.daysOfWeek?.includes(day)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {getDayName(day).substring(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Priority Paals */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Paals
                  </label>
                  <div className="space-y-2">
                    {['Arathupal', 'Porutpal', 'Kamathupal'].map((paal) => (
                      <label key={paal} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={schedule.priorityPaals?.includes(paal)}
                          onChange={(e) => {
                            const paals = schedule.priorityPaals || [];
                            const updated = e.target.checked
                              ? [...paals, paal]
                              : paals.filter(p => p !== paal);
                            updateSchedule({ priorityPaals: updated });
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{paal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Learning Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Mode
                  </label>
                  <select
                    value={schedule.learningMode}
                    onChange={(e) => updateSchedule({ learningMode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="balanced">Balanced (Recommended)</option>
                    <option value="sequential">Sequential</option>
                    <option value="random">Random</option>
                    <option value="thematic">Thematic</option>
                  </select>
                  <p className="mt-2 text-sm text-gray-500">
                    {schedule.learningMode === 'balanced' && 'Mix of priority, sequential, and random Kurals'}
                    {schedule.learningMode === 'sequential' && 'Learn Kurals in order'}
                    {schedule.learningMode === 'random' && 'Completely random selection'}
                    {schedule.learningMode === 'thematic' && 'Based on themes you\'ve shown interest in'}
                  </p>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-4">
                {achievements.length > 0 ? (
                  achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                    >
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Earned {new Date(achievement.earned_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Star className="w-6 h-6 text-yellow-500" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No achievements yet</h3>
                    <p className="text-gray-500">Keep learning to unlock achievements!</p>
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-3">
                {history.length > 0 ? (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/kural/${item.kural_number}`)}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-blue-600">Kural #{item.kural_number}</span>
                            {item.action === 'completed' && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          {item.kural && (
                            <>
                              <p className="text-sm text-gray-900 mb-1">{item.kural.tamil_text}</p>
                              <p className="text-xs text-gray-600">{item.kural.english_translation}</p>
                            </>
                          )}
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          {new Date(item.sent_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No notification history</h3>
                    <p className="text-gray-500">Your notification history will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
